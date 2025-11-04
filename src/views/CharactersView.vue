<!-- views/CharactersView.vue -->
<template>
  <div class="characters-view">
    <header class="text-center mb-8">
      <h2 
        class="text-2xl lg:text-3xl font-bold text-star-blue-700 dark:text-star-blue-300 font-handwriting gentle-float"
        v-motion="{
          initial: { opacity: 0, y: -20 },
          enter: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
          }
        }"
      >
        《小王子》角色星系
      </h2>
      <p 
        class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto"
        v-motion="{
          initial: { opacity: 0 },
          enter: { 
            opacity: 1,
            transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' }
          }
        }"
      >
        探索小王子宇宙中的每一个独特灵魂，每个角色都像一颗闪耀的星星
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="(char, i) in characters"
        :key="i"
        class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
        v-motion="{
          initial: { opacity: 0, y: 30, scale: 0.9 },
          enter: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration: 0.5, 
              delay: i * 0.1,
              ease: 'backOut'
            }
          },
          hovered: {
            y: -8,
            transition: { duration: 0.3 }
          }
        }"
        @mouseenter="handleCharacterHover(i)"
        @mouseleave="handleCharacterLeave(i)"
      >
        <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-desert-yellow-200/20 to-rose-red-200/20 dark:from-desert-yellow-900/10 dark:to-rose-red-900/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <!-- 角色头像区域 -->
          <div class="relative z-10">
            <div 
              class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-desert-yellow-200 to-rose-red-200 dark:from-desert-yellow-700 dark:to-rose-red-700 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
              v-motion="{
                initial: { scale: 0, rotate: -180 },
                enter: { 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: i * 0.1 + 0.3,
                    ease: 'backOut'
                  }
                }
              }"
            >
              {{ getCharacterEmoji(char.name) }}
            </div>
            
            <h3 class="text-lg lg:text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-1">
              {{ char.name }}
            </h3>
            <p class="text-desert-yellow-600 dark:text-desert-yellow-400 text-sm text-center font-medium mb-3">
              {{ char.role }}
            </p>
          </div>

          <!-- 角色描述 -->
          <div class="flex-1 relative z-10">
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {{ char.description }}
            </p>

            <!-- 经典语录 -->
            <div v-if="char.quotes" class="mt-auto">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-1 h-4 bg-rose-red-400 rounded-full"></div>
                <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">经典语录：</h4>
              </div>
              <ul class="space-y-2">
                <li 
                  v-for="(quote, qIndex) in char.quotes" 
                  :key="qIndex"
                  class="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed pl-3 border-l-2 border-desert-yellow-300"
                  v-motion="{
                    initial: { opacity: 0, x: -10 },
                    enter: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        duration: 0.4, 
                        delay: i * 0.1 + 0.5 + qIndex * 0.1,
                        ease: 'easeOut'
                      }
                    }
                  }"
                >
                  "{{ quote }}"
                </li>
              </ul>
            </div>
          </div>

          <!-- 悬停效果装饰 -->
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-desert-yellow-400 to-rose-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  characters: {
    type: Array,
    required: true
  }
})

const hoveredCharacter = ref(null)

const getCharacterEmoji = (name) => {
  const emojiMap = {
    '小王子': '👑',
    '飞行员': '✈️',
    '狐狸': '🦊',
    '玫瑰': '🌹',
    '国王': '🤴',
    '爱慕虚荣的人': '💫',
    '酒鬼': '🍷',
    '商人': '💰',
    '点灯人': '💡',
    '地理学家': '🗺️'
  }
  return emojiMap[name] || '👤'
}

const handleCharacterHover = (index) => {
  hoveredCharacter.value = index
  console.log('角色悬停:', index)
}

const handleCharacterLeave = (index) => {
  hoveredCharacter.value = null
  console.log('角色离开:', index)
}
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