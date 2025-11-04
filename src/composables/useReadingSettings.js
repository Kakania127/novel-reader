import { ref, watch } from 'vue'
import { storage } from '@/utils/storage'

export function useReadingSettings() {
  const fontSize = ref(16)
  const fontFamily = ref('serif')
  const lineHeight = ref(1.6)
  const showReadingSettings = ref(false)

  const increaseFontSize = () => {
    if (fontSize.value < 24) fontSize.value += 2
  }

  const decreaseFontSize = () => {
    if (fontSize.value > 14) fontSize.value -= 2
  }

  const increaseLineHeight = () => {
    if (lineHeight.value < 2.0) lineHeight.value += 0.2
  }

  const decreaseLineHeight = () => {
    if (lineHeight.value > 1.2) lineHeight.value -= 0.2
  }

  const toggleReadingSettings = () => {
    showReadingSettings.value = !showReadingSettings.value
  }

  // 保存设置
  watch([fontSize, fontFamily, lineHeight], () => {
    const readingPreferences = {
      fontSize: fontSize.value,
      fontFamily: fontFamily.value,
      lineHeight: lineHeight.value
    }
    storage.set('readingPreferences', readingPreferences)
  })

  // 加载设置
  const loadReadingPreferences = () => {
    const preferences = storage.get('readingPreferences', {})
    fontSize.value = preferences.fontSize || 16
    fontFamily.value = preferences.fontFamily || 'serif'
    lineHeight.value = preferences.lineHeight || 1.6
  }

  return {
    fontSize,
    fontFamily,
    lineHeight,
    showReadingSettings,
    increaseFontSize,
    decreaseFontSize,
    increaseLineHeight,
    decreaseLineHeight,
    toggleReadingSettings,
    loadReadingPreferences
  }
}