import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  darkMode: boolean
  soundEnabled: boolean
  showExplanations: boolean
  animationsEnabled: boolean
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'

  // Actions
  toggleDarkMode: () => void
  toggleSound: () => void
  toggleExplanations: () => void
  toggleAnimations: () => void
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard' | 'mixed') => void
  resetSettings: () => void
}

const defaultSettings = {
  darkMode: false,
  soundEnabled: true,
  showExplanations: true,
  animationsEnabled: true,
  difficulty: 'mixed' as const,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }))
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }))
      },

      toggleExplanations: () => {
        set((state) => ({ showExplanations: !state.showExplanations }))
      },

      toggleAnimations: () => {
        set((state) => ({ animationsEnabled: !state.animationsEnabled }))
      },

      setDifficulty: (difficulty) => {
        set({ difficulty })
      },

      resetSettings: () => {
        set(defaultSettings)
      },
    }),
    {
      name: 'settings-storage',
    }
  )
)
