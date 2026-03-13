import { Question } from '../../types/question'

interface QuizCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
}

const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
}: QuizCardProps) => {
  return (
    <div className="card relative">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Q{questionNumber}/{totalQuestions}
          </span>
          <span className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('_', ' ')}
          </span>
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              question.difficulty === 'easy'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
      </div>

      {/* Question Image (if exists) */}
      {question.imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={question.imageUrl}
            alt="Question illustration"
            className="max-h-64 rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>
    </div>
  )
}

export default QuizCard
