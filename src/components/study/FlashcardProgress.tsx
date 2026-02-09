interface FlashcardProgressProps {
  currentIndex: number
  total: number
  studiedCount: number
}

const FlashcardProgress = ({ currentIndex, total, studiedCount }: FlashcardProgressProps) => {
  const percentage = total > 0 ? ((currentIndex + 1) / total) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-600 font-medium">
            Card {currentIndex + 1} of {total}
          </span>
          <span className="text-primary-600 font-semibold">
            {Math.round(percentage)}% Complete
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{studiedCount}</p>
          <p className="text-xs text-gray-600 mt-1">Studied</p>
        </div>
        <div className="flex-1 bg-purple-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">{total - studiedCount}</p>
          <p className="text-xs text-gray-600 mt-1">Remaining</p>
        </div>
      </div>
    </div>
  )
}

export default FlashcardProgress
