import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileMenu() {
  const showMobileMenu = ref(false)

  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  const closeMobileMenu = () => {
    if (window.innerWidth < 1024) {
      showMobileMenu.value = false
    }
  }

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      showMobileMenu.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    showMobileMenu,
    toggleMobileMenu,
    closeMobileMenu
  }
}