import { QuestionOption } from '../../types/question'
import { Check, X } from 'lucide-react'

interface QuizOptionsProps {
  options: QuestionOption[]
  selectedOptionId: string | null
  correctAnswerId?: string
  showFeedback: boolean
  onSelect: (optionId: string) => void
  disabled?: boolean
}

const QuizOptions = ({
  options,
  selectedOptionId,
  correctAnswerId,
  showFeedback,
  onSelect,
  disabled = false,
}: QuizOptionsProps) => {
  const getOptionStyle = (option: QuestionOption) => {
    const isSelected = selectedOptionId === option.id
    const isCorrect = correctAnswerId === option.id

    if (!showFeedback) {
      // Before answering
      return isSelected
        ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600'
        : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
    }

    // After answering - show feedback
    if (isCorrect) {
      return 'border-success-600 bg-success-50 ring-2 ring-success-600'
    }

    if (isSelected && !isCorrect) {
      return 'border-error-600 bg-error-50 ring-2 ring-error-600'
    }

    return 'border-gray-300 bg-gray-50 opacity-60'
  }

  const getOptionIcon = (option: QuestionOption) => {
    const isSelected = selectedOptionId === option.id
    const isCorrect = correctAnswerId === option.id

    if (!showFeedback) return null

    if (isCorrect) {
      return (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success-600 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )
    }

    if (isSelected && !isCorrect) {
      return (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-error-600 flex items-center justify-center">
          <X className="w-4 h-4 text-white" />
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
        const isSelected = selectedOptionId === option.id
        const isCorrect = correctAnswerId === option.id

        return (
          <button
            key={option.id}
            onClick={() => !disabled && !showFeedback && onSelect(option.id)}
            disabled={disabled || showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
              option
            )} ${
              disabled || showFeedback ? 'cursor-default' : 'cursor-pointer'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            <div className="flex items-start gap-4">
              {/* Option Letter */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  showFeedback && isCorrect
                    ? 'bg-success-600 text-white'
                    : showFeedback && isSelected && !isCorrect
                    ? 'bg-error-600 text-white'
                    : isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {optionLetter}
              </div>

              {/* Option Text */}
              <div className="flex-1">
                <p
                  className={`text-base md:text-lg ${
                    showFeedback && (isCorrect || (isSelected && !isCorrect))
                      ? 'font-semibold'
                      : 'font-medium'
                  }`}
                >
                  {option.text}
                </p>
              </div>

              {/* Feedback Icon */}
              {getOptionIcon(option)}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default QuizOptions
