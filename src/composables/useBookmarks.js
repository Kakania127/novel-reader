import { ref } from 'vue'
import { storage } from '@/utils/storage'

export function useBookmarks() {
  const bookmarks = ref([])

  const loadBookmarks = () => {
    bookmarks.value = storage.get('bookmarks', [])
  }

  const addBookmark = (chapterIndex, chapterContent) => {
    const bookmark = {
      id: Date.now(),
      chapter: chapterIndex,
      title: `第 ${chapterIndex + 1} 章`,
      timestamp: new Date().toLocaleString(),
      text: chapterContent[0].substring(0, 30) + '...'
    }
    
    bookmarks.value.push(bookmark)
    storage.set('bookmarks', bookmarks.value)
    return bookmark
  }

  const removeBookmark = (bookmarkId) => {
    bookmarks.value = bookmarks.value.filter(b => b.id !== bookmarkId)
    storage.set('bookmarks', bookmarks.value)
  }

  const clearBookmarks = () => {
    bookmarks.value = []
    storage.remove('bookmarks')
  }

  const hasBookmark = (chapterIndex) => {
    return bookmarks.value.some(b => b.chapter === chapterIndex)
  }

  return {
    bookmarks,
    loadBookmarks,
    addBookmark,
    removeBookmark,
    clearBookmarks,
    hasBookmark
  }
}