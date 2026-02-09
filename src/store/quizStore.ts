import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuizSession, QuizAnswer, QuizConfig, QuizMode } from '../types/quiz'
import { Question } from '../types/question'

interface QuizState {
  currentSession: QuizSession | null
  isActive: boolean

  // Actions
  startQuiz: (config: QuizConfig, questions: Question[]) => void
  answerQuestion: (questionId: string, selectedOptionId: string, timeSpent: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  goToQuestion: (index: number) => void
  endQuiz: () => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      isActive: false,

      startQuiz: (config, questions) => {
        const session: QuizSession = {
          id: `quiz_${Date.now()}`,
          config,
          questions,
          answers: [],
          currentQuestionIndex: 0,
          startTime: new Date(),
        }
        set({ currentSession: session, isActive: true })
      },

      answerQuestion: (questionId, selectedOptionId, timeSpent) => {
        const { currentSession } = get()
        if (!currentSession) return

        const question = currentSession.questions.find(q => q.id === questionId)
        if (!question) return

        const isCorrect = question.correctAnswerId === selectedOptionId

        const answer: QuizAnswer = {
          questionId,
          selectedOptionId,
          isCorrect,
          timeSpent,
          timestamp: new Date(),
        }

        // Update or add answer
        const existingAnswerIndex = currentSession.answers.findIndex(
          a => a.questionId === questionId
        )

        const updatedAnswers =
          existingAnswerIndex >= 0
            ? [
                ...currentSession.answers.slice(0, existingAnswerIndex),
                answer,
                ...currentSession.answers.slice(existingAnswerIndex + 1),
              ]
            : [...currentSession.answers, answer]

        set({
          currentSession: {
            ...currentSession,
            answers: updatedAnswers,
          },
        })
      },

      nextQuestion: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const nextIndex = Math.min(
          currentSession.currentQuestionIndex + 1,
          currentSession.questions.length - 1
        )

        set({
          currentSession: {
            ...currentSession,
            currentQuestionIndex: nextIndex,
          },
        })
      },

      previousQuestion: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const prevIndex = Math.max(currentSession.currentQuestionIndex - 1, 0)

        set({
          currentSession: {
            ...currentSession,
            currentQuestionIndex: prevIndex,
          },
        })
      },

      goToQuestion: (index) => {
        const { currentSession } = get()
        if (!currentSession) return

        const validIndex = Math.max(0, Math.min(index, currentSession.questions.length - 1))

        set({
          currentSession: {
            ...currentSession,
            currentQuestionIndex: validIndex,
          },
        })
      },

      endQuiz: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const correctAnswers = currentSession.answers.filter(a => a.isCorrect).length
        const totalQuestions = currentSession.questions.length
        const score = (correctAnswers / totalQuestions) * 100
        const isPassed = currentSession.config.mode === QuizMode.TEST ? score >= 80 : undefined

        set({
          currentSession: {
            ...currentSession,
            endTime: new Date(),
            score,
            isPassed,
          },
          isActive: false,
        })
      },

      resetQuiz: () => {
        set({ currentSession: null, isActive: false })
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentSession: state.currentSession,
      }),
    }
  )
)
