import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Question } from '../../types/question'
import { generateTestReportPDF } from '../../utils/generateTestReport'
import { 
  BarChart3, 
  Clock, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Download
} from 'lucide-react'

interface QuestionTiming {
  questionId: string
  timeSpent: number // seconds
}

interface TestAnalysisProps {
  questions: Question[]
  answers: { [questionId: string]: string }
  questionTimings: QuestionTiming[]
  totalTime: number
}

interface ChapterAnalysis {
  chapter: number
  chapterName: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  totalTime: number
  avgTimePerQuestion: number
  incorrectQuestions: Question[]
}

const TestAnalysis = ({ questions, answers, questionTimings, totalTime }: TestAnalysisProps) => {
  const { t } = useTranslation()
  
  const CHAPTER_NAMES: { [key: number]: string } = {
    1: t('test.analysis.chapterNames.1'),
    2: t('test.analysis.chapterNames.2'),
    3: t('test.analysis.chapterNames.3'),
    4: t('test.analysis.chapterNames.4'),
    5: t('test.analysis.chapterNames.5'),
  }
  
  const analysis = useMemo(() => {
    // Group questions by chapter
    const chapterMap = new Map<number, Question[]>()
    questions.forEach(q => {
      const existing = chapterMap.get(q.chapter) || []
      existing.push(q)
      chapterMap.set(q.chapter, existing)
    })

    // Create timing lookup
    const timingMap = new Map<string, number>()
    questionTimings.forEach(t => timingMap.set(t.questionId, t.timeSpent))

    // Analyze each chapter
    const chapterAnalyses: ChapterAnalysis[] = []
    chapterMap.forEach((chapterQuestions, chapter) => {
      let correct = 0
      let totalChapterTime = 0
      const incorrectQuestions: Question[] = []

      chapterQuestions.forEach(q => {
        const userAnswer = answers[q.id]
        const isCorrect = userAnswer === q.correctAnswerId
        if (isCorrect) correct++
        else incorrectQuestions.push(q)
        totalChapterTime += timingMap.get(q.id) || 0
      })

      chapterAnalyses.push({
        chapter,
        chapterName: CHAPTER_NAMES[chapter] || `Chapter ${chapter}`,
        totalQuestions: chapterQuestions.length,
        correctAnswers: correct,
        incorrectAnswers: chapterQuestions.length - correct,
        accuracy: chapterQuestions.length > 0 ? (correct / chapterQuestions.length) * 100 : 0,
        totalTime: totalChapterTime,
        avgTimePerQuestion: chapterQuestions.length > 0 ? totalChapterTime / chapterQuestions.length : 0,
        incorrectQuestions,
      })
    })

    // Sort by accuracy (worst first for focus areas)
    const sortedByAccuracy = [...chapterAnalyses].sort((a, b) => a.accuracy - b.accuracy)
    
    // Calculate overall stats
    const totalCorrect = chapterAnalyses.reduce((sum, c) => sum + c.correctAnswers, 0)
    const overallAccuracy = (totalCorrect / questions.length) * 100
    const avgTimePerQuestion = totalTime / questions.length

    // Identify patterns
    const fastQuestions = questionTimings.filter(t => t.timeSpent < 10).length
    const slowQuestions = questionTimings.filter(t => t.timeSpent > 60).length
    const unansweredCount = questions.filter(q => !answers[q.id]).length

    return {
      chapterAnalyses,
      sortedByAccuracy,
      totalCorrect,
      overallAccuracy,
      avgTimePerQuestion,
      fastQuestions,
      slowQuestions,
      unansweredCount,
    }
  }, [questions, answers, questionTimings, totalTime])

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 bg-green-100'
    if (accuracy >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getAccuracyBarColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-500'
    if (accuracy >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    if (mins === 0) return `${secs}s`
    return `${mins}m ${secs}s`
  }

  // Generate personalized feedback
  const generateFeedback = () => {
    const feedback: string[] = []
    const { sortedByAccuracy, overallAccuracy, avgTimePerQuestion, fastQuestions, slowQuestions, unansweredCount } = analysis

    // Overall performance
    if (overallAccuracy >= 90) {
      feedback.push(t('test.analysis.feedback.outstanding'))
    } else if (overallAccuracy >= 80) {
      feedback.push(t('test.analysis.feedback.passed'))
    } else if (overallAccuracy >= 70) {
      feedback.push(t('test.analysis.feedback.close'))
    } else {
      feedback.push(t('test.analysis.feedback.encouragement'))
    }

    // Weak chapters
    const weakChapters = sortedByAccuracy.filter(c => c.accuracy < 70 && c.totalQuestions >= 2)
    if (weakChapters.length > 0) {
      const chapterNames = weakChapters.slice(0, 2).map(c => c.chapterName).join(' & ')
      feedback.push(t('test.analysis.feedback.priorityAreas', { chapters: chapterNames }))
    }

    // Timing feedback
    if (avgTimePerQuestion < 15) {
      feedback.push(t('test.analysis.feedback.tooFast'))
    } else if (avgTimePerQuestion > 90) {
      feedback.push(t('test.analysis.feedback.tooSlow'))
    }

    if (fastQuestions > questions.length * 0.3) {
      feedback.push(t('test.analysis.feedback.rushing'))
    }

    if (slowQuestions > questions.length * 0.2) {
      feedback.push(t('test.analysis.feedback.slowQuestions'))
    }

    // Unanswered questions
    if (unansweredCount > 0) {
      feedback.push(t('test.analysis.feedback.unanswered', { count: unansweredCount }))
    }

    return feedback
  }

  const feedbackItems = generateFeedback()

  const handleDownloadPDF = useCallback(() => {
    // Remove emoji from feedback for PDF
    const cleanFeedback = feedbackItems.map(item => 
      item.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F18E}]|[\u{3030}]|[\u{FE0F}]/gu, '').trim()
    )

    generateTestReportPDF({
      questions,
      answers,
      questionTimings,
      totalTime,
      chapterAnalyses: analysis.chapterAnalyses,
      overallAccuracy: analysis.overallAccuracy,
      totalCorrect: analysis.totalCorrect,
      feedback: cleanFeedback,
    })
  }, [questions, answers, questionTimings, totalTime, analysis, feedbackItems])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('test.analysis.title')}</h2>
              <p className="text-gray-600">{t('test.analysis.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t('test.analysis.downloadPDF')}</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary-600" />
            <span className="text-sm text-gray-600">{t('test.analysis.accuracy')}</span>
          </div>
          <p className={`text-2xl font-bold ${analysis.overallAccuracy >= 80 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.round(analysis.overallAccuracy)}%
          </p>
        </div>
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">{t('test.analysis.totalTime')}</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{formatTime(totalTime)}</p>
        </div>
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">{t('test.analysis.avgPerQuestion')}</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{formatTime(analysis.avgTimePerQuestion)}</p>
        </div>
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">{t('test.analysis.correct')}</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {analysis.totalCorrect}/{questions.length}
          </p>
        </div>
      </div>

      {/* Teacher Feedback */}
      <div className="card bg-amber-50 border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-amber-900">{t('test.analysis.teacherFeedback')}</h3>
        </div>
        <ul className="space-y-3">
          {feedbackItems.map((item, index) => (
            <li key={index} className="text-amber-900 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Chapter Breakdown */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">{t('test.analysis.chapterBreakdown')}</h3>
        </div>
        <div className="space-y-4">
          {analysis.chapterAnalyses
            .sort((a, b) => a.chapter - b.chapter)
            .map(chapter => (
              <div key={chapter.chapter} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      Ch. {chapter.chapter}: {chapter.chapterName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {chapter.correctAnswers}/{chapter.totalQuestions} {t('test.analysis.correct').toLowerCase()} • {formatTime(chapter.totalTime)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getAccuracyColor(chapter.accuracy)}`}>
                    {Math.round(chapter.accuracy)}%
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all ${getAccuracyBarColor(chapter.accuracy)}`}
                    style={{ width: `${chapter.accuracy}%` }}
                  />
                </div>

                {/* Timing details */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{t('test.analysis.avgTime', { time: formatTime(chapter.avgTimePerQuestion) })}</span>
                  {chapter.accuracy < 70 && chapter.totalQuestions >= 2 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="w-3 h-3" />
                      {t('test.analysis.needsAttention')}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Focus Areas */}
      {analysis.sortedByAccuracy.filter(c => c.accuracy < 80 && c.incorrectQuestions.length > 0).length > 0 && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">{t('test.analysis.focusAreas')}</h3>
          </div>
          <div className="space-y-4">
            {analysis.sortedByAccuracy
              .filter(c => c.accuracy < 80 && c.incorrectQuestions.length > 0)
              .slice(0, 3)
              .map(chapter => (
                <div key={chapter.chapter}>
                  <h4 className="font-semibold text-red-800 mb-2">
                    {chapter.chapterName} {t('test.analysis.missed', { count: chapter.incorrectQuestions.length })}
                  </h4>
                  <ul className="space-y-2">
                    {chapter.incorrectQuestions.slice(0, 3).map(q => (
                      <li key={q.id} className="text-sm text-red-700 bg-white rounded p-2 border border-red-200">
                        <span className="font-medium">{t('test.analysis.topic')}:</span> {q.section}
                      </li>
                    ))}
                    {chapter.incorrectQuestions.length > 3 && (
                      <li className="text-sm text-red-600 italic">
                        {t('test.analysis.moreQuestions', { count: chapter.incorrectQuestions.length - 3 })}
                      </li>
                    )}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Study Recommendations */}
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-green-900">{t('test.analysis.nextSteps')}</h3>
        </div>
        <ol className="space-y-2 text-green-800">
          {analysis.sortedByAccuracy.filter(c => c.accuracy < 70).length > 0 && (
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>
                {t('test.analysis.reviewChapter', { 
                  chapter: analysis.sortedByAccuracy[0].chapter,
                  chapterName: analysis.sortedByAccuracy[0].chapterName,
                  accuracy: Math.round(analysis.sortedByAccuracy[0].accuracy)
                })}
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="font-bold">{analysis.sortedByAccuracy.filter(c => c.accuracy < 70).length > 0 ? '2.' : '1.'}</span>
            <span>{t('test.analysis.useFlashcards')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{analysis.sortedByAccuracy.filter(c => c.accuracy < 70).length > 0 ? '3.' : '2.'}</span>
            <span>{t('test.analysis.practiceChapter')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{analysis.sortedByAccuracy.filter(c => c.accuracy < 70).length > 0 ? '4.' : '3.'}</span>
            <span>
              {analysis.overallAccuracy >= 80 
                ? t('test.analysis.readyForTest')
                : t('test.analysis.takeAnotherTest')}
            </span>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default TestAnalysis
