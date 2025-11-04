import { ref, computed, watch } from 'vue'
import { storage } from '@/utils/storage'

export function useReadingStats(chapters, chapterIndex) {
  const totalReadingTime = ref(0)
  const startTime = ref(null)
  
  // 计算阅读时间（基于字数估算）
  const calculateReadingTime = (content) => {
    const wordCount = content.reduce((count, paragraph) => count + paragraph.length, 0)
    // 假设平均阅读速度：200字/分钟
    return Math.ceil(wordCount / 200)
  }

  const startReadingSession = () => {
    startTime.value = Date.now()
  }

  const endReadingSession = () => {
    if (startTime.value) {
      const sessionTime = Math.floor((Date.now() - startTime.value) / 60000) // 转换为分钟
      totalReadingTime.value += sessionTime
      startTime.value = null
      storage.set('totalReadingTime', totalReadingTime.value)
    }
  }

  const totalWords = computed(() => {
    return chapters.reduce((total, chapter) => {
      return total + chapter.reduce((chapTotal, para) => chapTotal + para.length, 0)
    }, 0)
  })

  const wordsRead = computed(() => {
    let count = 0
    for (let i = 0; i <= chapterIndex.value; i++) {
      if (i < chapters.length) {
        count += chapters[i].reduce((chapCount, para) => chapCount + para.length, 0)
      }
    }
    return count
  })

  const readingProgress = computed(() => {
    return totalWords.value > 0 ? (wordsRead.value / totalWords.value) * 100 : 0
  })

  const estimatedTimeRemaining = computed(() => {
    const wordsRemaining = totalWords.value - wordsRead.value
    // 假设阅读速度：200字/分钟
    return Math.ceil(wordsRemaining / 200)
  })

  // 加载保存的阅读时间
  const loadReadingStats = () => {
    const savedTime = storage.get('totalReadingTime')
    if (savedTime !== null) {
      totalReadingTime.value = savedTime
    }
  }

  // 自动保存阅读时间
  watch(totalReadingTime, (newVal) => {
    storage.set('totalReadingTime', newVal)
  })

  return {
    totalReadingTime,
    totalWords,
    wordsRead,
    readingProgress,
    estimatedTimeRemaining,
    startReadingSession,
    endReadingSession,
    loadReadingStats
  }
}