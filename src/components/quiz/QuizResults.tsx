import { useNavigate } from 'react-router-dom'
import { Trophy, Target, Clock, RotateCcw, Home, TrendingUp } from 'lucide-react'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'

interface QuizResultsProps {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  totalTime?: number
  onRetry: () => void
  onReviewIncorrect?: () => void
}

const QuizResults = ({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  totalTime,
  onRetry,
  onReviewIncorrect,
}: QuizResultsProps) => {
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const percentage = (correctAnswers / totalQuestions) * 100
  const passed = percentage >= 80

  useEffect(() => {
    if (passed) {
      setShowConfetti(true)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [passed])

  const getGrade = () => {
    if (percentage >= 90) return { letter: 'A', color: 'text-green-600', message: 'Excellent!' }
    if (percentage >= 80) return { letter: 'B', color: 'text-blue-600', message: 'Good Job!' }
    if (percentage >= 70) return { letter: 'C', color: 'text-yellow-600', message: 'Not Bad' }
    if (percentage >= 60) return { letter: 'D', color: 'text-orange-600', message: 'Keep Trying' }
    return { letter: 'F', color: 'text-red-600', message: 'Needs Improvement' }
  }

  const grade = getGrade()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Result Header */}
      <div className="text-center space-y-4">
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            passed
              ? 'bg-gradient-to-br from-success-400 to-success-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-600'
          }`}
        >
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Quiz Complete!</h1>
        <p className={`text-xl font-semibold ${passed ? 'text-success-600' : 'text-gray-600'}`}>
          {passed ? '🎉 Congratulations!' : 'Keep studying and try again!'}
        </p>
      </div>

      {/* Score Card */}
      <div className="card bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
        <div className="text-center space-y-6">
          {/* Grade */}
          <div>
            <p className="text-gray-700 text-lg mb-2">Your Grade</p>
            <div className={`text-6xl sm:text-8xl font-bold ${grade.color}`}>{grade.letter}</div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-700 mt-2">{grade.message}</p>
          </div>

          {/* Score */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <p className="text-4xl sm:text-6xl font-bold text-gray-900 mb-2">
              {Math.round(percentage)}%
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              {correctAnswers} out of {totalQuestions} correct
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="card bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-success-600">{correctAnswers}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Incorrect</p>
              <p className="text-2xl font-bold text-error-600">{incorrectAnswers}</p>
            </div>
          </div>
        </div>

        {totalTime !== undefined && (
          <div className="card bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time Taken</p>
                <p className="text-2xl font-bold text-primary-600">
                  {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={onRetry}
          className="btn btn-primary btn-lg flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Try Again</span>
        </button>

        {incorrectAnswers > 0 && onReviewIncorrect && (
          <button
            onClick={onReviewIncorrect}
            className="btn btn-warning btn-lg flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Review Incorrect</span>
          </button>
        )}

        <button
          onClick={() => navigate('/progress')}
          className="btn btn-secondary btn-lg flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          <span>View Progress</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary btn-lg flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Back Home</span>
        </button>
      </div>

      {/* Passing Message */}
      {passed && (
        <div className="bg-success-50 border-2 border-success-300 rounded-lg p-4 sm:p-6 text-center">
          <p className="text-success-900 text-base sm:text-lg font-semibold">
            🎊 You passed! You're ready for the real Washington State knowledge test!
          </p>
          <p className="text-success-700 mt-2">
            Remember: You need 32 out of 40 (80%) to pass the actual exam.
          </p>
        </div>
      )}
    </div>
  )
}

export default QuizResults
