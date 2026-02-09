import { ChevronLeft, ChevronRight, Shuffle, Check } from 'lucide-react'

interface FlashcardControlsProps {
  onPrevious: () => void
  onNext: () => void
  onShuffle: () => void
  onMarkStudied: () => void
  onComplete: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  isLastCard: boolean
  isStudied: boolean
}

const FlashcardControls = ({
  onPrevious,
  onNext,
  onShuffle,
  onMarkStudied,
  onComplete,
  canGoPrevious,
  canGoNext,
  isLastCard,
  isStudied,
}: FlashcardControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Primary Navigation */}
      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="btn btn-secondary flex items-center gap-1 sm:gap-2 disabled:opacity-30 px-3 sm:px-4"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={onMarkStudied}
          className={`btn flex items-center gap-1 sm:gap-2 px-3 sm:px-6 ${
            isStudied
              ? 'bg-success-500 text-white hover:bg-success-600'
              : 'btn-primary'
          }`}
          aria-label={isStudied ? 'Marked as studied' : 'Mark as studied'}
        >
          <Check className="w-5 h-5" />
          <span className="hidden xs:inline">{isStudied ? 'Studied' : 'Mark Studied'}</span>
        </button>

        {isLastCard ? (
          <button
            onClick={onComplete}
            className="btn bg-success-600 text-white hover:bg-success-700 flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
          >
            <span>Done</span>
            <Check className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className="btn btn-primary flex items-center gap-1 sm:gap-2 disabled:opacity-30 px-3 sm:px-4"
            aria-label="Next card"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="flex justify-center gap-2">
        <button
          onClick={onShuffle}
          className="btn btn-secondary text-sm flex items-center gap-2"
          aria-label="Shuffle deck"
        >
          <Shuffle className="w-4 h-4" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Hint - hidden on mobile */}
      <div className="text-center hidden sm:block">
        <p className="text-xs text-gray-500">
          Use <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd> and{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd> to navigate
        </p>
      </div>
    </div>
  )
}

export default FlashcardControls
