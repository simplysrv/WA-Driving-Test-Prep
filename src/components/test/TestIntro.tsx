import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface TestIntroProps {
  onStart: (timeLimit: number | null) => void
  questionCount: number
}

const TestIntro = ({ onStart, questionCount }: TestIntroProps) => {
  const { t } = useTranslation()
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number | null>(30)
  
  const TIME_OPTIONS = [
    { value: 30, label: t('test.timeLimit.minutes', { count: 30 }), description: t('test.timeLimit.waStandard') },
    { value: 45, label: t('test.timeLimit.minutes', { count: 45 }), description: t('test.timeLimit.extended') },
    { value: 60, label: t('test.timeLimit.minutes', { count: 60 }), description: t('test.timeLimit.relaxed') },
    { value: null, label: t('test.timeLimit.noLimit'), description: t('test.timeLimit.practiceMode') },
  ] as const
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 mb-4">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {t('test.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          {t('test.subtitle')}
        </p>
      </div>

      {/* Test Info Card */}
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('test.info.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('test.info.questions')}</h3>
              <p className="text-gray-700">{t('test.info.questionsDesc', { count: questionCount })}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('test.info.passingScore')}</h3>
              <p className="text-gray-700">{t('test.info.passingScoreDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('test.info.time')}</h3>
              <p className="text-gray-700">
                {selectedTimeLimit ? t('test.timeLimit.minutes', { count: selectedTimeLimit }) : t('test.timeLimit.noLimit')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('test.info.format')}</h3>
              <p className="text-gray-700">{t('test.info.formatDesc')}</p>
            </div>
          </div>
        </div>

        {/* Time Limit Selection */}
        <div className="bg-white rounded-lg p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{t('test.timeLimit.title')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedTimeLimit(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedTimeLimit === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{t('test.instructions.title')}</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>{t('test.instructions.item1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>{t('test.instructions.item2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>{t('test.instructions.item3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>{t('test.instructions.item4')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>{t('test.instructions.item5')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={() => onStart(selectedTimeLimit)}
        className="btn-primary btn-lg w-full"
      >
        {t('test.startButton')}
      </button>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
        <h3 className="font-semibold text-blue-900 mb-2">{t('test.tips.title')}</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>{t('test.tips.tip1')}</li>
          <li>{t('test.tips.tip2')}</li>
          <li>{t('test.tips.tip3')}</li>
          <li>{t('test.tips.tip4')}</li>
          <li>{t('test.tips.tip5')}</li>
        </ul>
      </div>
    </div>
  )
}

export default TestIntro
