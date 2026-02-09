import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  ]

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    localStorage.setItem('preferredLanguage', languageCode)
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        title="Change Language"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">
          {languages.find(lang => lang.code === i18n.language)?.nativeName || 'English'}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                i18n.language === language.code
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{language.nativeName}</span>
                {i18n.language === language.code && (
                  <span className="text-primary-600">✓</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{language.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
