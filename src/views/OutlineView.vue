<!-- views/OutlineView.vue -->
<template>
  <div class="outline-view">
    <header class="text-center mb-8">
      <h2 class="text-2xl lg:text-3xl font-bold text-star-blue-700 dark:text-star-blue-300 font-handwriting gentle-float">
        《小王子》星际地图
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
        探索这部永恒经典的深层含义和故事结构
      </p>
    </header>

    <div class="space-y-8">
      <!-- 故事简介卡片 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-desert-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-star-blue-600 dark:text-star-blue-400 flex items-center gap-3">
            <span class="text-2xl">🌌</span>
            故事简介
          </h3>
          <p class="text-gentle text-base lg:text-lg leading-relaxed">
            《小王子》是法国作家安托万·德·圣-埃克苏佩里于1942年写成的著名儿童文学短篇小说。
            本书的主人公是来自外星球的小王子。书中以一位飞行员作为故事叙述者，讲述了小王子从自己星球出发前往地球的过程中，所经历的各种历险。
          </p>
        </div>
      </div>

      <!-- 章节结构 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-red-200/30 to-transparent rounded-full -translate-x-16 translate-y-16"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-desert-yellow-600 dark:text-desert-yellow-400 flex items-center gap-3">
            <span class="text-2xl">🛸</span>
            星际旅程结构
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <ul class="text-gentle text-base lg:text-lg space-y-3">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-desert-yellow-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">1</span>
                <span>导读：作者介绍和作品背景</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-desert-yellow-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">2</span>
                <span>献词：献给列翁·维尔特</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-desert-yellow-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">3</span>
                <span>第1-2章：飞行员与小王子在沙漠相遇</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-desert-yellow-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">4</span>
                <span>第3-9章：小王子离开自己的星球</span>
              </li>
            </ul>
            <ul class="text-gentle text-base lg:text-lg space-y-3">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-rose-red-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">5</span>
                <span>第10-15章：访问其他小行星的居民</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 bg-rose-red-400 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">6</span>
                <span>第16-27章：在地球上的经历与告别</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 核心主题 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-star-blue-200/20 to-transparent rounded-full -translate-y-24"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-rose-red-600 dark:text-rose-red-400 flex items-center gap-3">
            <span class="text-2xl">💫</span>
            宇宙真理
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-desert-yellow-50 to-desert-yellow-100 dark:from-desert-yellow-900/20 dark:to-desert-yellow-800/20 rounded-xl">
                <span class="text-2xl mt-1">👁️</span>
                <div>
                  <p class="font-semibold text-desert-yellow-700 dark:text-desert-yellow-300">用心观察</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">"真正重要的东西，用眼睛是看不见的，要用心。"</p>
                </div>
              </div>
              <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-rose-red-50 to-rose-red-100 dark:from-rose-red-900/20 dark:to-rose-red-800/20 rounded-xl">
                <span class="text-2xl mt-1">⏳</span>
                <div>
                  <p class="font-semibold text-rose-red-700 dark:text-rose-red-300">时间的价值</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">"你为你的玫瑰失去的时间，使你的玫瑰变得重要了。"</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-star-blue-50 to-star-blue-100 dark:from-star-blue-900/20 dark:to-star-blue-800/20 rounded-xl">
                <span class="text-2xl mt-1">👶</span>
                <div>
                  <p class="font-semibold text-star-blue-700 dark:text-star-blue-300">纯真之心</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">"所有的大人都曾经是小孩，虽然，只有少数的人记得。"</p>
                </div>
              </div>
              <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                <span class="text-2xl mt-1">🤝</span>
                <div>
                  <p class="font-semibold text-green-700 dark:text-green-300">责任与爱</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">"你要永远为你驯养的东西负责。"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 大纲视图不需要额外的逻辑
</script>

<style scoped>
.gentle-float {
  animation: gentle-float 3s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
</style>