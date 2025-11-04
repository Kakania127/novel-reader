<!-- components/novel/BottomControls.vue -->
<template>
  <footer
    class="mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 lg:gap-4 text-sm border-t border-gray-300 dark:border-gray-700 pt-4"
  >
    <button
      @click="$emit('prev-chapter')"
      class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
      :disabled="chapterIndex === 0"
    >
      ◀ 上一章
    </button>

    <button
      @click="$emit('toggle-reading-settings')"
      class="btn-secondary text-xs lg:text-sm flex items-center gap-2"
    >
      <span>🎨</span>
      <span class="hidden sm:inline">阅读设置</span>
    </button>

    <button
      @click="$emit('toggle-dark-mode')"
      class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm hidden lg:flex items-center gap-2"
    >
      {{ isDark ? '☀️' : '🌙' }} {{ isDark ? '白天模式' : '夜间模式' }}
    </button>

    <button
      @click="$emit('add-bookmark')"
      class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm flex items-center gap-2"
    >
      <span>🔖</span>
      <span class="hidden sm:inline">添加书签</span>
    </button>

    <button
      @click="$emit('show-shortcuts')"
      class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm flex items-center gap-2"
    >
      <span>⌨️</span>
      <span class="hidden sm:inline">快捷键</span>
    </button>

    <button
      @click="$emit('next-chapter')"
      class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
      :disabled="chapterIndex === totalChapters - 1"
    >
      下一章 ▶
    </button>
  </footer>
</template>

<script setup>
defineProps({
  chapterIndex: {
    type: Number,
    required: true
  },
  totalChapters: {
    type: Number,
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  },
  showReadingSettings: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'prev-chapter',
  'next-chapter',
  'toggle-reading-settings',
  'toggle-dark-mode',
  'add-bookmark',
  'show-shortcuts'
])
</script>