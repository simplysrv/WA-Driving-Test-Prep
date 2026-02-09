export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  IMAGE_BASED = 'image_based',
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum QuestionCategory {
  LICENSES = 'licenses',
  VEHICLES = 'vehicles',
  DRIVERS = 'drivers',
  ROADS = 'roads',
  TRAFFIC_SIGNS = 'traffic_signs',
  TRAFFIC_SIGNALS = 'traffic_signals',
  RIGHT_OF_WAY = 'right_of_way',
  PARKING = 'parking',
  EMERGENCIES = 'emergencies',
  MIXED = 'mixed',
}

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: QuestionType
  category: QuestionCategory
  difficulty: QuestionDifficulty
  chapter: number
  section: string
  question: string
  options: QuestionOption[]
  correctAnswerId: string
  explanation: string
  imageUrl?: string
  tags: string[]
  relatedTopics: string[]
  source: string
}

export interface FlashcardContent {
  id: string
  front: string
  back: string
  imageUrl?: string
  category: QuestionCategory
  chapter: number
  tags: string[]
}
