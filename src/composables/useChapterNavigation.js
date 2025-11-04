import { ref, watch } from 'vue'
import { storage } from '@/utils/storage'

export function useChapterNavigation(initialChapters) {
  const chapterIndex = ref(0)
  const currentChapter = ref(initialChapters[0])
  const chapters = ref(initialChapters)

  const nextChapter = () => {
    if (chapterIndex.value < chapters.value.length - 1) {
      chapterIndex.value++
      currentChapter.value = chapters.value[chapterIndex.value]
    }
  }

  const prevChapter = () => {
    if (chapterIndex.value > 0) {
      chapterIndex.value--
      currentChapter.value = chapters.value[chapterIndex.value]
    }
  }

  const jumpToChapter = (index) => {
    if (index >= 0 && index < chapters.value.length) {
      chapterIndex.value = index
      currentChapter.value = chapters.value[index]
    }
  }

  const loadChapterProgress = () => {
    const savedChapter = storage.get('lastChapter')
    if (savedChapter !== null) {
      chapterIndex.value = savedChapter
      currentChapter.value = chapters.value[chapterIndex.value]
    }
  }

  // 自动保存阅读进度
  watch(chapterIndex, (newVal) => {
    storage.set('lastChapter', newVal)
  })

  return {
    chapterIndex,
    currentChapter,
    chapters,
    nextChapter,
    prevChapter,
    jumpToChapter,
    loadChapterProgress
  }
}