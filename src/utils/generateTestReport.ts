import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Question } from '../types/question'

interface QuestionTiming {
  questionId: string
  timeSpent: number
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
}

interface TestReportData {
  questions: Question[]
  answers: { [questionId: string]: string }
  questionTimings: QuestionTiming[]
  totalTime: number
  chapterAnalyses: ChapterAnalysis[]
  overallAccuracy: number
  totalCorrect: number
  feedback: string[]
}

const CHAPTER_NAMES: { [key: number]: string } = {
  1: 'Licenses & Permits',
  2: 'Vehicles & Equipment',
  3: 'Drivers & Responsibilities',
  4: 'Roads & Traffic Rules',
  5: 'Hazards & Emergencies',
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  if (mins === 0) return `${secs}s`
  return `${mins}m ${secs}s`
}

export const generateTestReportPDF = (data: TestReportData): void => {
  const { 
    questions, 
    answers, 
    questionTimings, 
    totalTime, 
    chapterAnalyses, 
    overallAccuracy, 
    totalCorrect,
    feedback 
  } = data

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Create timing lookup
  const timingMap = new Map<string, number>()
  questionTimings.forEach(t => timingMap.set(t.questionId, t.timeSpent))

  // Title
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(88, 28, 135) // Purple
  doc.text('Washington State Driving Test', pageWidth / 2, yPos, { align: 'center' })
  yPos += 10
  doc.setFontSize(16)
  doc.setTextColor(107, 114, 128) // Gray
  doc.text('Practice Test Report', pageWidth / 2, yPos, { align: 'center' })
  yPos += 8
  doc.setFontSize(10)
  doc.text(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }), pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  // Summary Box
  const passed = overallAccuracy >= 80
  doc.setFillColor(passed ? 34 : 239, passed ? 197 : 68, passed ? 94 : 68) // Green or Red
  doc.roundedRect(14, yPos, pageWidth - 28, 30, 3, 3, 'F')
  
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text(passed ? 'PASSED' : 'NOT PASSED', pageWidth / 2, yPos + 12, { align: 'center' })
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Score: ${totalCorrect}/${questions.length} (${Math.round(overallAccuracy)}%)`, pageWidth / 2, yPos + 22, { align: 'center' })
  yPos += 40

  // Quick Stats
  doc.setTextColor(31, 41, 55) // Dark gray
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Test Summary', 14, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const stats = [
    ['Total Questions:', questions.length.toString()],
    ['Correct Answers:', totalCorrect.toString()],
    ['Incorrect Answers:', (questions.length - totalCorrect).toString()],
    ['Total Time:', formatTime(totalTime)],
    ['Average Time per Question:', formatTime(totalTime / questions.length)],
    ['Passing Score Required:', '32/40 (80%)'],
  ]

  stats.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal')
    doc.text(label, 14, yPos)
    doc.setFont('helvetica', 'bold')
    doc.text(value, 80, yPos)
    yPos += 6
  })
  yPos += 10

  // Chapter Performance Table
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Performance by Chapter', 14, yPos)
  yPos += 5

  const chapterTableData = chapterAnalyses
    .sort((a, b) => a.chapter - b.chapter)
    .map(c => [
      `Ch. ${c.chapter}: ${c.chapterName}`,
      `${c.correctAnswers}/${c.totalQuestions}`,
      `${Math.round(c.accuracy)}%`,
      formatTime(c.totalTime),
      formatTime(c.avgTimePerQuestion)
    ])

  autoTable(doc, {
    startY: yPos,
    head: [['Chapter', 'Score', 'Accuracy', 'Time', 'Avg/Q']],
    body: chapterTableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [88, 28, 135],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 25, halign: 'center' },
      4: { cellWidth: 25, halign: 'center' }
    }
  })

  yPos = (doc as any).lastAutoTable.finalY + 10

  // Teacher's Feedback
  if (yPos > 240) {
    doc.addPage()
    yPos = 20
  }

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(217, 119, 6) // Amber
  doc.text("Teacher's Feedback", 14, yPos)
  yPos += 8

  doc.setTextColor(31, 41, 55)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  feedback.forEach(item => {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
    const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 28)
    doc.text(lines, 14, yPos)
    yPos += lines.length * 5 + 3
  })

  // Question Details - New Page
  doc.addPage()
  yPos = 20

  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(88, 28, 135)
  doc.text('Detailed Question Results', pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  // Question table data
  const questionTableData = questions.map((q, index) => {
    const userAnswer = answers[q.id]
    const isCorrect = userAnswer === q.correctAnswerId
    const timeSpent = timingMap.get(q.id) || 0

    return [
      (index + 1).toString(),
      isCorrect ? '✓' : '✗',
      q.question.substring(0, 60) + (q.question.length > 60 ? '...' : ''),
      CHAPTER_NAMES[q.chapter] || `Ch. ${q.chapter}`,
      formatTime(timeSpent)
    ]
  })

  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Result', 'Question', 'Chapter', 'Time']],
    body: questionTableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [88, 28, 135],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 12, halign: 'center' },
      2: { cellWidth: 100 },
      3: { cellWidth: 40 },
      4: { cellWidth: 18, halign: 'center' }
    },
    didParseCell: (data) => {
      if (data.column.index === 1 && data.section === 'body') {
        if (data.cell.raw === '✓') {
          data.cell.styles.textColor = [34, 197, 94] // Green
          data.cell.styles.fontStyle = 'bold'
        } else if (data.cell.raw === '✗') {
          data.cell.styles.textColor = [239, 68, 68] // Red
          data.cell.styles.fontStyle = 'bold'
        }
      }
    }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Incorrect Questions Details
  const incorrectQuestions = questions.filter(q => answers[q.id] !== q.correctAnswerId)
  
  if (incorrectQuestions.length > 0) {
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(239, 68, 68) // Red
    doc.text(`Questions to Review (${incorrectQuestions.length})`, 14, yPos)
    yPos += 10

    incorrectQuestions.forEach((q, index) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      const userAnswer = answers[q.id]
      const userAnswerText = q.options.find(o => o.id === userAnswer)?.text || 'Not answered'
      const correctAnswerText = q.options.find(o => o.id === q.correctAnswerId)?.text || ''

      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text(`${index + 1}. ${q.question}`, 14, yPos, { maxWidth: pageWidth - 28 })
      
      const questionLines = doc.splitTextToSize(q.question, pageWidth - 28)
      yPos += questionLines.length * 5 + 3

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      
      doc.setTextColor(239, 68, 68) // Red
      const yourAnswerLines = doc.splitTextToSize(`Your answer: ${userAnswerText}`, pageWidth - 28)
      doc.text(yourAnswerLines, 18, yPos)
      yPos += yourAnswerLines.length * 4 + 2

      doc.setTextColor(34, 197, 94) // Green
      const correctLines = doc.splitTextToSize(`Correct answer: ${correctAnswerText}`, pageWidth - 28)
      doc.text(correctLines, 18, yPos)
      yPos += correctLines.length * 4 + 2

      if (q.explanation) {
        doc.setTextColor(59, 130, 246) // Blue
        const explanationLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, pageWidth - 28)
        doc.text(explanationLines, 18, yPos)
        yPos += explanationLines.length * 4 + 5
      } else {
        yPos += 5
      }
    })
  }

  // Footer on last page
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(156, 163, 175) // Light gray
    doc.text(
      `WA Driving Test Prep - Practice Test Report | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Save the PDF
  const date = new Date().toISOString().split('T')[0]
  doc.save(`WA-Driving-Test-Report-${date}.pdf`)
}
