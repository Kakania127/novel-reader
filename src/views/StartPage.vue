<template>
  <div class="start-page">
    <!-- 背景图片 -->
    <div class="background-image" :style="backgroundStyle"></div>
    
    <!-- 装饰性元素 -->
    <div class="decorative-elements">
      <div class="star star-1 gentle-float" style="top: 20%; left: 15%;"></div>
      <div class="star star-2 star-twinkle" style="top: 30%; right: 20%;"></div>
      <div class="star star-3 gentle-float" style="bottom: 25%; left: 25%;"></div>
      <div class="planet" style="top: 15%; right: 10%;"></div>
    </div>
    
    <!-- 背景音乐 -->
    <audio 
      ref="bgmAudio" 
      loop
      @canplaythrough="onAudioReady"
      @loadeddata="onAudioLoaded"
    >
      <source src="/audio/little-prince-theme.mp3" type="audio/mpeg">
      您的浏览器不支持音频元素。
    </audio>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="title-section">
        <h1 class="novel-title">小王子</h1>
        <p class="novel-subtitle">Le Petit Prince</p>
        <div class="title-decoration"></div>
      </div>
      
      <div class="action-section">
        <button 
          class="start-btn"
          :class="{ 'loading': isLoading }"
          :disabled="isLoading"
          @click="startReading"
        >
          <span class="btn-content">
            <span v-if="!isLoading">开始阅读</span>
            <span v-else class="loading-text">
              <span class="loading-dots"></span>
              加载中
            </span>
          </span>
        </button>
      </div>
    </div>
    
    <!-- 底部区域 -->
    <div class="bottom-section">
      <!-- 音乐控制区域 -->
      <div class="music-section" v-if="isAudioReady">
        <div class="music-control">
          <button 
            class="music-btn"
            @click="toggleMusic"
            :title="isMusicPlaying ? '暂停音乐' : '播放音乐'"
          >
            <span class="music-icon">{{ isMusicPlaying ? '♪' : '♫' }}</span>
          </button>
          <span class="music-label">{{ isMusicPlaying ? '音乐播放中' : '点击播放音乐' }}</span>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="copyright">
        <p>© 《小王子》 - 安托万·德·圣-埃克苏佩里</p>
      </div>
    </div>
    
    <!-- 加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'StartPage',
  components: {
    LoadingSpinner
  },
  setup() {
    const router = useRouter()
    const bgmAudio = ref(null)
    const isAudioReady = ref(false)
    const isMusicPlaying = ref(false)
    const isLoading = ref(false)
    const audioLoaded = ref(false)
    
    // 背景图片路径 - 使用之前设置的路径
    const backgroundImage = ref('/images/little-prince-bg.jpg')
    
    const backgroundStyle = computed(() => ({
      backgroundImage: `url(${backgroundImage.value})`
    }))
    
    const onAudioReady = () => {
      isAudioReady.value = true
    }

    const onAudioLoaded = () => {
      audioLoaded.value = true
    }
    
    const toggleMusic = () => {
      if (!isAudioReady.value) return
      
      if (isMusicPlaying.value) {
        bgmAudio.value.pause()
        isMusicPlaying.value = false
      } else {
        bgmAudio.value.play().catch(error => {
          console.log('音频播放失败:', error)
        })
        isMusicPlaying.value = true
      }
    }
    
    const startReading = async () => {
      isLoading.value = true
      
      try {
        // 停止音乐
        if (isMusicPlaying.value && bgmAudio.value) {
          bgmAudio.value.pause()
          // 重置音频时间到开始
          bgmAudio.value.currentTime = 0
        }
        
        // 模拟加载时间，确保过渡动画完整
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 跳转到阅读页面
        router.push('/reader')
      } catch (error) {
        console.error('导航失败:', error)
        isLoading.value = false
      }
    }
    
    onMounted(() => {
      // 预加载音频
      if (bgmAudio.value) {
        bgmAudio.value.load()
        // 设置预加载属性
        bgmAudio.value.preload = 'auto'
      }
    })
    
    onUnmounted(() => {
      // 清理音频
      if (bgmAudio.value) {
        bgmAudio.value.pause()
        bgmAudio.value = null
      }
    })
    
    return {
      bgmAudio,
      backgroundStyle,
      isAudioReady,
      isMusicPlaying,
      isLoading,
      toggleMusic,
      startReading,
      onAudioReady,
      onAudioLoaded
    }
  }
}
</script>

<style scoped>
.start-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Noto Serif SC', serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.6) saturate(1.2);
  z-index: -1;
}

/* 装饰性元素 */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
}

.star-1 {
  width: 6px;
  height: 6px;
  background: #facc15;
}

.star-2 {
  animation-delay: 1s;
}

.star-3 {
  width: 3px;
  height: 3px;
  opacity: 0.4;
}

.planet {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #f472b6;
  border-radius: 50%;
  opacity: 0.8;
  animation: rotate-slow 20s linear infinite;
}

/* 主要内容区域 - 调整标题位置 */
.main-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding: 2rem;
  color: white;
  text-align: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 20vh; /* 调整上边距，使标题位于页面上部 */
}

.title-section {
  margin-bottom: 0; /* 移除标题和按钮之间的间距 */
  position: relative;
}

.novel-title {
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(250, 204, 21, 0.3);
  letter-spacing: 0.3em;
  background: linear-gradient(135deg, #ffffff 0%, #fef3c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  animation: title-enter 1.5s ease-out;
}

.novel-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  font-style: italic;
  letter-spacing: 0.1em;
  color: #fef3c7;
  animation: subtitle-enter 1.5s ease-out 0.3s both;
}

.title-decoration {
  position: absolute;
  bottom: -1.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #facc15, transparent);
  animation: line-expand 1s ease-out 0.8s both;
}

.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12vh; /* 调整上边距，使开始阅读按钮位于页面中间偏下 */
}

/* 开始按钮样式 */
.start-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 1.2rem 3.5rem;
  font-size: 1.4rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  font-weight: 600;
  letter-spacing: 0.1em;
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: button-enter 1s ease-out 1s both;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.7);
}

.start-btn:active {
  transform: translateY(-1px);
}

.start-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.start-btn.loading {
  background: rgba(160, 174, 192, 0.3);
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.loading-dots {
  display: inline-flex;
  gap: 2px;
}

.loading-dots::after {
  content: '';
  animation: loading-dots 1.5s infinite;
}

/* 底部区域 - 将音乐控制和版权信息放在一起 */
.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem; /* 为底部留出空间 */
}

/* 音乐控制区域 */
.music-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem; /* 减少内边距 */
  width: 100%;
  margin-bottom: 0.5rem; /* 减少与版权信息的间距 */
}

.music-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem; /* 减少间距 */
  animation: fadeIn 1s ease-out 1.5s both;
}

.music-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem; /* 减少内边距 */
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 45px; /* 减小尺寸 */
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.music-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1) rotate(15deg);
}

.music-icon {
  font-size: 1.2rem; /* 减小图标尺寸 */
}

.music-label {
  font-size: 0.75rem; /* 减小字体大小 */
  color: #fef3c7;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.copyright {
  padding: 0.5rem; /* 减少内边距 */
  text-align: center;
  width: 100%;
  animation: fadeIn 2s ease-out 2s both;
}

.copyright p {
  font-size: 0.75rem; /* 减小字体大小 */
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

/* 动画定义 */
@keyframes title-enter {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes subtitle-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
}

@keyframes button-enter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes line-expand {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100px;
    opacity: 1;
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .novel-title {
    font-size: 3.5rem;
    letter-spacing: 0.2em;
  }
  
  .novel-subtitle {
    font-size: 1.2rem;
  }
  
  .start-btn {
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    min-width: 180px;
  }
  
  .main-content {
    padding: 1.5rem;
    padding-top: 15vh; /* 移动端调整上边距 */
  }
  
  .title-section {
    margin-bottom: 0;
  }
  
  .action-section {
    margin-top: 8vh; /* 移动端调整开始阅读按钮位置 */
  }
}

@media (max-width: 480px) {
  .novel-title {
    font-size: 2.8rem;
    letter-spacing: 0.15em;
  }
  
  .novel-subtitle {
    font-size: 1rem;
  }
  
  .start-btn {
    padding: 0.9rem 2rem;
    font-size: 1.1rem;
    min-width: 160px;
  }
  
  .main-content {
    padding: 1rem;
    padding-top: 12vh; /* 移动端调整上边距 */
  }
  
  .action-section {
    margin-top: 6vh; /* 移动端调整开始阅读按钮位置 */
  }
  
  .music-control {
    flex-direction: row;
  }
  
  .music-label {
    font-size: 0.7rem;
  }
  
  .copyright p {
    font-size: 0.7rem;
  }
}
</style>