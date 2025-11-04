<!-- components/novel/ShortcutsHelp.vue -->
<template>
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div 
      class="card p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100"
      @click.stop
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-star-blue-600 dark:text-star-blue-400">键盘快捷键</h3>
        <button 
          @click="$emit('close')"
          class="p-2 rounded-lg hover:bg-desert-yellow-100 dark:hover:bg-star-blue-700 transition text-rose-red-500 star-twinkle"
        >
          ✕
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="(shortcut, index) in shortcuts" :key="index" 
             class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 group hover:bg-desert-yellow-50 dark:hover:bg-star-blue-900/20 rounded-lg px-3 transition-colors duration-200">
          <div class="flex items-center gap-3">
            <span class="text-lg transition-transform duration-300 group-hover:scale-110">{{ shortcut.icon }}</span>
            <span class="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">{{ shortcut.label }}</span>
          </div>
          <kbd class="px-3 py-1 bg-gradient-to-r from-desert-yellow-100 to-desert-yellow-200 dark:from-desert-yellow-900/30 dark:to-desert-yellow-800/30 rounded-lg text-xs font-mono border border-desert-yellow-300 shadow-sm group-hover:shadow-md transition-shadow duration-200">
            {{ shortcut.key }}
          </kbd>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
          使用键盘快捷键提升阅读效率
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const shortcuts = [
  { label: '上一章', key: '←', icon: '◀' },
  { label: '下一章', key: '→', icon: '▶' },
  { label: '切换主题', key: 'D', icon: '🌙' },
  { label: '关闭菜单', key: 'ESC', icon: '🚪' },
  { label: '显示快捷键', key: '?', icon: '❓' }
]

defineEmits(['close'])
</script>

<style scoped>
.star-twinkle {
  animation: star-twinkle 2s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
</style>