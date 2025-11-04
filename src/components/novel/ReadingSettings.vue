<!-- components/novel/ReadingSettings.vue -->
<template>
  <div class="card mb-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-star-blue-600 dark:text-star-blue-400">
        阅读设置
      </h3>
      <button 
        @click="$emit('close')"
        class="p-1 rounded-lg hover:bg-desert-yellow-100 dark:hover:bg-star-blue-700 transition text-rose-red-500"
      >
        ✕
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 字体大小 -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">字体大小</label>
        <div class="flex items-center gap-3">
          <button 
            @click="$emit('decrease-font-size')"
            class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold disabled:opacity-50"
            :disabled="fontSize <= 14"
          >
            A-
          </button>
          <span class="text-lg font-semibold min-w-12 text-center font-mono">{{ fontSize }}px</span>
          <button 
            @click="$emit('increase-font-size')"
            class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold disabled:opacity-50"
            :disabled="fontSize >= 24"
          >
            A+
          </button>
        </div>
      </div>

      <!-- 字体家族 -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">字体</label>
        <select 
          :value="fontFamily"
          @change="$emit('update-font-family', $event.target.value)"
          class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-desert-yellow-500"
        >
          <option v-for="option in fontOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- 行距 -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">行距</label>
        <div class="flex items-center gap-3">
          <button 
            @click="$emit('decrease-line-height')"
            class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold disabled:opacity-50"
            :disabled="Number(lineHeight) <= 1.2"
          >
            ─
          </button>
          <span class="text-lg font-semibold min-w-12 text-center font-mono">{{ Number(lineHeight).toFixed(1) }}</span>
          <button 
            @click="$emit('increase-line-height')"
            class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold disabled:opacity-50"
            :disabled="Number(lineHeight) >= 2.0"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fontOptions } from '@/utils/fonts'

defineProps({
  fontSize: {
    type: Number,
    required: true
  },
  fontFamily: {
    type: String,
    required: true
  },
  lineHeight: {
    type: [Number, String],
    required: true
  }
})

defineEmits([
  'close',
  'increase-font-size',
  'decrease-font-size',
  'increase-line-height',
  'decrease-line-height',
  'update-font-family'
])
</script>