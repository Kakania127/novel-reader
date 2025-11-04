<!-- views/ReaderView.vue -->
<template>
  <div class="reader-content">
    <!-- 章节头部 -->
    <header class="text-center mb-8 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-desert-yellow-100/30 to-transparent dark:via-star-blue-900/20 rounded-full blur-xl"></div>
      <h1 
        class="text-2xl lg:text-3xl font-bold mb-2 relative z-10 font-handwriting text-star-blue-700 dark:text-star-blue-300"
        v-motion="{
          initial: { opacity: 0, y: -20 },
          enter: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
          }
        }"
      >
        {{ novelInfo.title }}
      </h1>
      <p 
        class="text-gray-600 dark:text-gray-400 relative z-10 italic"
        :style="{ fontFamily: getFontFamily(fontFamily) }"
        v-motion="{
          initial: { opacity: 0 },
          enter: { 
            opacity: 1,
            transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' }
          }
        }"
      >
        作者：{{ novelInfo.author }}
      </p>
      <div class="mt-6 relative z-10">
        <h2 
          class="text-xl font-semibold px-6 py-3 bg-gradient-to-r from-desert-yellow-200/50 to-rose-red-200/50 dark:from-desert-yellow-900/30 dark:to-rose-red-900/30 rounded-full inline-block border border-desert-yellow-300/50 shadow-sm"
          :style="{ fontFamily: getFontFamily(fontFamily) }"
          v-motion="{
            initial: { opacity: 0, scale: 0.8 },
            enter: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.5, delay: 0.2, ease: 'backOut' }
            }
          }"
        >
          {{ getChapterTitle(chapterIndex) }}
        </h2>
      </div>
    </header>
    
    <!-- 阅读进度 -->
    <ReadingProgress 
      :chapter-index="chapterIndex" 
      :total-chapters="chapters.length" 
    />
    
    <!-- 章节内容 -->
    <article 
      class="transition-all duration-500 mt-8 relative"
      :style="{
        fontSize: fontSize + 'px',
        fontFamily: getFontFamily(fontFamily),
        lineHeight: lineHeight
      }"
    >
      <!-- 装饰性背景元素 -->
      <div 
        class="absolute -left-4 top-0 w-8 h-8 bg-desert-yellow-200/30 dark:bg-desert-yellow-900/20 rounded-full blur-sm"
        v-motion="{
          initial: { opacity: 0, scale: 0 },
          enter: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' }
          }
        }"
      ></div>
      <div 
        class="absolute -right-4 bottom-0 w-6 h-6 bg-rose-red-200/30 dark:bg-rose-red-900/20 rounded-full blur-sm"
        v-motion="{
          initial: { opacity: 0, scale: 0 },
          enter: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' }
          }
        }"
      ></div>
      
      <div class="space-y-6 relative z-10">
        <p
          v-for="(line, i) in currentChapter"
          :key="i"
          class="transition-opacity duration-500 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 paragraph-animation"
          :class="{
            'text-gray-800 dark:text-gray-200': fontFamily !== 'handwriting',
            'text-gray-700 dark:text-gray-300': fontFamily === 'handwriting'
          }"
          v-motion="{
            initial: { opacity: 0, x: -20 },
            enter: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.5, 
                delay: 0.1 * (i + 1),
                ease: 'easeOut'
              }
            },
            hovered: {
              scale: 1.02,
              transition: { duration: 0.2 }
            }
          }"
          @mouseenter="handleParagraphHover(i)"
          @mouseleave="handleParagraphLeave(i)"
        >
          <span class="inline-block w-6 text-desert-yellow-500 text-sm font-mono opacity-60 mr-2 align-top">
            {{ i + 1 }}
          </span>
          {{ line }}
        </p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFontFamily } from '@/utils/fonts'
import ReadingProgress from '@/components/novel/ReadingProgress.vue'

const props = defineProps({
  novelInfo: {
    type: Object,
    required: true
  },
  chapterIndex: {
    type: Number,
    required: true
  },
  chapters: {
    type: Array,
    required: true
  },
  currentChapter: {
    type: Array,
    required: true
  },
  fontSize: {
    type: Number,
    default: 16
  },
  fontFamily: {
    type: String,
    default: 'serif'
  },
  lineHeight: {
    type: [Number, String],
    default: 1.6
  }
})

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

// 段落悬停效果
const handleParagraphHover = (index) => {
  // 可以在这里添加段落悬停的逻辑
  console.log('段落悬停:', index)
}

const handleParagraphLeave = (index) => {
  // 可以在这里添加段落离开的逻辑
  console.log('段落离开:', index)
}
</script>

<style scoped>
.reader-content {
  position: relative;
}

.reader-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #fbbf24, transparent);
  opacity: 0.1;
}

.paragraph-animation {
  transition: all 0.3s ease;
}

.paragraph-animation:hover {
  transform: translateX(4px);
}
</style>