import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface TestIntroProps {
  onStart: () => void
  questionCount: number
}

const TestIntro = ({ onStart, questionCount }: TestIntroProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 mb-4">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Washington State Knowledge Test Simulation
        </h1>
        <p className="text-xl text-gray-600">
          Experience the real test format before taking the actual exam
        </p>
      </div>

      {/* Test Info Card */}
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Questions</h3>
              <p className="text-gray-700">{questionCount} multiple-choice questions</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Passing Score</h3>
              <p className="text-gray-700">32 out of 40 (80%)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Time</h3>
              <p className="text-gray-700">No time limit (real test: varies)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Format</h3>
              <p className="text-gray-700">Review at end, like real test</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Test Instructions</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                Answer all 40 questions by selecting the best answer for each
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                You can change your answers before submitting
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                Review all questions before final submission
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                Results and explanations shown after submission
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                You need 32 correct answers (80%) to pass
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="btn-primary btn-lg w-full"
      >
        🚀 Start Test Simulation
      </button>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Test Tips</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Read each question carefully before selecting your answer</li>
          <li>• Don't rush - take your time to think through each question</li>
          <li>• If unsure, eliminate obviously wrong answers first</li>
          <li>• Trust your first instinct unless you find a clear mistake</li>
          <li>• Review all questions before submitting if time permits</li>
        </ul>
      </div>
    </div>
  )
}

export default TestIntro
