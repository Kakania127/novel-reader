<!-- components/shared/LoadingSpinner.vue -->
<template>
  <div class="flex items-center justify-center p-8">
    <div class="relative">
      <!-- 外圈旋转 -->
      <div class="w-12 h-12 border-4 border-desert-yellow-200 border-t-desert-yellow-500 rounded-full animate-spin"></div>
      <!-- 内圈旋转（反向） -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-rose-red-200 border-b-rose-red-400 rounded-full animate-spin-reverse"></div>
      <!-- 中心点 -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-star-blue-500 rounded-full"></div>
    </div>
  </div>
</template>

<script setup>
// 简单的加载指示器组件
</script>

<style scoped>
@keyframes spin-reverse {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}
</style>