<template>
  <div
    class="flex flex-col lg:flex-row min-h-screen transition-colors duration-700 relative"
    :class="isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'"
    @click="closeMobileMenu"
  >
    <!-- 移动端顶部栏 -->
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-50">
      <button 
        @click.stop="toggleMobileMenu"
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        ☰
      </button>
      <h1 class="text-lg font-bold">{{ title }}</h1>
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>

    <!-- 左侧导航栏 -->
    <aside 
      class="w-full lg:w-64 border-r border-gray-300 dark:border-gray-700 p-6 transition-transform duration-300 fixed lg:static inset-0 z-40 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent transform lg:transform-none overflow-y-auto"
      :class="{
        'translate-x-0': showMobileMenu,
        '-translate-x-full lg:translate-x-0': !showMobileMenu
      }"
      @click.stop
    >
      <!-- 移动端关闭按钮 -->
      <div class="flex justify-between items-center mb-4 lg:hidden">
        <h2 class="text-xl font-bold">导航菜单</h2>
        <button 
          @click="showMobileMenu = false"
          class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          ✕
        </button>
      </div>

      <!-- 桌面端标题 -->
      <h2 class="text-xl font-bold mb-4 hidden lg:block">章节目录</h2>
      
      <!-- 章节列表 -->
      <ul class="space-y-2 max-h-60 lg:max-h-80 overflow-y-auto mb-6">
        <li v-for="(chapter, index) in chapters" :key="index">
          <button
            class="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition text-sm lg:text-base"
            :class="{ 
              'bg-blue-500 text-white': index === chapterIndex && currentView === 'reader',
              'bg-gray-100 dark:bg-gray-800': index !== chapterIndex || currentView !== 'reader'
            }"
            @click="jumpToChapter(index); showMobileMenu = false"
          >
            第 {{ index + 1 }} 章
          </button>
        </li>
      </ul>

      <!-- 页面切换 -->
      <div class="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
        <button
          v-for="view in views"
          :key="view.key"
          @click="switchView(view.key); showMobileMenu = false"
          class="w-full py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-sm lg:text-base flex items-center justify-center gap-2"
          :class="{ 
            'bg-blue-600 text-white': currentView === view.key,
            'bg-transparent': currentView !== view.key
          }"
        >
          <span class="text-base">{{ view.icon }}</span>
          <span>{{ view.label }}</span>
        </button>
      </div>

      <!-- 阅读统计 -->
      <div class="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>已读: {{ chapterIndex + 1 }}/{{ chapters.length }} 章</p>
        <p>进度: {{ Math.round((chapterIndex + 1) / chapters.length * 100) }}%</p>
        <p>阅读时间: {{ formattedReadingTime }}</p>
        <p>阅读速度: {{ readingSpeed }} 字/分钟</p>
        <p>预计剩余: {{ estimatedRemainingTime }}</p>
      </div>

      <!-- 快捷键提示 -->
      <div class="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <p class="font-semibold mb-1">快捷键:</p>
        <p>← → 切换章节</p>
        <p>D 切换主题</p>
        <p>ESC 关闭菜单</p>
      </div>
    </aside>

    <!-- 移动端菜单遮罩 -->
    <div 
      v-if="showMobileMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      @click="showMobileMenu = false"
    ></div>

    <!-- 主内容区 -->
    <main class="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full overflow-hidden min-h-screen lg:min-h-0">
      <!-- 阅读设置面板 -->
      <div 
        v-if="currentView === 'reader' && showReadingSettings"
        class="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">阅读设置</h3>
          <button 
            @click="showReadingSettings = false"
            class="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
                @click="decreaseFontSize"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold"
                :disabled="fontSize <= 14"
              >
                A-
              </button>
              <span class="text-lg font-semibold min-w-12 text-center">{{ fontSize }}px</span>
              <button 
                @click="increaseFontSize"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold"
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
              v-model="fontFamily"
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="serif">衬线体</option>
              <option value="sans-serif">无衬线体</option>
              <option value="monospace">等宽体</option>
              <option value="cursive">手写体</option>
            </select>
          </div>

          <!-- 行距 -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">行距</label>
            <div class="flex items-center gap-3">
              <button 
                @click="decreaseLineHeight"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold"
                :disabled="lineHeight <= 1.2"
              >
                ─
              </button>
              <span class="text-lg font-semibold min-w-12 text-center">{{ lineHeight.toFixed(1) }}</span>
              <button 
                @click="increaseLineHeight"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-bold"
                :disabled="lineHeight >= 2.0"
              >
                ═
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 阅读进度条 -->
      <div v-if="currentView === 'reader'" class="mb-6">
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>阅读进度</span>
          <span>{{ Math.round((chapterIndex + 1) / chapters.length * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            class="bg-blue-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${(chapterIndex + 1) / chapters.length * 100}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>第 1 章</span>
          <span>第 {{ chapters.length }} 章</span>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.6 } }"
      >
        <!-- 阅读模式 -->
        <template v-if="currentView === 'reader'">
          <header class="text-center mb-6">
            <h1 class="text-2xl lg:text-3xl font-bold mb-1" :style="{ fontFamily: getFontFamily(fontFamily) }">{{ title }}</h1>
            <p class="text-gray-500 dark:text-gray-400" :style="{ fontFamily: getFontFamily(fontFamily) }">作者：{{ author }}</p>
          </header>
          <article 
            class="transition-all duration-300"
            :style="{
              fontSize: fontSize + 'px',
              fontFamily: getFontFamily(fontFamily),
              lineHeight: lineHeight
            }"
          >
            <p
              v-for="(line, i) in currentChapter"
              :key="i"
              class="mb-4 indent-8 transition-opacity duration-500"
            >
              {{ line }}
            </p>
          </article>
        </template>

        <!-- 小说大纲 -->
        <template v-else-if="currentView === 'outline'">
          <h2 class="text-xl lg:text-2xl font-bold mb-6">小说大纲</h2>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">故事背景</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg mb-6">
              《风起长林》讲述了少年林风在乱世崛起的传奇旅程。从孤身一人到守护天下，
              他历经忠义与背叛、光明与黑暗的考验。
            </p>
            
            <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">世界观设定</h3>
            <ul class="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg space-y-2 mb-6">
              <li>• 多元势力：朝廷、江湖、异族三方争霸</li>
              <li>• 地理格局：九州大陆，四海环绕</li>
              <li>• 时间线：从乱世到统一的历史进程</li>
              <li>• 神秘元素：古武传承、异术秘法</li>
            </ul>
            
            <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">主题思想</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
              探讨个人成长与家国情怀的平衡，展现少年英雄在乱世中的抉择与担当。
            </p>
          </div>
        </template>

        <!-- 角色设定页 -->
        <template v-else-if="currentView === 'characters'">
          <h2 class="text-xl lg:text-2xl font-bold mb-6">主要角色设定</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div
              v-for="(char, i) in characters"
              :key="i"
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :enter="{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: i * 100,
                  type: 'spring',
                  stiffness: 200
                }
              }"
              :hovered="{ scale: 1.05 }"
              class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <img
                :src="char.avatar"
                :alt="char.name"
                loading="lazy"
                class="w-full h-32 lg:h-40 object-cover rounded-xl mb-3"
              />
              <h3 class="text-lg lg:text-xl font-semibold mb-1">{{ char.name }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm lg:text-base mb-2">{{ char.role }}</p>
              <p class="text-gray-700 dark:text-gray-300 text-xs lg:text-sm leading-relaxed">
                {{ char.description }}
              </p>
            </div>
          </div>

          <!-- 角色关系 -->
          <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">角色关系</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm lg:text-base">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span class="font-semibold">林风 ↔ 苏婉：</span> 相知相惜，共同成长
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span class="font-semibold">林风 ↔ 沈夜：</span> 理念对立，宿命对决
              </div>
            </div>
          </div>
        </template>

        <!-- 世界观设定页 -->
        <template v-else-if="currentView === 'world'">
          <h2 class="text-xl lg:text-2xl font-bold mb-6">世界观设定</h2>
          
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">地理格局</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <h4 class="font-semibold mb-2">九州大陆</h4>
                  <p class="text-sm">中原富庶之地，各方势力角逐的中心舞台</p>
                </div>
                <div class="p-4 bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 rounded-lg">
                  <h4 class="font-semibold mb-2">西域荒漠</h4>
                  <p class="text-sm">神秘异族盘踞，蕴藏古老秘术的禁忌之地</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-lg lg:text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">势力分布</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span class="font-semibold">朝廷势力</span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">维护皇权，但内部分裂严重</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <span class="font-semibold">江湖门派</span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">各自为政，争夺武林盟主之位</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <span class="font-semibold">异族部落</span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">神秘莫测，掌握独特力量体系</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 底部操作区 -->
      <footer
        v-if="currentView === 'reader'"
        class="mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 lg:gap-4 text-sm border-t border-gray-300 dark:border-gray-700 pt-4"
      >
        <button
          @click="prevChapter"
          class="px-3 lg:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
          :disabled="chapterIndex === 0"
        >
          ◀ 上一章
        </button>

        <button
          @click="toggleReadingSettings"
          class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm flex items-center gap-2"
          :class="{ 'bg-blue-100 dark:bg-blue-900/30 border-blue-300': showReadingSettings }"
        >
          <span>🎨</span>
          <span class="hidden sm:inline">阅读设置</span>
        </button>

        <button
          @click="toggleDarkMode"
          class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm hidden lg:flex items-center gap-2"
        >
          {{ isDark ? '☀️' : '🌙' }} {{ isDark ? '白天模式' : '夜间模式' }}
        </button>

        <button
          @click="addBookmark"
          class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm flex items-center gap-2"
        >
          <span>🔖</span>
          <span class="hidden sm:inline">添加书签</span>
        </button>

        <button
          @click="showShortcuts = !showShortcuts"
          class="px-3 lg:px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xs lg:text-sm flex items-center gap-2"
        >
          <span>⌨️</span>
          <span class="hidden sm:inline">快捷键</span>
        </button>

        <button
          @click="nextChapter"
          class="px-3 lg:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
          :disabled="chapterIndex === chapters.length - 1"
        >
          下一章 ▶
        </button>
      </footer>

      <!-- 快捷键提示弹窗 -->
      <div 
        v-if="showShortcuts"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="showShortcuts = false"
      >
        <div 
          class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">键盘快捷键</h3>
            <button 
              @click="showShortcuts = false"
              class="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              ✕
            </button>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span>上一章</span>
              <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">←</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span>下一章</span>
              <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">→</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span>切换主题</span>
              <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">D</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span>关闭菜单/弹窗</span>
              <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">ESC</kbd>
            </div>
            <div class="flex justify-between items-center py-2">
              <span>显示快捷键</span>
              <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">?</kbd>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

// 小说信息
const title = '风起长林'
const author = '白月初'

// 模拟章节
const chapters = [
  [
    '夜色如墨，山林静谧，风吹叶动。',
    '林间的雾气缠绕着古老的松木，月光如水般洒落。',
    '少年提灯而行，神情坚定。'
  ],
  [
    '天色渐亮，远处的村落开始传来鸡鸣。',
    '他加快脚步，跨过溪流，踏上新的征途。'
  ],
  [
    '山道崎岖，云雾缭绕，他忽见一座残破的庙宇，隐约传来诡异的低语声。'
  ],
  [
    '庙门吱呀作响，仿佛有无数双眼睛在黑暗中凝视。',
    '林风握紧手中青霜剑，深吸一口气，迈步而入。'
  ],
  [
    '庙内烛火摇曳，映照出斑驳的壁画，',
    '讲述着一段被遗忘的古老传说。'
  ]
]

// 角色信息
const characters = [
  {
    name: '林风',
    role: '主角 · 少年剑客',
    description: '自幼孤苦，心怀赤诚，机缘巧合下获得古剑"青霜"。旅途中不断磨炼心性，终成一代宗师。',
    avatar: 'https://picsum.photos/400/250?random=1'
  },
  {
    name: '苏婉',
    role: '女主 · 医者',
    description: '医术高明，外柔内刚。她在动乱中坚守仁心，与林风并肩面对命运的抉择。',
    avatar: 'https://picsum.photos/400/250?random=2'
  },
  {
    name: '沈夜',
    role: '反派 · 暗影之主',
    description: '冷峻而神秘的男子，掌控庞大情报网，企图重塑天下秩序，与主角理念相悖。',
    avatar: 'https://picsum.photos/400/250?random=3'
  },
  {
    name: '慕容雪',
    role: '盟友 · 剑术大师',
    description: '出身名门，剑法超群。表面冷漠，实则重情重义，是林风重要的盟友之一。',
    avatar: 'https://picsum.photos/400/250?random=4'
  },
  {
    name: '赵无极',
    role: '前辈 · 武林盟主',
    description: '德高望重的武林前辈，洞察世事，在林风成长道路上给予重要指引。',
    avatar: 'https://picsum.photos/400/250?random=5'
  },
  {
    name: '月影',
    role: '神秘 · 异族圣女',
    description: '来自西域的神秘女子，掌握古老秘术，身份成谜，与各方势力都有牵连。',
    avatar: 'https://picsum.photos/400/250?random=6'
  }
]

// 状态
const chapterIndex = ref(0)
const currentChapter = ref(chapters[0])
const isDark = ref(false)
const currentView = ref('reader')
const showMobileMenu = ref(false)
const showReadingSettings = ref(false)
const showShortcuts = ref(false)

// 阅读设置
const fontSize = ref(16)
const fontFamily = ref('serif')
const lineHeight = ref(1.6)

// 书签
const bookmarks = ref([])

// 阅读统计
const readingStartTime = ref(null)
const totalReadingTime = ref(0) // 总阅读时间（秒）
const lastActiveTime = ref(null)

// 页面切换按钮
const views = [
  { key: 'reader', label: '阅读模式', icon: '📖' },
  { key: 'outline', label: '小说大纲', icon: '🗺️' },
  { key: 'characters', label: '角色设定', icon: '👥' },
  { key: 'world', label: '世界观', icon: '🌍' }
]

// 计算属性
const formattedReadingTime = computed(() => {
  const hours = Math.floor(totalReadingTime.value / 3600)
  const minutes = Math.floor((totalReadingTime.value % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  } else {
    return `${minutes}分钟`
  }
})

const totalCharacters = computed(() => {
  return chapters.flat().join('').length
})

const readCharacters = computed(() => {
  return chapters.slice(0, chapterIndex.value + 1).flat().join('').length
})

const readingSpeed = computed(() => {
  if (totalReadingTime.value === 0) return 0
  const minutes = totalReadingTime.value / 60
  return Math.round(readCharacters.value / minutes)
})

const estimatedRemainingTime = computed(() => {
  if (readingSpeed.value === 0) return '计算中...'
  const remainingCharacters = totalCharacters.value - readCharacters.value
  const remainingMinutes = Math.round(remainingCharacters / readingSpeed.value)
  
  if (remainingMinutes < 60) {
    return `${remainingMinutes}分钟`
  } else {
    const hours = Math.floor(remainingMinutes / 60)
    const minutes = remainingMinutes % 60
    return `${hours}小时${minutes}分钟`
  }
})

// 字体映射
const getFontFamily = (family) => {
  const fontMap = {
    'serif': '"Noto Serif SC", "Source Han Serif SC", "SimSun", serif',
    'sans-serif': '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
    'monospace': '"JetBrains Mono", "Consolas", "Monaco", monospace',
    'cursive': '"ZCOOL KuaiLe", cursive, sans-serif'
  }
  return fontMap[family] || fontMap['serif']
}

// 阅读设置功能
const increaseFontSize = () => {
  if (fontSize.value < 24) fontSize.value += 2
}

const decreaseFontSize = () => {
  if (fontSize.value > 14) fontSize.value -= 2
}

const increaseLineHeight = () => {
  if (lineHeight.value < 2.0) lineHeight.value += 0.2
}

const decreaseLineHeight = () => {
  if (lineHeight.value > 1.2) lineHeight.value -= 0.2
}

const toggleReadingSettings = () => {
  showReadingSettings.value = !showReadingSettings.value
}

// 书签功能
const addBookmark = () => {
  const bookmark = {
    id: Date.now(),
    chapter: chapterIndex.value,
    title: `第 ${chapterIndex.value + 1} 章`,
    timestamp: new Date().toLocaleString(),
    text: currentChapter.value[0].substring(0, 30) + '...'
  }
  
  bookmarks.value.push(bookmark)
  
  // 保存到本地存储
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  
  // 显示成功提示（这里可以添加 toast 通知）
  alert(`已添加书签：${bookmark.title}`)
}

// 阅读时间跟踪
const startReadingTimer = () => {
  if (!readingStartTime.value) {
    readingStartTime.value = Date.now()
    lastActiveTime.value = Date.now()
  }
}

const stopReadingTimer = () => {
  if (readingStartTime.value) {
    const sessionTime = Math.floor((Date.now() - readingStartTime.value) / 1000)
    totalReadingTime.value += sessionTime
    readingStartTime.value = null
    saveReadingStats()
  }
}

const updateActiveTime = () => {
  lastActiveTime.value = Date.now()
}

// 键盘快捷键
const handleKeydown = (event) => {
  // 忽略输入框中的按键
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
    return
  }

  switch(event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevChapter()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextChapter()
      break
    case 'd':
    case 'D':
      if (!event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        toggleDarkMode()
      }
      break
    case 'Escape':
      event.preventDefault()
      showMobileMenu.value = false
      showReadingSettings.value = false
      showShortcuts.value = false
      break
    case '?':
      event.preventDefault()
      showShortcuts.value = !showShortcuts.value
      break
  }
}

// 移动端菜单控制
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  if (window.innerWidth < 1024) {
    showMobileMenu.value = false
  }
}

// 监听窗口大小变化
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    showMobileMenu.value = false
  }
}

// 章节切换逻辑
const nextChapter = () => {
  if (chapterIndex.value < chapters.length - 1) {
    chapterIndex.value++
    currentChapter.value = chapters[chapterIndex.value]
  }
}
const prevChapter = () => {
  if (chapterIndex.value > 0) {
    chapterIndex.value--
    currentChapter.value = chapters[chapterIndex.value]
  }
}
const jumpToChapter = (index) => {
  chapterIndex.value = index
  currentChapter.value = chapters[index]
}
const toggleDarkMode = () => (isDark.value = !isDark.value)
const switchView = (view) => {
  currentView.value = view
  showReadingSettings.value = false // 切换页面时关闭阅读设置
}

// 保存和加载阅读统计
const saveReadingStats = () => {
  const readingStats = {
    totalReadingTime: totalReadingTime.value,
    lastActiveTime: lastActiveTime.value
  }
  localStorage.setItem('readingStats', JSON.stringify(readingStats))
}

const loadReadingStats = () => {
  const saved = localStorage.getItem('readingStats')
  if (saved) {
    const stats = JSON.parse(saved)
    totalReadingTime.value = stats.totalReadingTime || 0
    
    // 如果上次活动在30分钟内，继续计时
    if (stats.lastActiveTime && (Date.now() - stats.lastActiveTime) < 30 * 60 * 1000) {
      readingStartTime.value = stats.lastActiveTime
    }
  }
}

// 🌟 自动保存阅读进度和设置
watch(chapterIndex, (newVal) => {
  localStorage.setItem('lastChapter', newVal)
})

// 保存阅读设置
watch([fontSize, fontFamily, lineHeight], () => {
  const readingPreferences = {
    fontSize: fontSize.value,
    fontFamily: fontFamily.value,
    lineHeight: lineHeight.value
  }
  localStorage.setItem('readingPreferences', JSON.stringify(readingPreferences))
})

// 定期保存阅读统计
watch(totalReadingTime, () => {
  saveReadingStats()
})

// 🌟 页面加载时恢复进度和设置
onMounted(() => {
  // 恢复阅读进度
  const savedChapter = localStorage.getItem('lastChapter')
  if (savedChapter !== null) {
    chapterIndex.value = Number(savedChapter)
    currentChapter.value = chapters[chapterIndex.value]
  }
  
  // 恢复阅读设置
  const savedPreferences = localStorage.getItem('readingPreferences')
  if (savedPreferences) {
    const preferences = JSON.parse(savedPreferences)
    fontSize.value = preferences.fontSize || 16
    fontFamily.value = preferences.fontFamily || 'serif'
    lineHeight.value = preferences.lineHeight || 1.6
  }
  
  // 恢复书签
  const savedBookmarks = localStorage.getItem('bookmarks')
  if (savedBookmarks) {
    bookmarks.value = JSON.parse(savedBookmarks)
  }

  // 恢复阅读统计
  loadReadingStats()

  // 添加事件监听
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', updateActiveTime)
  document.addEventListener('keypress', updateActiveTime)

  // 开始阅读计时
  if (currentView.value === 'reader') {
    startReadingTimer()
  }

  // 定期保存阅读统计
  setInterval(saveReadingStats, 30000) // 每30秒保存一次
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', updateActiveTime)
  document.removeEventListener('keypress', updateActiveTime)
  stopReadingTimer()
})

// 监听页面可见性变化
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopReadingTimer()
  } else {
    if (currentView.value === 'reader') {
      startReadingTimer()
    }
  }
})

// 监听视图变化
watch(currentView, (newView) => {
  if (newView === 'reader') {
    startReadingTimer()
  } else {
    stopReadingTimer()
  }
})
</script>