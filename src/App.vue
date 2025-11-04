<template>
  <router-view />
</template>

<script setup>
// 移除原有的 NovelLayout 导入，改为使用路由
</script>

<style>
/* 全局过渡动画 - 保留这些样式供其他组件使用 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* 小王子主题全局样式 */
.star-twinkle {
  animation: star-twinkle 2s ease-in-out infinite;
}

.gentle-float {
  animation: gentle-float 3s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #e0effe;
}

.dark ::-webkit-scrollbar-track {
  background: #074885;
}

::-webkit-scrollbar-thumb {
  background: #facc15;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #eab308;
}
</style>