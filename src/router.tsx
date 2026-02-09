import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import StudyMode from './pages/StudyMode'
import PracticeMode from './pages/PracticeMode'
import TestMode from './pages/TestMode'
import ReviewMode from './pages/ReviewMode'
import Progress from './pages/Progress'
import Bookmarks from './pages/Bookmarks'
import ChapterList from './pages/ChapterList'

// Use basename for GitHub Pages deployment
const basename = import.meta.env.BASE_URL

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'chapters',
        element: <ChapterList />,
      },
      {
        path: 'study',
        element: <StudyMode />,
      },
      {
        path: 'practice',
        element: <PracticeMode />,
      },
      {
        path: 'test',
        element: <TestMode />,
      },
      {
        path: 'review',
        element: <ReviewMode />,
      },
      {
        path: 'progress',
        element: <Progress />,
      },
      {
        path: 'bookmarks',
        element: <Bookmarks />,
      },
    ],
  },
], {
  basename: basename,
})
