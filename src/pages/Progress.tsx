import { TrendingUp, Target, Trophy, BookOpen, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useBookmarkStore } from '../store/bookmarkStore'
import allQuestionsData from '../data/questions'

const Progress = () => {
  const navigate = useNavigate()
  const { bookmarkedQuestions } = useBookmarkStore()

  const totalQuestions = allQuestionsData.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-600">Track your learning journey and stay motivated</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-900">{totalQuestions}</p>
              <p className="text-sm text-blue-700">Total Questions</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-900">{bookmarkedQuestions.length}</p>
              <p className="text-sm text-purple-700">Bookmarked</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-900">80%</p>
              <p className="text-sm text-green-700">Pass Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Progress */}
      <div className="card max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Progress by Chapter</h2>
        <div className="space-y-4">
          {[
            { chapter: 1, title: 'Licenses', questions: 10, color: 'blue' },
            { chapter: 2, title: 'Vehicles', questions: 15, color: 'green' },
            { chapter: 3, title: 'Drivers', questions: 15, color: 'purple' },
            { chapter: 4, title: 'Roads', questions: 20, color: 'orange' },
            { chapter: 5, title: 'Hazards', questions: 25, color: 'red' },
          ].map(({ chapter, title, questions, color }) => (
            <div key={chapter} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                  Chapter {chapter}: {title}
                </h3>
                <span className="text-sm text-gray-600">{questions} questions</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full`}
                  style={{ width: `0%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card max-w-5xl mx-auto bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ready to Continue?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/study')}
            className="btn btn-primary py-4 flex flex-col items-center gap-2"
          >
            <Brain className="w-6 h-6" />
            <span>Study Mode</span>
          </button>
          <button
            onClick={() => navigate('/practice')}
            className="btn btn-success py-4 flex flex-col items-center gap-2"
          >
            <Target className="w-6 h-6" />
            <span>Practice</span>
          </button>
          <button
            onClick={() => navigate('/test')}
            className="btn btn-purple py-4 flex flex-col items-center gap-2"
          >
            <Trophy className="w-6 h-6" />
            <span>Take Test</span>
          </button>
        </div>
      </div>

      {/* Achievements Placeholder */}
      <div className="card max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', title: 'First Steps', desc: 'Complete your first quiz' },
            { icon: '📚', title: 'Bookworm', desc: 'Bookmark 10 questions' },
            { icon: '🏆', title: 'Perfect Score', desc: 'Get 100% on a practice quiz' },
            { icon: '🎓', title: 'Test Ready', desc: 'Pass the 40-question test' },
          ].map((achievement, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg opacity-50">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
              <p className="text-xs text-gray-600 mt-1">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Progress
