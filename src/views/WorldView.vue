<!-- views/WorldView.vue -->
<template>
  <div class="world-view">
    <header class="text-center mb-8">
      <h2 class="text-2xl lg:text-3xl font-bold text-star-blue-700 dark:text-star-blue-300 font-handwriting gentle-float">
        《小王子》宇宙观
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
        探索小王子旅行的星球和其中蕴含的深刻象征意义
      </p>
    </header>

    <div class="space-y-8">
      <!-- 主要星球 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute -top-8 -right-8 w-32 h-32 bg-desert-yellow-200/20 dark:bg-desert-yellow-900/10 rounded-full"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-desert-yellow-600 dark:text-desert-yellow-400 flex items-center gap-3">
            <span class="text-2xl">🪐</span>
            主要星球
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gradient-to-br from-desert-yellow-50 to-orange-50 dark:from-desert-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-desert-yellow-200 dark:border-desert-yellow-700 group hover:shadow-lg transition-all duration-300">
              <div class="flex items-center gap-4 mb-3">
                <div class="w-12 h-12 bg-gradient-to-br from-desert-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg">
                  🌍
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-desert-yellow-600 transition-colors">B-612 小行星</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">小王子的故乡</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                有三座火山和一朵独一无二的玫瑰，象征着纯真与责任的起点
              </p>
            </div>
            <div class="p-6 bg-gradient-to-br from-star-blue-50 to-green-50 dark:from-star-blue-900/20 dark:to-green-900/20 rounded-2xl border border-star-blue-200 dark:border-star-blue-700 group hover:shadow-lg transition-all duration-300">
              <div class="flex items-center gap-4 mb-3">
                <div class="w-12 h-12 bg-gradient-to-br from-star-blue-400 to-green-400 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg">
                  🌎
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-star-blue-600 transition-colors">地球</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">旅程的终点</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                小王子旅行的终点，遇见了狐狸、蛇和各种人类，象征着成长与智慧
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 象征意义 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-rose-red-200/20 dark:bg-rose-red-900/10 rounded-full"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-rose-red-600 dark:text-rose-red-400 flex items-center gap-3">
            <span class="text-2xl">🔮</span>
            象征意义
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-rose-red-300 transition-all duration-300 group">
              <div class="w-3 h-3 bg-rose-red-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span class="font-semibold text-gray-800 dark:text-gray-200">玫瑰</span>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">象征爱情、美丽与脆弱</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-desert-yellow-300 transition-all duration-300 group">
              <div class="w-3 h-3 bg-desert-yellow-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span class="font-semibold text-gray-800 dark:text-gray-200">狐狸</span>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">象征智慧、友谊与驯养</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 transition-all duration-300 group">
              <div class="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span class="font-semibold text-gray-800 dark:text-gray-200">蛇</span>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">象征死亡与轮回</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 哲学主题 -->
      <div class="card p-8 relative overflow-hidden">
        <div class="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-desert-yellow-400/10 to-rose-red-400/10 rounded-full"></div>
        <div class="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-star-blue-400/10 to-green-400/10 rounded-full"></div>
        <div class="relative z-10">
          <h3 class="text-xl lg:text-2xl font-semibold mb-6 text-star-blue-600 dark:text-star-blue-400 flex items-center gap-3">
            <span class="text-2xl">💭</span>
            哲学主题
          </h3>
          <div class="space-y-4">
            <div v-for="(quote, index) in philosophicalQuotes" :key="index" 
                 class="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-desert-yellow-400 group hover:shadow-md transition-all duration-300">
              <p class="text-gray-700 dark:text-gray-300 italic leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200">
                "{{ quote }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const philosophicalQuotes = [
  "真正重要的东西，用眼睛是看不见的，要用心。",
  "你为你的玫瑰失去的时间，使你的玫瑰变得重要了。",
  "所有的大人都曾经是小孩，虽然，只有少数的人记得。",
  "你要永远为你驯养的东西负责。"
]
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