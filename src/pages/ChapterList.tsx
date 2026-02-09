import { useNavigate } from 'react-router-dom'
import { BookOpen, Brain, FileText } from 'lucide-react'
import { questionsByChapter } from '../data/questions'

const ChapterList = () => {
  const navigate = useNavigate()

  const chapters = [
    {
      number: 1,
      title: 'Licenses',
      description: 'Licensing process, types, requirements, DUI laws, and violations',
      topics: ['REAL ID', 'License types', 'Knowledge test', 'DUI laws', 'License suspension'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: 2,
      title: 'Vehicles',
      description: 'Registration, maintenance, safety features, and occupant protection',
      topics: ['Insurance', 'Headlights', 'Seat belts', 'Child safety seats', 'ADAS'],
      color: 'from-green-500 to-green-600',
    },
    {
      number: 3,
      title: 'Drivers',
      description: 'Impairment, distraction, decision-making, and safe driving behaviors',
      topics: ['Alcohol/drug effects', 'Fatigue', 'Distracted driving', 'Road rage', 'OODA loop'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: 4,
      title: 'Roads',
      description: 'Sharing roads, traffic rules, right-of-way, and emergency procedures',
      topics: ['Pedestrians', 'Right-of-way', 'Traffic signals', 'Parking', 'Emergency vehicles'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: 5,
      title: 'Hazards',
      description: 'Weather hazards, road conditions, wildlife, mechanical failures, and emergency procedures',
      topics: ['Weather conditions', 'Hydroplaning', 'Black ice', 'Wildlife', 'Brake failure', 'Tire blowout', 'Emergency stops', 'Visibility issues'],
      color: 'from-red-500 to-red-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Study by Chapter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn the Washington State Driver Guide organized by chapter
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {chapters.map(chapter => {
          const questionCount = questionsByChapter[chapter.number as keyof typeof questionsByChapter]?.length || 0

          return (
            <div
              key={chapter.number}
              className="card hover:shadow-xl transition-shadow group"
            >
              {/* Chapter Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${chapter.color} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-3xl font-bold text-white">{chapter.number}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Chapter {chapter.number}: {chapter.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{questionCount} questions available</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{chapter.description}</p>

              {/* Topics */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {chapter.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/study')}
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Study</span>
                </button>
                <button
                  onClick={() => navigate('/practice')}
                  className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="card max-w-4xl mx-auto bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">📖 About the WA Driver Guide</h3>
        <p className="text-blue-800 text-sm">
          The Washington State Driver Guide is your official resource for learning the rules of the road.
          All questions on the knowledge test are based on these five chapters. Study each chapter thoroughly
          to ensure you're prepared for your driver's license exam.
        </p>
      </div>
    </div>
  )
}

export default ChapterList
