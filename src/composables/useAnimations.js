// composables/useAnimations.js
import { useMotion } from '@vueuse/motion'

export function useAnimations() {
  // 页面切换动画变体
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: [0.55, 0.085, 0.68, 0.53] }
    }
  }

  // 卡片悬停动画
  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  // 按钮点击动画
  const buttonTapVariants = {
    rest: { scale: 1 },
    tap: { scale: 0.95 }
  }

  // 星星闪烁动画
  const starTwinkleVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    twinkle: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // 创建动画实例
  const createAnimation = (elementRef, variants, initial = 'initial') => {
    return useMotion(elementRef, {
      initial: variants[initial],
      ...Object.fromEntries(
        Object.entries(variants)
          .filter(([key]) => key !== initial)
          .map(([key, value]) => [key, value])
      )
    })
  }

  // 交错动画用于列表项
  const staggerAnimation = (index) => ({
    initial: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  })

  return {
    pageVariants,
    cardHoverVariants,
    buttonTapVariants,
    starTwinkleVariants,
    createAnimation,
    staggerAnimation
  }
}