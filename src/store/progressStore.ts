import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProgress, QuestionProgress, CategoryProgress, ChapterProgress } from '../types/progress'
import { QuestionCategory } from '../types/question'
import { QuizSession } from '../types/quiz'

interface ProgressState {
  userProgress: UserProgress | null

  // Actions
  initializeProgress: (userId: string) => void
  recordQuizSession: (session: QuizSession) => void
  updateQuestionProgress: (
    questionId: string,
    isCorrect: boolean,
    timeSpent: number
  ) => void
  toggleBookmark: (questionId: string) => void
  getQuestionProgress: (questionId: string) => QuestionProgress | undefined
  getCategoryProgress: (category: QuestionCategory) => CategoryProgress | undefined
  getChapterProgress: (chapter: number) => ChapterProgress | undefined
  resetProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      userProgress: null,

      initializeProgress: (userId) => {
        const progress: UserProgress = {
          userId,
          overallStats: {
            totalQuestionsAttempted: 0,
            totalQuestionsCorrect: 0,
            overallAccuracy: 0,
            totalStudyTime: 0,
            totalQuizzesTaken: 0,
            totalTestsTaken: 0,
            bestTestScore: 0,
            averageTestScore: 0,
          },
          categoryProgress: [],
          chapterProgress: [],
          questionProgress: {},
          quizHistory: [],
          bookmarkedQuestions: [],
          incorrectQuestions: [],
          achievements: [],
          streakDays: 0,
          lastStudyDate: new Date(),
        }
        set({ userProgress: progress })
      },

      recordQuizSession: (session) => {
        const { userProgress } = get()
        if (!userProgress) return

        // Update overall stats
        const correctAnswers = session.answers.filter(a => a.isCorrect).length
        const totalStudyTime = session.answers.reduce((sum, a) => sum + a.timeSpent, 0)

        const updatedStats = {
          ...userProgress.overallStats,
          totalQuestionsAttempted:
            userProgress.overallStats.totalQuestionsAttempted + session.answers.length,
          totalQuestionsCorrect:
            userProgress.overallStats.totalQuestionsCorrect + correctAnswers,
          overallAccuracy:
            ((userProgress.overallStats.totalQuestionsCorrect + correctAnswers) /
              (userProgress.overallStats.totalQuestionsAttempted + session.answers.length)) *
            100,
          totalStudyTime: userProgress.overallStats.totalStudyTime + totalStudyTime / 60,
          totalQuizzesTaken: userProgress.overallStats.totalQuizzesTaken + 1,
          totalTestsTaken:
            session.config.mode === 'test'
              ? userProgress.overallStats.totalTestsTaken + 1
              : userProgress.overallStats.totalTestsTaken,
          bestTestScore:
            session.config.mode === 'test' && session.score
              ? Math.max(userProgress.overallStats.bestTestScore, session.score)
              : userProgress.overallStats.bestTestScore,
        }

        // Calculate average test score
        if (session.config.mode === 'test' && session.score) {
          const totalTests = updatedStats.totalTestsTaken
          const prevTotal =
            userProgress.overallStats.averageTestScore * (totalTests - 1)
          updatedStats.averageTestScore = (prevTotal + session.score) / totalTests
        }

        // Update question progress for each answer
        const updatedQuestionProgress = { ...userProgress.questionProgress }
        session.answers.forEach(answer => {
          const existing = updatedQuestionProgress[answer.questionId] || {
            questionId: answer.questionId,
            attemptCount: 0,
            correctCount: 0,
            incorrectCount: 0,
            lastAttempt: new Date(),
            isBookmarked: false,
          }

          updatedQuestionProgress[answer.questionId] = {
            ...existing,
            attemptCount: existing.attemptCount + 1,
            correctCount: answer.isCorrect
              ? existing.correctCount + 1
              : existing.correctCount,
            incorrectCount: !answer.isCorrect
              ? existing.incorrectCount + 1
              : existing.incorrectCount,
            lastAttempt: new Date(),
          }
        })

        // Track incorrect questions
        const incorrectQuestions = [
          ...new Set([
            ...userProgress.incorrectQuestions,
            ...session.answers
              .filter(a => !a.isCorrect)
              .map(a => a.questionId),
          ]),
        ]

        set({
          userProgress: {
            ...userProgress,
            overallStats: updatedStats,
            questionProgress: updatedQuestionProgress,
            quizHistory: [...userProgress.quizHistory, session],
            incorrectQuestions,
            lastStudyDate: new Date(),
          },
        })
      },

      updateQuestionProgress: (questionId, isCorrect, _timeSpent) => {
        const { userProgress } = get()
        if (!userProgress) return

        const existing = userProgress.questionProgress[questionId] || {
          questionId,
          attemptCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          lastAttempt: new Date(),
          isBookmarked: false,
        }

        const updated: QuestionProgress = {
          ...existing,
          attemptCount: existing.attemptCount + 1,
          correctCount: isCorrect ? existing.correctCount + 1 : existing.correctCount,
          incorrectCount: !isCorrect ? existing.incorrectCount + 1 : existing.incorrectCount,
          lastAttempt: new Date(),
        }

        set({
          userProgress: {
            ...userProgress,
            questionProgress: {
              ...userProgress.questionProgress,
              [questionId]: updated,
            },
          },
        })
      },

      toggleBookmark: (questionId) => {
        const { userProgress } = get()
        if (!userProgress) return

        const isBookmarked = userProgress.bookmarkedQuestions.includes(questionId)
        const updatedBookmarks = isBookmarked
          ? userProgress.bookmarkedQuestions.filter(id => id !== questionId)
          : [...userProgress.bookmarkedQuestions, questionId]

        // Update question progress
        const questionProgress = userProgress.questionProgress[questionId] || {
          questionId,
          attemptCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          lastAttempt: new Date(),
          isBookmarked: false,
        }

        set({
          userProgress: {
            ...userProgress,
            bookmarkedQuestions: updatedBookmarks,
            questionProgress: {
              ...userProgress.questionProgress,
              [questionId]: {
                ...questionProgress,
                isBookmarked: !isBookmarked,
              },
            },
          },
        })
      },

      getQuestionProgress: (questionId) => {
        const { userProgress } = get()
        return userProgress?.questionProgress[questionId]
      },

      getCategoryProgress: (category) => {
        const { userProgress } = get()
        return userProgress?.categoryProgress.find(cp => cp.category === category)
      },

      getChapterProgress: (chapter) => {
        const { userProgress } = get()
        return userProgress?.chapterProgress.find(cp => cp.chapter === chapter)
      },

      resetProgress: () => {
        set({ userProgress: null })
      },
    }),
    {
      name: 'progress-storage',
    }
  )
)
