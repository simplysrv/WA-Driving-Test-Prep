import { useState } from 'react'
import { motion } from 'framer-motion'
import { Question } from '../../types/question'
import { Bookmark, BookmarkCheck } from 'lucide-react'

interface FlashcardProps {
  question: Question
  isBookmarked: boolean
  onBookmark: () => void
  showAnswer?: boolean
  onFlip?: () => void
}

const Flashcard = ({ question, isBookmarked, onBookmark, showAnswer = false, onFlip }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(showAnswer)

  const handleFlip = () => {
    const newFlipState = !isFlipped
    setIsFlipped(newFlipState)
    onFlip?.()
  }

  const correctAnswer = question.options.find(opt => opt.id === question.correctAnswerId)

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[500px] perspective-1000">
      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onBookmark()
        }}
        className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-primary-600" />
        ) : (
          <Bookmark className="w-5 h-5 text-gray-400 hover:text-primary-600" />
        )}
      </button>

      {/* Flip Container */}
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onClick={handleFlip}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card - Question */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="w-full h-full bg-white rounded-2xl shadow-xl border-2 border-primary-200 p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center overflow-y-auto min-h-0">
              {/* Question Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                <span className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium">
                  {question.category.charAt(0).toUpperCase() + question.category.slice(1).replace('_', ' ')}
                </span>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
              </div>

              {/* Question Text */}
              <div className="text-center">
                {question.imageUrl && (
                  <div className="mb-4 sm:mb-6">
                    <img
                      src={question.imageUrl}
                      alt="Question illustration"
                      className="max-h-32 sm:max-h-48 mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {question.question}
                </h2>
              </div>
            </div>

            {/* Tap to flip hint */}
            <div className="text-center flex-shrink-0 pt-2">
              <p className="text-gray-500 text-sm">
                Tap to see answer
              </p>
              <div className="mt-2 flex justify-center gap-1">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back of Card - Answer */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-success-50 rounded-2xl shadow-xl border-2 border-success-300 p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-start overflow-y-auto min-h-0">
              {/* Answer Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-6 flex-shrink-0">
                <span className="px-2 sm:px-3 py-1 bg-success-500 text-white rounded-full text-xs sm:text-sm font-medium">
                  ✓ Correct Answer
                </span>
              </div>

              {/* Answer Text */}
              <div className="text-center mb-3 sm:mb-6 flex-shrink-0">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {correctAnswer?.text}
                </h3>
              </div>

              {/* Explanation */}
              <div className="bg-white/80 rounded-lg p-3 sm:p-6 backdrop-blur-sm">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Explanation:</h4>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {question.explanation}
                </p>

                {/* Source */}
                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Source:</span> {question.source}
                  </p>
                </div>
              </div>
            </div>

            {/* Tap to flip hint */}
            <div className="text-center mt-2 sm:mt-4 flex-shrink-0">
              <p className="text-gray-600 text-xs sm:text-sm">
                Tap to see question again
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Flashcard
