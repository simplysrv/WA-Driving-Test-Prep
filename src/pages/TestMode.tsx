import { useState, useEffect, useCallback } from 'react'
import { Question } from '../types/question'
import TestIntro from '../components/test/TestIntro'
import TestReview from '../components/test/TestReview'
import TestAnalysis from '../components/test/TestAnalysis'
import QuizCard from '../components/quiz/QuizCard'
import QuizOptions from '../components/quiz/QuizOptions'
import QuizResults from '../components/quiz/QuizResults'
import allQuestionsData from '../data/questions'
import { ArrowLeft, ArrowRight, Eye, Clock, CheckCircle2, XCircle, List, BarChart3 } from 'lucide-react'

type TestPhase = 'intro' | 'testing' | 'review' | 'results' | 'question-review' | 'analysis'

interface QuestionTiming {
  questionId: string
  timeSpent: number
}

const TestMode = () => {
  const TEST_QUESTION_COUNT = 40

  const [phase, setPhase] = useState<TestPhase>('intro')
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({})
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeLimit, setTimeLimit] = useState<number | null>(30) // minutes
  const [remainingTime, setRemainingTime] = useState<number | null>(null) // seconds
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0)
  const [questionTimings, setQuestionTimings] = useState<QuestionTiming[]>([])
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())

  const currentQuestion = testQuestions[currentQuestionIndex]
  const selectedOptionId = currentQuestion ? answers[currentQuestion.id] : null

  // Timer effect
  useEffect(() => {
    if (phase !== 'testing' || timeLimit === null) return

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = timeLimit * 60 - elapsed
      setRemainingTime(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
        setPhase('results')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [phase, timeLimit, startTime])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Track time when question changes
  useEffect(() => {
    if (phase === 'testing' && currentQuestion) {
      setQuestionStartTime(Date.now())
    }
  }, [currentQuestionIndex, phase])

  const recordQuestionTime = useCallback(() => {
    if (!currentQuestion) return
    
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    setQuestionTimings(prev => {
      const existing = prev.find(t => t.questionId === currentQuestion.id)
      if (existing) {
        return prev.map(t => 
          t.questionId === currentQuestion.id 
            ? { ...t, timeSpent: t.timeSpent + timeSpent }
            : t
        )
      }
      return [...prev, { questionId: currentQuestion.id, timeSpent }]
    })
    setQuestionStartTime(Date.now())
  }, [currentQuestion, questionStartTime])

  const handleStartTest = (selectedTimeLimit: number | null) => {
    // Select 40 random questions from all available questions
    const shuffled = [...allQuestionsData].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, TEST_QUESTION_COUNT)

    setTimeLimit(selectedTimeLimit)
    setStartTime(Date.now())
    setRemainingTime(selectedTimeLimit ? selectedTimeLimit * 60 : null)
    setTestQuestions(selected)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setQuestionTimings([])
    setQuestionStartTime(Date.now())
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
      recordQuestionTime()
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      recordQuestionTime()
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleGoToReview = () => {
    recordQuestionTime()
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
    setRemainingTime(null)
    setReviewQuestionIndex(0)
    setQuestionTimings([])
  }

  const handleViewQuestionResults = () => {
    setReviewQuestionIndex(0)
    setPhase('question-review')
  }

  const handleViewAnalysis = () => {
    setPhase('analysis')
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
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-gray-900">
                Q{currentQuestionIndex + 1}/{testQuestions.length}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {answeredCount} answered • {testQuestions.length - answeredCount} left
              </p>
            </div>

            {/* Timer */}
            {remainingTime !== null && (
              <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg font-mono text-sm sm:text-base font-bold ${
                remainingTime <= 60 
                  ? 'bg-red-100 text-red-700 animate-pulse' 
                  : remainingTime <= 300 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-4 h-4" />
                {formatTime(remainingTime)}
              </div>
            )}
            <button
              onClick={handleGoToReview}
              className="btn btn-secondary flex items-center gap-1 sm:gap-2 flex-shrink-0 px-2 sm:px-4"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Review</span>
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
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary flex items-center gap-1 sm:gap-2 disabled:opacity-30 px-3 sm:px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-center flex-shrink-0">
            <p className="text-xs sm:text-sm text-gray-600">
              {selectedOptionId ? (
                <span className="text-success-600 font-medium">✓ Answered</span>
              ) : (
                <span className="text-gray-500">Unanswered</span>
              )}
            </p>
          </div>

          {currentQuestionIndex === testQuestions.length - 1 ? (
            <button
              onClick={handleGoToReview}
              className="btn btn-purple flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
            >
              <span>Review</span>
              <Eye className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-primary flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
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

        {/* View All Questions Button */}
        <button
          onClick={handleViewQuestionResults}
          className="btn btn-purple btn-lg w-full flex items-center justify-center gap-2"
        >
          <List className="w-5 h-5" />
          <span>Review All Questions</span>
        </button>

        {/* View Analysis Button */}
        <button
          onClick={handleViewAnalysis}
          className="btn btn-secondary btn-lg w-full flex items-center justify-center gap-2"
        >
          <BarChart3 className="w-5 h-5" />
          <span>View Detailed Analysis</span>
        </button>
      </div>
    )
  }

  // Analysis Phase
  if (phase === 'analysis') {
    const totalTime = Math.floor((Date.now() - startTime) / 1000)

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => setPhase('results')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>

        <TestAnalysis
          questions={testQuestions}
          answers={answers}
          questionTimings={questionTimings}
          totalTime={totalTime}
        />
      </div>
    )
  }

  // Question Review Phase
  if (phase === 'question-review') {
    const reviewQuestion = testQuestions[reviewQuestionIndex]
    const userAnswer = answers[reviewQuestion.id]
    const isCorrect = userAnswer === reviewQuestion.correctAnswerId

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setPhase('results')}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
          <div className="text-sm text-gray-600">
            Question {reviewQuestionIndex + 1} of {testQuestions.length}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Jump to Question</h3>
          <div className="flex flex-wrap gap-2">
            {testQuestions.map((q, idx) => {
              const answered = answers[q.id]
              const correct = answered === q.correctAnswerId
              return (
                <button
                  key={q.id}
                  onClick={() => setReviewQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                    idx === reviewQuestionIndex
                      ? 'ring-2 ring-purple-500 ring-offset-2'
                      : ''
                  } ${
                    correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </div>

        {/* Result Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isCorrect ? (
            <><CheckCircle2 className="w-5 h-5" /><span className="font-semibold">Correct!</span></>
          ) : (
            <><XCircle className="w-5 h-5" /><span className="font-semibold">Incorrect</span></>
          )}
        </div>

        {/* Question Card */}
        <QuizCard
          question={reviewQuestion}
          questionNumber={reviewQuestionIndex + 1}
          totalQuestions={testQuestions.length}
        />

        {/* Options with Results */}
        <div className="card space-y-3">
          {reviewQuestion.options.map((option) => {
            const isUserAnswer = option.id === userAnswer
            const isCorrectAnswer = option.id === reviewQuestion.correctAnswerId

            let bgColor = 'bg-white border-gray-200'
            let textColor = 'text-gray-700'
            let icon = null

            if (isCorrectAnswer) {
              bgColor = 'bg-green-50 border-green-500'
              textColor = 'text-green-800'
              icon = <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            } else if (isUserAnswer && !isCorrectAnswer) {
              bgColor = 'bg-red-50 border-red-500'
              textColor = 'text-red-800'
              icon = <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            }

            return (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 ${bgColor}`}
              >
                <div className="flex items-start gap-3">
                  {icon}
                  <span className={`${textColor} flex-1`}>{option.text}</span>
                  {isUserAnswer && !isCorrectAnswer && (
                    <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded">Your answer</span>
                  )}
                  {isCorrectAnswer && (
                    <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded">Correct</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Explanation */}
        {reviewQuestion.explanation && (
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
            <p className="text-blue-800">{reviewQuestion.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setReviewQuestionIndex(Math.max(0, reviewQuestionIndex - 1))}
            disabled={reviewQuestionIndex === 0}
            className="btn btn-secondary flex items-center gap-2 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={() => setReviewQuestionIndex(Math.min(testQuestions.length - 1, reviewQuestionIndex + 1))}
            disabled={reviewQuestionIndex === testQuestions.length - 1}
            className="btn btn-primary flex items-center gap-2 disabled:opacity-30"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default TestMode
