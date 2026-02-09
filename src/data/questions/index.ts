import { Question } from '../../types/question'
import chapter1Questions from './chapter1-licenses.json'
import chapter2Questions from './chapter2-vehicles.json'
import chapter3Questions from './chapter3-drivers.json'
import chapter4Questions from './chapter4-roads.json'

export const allQuestions: Question[] = [
  ...(chapter1Questions as Question[]),
  ...(chapter2Questions as Question[]),
  ...(chapter3Questions as Question[]),
  ...(chapter4Questions as Question[]),
]

export const questionsByChapter = {
  1: chapter1Questions as Question[],
  2: chapter2Questions as Question[],
  3: chapter3Questions as Question[],
  4: chapter4Questions as Question[],
}

export const getQuestionsByChapter = (chapter: number): Question[] => {
  return questionsByChapter[chapter as keyof typeof questionsByChapter] || []
}

export const getQuestionsByCategory = (category: string): Question[] => {
  return allQuestions.filter(q => q.category === category)
}

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty)
}

export const getTotalQuestionCount = (): number => {
  return allQuestions.length
}

export default allQuestions
