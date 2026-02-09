import { useNavigate } from 'react-router-dom'
import { TrendingUp, Brain, FileText, AlertCircle } from 'lucide-react'

const ReviewMode = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Review Mode</h1>
        <p className="text-gray-600">Practice the questions you got wrong to improve your knowledge</p>
      </div>

      {/* Info Card */}
      <div className="card bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-12 h-12 text-orange-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">How Review Mode Works</h2>
            <p className="text-gray-700 mb-4">
              After completing quizzes in Practice Mode, any questions you answer incorrectly are automatically tracked.
              You can then review these specific questions to focus your studying on areas that need improvement.
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">To use Review Mode:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                <li>Complete some quizzes in Practice Mode</li>
                <li>Any incorrect answers will be tracked automatically</li>
                <li>Return here to review only your incorrect questions</li>
                <li>Master the material and improve your accuracy!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/practice')}
          className="btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          <span>Start Practice Mode</span>
        </button>
        <button
          onClick={() => navigate('/study')}
          className="btn-secondary py-4 text-lg font-semibold flex items-center justify-center gap-2"
        >
          <Brain className="w-5 h-5" />
          <span>Study Flashcards</span>
        </button>
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">💡 Study Tips</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Focus on understanding the "why" behind each answer</li>
          <li>• Review the explanations carefully for incorrect answers</li>
          <li>• Use bookmarks to save particularly challenging questions</li>
          <li>• Practice consistently to build long-term retention</li>
          <li>• Take breaks between study sessions to avoid fatigue</li>
        </ul>
      </div>
    </div>
  )
}

export default ReviewMode
