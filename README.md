# 🚗 Washington State Driving Test Prep

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A modern, interactive web application to help you ace the Washington State Driver's License Knowledge Test**

[Getting Started](#-getting-started) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

**WA Driving Test Prep** is a comprehensive study tool designed to help aspiring drivers prepare for and pass the Washington State Department of Licensing (DOL) knowledge test. The application provides multiple learning modes, progress tracking, and a realistic test simulation based on the official WA Driver Guide.

### 🎯 About the WA Knowledge Test

| Aspect | Details |
|--------|---------|
| **Total Questions** | 40 multiple-choice questions |
| **Passing Score** | 32/40 (80%) |
| **Time Limit** | No official time limit |
| **Topics Covered** | Traffic laws, road signs, safe driving practices |
| **Languages** | Available in English, Marathi, Hindi, and Chinese |

### 📊 Question Bank Statistics

| Chapter | Topic | Questions |
|---------|-------|-----------|
| Chapter 1 | Licenses | 15 |
| Chapter 2 | Vehicles | 15 |
| Chapter 3 | Drivers | 15 |
| Chapter 4 | Roads | 110 |
| Chapter 5 | Hazards | 60 |
| **Total** | **All Topics** | **215+** |

---

## ✨ Features

### 📚 Study Mode
- **Interactive Flashcards** - Learn concepts with flip-style flashcards
- **Chapter-based Learning** - Study organized by the 5 main chapters of the WA Driver Guide
- **Progress Tracking** - Track cards studied and mastery level

### 📝 Practice Mode
- **Instant Feedback** - Get immediate explanations for correct/incorrect answers
- **Chapter Selection** - Practice questions from specific chapters or mixed
- **Difficulty Levels** - Questions categorized by easy, medium, and hard

### 🎓 Test Simulation
- **Realistic Experience** - 40-question test matching the real DOL exam format
- **Optional Timer** - Configurable time limit (15/30/45/60 min) or untimed mode
- **Pass/Fail Results** - 80% passing threshold just like the real test
- **Question-by-Question Review** - Navigate through all questions with correct/incorrect indicators
- **Detailed Analysis** - Chapter-wise breakdown, per-question timing stats, and performance insights
- **PDF Report Export** - Download a detailed test report as a PDF
- **Celebration Animations** - Confetti celebration when you pass! 🎉

### 📊 Progress Tracking
- **Visual Analytics** - Charts showing your performance over time
- **Chapter-wise Stats** - See your strengths and weaknesses by topic
- **Test History** - Track all your practice test attempts

### 🌐 Multi-language Support
- **English** - Full support
- **Marathi (मराठी)** - Complete translation
- **Hindi (हिन्दी)** - Complete translation
- **Chinese (中文)** - Complete translation
- **Easy Switching** - Toggle languages from the header

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized typography and spacing for all screen sizes
- **Adaptive UI Components** - Cards, buttons, and layouts that scale beautifully from mobile to desktop
- **Touch Gestures** - Smooth interactions on touch devices
- **Responsive Flashcards** - Study cards that adapt to screen size with proper touch-friendly controls

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| [React](https://react.dev/) | UI Framework | 18.3 |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety | 5.7 |
| [Vite](https://vitejs.dev/) | Build Tool & Dev Server | 6.0 |

### Styling & UI

| Technology | Purpose |
|------------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS Framework |
| [Lucide React](https://lucide.dev/) | Beautiful & Consistent Icons |
| [Framer Motion](https://www.framer.com/motion/) | Smooth Animations |

### State Management & Data

| Technology | Purpose |
|------------|---------|
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight State Management |
| [Dexie.js](https://dexie.org/) | IndexedDB Wrapper for Local Storage |
| [React Router](https://reactrouter.com/) | Client-side Routing |

### Internationalization & Visualization

| Technology | Purpose |
|------------|---------|
| [i18next](https://www.i18next.com/) | Internationalization Framework |
| [Recharts](https://recharts.org/) | Data Visualization Charts |
| [jsPDF](https://github.com/parallax/jsPDF) | PDF Report Generation |
| [React Confetti](https://www.npmjs.com/package/react-confetti) | Celebration Effects |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** version 18.0 or higher
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/simplysrv/WA-Driving-Test-Prep.git
   cd WA-Driving-Test-Prep
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Structure

```
wa-driving-test-prep/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer components
│   │   ├── quiz/            # Quiz-related components
│   │   │   ├── QuizCard.tsx
│   │   │   ├── QuizFeedback.tsx
│   │   │   ├── QuizOptions.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   └── QuizResults.tsx
│   │   ├── shared/          # Reusable components
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── study/           # Flashcard components
│   │   │   ├── Flashcard.tsx
│   │   │   ├── FlashcardControls.tsx
│   │   │   ├── FlashcardDeck.tsx
│   │   │   └── FlashcardProgress.tsx
│   │   └── test/            # Test simulation components
│   │       ├── TestAnalysis.tsx
│   │       ├── TestIntro.tsx
│   │       └── TestReview.tsx
│   ├── data/
│   │   └── questions/       # Question bank (JSON files)
│   │       ├── chapter1-licenses.json
│   │       ├── chapter2-vehicles.json
│   │       ├── chapter3-drivers.json
│   │       ├── chapter4-roads.json
│   │       ├── chapter5-hazards.json
│   │       └── index.ts
│   ├── i18n/
│   │   ├── config.ts        # i18next configuration
│   │   └── locales/         # Translation files
│   │       ├── en.json      # English translations
│   │       ├── hi.json      # Hindi translations
│   │       ├── mr.json      # Marathi translations
│   │       └── zh.json      # Chinese translations
│   ├── pages/               # Route page components
│   │   ├── Home.tsx
│   │   ├── ChapterList.tsx
│   │   ├── StudyMode.tsx
│   │   ├── PracticeMode.tsx
│   │   ├── TestMode.tsx
│   │   ├── Progress.tsx
│   │   └── ReviewMode.tsx
│   ├── store/               # Zustand state stores
│   │   ├── progressStore.ts
│   │   ├── quizStore.ts
│   │   └── settingsStore.ts
│   ├── styles/
│   │   └── globals.css      # Global styles & Tailwind
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── progress.ts
│   │   ├── question.ts
│   │   └── quiz.ts
│   ├── utils/
│   │   └── generateTestReport.ts  # PDF report generation
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Application entry point
│   └── router.tsx           # React Router configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## 📚 Content Structure

The question bank is organized by chapters from the official **Washington State Driver Guide**:

### Chapter 1: Licenses 📋
- Driver license types (standard, REAL ID, EDL)
- Licensing requirements and process
- DUI/DWI laws and penalties
- License suspension and revocation

### Chapter 2: Vehicles 🚙
- Vehicle registration requirements
- Safety equipment and inspections
- Insurance requirements
- Vehicle maintenance

### Chapter 3: Drivers 👤
- Impaired driving (alcohol, drugs, fatigue)
- Distracted driving laws
- Aggressive driving
- Decision-making and judgment

### Chapter 4: Roads 🛣️
- Sharing the road (pedestrians, cyclists, motorcycles)
- School buses and transit vehicles
- Large vehicles and trains
- Traffic signs, signals, and road markings
- Right-of-way rules and intersections
- Roundabouts and parking regulations
- Emergency vehicles and zones

### Chapter 5: Hazards ⚠️
- Risk awareness and hazard management
- Speed and space management
- Merging and zipper merge technique
- Eye-lead time and focus
- Weather conditions (rain, ice, fog)
- Hydroplaning and skidding
- Vehicle failures (tire blowout, brake failure)
- Collision procedures and reporting
- Law enforcement interactions

---

## 🔧 Configuration

### Environment Variables

No environment variables are required for local development. The app runs entirely client-side.

### Customization

- **Themes**: Modify `tailwind.config.js` to customize colors and styling
- **Questions**: Add or edit questions in `src/data/questions/` JSON files
- **Translations**: Add new languages in `src/i18n/locales/`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Ideas

- 📝 Add more practice questions
- 🌐 Add translations for more languages
- 🎨 Improve UI/UX design
- 🐛 Fix bugs and issues
- 📱 Enhance mobile experience

---

## 📖 Resources

- [Official WA Driver Guide (PDF)](https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides)
- [Washington State DOL Website](https://dol.wa.gov)
- [Schedule Your Knowledge Test](https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing)

---

## ⚖️ License & Disclaimer

### Disclaimer

> ⚠️ **This is an UNOFFICIAL practice tool.** Always refer to the [official Washington State Department of Licensing materials](https://dol.wa.gov) for the most accurate and up-to-date information.

- All questions are based on the official Washington State Driver Guide
- This application is for **educational purposes only**
- The actual DOL knowledge test may differ from this practice material
- We are not affiliated with the Washington State Department of Licensing

### License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Washington State Department of Licensing for the official Driver Guide
- The React, Vite, and Tailwind CSS communities for excellent documentation
- All contributors who help improve this study tool

---

<div align="center">

**Built with ❤️ for Washington State driver license test preparation**

⭐ Star this repo if you find it helpful! ⭐

</div>
