<!-- components/novel/ReadingProgress.vue -->
<template>
  <div class="reading-progress mb-6">
    <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
      <span class="font-medium">阅读进度</span>
      <span class="font-medium">{{ chapterIndex + 1 }} / {{ totalChapters }}</span>
    </div>
    
    <!-- 星球轨道进度条 -->
    <div class="planet-orbit w-full h-2">
      <div 
        class="planet-progress"
        :style="{ width: progressPercentage + '%' }"
      >
        <div 
          class="planet-indicator"
          :style="{ left: 'calc(' + progressPercentage + '% - 6px)' }"
        ></div>
      </div>
    </div>
    
    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
      {{ getChapterTitle(chapterIndex) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  chapterIndex: {
    type: Number,
    required: true
  },
  totalChapters: {
    type: Number,
    required: true
  }
})

const progressPercentage = computed(() => {
  return ((props.chapterIndex + 1) / props.totalChapters) * 100
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
</script>