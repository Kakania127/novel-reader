// composables/useErrorHandler.js
import { ref } from 'vue'

export function useErrorHandler() {
  const error = ref(null)
  
  const handleError = (err, context = '') => {
    error.value = {
      message: err.message,
      context,
      timestamp: new Date().toISOString()
    }
    
    console.error(`小王子阅读器错误 [${context}]:`, err)
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    error,
    handleError,
    clearError
  }
}