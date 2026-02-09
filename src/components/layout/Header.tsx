import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, BookOpen, Brain, FileText, TrendingUp, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../shared/LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { nameKey: 'nav.home', href: '/', icon: Home },
    { nameKey: 'nav.chapters', href: '/chapters', icon: BookOpen },
    { nameKey: 'nav.study', href: '/study', icon: Brain },
    { nameKey: 'nav.practice', href: '/practice', icon: FileText },
    { nameKey: 'nav.test', href: '/test', icon: FileText },
    { nameKey: 'nav.progress', href: '/progress', icon: TrendingUp },
    { nameKey: 'nav.bookmarks', href: '/bookmarks', icon: Bookmark },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xl font-bold hidden sm:inline">{t('nav.appTitle')}</span>
            <span className="text-xl font-bold sm:hidden">{t('nav.appTitleShort')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.nameKey}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.nameKey)}</span>
                </Link>
              )
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.nameKey}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t(item.nameKey)}</span>
                  </Link>
                )
              })}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
