import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './i18n/config'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
