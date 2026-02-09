import { Question } from '../../types/question'
import { CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react'

interface QuizFeedbackProps {
  question: Question
  isCorrect: boolean
  onNext: () => void
  isLastQuestion: boolean
}

const QuizFeedback = ({ question, isCorrect, onNext, isLastQuestion }: QuizFeedbackProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Feedback Banner */}
      <div
        className={`rounded-lg p-6 ${
          isCorrect
            ? 'bg-gradient-to-r from-success-50 to-success-100 border-2 border-success-300'
            : 'bg-gradient-to-r from-error-50 to-error-100 border-2 border-error-300'
        }`}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <CheckCircle className="w-8 h-8 text-success-600 flex-shrink-0" />
          ) : (
            <XCircle className="w-8 h-8 text-error-600 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h3
              className={`text-xl font-bold mb-2 ${
                isCorrect ? 'text-success-900' : 'text-error-900'
              }`}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p
              className={`${
                isCorrect ? 'text-success-800' : 'text-error-800'
              }`}
            >
              {isCorrect
                ? 'Great job! You got it right.'
                : 'Not quite. Review the explanation below to understand why.'}
            </p>
          </div>
        </div>
      </div>

      {/* Explanation Card */}
      <div className="card bg-white">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
          <h4 className="text-lg font-bold text-gray-900">Explanation</h4>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">{question.explanation}</p>

        {/* Correct Answer */}
        <div className="bg-success-50 rounded-lg p-4 border border-success-200">
          <p className="text-sm font-semibold text-success-900 mb-2">Correct Answer:</p>
          <p className="text-success-800">
            {question.options.find(opt => opt.id === question.correctAnswerId)?.text}
          </p>
        </div>

        {/* Source */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Source:</span> {question.source}
          </p>
        </div>

        {/* Related Topics */}
        {question.relatedTopics.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Related Topics:</p>
            <div className="flex flex-wrap gap-2">
              {question.relatedTopics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2"
      >
        <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default QuizFeedback
