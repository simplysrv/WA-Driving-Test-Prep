import { useState, useEffect, useCallback } from 'react'
import { Question } from '../../types/question'
import { useBookmarkStore } from '../../store/bookmarkStore'
import Flashcard from './Flashcard'
import FlashcardProgress from './FlashcardProgress'
import FlashcardControls from './FlashcardControls'

interface FlashcardDeckProps {
  questions: Question[]
  onComplete?: () => void
}

const FlashcardDeck = ({ questions, onComplete }: FlashcardDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set())
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions)

  const { isBookmarked, toggleBookmark } = useBookmarkStore()

  const currentQuestion = shuffledQuestions[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentIndex < shuffledQuestions.length - 1) {
        handleNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        // Space bar could flip the card (handled by Flashcard component)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, shuffledQuestions.length])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleShuffle = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
    setCurrentIndex(0)
    setStudiedCards(new Set())
  }

  const handleMarkStudied = () => {
    const newStudied = new Set(studiedCards)
    if (studiedCards.has(currentIndex)) {
      newStudied.delete(currentIndex)
    } else {
      newStudied.add(currentIndex)
    }
    setStudiedCards(newStudied)
  }

  const handleComplete = () => {
    onComplete?.()
  }

  const handleBookmark = () => {
    if (currentQuestion) {
      toggleBookmark(currentQuestion.id)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No flashcards available</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Section */}
      <FlashcardProgress
        currentIndex={currentIndex}
        total={shuffledQuestions.length}
        studiedCount={studiedCards.size}
      />

      {/* Flashcard */}
      <Flashcard
        question={currentQuestion}
        isBookmarked={isBookmarked(currentQuestion.id)}
        onBookmark={handleBookmark}
      />

      {/* Controls */}
      <FlashcardControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShuffle={handleShuffle}
        onMarkStudied={handleMarkStudied}
        onComplete={handleComplete}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < shuffledQuestions.length - 1}
        isLastCard={currentIndex === shuffledQuestions.length - 1}
        isStudied={studiedCards.has(currentIndex)}
      />
    </div>
  )
}

export default FlashcardDeck
