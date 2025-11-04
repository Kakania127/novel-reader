<!-- components/novel/Sidebar.vue -->
<template>
  <aside 
    class="w-full lg:w-64 border-r border-star-blue-200 dark:border-star-blue-700 p-6 transition-transform duration-300 fixed lg:static inset-0 z-40 bg-white/90 dark:bg-gray-900/90 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-sm transform lg:transform-none overflow-y-auto"
    :class="{
      'translate-x-0': showMobileMenu,
      '-translate-x-full lg:translate-x-0': !showMobileMenu
    }"
  >
    <!-- 移动端关闭按钮 -->
    <div class="flex justify-between items-center mb-6 lg:hidden">
      <h2 class="text-xl font-bold text-star-blue-600 dark:text-star-blue-400">导航菜单</h2>
      <button 
        @click="$emit('close-mobile-menu')"
        class="p-2 rounded-lg hover:bg-desert-yellow-100 dark:hover:bg-star-blue-700 transition text-rose-red-500 star-twinkle"
      >
        ✕
      </button>
    </div>

    <!-- 桌面端标题 -->
    <h2 class="text-xl font-bold mb-6 hidden lg:block text-star-blue-600 dark:text-star-blue-400">章节目录</h2>
    
    <!-- 章节列表 -->
    <div class="space-y-3 mb-6">
      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
        章节列表
      </h3>
      <ul class="space-y-2 max-h-60 lg:max-h-80 overflow-y-auto">
        <li v-for="(chapter, index) in chapters" :key="index">
          <button
            class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm lg:text-base border border-transparent hover:border-desert-yellow-300 hover:shadow-md group"
            :class="{ 
              'bg-gradient-to-r from-desert-yellow-400 to-rose-red-400 text-white shadow-lg transform scale-105': index === chapterIndex && currentView === 'reader',
              'bg-white/50 dark:bg-gray-800/50 hover:bg-desert-yellow-50 dark:hover:bg-star-blue-800/30': index !== chapterIndex || currentView !== 'reader'
            }"
            @click="$emit('jump-to-chapter', index)"
          >
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-desert-yellow-400 group-hover:bg-rose-red-400 transition-colors duration-300" 
                   :class="{ 'bg-white': index === chapterIndex && currentView === 'reader' }"></div>
              <span class="font-medium">{{ getChapterTitle(index) }}</span>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <!-- 页面切换 -->
    <div class="border-t border-star-blue-200 dark:border-star-blue-700 pt-6 space-y-2">
      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
        页面切换
      </h3>
      <button
        v-for="view in views"
        :key="view.key"
        @click="$emit('switch-view', view.key)"
        class="w-full py-3 rounded-xl transition-all duration-300 text-sm lg:text-base flex items-center justify-center gap-3 border-2 group"
        :class="{ 
          'bg-gradient-to-r from-star-blue-500 to-star-blue-600 text-white border-star-blue-500 shadow-lg': currentView === view.key,
          'bg-transparent border-star-blue-200 dark:border-star-blue-700 hover:border-desert-yellow-300 hover:bg-desert-yellow-50 dark:hover:bg-star-blue-800/30': currentView !== view.key
        }"
      >
        <span class="text-lg transition-transform duration-300 group-hover:scale-110">{{ view.icon }}</span>
        <span class="font-medium">{{ view.label }}</span>
      </button>
    </div>

    <!-- 阅读统计 -->
    <div class="mt-6 pt-6 border-t border-star-blue-200 dark:border-star-blue-700 text-xs text-gray-500 dark:text-gray-400 space-y-2">
      <div class="flex items-center justify-between">
        <span>已读章节</span>
        <span class="font-semibold text-star-blue-600 dark:text-star-blue-400">{{ chapterIndex + 1 }}/{{ chapters.length }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span>阅读进度</span>
        <span class="font-semibold text-desert-yellow-600 dark:text-desert-yellow-400">{{ Math.round((chapterIndex + 1) / chapters.length * 100) }}%</span>
      </div>
    </div>

    <!-- 快捷键提示 -->
    <div class="mt-6 pt-6 border-t border-star-blue-200 dark:border-star-blue-700 text-xs text-gray-500 dark:text-gray-400">
      <p class="font-semibold mb-2 text-desert-yellow-600 dark:text-desert-yellow-400">
        快捷键:
      </p>
      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <span>上一章</span>
          <kbd class="px-2 py-1 bg-desert-yellow-100 dark:bg-desert-yellow-900/30 rounded text-xs border border-desert-yellow-300">←</kbd>
        </div>
        <div class="flex justify-between items-center">
          <span>下一章</span>
          <kbd class="px-2 py-1 bg-desert-yellow-100 dark:bg-desert-yellow-900/30 rounded text-xs border border-desert-yellow-300">→</kbd>
        </div>
        <div class="flex justify-between items-center">
          <span>切换主题</span>
          <kbd class="px-2 py-1 bg-star-blue-100 dark:bg-star-blue-900/30 rounded text-xs border border-star-blue-300">D</kbd>
        </div>
        <div class="flex justify-between items-center">
          <span>关闭菜单</span>
          <kbd class="px-2 py-1 bg-rose-red-100 dark:bg-rose-red-900/30 rounded text-xs border border-rose-red-300">ESC</kbd>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  chapters: {
    type: Array,
    required: true
  },
  chapterIndex: {
    type: Number,
    required: true
  },
  currentView: {
    type: String,
    required: true
  },
  showMobileMenu: {
    type: Boolean,
    required: true
  },
  views: {
    type: Array,
    required: true
  }
})

defineEmits(['jump-to-chapter', 'switch-view', 'close-mobile-menu'])

const getChapterTitle = (index) => {
  const titles = [
    '导读', '献词', '第一章', '第二章', '第三章', '第四章', '第五章', 
    '第六章', '第七章', '第八章', '第九章', '第十章', '第十一章', 
    '第十二章', '第十三章', '第十四章', '第十五章', '第十六章', 
    '第十七章', '第十八章', '第十九章', '第二十章', '第二十一章', 
    '第二十二章', '第二十三章', '第二十四章', '第二十五章', 
    '第二十六章', '第二十七章'
  ]
  return titles[index] || `第${index + 1}章`
}
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