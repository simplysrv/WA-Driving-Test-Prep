import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Question, QuestionCategory, QuestionDifficulty } from '../types/question'
import FlashcardDeck from '../components/study/FlashcardDeck'
import { Filter, BookOpen, ArrowLeft } from 'lucide-react'

// Import question data
import allQuestionsData from '../data/questions'

const StudyMode = () => {
  const navigate = useNavigate()
  const [allQuestions] = useState<Question[]>(allQuestionsData)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [started, setStarted] = useState(false)

  // Filter states
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1])
  const [selectedCategories, setSelectedCategories] = useState<QuestionCategory[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty[]>([])

  useEffect(() => {
    applyFilters()
  }, [selectedChapters, selectedCategories, selectedDifficulty, allQuestions])

  const applyFilters = () => {
    let filtered = allQuestions

    // Filter by chapters
    if (selectedChapters.length > 0) {
      filtered = filtered.filter(q => selectedChapters.includes(q.chapter))
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(q => selectedCategories.includes(q.category))
    }

    // Filter by difficulty
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(q => selectedDifficulty.includes(q.difficulty))
    }

    setFilteredQuestions(filtered)
  }

  const handleChapterToggle = (chapter: number) => {
    setSelectedChapters(prev =>
      prev.includes(chapter)
        ? prev.filter(c => c !== chapter)
        : [...prev, chapter]
    )
  }

  const handleCategoryToggle = (category: QuestionCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleDifficultyToggle = (difficulty: QuestionDifficulty) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  const handleStart = () => {
    if (filteredQuestions.length === 0) {
      alert('Please select at least one filter option to get started!')
      return
    }
    setStarted(true)
    setShowFilters(false)
  }

  const handleComplete = () => {
    setStarted(false)
    setShowFilters(true)
  }

  if (started && filteredQuestions.length > 0) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setStarted(false)
              setShowFilters(true)
            }}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Filters
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Study Mode</h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Flashcard Deck */}
        <FlashcardDeck questions={filteredQuestions} onComplete={handleComplete} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Study with Flashcards</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Master the material with interactive flashcards. Select your topics and start studying!
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">Filter Flashcards</h2>
          </div>

          <div className="space-y-6">
            {/* Chapters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Chapters</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(chapter => (
                  <button
                    key={chapter}
                    onClick={() => handleChapterToggle(chapter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedChapters.includes(chapter)
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Chapter {chapter}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories (Optional)</h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(QuestionCategory).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      selectedCategories.includes(category)
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Difficulty (Optional)</h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(QuestionDifficulty).map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultyToggle(difficulty)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDifficulty.includes(difficulty)
                        ? difficulty === 'easy' ? 'bg-green-600 text-white shadow-md' :
                          difficulty === 'medium' ? 'bg-yellow-600 text-white shadow-md' :
                          'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-center text-blue-900 font-medium">
                {filteredQuestions.length} flashcard{filteredQuestions.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={filteredQuestions.length === 0}
              className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Studying
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyMode
