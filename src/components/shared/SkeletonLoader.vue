<!-- components/shared/SkeletonLoader.vue -->
<template>
  <div class="skeleton-loader space-y-4 p-6">
    <!-- 标题骨架 -->
    <div class="flex items-center space-x-4">
      <div class="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
    
    <!-- 内容骨架 -->
    <div class="space-y-3">
      <div v-for="i in lines" :key="i" class="flex space-x-2">
        <div class="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" :style="{ width: getRandomWidth() }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  lines: {
    type: Number,
    default: 5
  }
})

const widths = ref([])

const getRandomWidth = () => {
  const widths = ['85%', '90%', '75%', '95%', '80%']
  return widths[Math.floor(Math.random() * widths.length)]
}

onMounted(() => {
  // 初始化随机宽度
  widths.value = Array.from({ length: props.lines }, () => getRandomWidth())
})
</script>

<style scoped>
.skeleton-loader {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .skeleton-loader {
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(55, 65, 81, 0.2);
}
</style>