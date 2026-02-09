import { Question, QuestionCategory, QuestionDifficulty } from './question'

export enum QuizMode {
  STUDY = 'study',
  PRACTICE = 'practice',
  TEST = 'test',
  REVIEW = 'review',
}

export interface QuizConfig {
  mode: QuizMode
  questionCount: number
  categories: QuestionCategory[]
  difficulty: QuestionDifficulty[]
  chapters: number[]
  includeBookmarked: boolean
  includeIncorrect: boolean
  shuffleQuestions: boolean
  shuffleOptions: boolean
  showExplanations: boolean
  timeLimit?: number
}

export interface QuizAnswer {
  questionId: string
  selectedOptionId: string
  isCorrect: boolean
  timeSpent: number
  timestamp: Date
}

export interface QuizSession {
  id: string
  config: QuizConfig
  questions: Question[]
  answers: QuizAnswer[]
  currentQuestionIndex: number
  startTime: Date
  endTime?: Date
  score?: number
  isPassed?: boolean
}
