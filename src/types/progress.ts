import { QuestionCategory } from './question'
import { QuizSession } from './quiz'

export interface QuestionProgress {
  questionId: string
  attemptCount: number
  correctCount: number
  incorrectCount: number
  lastAttempt: Date
  isBookmarked: boolean
  notes?: string
}

export interface CategoryProgress {
  category: QuestionCategory
  totalQuestions: number
  attemptedQuestions: number
  correctAnswers: number
  accuracy: number
  averageTimePerQuestion: number
  lastStudied: Date
}

export interface ChapterProgress {
  chapter: number
  sections: {
    [section: string]: {
      questionsAttempted: number
      questionsCorrect: number
      accuracy: number
    }
  }
  overallAccuracy: number
  isCompleted: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  iconUrl: string
  unlockedAt?: Date
  criteria: {
    type: 'accuracy' | 'streak' | 'questions' | 'test_passed'
    value: number
  }
}

export interface UserProgress {
  userId: string
  overallStats: {
    totalQuestionsAttempted: number
    totalQuestionsCorrect: number
    overallAccuracy: number
    totalStudyTime: number
    totalQuizzesTaken: number
    totalTestsTaken: number
    bestTestScore: number
    averageTestScore: number
  }
  categoryProgress: CategoryProgress[]
  chapterProgress: ChapterProgress[]
  questionProgress: { [questionId: string]: QuestionProgress }
  quizHistory: QuizSession[]
  bookmarkedQuestions: string[]
  incorrectQuestions: string[]
  achievements: Achievement[]
  streakDays: number
  lastStudyDate: Date
}
