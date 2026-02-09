import { Link } from 'react-router-dom'
import { Brain, FileText, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'
import { useTranslation, Trans } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  const features = [
    {
      icon: Brain,
      titleKey: 'home.features.studyMode.title',
      descKey: 'home.features.studyMode.description',
      href: '/study',
      color: 'bg-blue-500',
    },
    {
      icon: FileText,
      titleKey: 'home.features.practiceMode.title',
      descKey: 'home.features.practiceMode.description',
      href: '/practice',
      color: 'bg-green-500',
    },
    {
      icon: FileText,
      titleKey: 'home.features.testSimulation.title',
      descKey: 'home.features.testSimulation.description',
      href: '/test',
      color: 'bg-purple-500',
    },
    {
      icon: TrendingUp,
      titleKey: 'home.features.trackProgress.title',
      descKey: 'home.features.trackProgress.description',
      href: '/progress',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl shadow-primary-500/30 mb-4 animate-bounce">
          <BookOpen className="w-12 h-12 text-white" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
            {t('home.hero.title')}
            <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {t('home.hero.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/study"
            className="btn btn-primary btn-lg inline-flex items-center justify-center space-x-2 group"
          >
            <span>{t('home.hero.startStudying')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/test"
            className="btn btn-purple btn-lg inline-flex items-center justify-center space-x-2"
          >
            <span>{t('home.hero.takePracticeTest')}</span>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">60+</div>
            <div className="text-sm text-gray-600 mt-1">{t('home.hero.questionsCount')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600 mt-1">{t('home.hero.chaptersCount')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600">80%</div>
            <div className="text-sm text-gray-600 mt-1">{t('home.hero.passScore')}</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon
          const gradientColors = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600',
            'from-purple-500 to-purple-600',
            'from-orange-500 to-orange-600',
          ]
          return (
            <Link
              key={feature.titleKey}
              to={feature.href}
              className="relative group"
            >
              <div className="card hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 border-2 border-gray-100 group-hover:border-primary-200 overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-purple-50/0 group-hover:from-primary-50 group-hover:to-purple-50 transition-all duration-300"></div>

                <div className="relative flex items-start space-x-4">
                  <div className={`bg-gradient-to-br ${gradientColors[index]} p-4 rounded-xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                    <div className="flex items-center text-primary-600 font-semibold mt-4 group-hover:gap-2 transition-all">
                      <span>{t('home.features.getStarted')}</span>
                      <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Info Section */}
      <section className="relative overflow-hidden">
        <div className="card bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100 max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {t('home.about.title')}
                <span className="text-2xl">📋</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <Trans i18nKey="home.about.description" />
                </p>
                <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-blue-200">
                  <p className="text-lg font-semibold text-success-700">
                    <Trans i18nKey="home.about.passRequirement" />
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3 text-lg">
                    {t('home.about.materialsTitle')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { num: 1, titleKey: 'home.about.chapter1', descKey: 'home.about.chapter1Desc', color: 'blue' },
                      { num: 2, titleKey: 'home.about.chapter2', descKey: 'home.about.chapter2Desc', color: 'green' },
                      { num: 3, titleKey: 'home.about.chapter3', descKey: 'home.about.chapter3Desc', color: 'purple' },
                      { num: 4, titleKey: 'home.about.chapter4', descKey: 'home.about.chapter4Desc', color: 'orange' },
                    ].map((chapter) => (
                      <div key={chapter.num} className="bg-white/80 backdrop-blur rounded-lg p-3 border border-gray-200 hover:border-primary-300 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 bg-${chapter.color}-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                            {chapter.num}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{t(chapter.titleKey)}</div>
                            <div className="text-sm text-gray-600">{t(chapter.descKey)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center pb-8">
        <div className="card max-w-3xl mx-auto bg-gradient-to-r from-primary-500 to-purple-600 border-0 text-white">
          <h2 className="text-3xl font-bold mb-3">{t('home.cta.title')}</h2>
          <p className="text-xl text-primary-50 mb-6">
            {t('home.cta.subtitle')}
          </p>
          <Link
            to="/study"
            className="btn bg-white text-primary-700 hover:bg-gray-100 btn-lg inline-flex items-center justify-center space-x-2 shadow-xl"
          >
            <span>{t('home.cta.button')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
