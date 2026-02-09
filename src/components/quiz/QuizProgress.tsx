interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
}

const QuizProgress = ({
  currentQuestion,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
}: QuizProgressProps) => {
  const percentage = (currentQuestion / totalQuestions) * 100
  const accuracy =
    correctAnswers + incorrectAnswers > 0
      ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100
      : 0

  return (
    <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-primary-600">
              {currentQuestion}/{totalQuestions}
            </span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{currentQuestion}</p>
            <p className="text-xs text-gray-600 mt-1">Answered</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-success-600">{correctAnswers}</p>
            <p className="text-xs text-gray-600 mt-1">Correct</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-error-600">{incorrectAnswers}</p>
            <p className="text-xs text-gray-600 mt-1">Incorrect</p>
          </div>
        </div>

        {/* Accuracy */}
        {correctAnswers + incorrectAnswers > 0 && (
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Current Accuracy</p>
            <p className={`text-3xl font-bold ${
              accuracy >= 80 ? 'text-success-600' :
              accuracy >= 60 ? 'text-yellow-600' :
              'text-error-600'
            }`}>
              {Math.round(accuracy)}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizProgress
