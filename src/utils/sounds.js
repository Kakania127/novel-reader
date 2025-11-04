// utils/sounds.js
export class SoundManager {
  constructor() {
    this.sounds = new Map()
    this.enabled = true
  }

  // 预加载音效
  async loadSound(name, url) {
    try {
      const audio = new Audio(url)
      audio.preload = 'auto'
      this.sounds.set(name, audio)
      return audio
    } catch (error) {
      console.warn(`无法加载音效 ${name}:`, error)
      return null
    }
  }

  // 播放音效
  playSound(name, volume = 0.3) {
    if (!this.enabled) return
    
    const sound = this.sounds.get(name)
    if (sound) {
      sound.volume = volume
      sound.currentTime = 0
      sound.play().catch(e => console.warn('播放音效失败:', e))
    }
  }

  // 切换音效开关
  toggleSounds() {
    this.enabled = !this.enabled
    return this.enabled
  }
}

// 创建全局音效管理器实例
export const soundManager = new SoundManager()

// 预定义音效（这里使用 base64 编码的简单音效，实际项目中可以使用音频文件）
export const SOUNDS = {
  CLICK: 'click',
  SUCCESS: 'success',
  ERROR: 'error',
  PAGE_TURN: 'page_turn'
}