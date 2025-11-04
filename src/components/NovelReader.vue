<template>
  <div
    class="min-h-screen flex flex-col transition-colors duration-500"
    :class="isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'"
  >
    <!-- 顶部标题栏 -->
    <header class="py-6 text-center border-b border-gray-300 dark:border-gray-700">
      <h1 class="text-3xl font-bold mb-1">{{ title }}</h1>
      <p class="text-gray-500 dark:text-gray-400">作者：{{ author }}</p>
    </header>

    <!-- 阅读内容 -->
    <main class="flex-1 p-8 leading-relaxed text-lg max-w-3xl mx-auto">
      <p v-for="(line, index) in currentChapter" :key="index" class="mb-4 indent-8">
        {{ line }}
      </p>
    </main>

    <!-- 底部控制栏 -->
    <footer
      class="py-4 border-t border-gray-300 dark:border-gray-700 flex justify-center gap-6 text-sm"
    >
      <button
        @click="prevChapter"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        :disabled="chapterIndex === 0"
      >
        ◀ 上一章
      </button>

      <button
        @click="toggleDarkMode"
        class="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      >
        {{ isDark ? '☀️ 白天模式' : '🌙 夜间模式' }}
      </button>

      <button
        @click="nextChapter"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        :disabled="chapterIndex === chapters.length - 1"
      >
        下一章 ▶
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 小说基本信息
const title = '风起长林'
const author = '白月初'

// 模拟章节内容
const chapters = [
  [
    '夜色如墨，山林静谧，风吹叶动。',
    '林间的雾气缠绕着古老的松木，月光如水般洒落。',
    '少年提灯而行，神情坚定。',
  ],
  [
    '天色渐亮，远处的村落开始传来鸡鸣。',
    '他加快脚步，跨过溪流，踏上新的征途。',
  ],
]

// 当前章节索引
const chapterIndex = ref(0)
const currentChapter = ref(chapters[chapterIndex.value])

// 是否为夜间模式
const isDark = ref(false)
const toggleDarkMode = () => (isDark.value = !isDark.value)

// 翻页
const nextChapter = () => {
  if (chapterIndex.value < chapters.length - 1) {
    chapterIndex.value++
    currentChapter.value = chapters[chapterIndex.value]
  }
}

const prevChapter = () => {
  if (chapterIndex.value > 0) {
    chapterIndex.value--
    currentChapter.value = chapters[chapterIndex.value]
  }
}
</script>
