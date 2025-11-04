<template>
  <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-50">
    <button 
      @click.stop="$emit('toggle-menu')"
      class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      ☰
    </button>
    <h1 class="text-lg font-bold">{{ title }}</h1>
    <button
      @click="$emit('toggle-dark-mode')"
      class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {{ isDark ? '☀️' : '🌙' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  isDark: Boolean
})

defineEmits(['toggle-menu', 'toggle-dark-mode'])
</script>