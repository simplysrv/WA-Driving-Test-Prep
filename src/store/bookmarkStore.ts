import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookmarkState {
  bookmarkedQuestions: string[]

  // Actions
  toggleBookmark: (questionId: string) => void
  isBookmarked: (questionId: string) => boolean
  getBookmarkedQuestions: () => string[]
  clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedQuestions: [],

      toggleBookmark: (questionId) => {
        const { bookmarkedQuestions } = get()
        const isBookmarked = bookmarkedQuestions.includes(questionId)

        set({
          bookmarkedQuestions: isBookmarked
            ? bookmarkedQuestions.filter(id => id !== questionId)
            : [...bookmarkedQuestions, questionId],
        })
      },

      isBookmarked: (questionId) => {
        const { bookmarkedQuestions } = get()
        return bookmarkedQuestions.includes(questionId)
      },

      getBookmarkedQuestions: () => {
        return get().bookmarkedQuestions
      },

      clearBookmarks: () => {
        set({ bookmarkedQuestions: [] })
      },
    }),
    {
      name: 'bookmark-storage',
    }
  )
)
