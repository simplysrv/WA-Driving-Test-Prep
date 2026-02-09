import { Question } from '../../types/question'
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react'

interface TestReviewProps {
  questions: Question[]
  answers: { [questionId: string]: string }
  onGoToQuestion: (index: number) => void
  onSubmit: () => void
}

const TestReview = ({ questions, answers, onGoToQuestion, onSubmit }: TestReviewProps) => {
  const answeredCount = Object.keys(answers).length
  const unansweredCount = questions.length - answeredCount
  const allAnswered = answeredCount === questions.length

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Answers</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          <div className="bg-white rounded-lg p-2 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-gray-900">{questions.length}</p>
            <p className="text-xs sm:text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-white rounded-lg p-2 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-success-600">{answeredCount}</p>
            <p className="text-xs sm:text-sm text-gray-600">Answered</p>
          </div>
          <div className="bg-white rounded-lg p-2 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-error-600">{unansweredCount}</p>
            <p className="text-xs sm:text-sm text-gray-600">Unanswered</p>
          </div>
        </div>

        {!allAnswered && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">
                You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Click on any question below to go back and answer it
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Question Grid */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Question Navigator</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-3">
          {questions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined
            return (
              <button
                key={question.id}
                onClick={() => onGoToQuestion(index)}
                className={`relative aspect-square rounded-lg font-bold text-sm sm:text-lg transition-all ${
                  isAnswered
                    ? 'bg-success-100 text-success-700 border-2 border-success-300 hover:bg-success-200'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-300 hover:bg-gray-200'
                }`}
                title={isAnswered ? 'Answered' : 'Unanswered'}
              >
                {index + 1}
                {isAnswered ? (
                  <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-success-600" />
                ) : (
                  <Circle className="absolute -top-1 -right-1 w-4 h-4 text-gray-400" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-success-100 border-2 border-success-300 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-success-600" />
            </div>
            <span className="text-sm text-gray-700">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <Circle className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm text-gray-700">Unanswered</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={!allAnswered}
        className="btn btn-primary w-full py-4 sm:py-6 text-base sm:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {allAnswered ? 'Submit Test' : `Answer ${unansweredCount} More Question${unansweredCount !== 1 ? 's' : ''} to Submit`}
      </button>

      {allAnswered && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-6 text-center">
          <p className="text-success-900 font-semibold text-lg">
            ✓ All questions answered! Ready to submit your test.
          </p>
        </div>
      )}
    </div>
  )
}

export default TestReview
