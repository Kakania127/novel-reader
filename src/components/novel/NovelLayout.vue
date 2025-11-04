<!-- components/novel/NovelLayout.vue -->
<template>
  <div
    class="flex flex-col lg:flex-row min-h-screen transition-all duration-500 relative bg-star-pattern"
    :class="isDark ? 'dark bg-gradient-to-br from-star-blue-900 to-star-blue-800 text-gray-100' : 'bg-gradient-to-br from-star-blue-50 to-desert-yellow-50 text-gray-900'"
  >
    <!-- 移动端头部 -->
    <div class="lg:hidden p-4 border-b border-star-blue-200 dark:border-star-blue-600 flex justify-between items-center backdrop-blur-card bg-white/80 dark:bg-gray-800/80">
      <h1 class="text-xl font-bold text-star-blue-600 dark:text-star-blue-400 font-handwriting gentle-float">
        {{ novelInfo.title }}
      </h1>
      <button 
        @click="toggleMobileMenu" 
        class="p-2 rounded-lg hover:bg-desert-yellow-100 dark:hover:bg-star-blue-700 transition text-desert-yellow-600 dark:text-desert-yellow-400 star-twinkle"
      >
        ✰
      </button>
    </div>

    <!-- 侧边栏 -->
    <Sidebar
      :chapters="chapters"
      :chapter-index="currentChapterIndex"
      :current-view="currentView"
      :show-mobile-menu="showMobileMenu"
      :views="views"
      @jump-to-chapter="jumpToChapter"
      @switch-view="switchView"
      @close-mobile-menu="closeMobileMenu"
    />

    <!-- 移动端菜单遮罩 -->
    <div 
      v-if="showMobileMenu"
      class="fixed inset-0 bg-star-blue-900/50 backdrop-blur-sm z-30 lg:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- 主内容区 -->
    <main class="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full overflow-hidden">
      <ReadingSettings
        v-if="currentView === 'reader' && showReadingSettings"
        :font-size="fontSize"
        :font-family="fontFamily"
        :line-height="lineHeight"
        @close="toggleReadingSettings"
        @increase-font-size="increaseFontSize"
        @decrease-font-size="decreaseFontSize"
        @increase-line-height="increaseLineHeight"
        @decrease-line-height="decreaseLineHeight"
        @update-font-family="updateFontFamily"
      />

      <div class="card p-6 lg:p-8">
        <!-- 视图切换动画容器 -->
        <transition
          name="fade"
          mode="out-in"
        >
          <!-- 阅读模式 -->
          <div v-if="currentView === 'reader'" key="reader" class="view-content">
            <ReaderView
              :novel-info="novelInfo"
              :chapter-index="currentChapterIndex"
              :chapters="chapters"
              :current-chapter="currentChapter"
              :font-size="fontSize"
              :font-family="fontFamily"
              :line-height="lineHeight"
            />
          </div>

          <!-- 小说大纲 -->
          <div v-else-if="currentView === 'outline'" key="outline" class="view-content">
            <OutlineView />
          </div>

          <!-- 角色设定页 -->
          <div v-else-if="currentView === 'characters'" key="characters" class="view-content">
            <CharactersView :characters="characters" />
          </div>

          <!-- 世界观设定页 -->
          <div v-else-if="currentView === 'world'" key="world" class="view-content">
            <WorldView />
          </div>
        </transition>
      </div>

      <BottomControls
        v-if="currentView === 'reader'"
        :chapter-index="currentChapterIndex"
        :total-chapters="chapters.length"
        :is-dark="isDark"
        :show-reading-settings="showReadingSettings"
        @prev-chapter="safePrevChapter"
        @next-chapter="safeNextChapter"
        @toggle-reading-settings="toggleReadingSettings"
        @toggle-dark-mode="toggleDarkMode"
        @add-bookmark="addBookmark"
        @show-shortcuts="showShortcuts = true"
      />

      <ShortcutsHelp
        v-if="showShortcuts"
        @close="showShortcuts = false"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { novelInfo } from '@/data/novelInfo'
import { chapters as initialChapters } from '@/data/chapters'
import { characters } from '@/data/characters'
import { preloadCriticalFonts } from '@/utils/fonts'

// 组件导入
import Sidebar from './Sidebar.vue'
import ReadingSettings from './ReadingSettings.vue'
import BottomControls from './BottomControls.vue'
import ShortcutsHelp from './ShortcutsHelp.vue'
import ReaderView from '@/views/ReaderView.vue'
import OutlineView from '@/views/OutlineView.vue'
import CharactersView from '@/views/CharactersView.vue'
import WorldView from '@/views/WorldView.vue'

// 响应式状态
const currentView = ref('reader')
const isDark = ref(false)
const showShortcuts = ref(false)
const showMobileMenu = ref(false)
const showReadingSettings = ref(false)

// 阅读设置
const fontSize = ref(16)
const fontFamily = ref('serif')
const lineHeight = ref(1.6)

// 章节导航
const currentChapterIndex = ref(0)
const chapters = ref(initialChapters)

const currentChapter = computed(() => {
  return chapters.value[currentChapterIndex.value] || []
})

// 页面切换按钮
const views = [
  { key: 'reader', label: '阅读模式', icon: '📖' },
  { key: 'outline', label: '小说大纲', icon: '🗺️' },
  { key: 'characters', label: '角色设定', icon: '👥' },
  { key: 'world', label: '世界观', icon: '🌍' }
]

// 临时错误处理函数（在没有 useErrorHandler 的情况下）
const handleError = (error, context = '') => {
  console.error(`小王子阅读器错误 [${context}]:`, error)
}

// 功能函数
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value)
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const switchView = (view) => {
  currentView.value = view
  showReadingSettings.value = false
  closeMobileMenu()
}

const toggleReadingSettings = () => {
  showReadingSettings.value = !showReadingSettings.value
}

// 章节导航
const nextChapter = () => {
  if (currentChapterIndex.value < chapters.value.length - 1) {
    currentChapterIndex.value++
    saveProgress()
  }
}

const prevChapter = () => {
  if (currentChapterIndex.value > 0) {
    currentChapterIndex.value--
    saveProgress()
  }
}

const jumpToChapter = (index) => {
  if (index >= 0 && index < chapters.value.length) {
    currentChapterIndex.value = index
    saveProgress()
  }
}

// 安全的方法（带错误处理）
const safeNextChapter = () => {
  try {
    nextChapter()
  } catch (error) {
    handleError(error, 'nextChapter')
  }
}

const safePrevChapter = () => {
  try {
    prevChapter()
  } catch (error) {
    handleError(error, 'prevChapter')
  }
}

// 阅读设置功能
const increaseFontSize = () => {
  if (fontSize.value < 24) {
    fontSize.value += 1
    saveReadingPreferences()
  }
}

const decreaseFontSize = () => {
  if (fontSize.value > 14) {
    fontSize.value -= 1
    saveReadingPreferences()
  }
}

const increaseLineHeight = () => {
  if (lineHeight.value < 2.0) {
    lineHeight.value = Number((Number(lineHeight.value) + 0.1).toFixed(1))
    saveReadingPreferences()
  }
}

const decreaseLineHeight = () => {
  if (lineHeight.value > 1.2) {
    lineHeight.value = Number((Number(lineHeight.value) - 0.1).toFixed(1))
    saveReadingPreferences()
  }
}

const updateFontFamily = (value) => {
  fontFamily.value = value
  saveReadingPreferences()
}

// 书签功能
const addBookmark = () => {
  const bookmark = {
    chapterIndex: currentChapterIndex.value,
    title: `第${currentChapterIndex.value + 1}章`,
    timestamp: new Date().toISOString()
  }
  console.log('添加书签:', bookmark)
}

// 保存功能
const saveProgress = () => {
  localStorage.setItem('lastChapter', currentChapterIndex.value)
}

const saveReadingPreferences = () => {
  const preferences = {
    fontSize: fontSize.value,
    fontFamily: fontFamily.value,
    lineHeight: lineHeight.value
  }
  localStorage.setItem('readingPreferences', JSON.stringify(preferences))
}

const loadReadingPreferences = () => {
  const saved = localStorage.getItem('readingPreferences')
  if (saved) {
    const preferences = JSON.parse(saved)
    fontSize.value = preferences.fontSize || 16
    fontFamily.value = preferences.fontFamily || 'serif'
    lineHeight.value = preferences.lineHeight || 1.6
  }
}

const loadProgress = () => {
  const saved = localStorage.getItem('lastChapter')
  if (saved !== null) {
    currentChapterIndex.value = parseInt(saved)
  }
}

// 键盘快捷键
const setupKeyboardShortcuts = () => {
  const handleKeydown = (event) => {
    // 忽略输入框中的按键
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
      return
    }

    if (event.key === 'ArrowLeft') safePrevChapter()
    if (event.key === 'ArrowRight') safeNextChapter()
    if (event.key === 'd' || event.key === 'D') toggleDarkMode()
    if (event.key === 'Escape') {
      showMobileMenu.value = false
      showReadingSettings.value = false
      showShortcuts.value = false
    }
    if (event.key === '?') showShortcuts.value = !showShortcuts.value
  }

  document.addEventListener('keydown', handleKeydown)
  return () => document.removeEventListener('keydown', handleKeydown)
}

// 生命周期
onMounted(() => {
  loadProgress()
  loadReadingPreferences()
  
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDark.value = JSON.parse(savedDarkMode)
  }

  setupKeyboardShortcuts()
  preloadCriticalFonts()
})
</script>

<style scoped>
/* 组件特定样式可以放在这里 */
.backdrop-blur-card {
  backdrop-filter: blur(12px);
}

.gentle-float {
  animation: gentle-float 3s ease-in-out infinite;
}

.star-twinkle {
  animation: star-twinkle 2s ease-in-out infinite;
}

/* 视图切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.view-content {
  min-height: 400px;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>