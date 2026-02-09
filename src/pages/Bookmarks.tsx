import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookmarkStore } from '../store/bookmarkStore'
import allQuestionsData from '../data/questions'
import { Bookmark, BookmarkX, Brain, FileText, AlertCircle } from 'lucide-react'

const Bookmarks = () => {
  const navigate = useNavigate()
  const { bookmarkedQuestions, toggleBookmark } = useBookmarkStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const bookmarkedQuestionObjects = allQuestionsData.filter(q =>
    bookmarkedQuestions.includes(q.id)
  )

  const filteredQuestions =
    selectedCategory === 'all'
      ? bookmarkedQuestionObjects
      : bookmarkedQuestionObjects.filter(q => q.category === selectedCategory)

  const categories = Array.from(
    new Set(bookmarkedQuestionObjects.map(q => q.category))
  ).sort()

  const handleRemoveBookmark = (questionId: string) => {
    toggleBookmark(questionId)
  }

  if (bookmarkedQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bookmarked Questions</h1>
          <p className="text-gray-600">Save questions for later review</p>
        </div>

        {/* Empty State */}
        <div className="card text-center py-12">
          <BookmarkX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Bookmarks Yet</h2>
          <p className="text-gray-600 mb-6">
            Start bookmarking questions while studying or practicing to save them for later review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/study')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5" />
              <span>Start Studying</span>
            </button>
            <button
              onClick={() => navigate('/practice')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>Practice Questions</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Bookmark className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bookmarked Questions</h1>
        <p className="text-gray-600">
          You have {bookmarkedQuestions.length} bookmarked question
          {bookmarkedQuestions.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="card max-w-4xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({bookmarkedQuestionObjects.length})
            </button>
            {categories.map(category => {
              const count = bookmarkedQuestionObjects.filter(q => q.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')} ({count})
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Bookmarked Questions List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredQuestions.length === 0 ? (
          <div className="card text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No bookmarked questions in this category</p>
          </div>
        ) : (
          filteredQuestions.map((question, index) => (
            <div key={question.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Question Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-gray-500">
                      #{index + 1}
                    </span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {question.category.charAt(0).toUpperCase() +
                        question.category.slice(1).replace('_', ' ')}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                  {/* Question Text */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {question.question}
                  </h3>

                  {/* Correct Answer Preview */}
                  <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-success-900 mb-1">Answer:</p>
                    <p className="text-sm text-success-800">
                      {question.options.find(opt => opt.id === question.correctAnswerId)?.text}
                    </p>
                  </div>

                  {/* Source */}
                  <p className="text-xs text-gray-500 mt-2">{question.source}</p>
                </div>

                {/* Remove Bookmark Button */}
                <button
                  onClick={() => handleRemoveBookmark(question.id)}
                  className="btn btn-secondary p-2 flex-shrink-0"
                  title="Remove bookmark"
                >
                  <BookmarkX className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Study Bookmarks Button */}
      {filteredQuestions.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/study')}
            className="btn-primary w-full py-4 text-lg font-semibold"
          >
            Study These {filteredQuestions.length} Question{filteredQuestions.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}

export default Bookmarks
