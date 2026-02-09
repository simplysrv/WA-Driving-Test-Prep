import { useState, useEffect } from 'react'
import { Question, QuestionCategory, QuestionDifficulty } from '../types/question'
import { useBookmarkStore } from '../store/bookmarkStore'
import { useProgressStore } from '../store/progressStore'
import QuizCard from '../components/quiz/QuizCard'
import QuizOptions from '../components/quiz/QuizOptions'
import QuizFeedback from '../components/quiz/QuizFeedback'
import QuizProgress from '../components/quiz/QuizProgress'
import QuizResults from '../components/quiz/QuizResults'
import { Filter, FileText, ArrowLeft } from 'lucide-react'

// Import question data
import allQuestionsData from '../data/questions'

type QuizPhase = 'setup' | 'question' | 'feedback' | 'results'

const PracticeMode = () => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore()
  const { userProgress, initializeProgress } = useProgressStore()

  // Initialize progress on mount
  useEffect(() => {
    if (!userProgress) {
      initializeProgress('default-user')
    }
  }, [])

  const [allQuestions] = useState<Question[]>(allQuestionsData)
  const [phase, setPhase] = useState<QuizPhase>('setup')
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; selectedOptionId: string; isCorrect: boolean; timeSpent: number }>
  >([])
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())

  // Filter states
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1])
  const [selectedCategories, setSelectedCategories] = useState<QuestionCategory[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty[]>([])
  const [questionCount, setQuestionCount] = useState<number>(10)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

  const correctAnswersCount = answers.filter(a => a.isCorrect).length
  const incorrectAnswersCount = answers.filter(a => !a.isCorrect).length

  const handleChapterToggle = (chapter: number) => {
    setSelectedChapters(prev =>
      prev.includes(chapter) ? prev.filter(c => c !== chapter) : [...prev, chapter]
    )
  }

  const handleCategoryToggle = (category: QuestionCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handleDifficultyToggle = (difficulty: QuestionDifficulty) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    )
  }

  const handleStartQuiz = () => {
    let filtered = allQuestions

    // Apply filters
    if (selectedChapters.length > 0) {
      filtered = filtered.filter(q => selectedChapters.includes(q.chapter))
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(q => selectedCategories.includes(q.category))
    }
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(q => selectedDifficulty.includes(q.difficulty))
    }

    // Shuffle and select questions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length))

    if (selected.length === 0) {
      alert('No questions match your filters. Please adjust your selection.')
      return
    }

    setQuizQuestions(selected)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedOptionId(null)
    setQuestionStartTime(Date.now())
    setPhase('question')
  }

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId

    const answer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
      timeSpent,
    }

    setAnswers(prev => [...prev, answer])
    setPhase('feedback')
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setPhase('results')
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOptionId(null)
      setQuestionStartTime(Date.now())
      setPhase('question')
    }
  }

  const handleRetry = () => {
    setPhase('setup')
    setQuizQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedOptionId(null)
  }

  const handleReviewIncorrect = () => {
    const incorrectQuestionIds = answers.filter(a => !a.isCorrect).map(a => a.questionId)
    const incorrectQuestions = quizQuestions.filter(q => incorrectQuestionIds.includes(q.id))

    setQuizQuestions(incorrectQuestions)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedOptionId(null)
    setQuestionStartTime(Date.now())
    setPhase('question')
  }

  // Setup Phase
  if (phase === 'setup') {
    const availableQuestions = allQuestions.filter(q => {
      const matchesChapter = selectedChapters.length === 0 || selectedChapters.includes(q.chapter)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(q.category)
      const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(q.difficulty)
      return matchesChapter && matchesCategory && matchesDifficulty
    }).length

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Practice Mode</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practice with instant feedback. Choose your settings and start improving your knowledge!
          </p>
        </div>

        {/* Settings */}
        <div className="card max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">Quiz Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Question Count */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Number of Questions</h3>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20, 25].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      questionCount === count
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

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
                        ? difficulty === 'easy'
                          ? 'bg-green-600 text-white shadow-md'
                          : difficulty === 'medium'
                          ? 'bg-yellow-600 text-white shadow-md'
                          : 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Questions Count */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-center text-blue-900 font-medium">
                {availableQuestions} question{availableQuestions !== 1 ? 's' : ''} available •{' '}
                {Math.min(questionCount, availableQuestions)} will be selected
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              disabled={availableQuestions === 0}
              className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Practice Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Question Phase
  if (phase === 'question' && currentQuestion) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setPhase('setup')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>

        {/* Progress */}
        <QuizProgress
          currentQuestion={answers.length}
          totalQuestions={quizQuestions.length}
          correctAnswers={correctAnswersCount}
          incorrectAnswers={incorrectAnswersCount}
        />

        {/* Question */}
        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          isBookmarked={isBookmarked(currentQuestion.id)}
          onBookmark={() => toggleBookmark(currentQuestion.id)}
        />

        {/* Options */}
        <div className="card">
          <QuizOptions
            options={currentQuestion.options}
            selectedOptionId={selectedOptionId}
            showFeedback={false}
            onSelect={handleSelectOption}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            className="btn-primary w-full mt-6 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>
      </div>
    )
  }

  // Feedback Phase
  if (phase === 'feedback' && currentQuestion) {
    const currentAnswer = answers[answers.length - 1]

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Progress */}
        <QuizProgress
          currentQuestion={answers.length}
          totalQuestions={quizQuestions.length}
          correctAnswers={correctAnswersCount}
          incorrectAnswers={incorrectAnswersCount}
        />

        {/* Question with selected answer */}
        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          isBookmarked={isBookmarked(currentQuestion.id)}
          onBookmark={() => toggleBookmark(currentQuestion.id)}
        />

        {/* Options with feedback */}
        <div className="card">
          <QuizOptions
            options={currentQuestion.options}
            selectedOptionId={selectedOptionId}
            correctAnswerId={currentQuestion.correctAnswerId}
            showFeedback={true}
            onSelect={() => {}}
            disabled
          />
        </div>

        {/* Feedback */}
        <QuizFeedback
          question={currentQuestion}
          isCorrect={currentAnswer.isCorrect}
          onNext={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    )
  }

  // Results Phase
  if (phase === 'results') {
    const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0)

    return (
      <QuizResults
        totalQuestions={quizQuestions.length}
        correctAnswers={correctAnswersCount}
        incorrectAnswers={incorrectAnswersCount}
        totalTime={totalTime}
        onRetry={handleRetry}
        onReviewIncorrect={incorrectAnswersCount > 0 ? handleReviewIncorrect : undefined}
      />
    )
  }

  return null
}

export default PracticeMode
