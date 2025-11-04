import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(handlers) {
  const handleKeydown = (event) => {
    // 忽略输入框中的按键
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
      return
    }

    const handler = handlers[event.key]
    if (handler) {
      event.preventDefault()
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return { handleKeydown }
}