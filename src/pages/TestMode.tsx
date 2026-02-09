import { useState } from 'react'
import { Question } from '../types/question'
import { useBookmarkStore } from '../store/bookmarkStore'
import TestIntro from '../components/test/TestIntro'
import TestReview from '../components/test/TestReview'
import QuizCard from '../components/quiz/QuizCard'
import QuizOptions from '../components/quiz/QuizOptions'
import QuizResults from '../components/quiz/QuizResults'
import allQuestionsData from '../data/questions'
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react'

type TestPhase = 'intro' | 'testing' | 'review' | 'results'

const TestMode = () => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore()
  const TEST_QUESTION_COUNT = 40

  const [phase, setPhase] = useState<TestPhase>('intro')
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({})
  const [startTime] = useState<number>(Date.now())

  const currentQuestion = testQuestions[currentQuestionIndex]
  const selectedOptionId = currentQuestion ? answers[currentQuestion.id] : null

  const handleStartTest = () => {
    // Select 40 random questions from all available questions
    const shuffled = [...allQuestionsData].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, TEST_QUESTION_COUNT)

    setTestQuestions(selected)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setPhase('testing')
  }

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleGoToReview = () => {
    setPhase('review')
  }

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
    setPhase('testing')
  }

  const handleSubmitTest = () => {
    setPhase('results')
  }

  const handleRetry = () => {
    setPhase('intro')
    setTestQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  // Intro Phase
  if (phase === 'intro') {
    return <TestIntro onStart={handleStartTest} questionCount={TEST_QUESTION_COUNT} />
  }

  // Testing Phase
  if (phase === 'testing' && currentQuestion) {
    const answeredCount = Object.keys(answers).length
    const progress = (answeredCount / testQuestions.length) * 100

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Question {currentQuestionIndex + 1} of {testQuestions.length}
              </h2>
              <p className="text-sm text-gray-600">
                {answeredCount} answered • {testQuestions.length - answeredCount} remaining
              </p>
            </div>
            <button
              onClick={handleGoToReview}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Review</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={testQuestions.length}
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
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary flex items-center gap-2 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {selectedOptionId ? (
                <span className="text-success-600 font-medium">✓ Answered</span>
              ) : (
                <span className="text-gray-500">Not answered yet</span>
              )}
            </p>
          </div>

          {currentQuestionIndex === testQuestions.length - 1 ? (
            <button
              onClick={handleGoToReview}
              className="btn btn-purple flex items-center gap-2"
            >
              <span>Review All</span>
              <Eye className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-primary flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Review Phase
  if (phase === 'review') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setPhase('testing')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Test
        </button>

        <TestReview
          questions={testQuestions}
          answers={answers}
          onGoToQuestion={handleGoToQuestion}
          onSubmit={handleSubmitTest}
        />
      </div>
    )
  }

  // Results Phase
  if (phase === 'results') {
    // Calculate results
    let correctCount = 0
    testQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswerId) {
        correctCount++
      }
    })

    const incorrectCount = testQuestions.length - correctCount
    const totalTime = Math.floor((Date.now() - startTime) / 1000)

    return (
      <div className="space-y-6">
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
          <p className="text-gray-700">
            You scored {correctCount} out of {testQuestions.length} ({Math.round((correctCount / testQuestions.length) * 100)}%)
          </p>
        </div>

        <QuizResults
          totalQuestions={testQuestions.length}
          correctAnswers={correctCount}
          incorrectAnswers={incorrectCount}
          totalTime={totalTime}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  return null
}

export default TestMode
