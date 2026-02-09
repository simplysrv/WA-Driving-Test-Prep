import { ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600 text-center md:text-left">
            <p className="font-medium">WA Driving Test Prep © {currentYear}</p>
            <p className="text-xs mt-1">
              Unofficial practice tool. Always refer to official{' '}
              <a
                href="https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline inline-flex items-center"
              >
                Washington State DOL materials
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <a
              href="https://dol.wa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              WA DOL
            </a>
            <a
              href="https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              Driver Guide
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
