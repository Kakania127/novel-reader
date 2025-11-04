export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const preloadAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio()
    audio.addEventListener('canplaythrough', () => resolve(audio), false)
    audio.onerror = reject
    audio.src = src
  })
}

export const resources = {
  images: {
    startBg: '/images/little-prince-bg.jpg'
  },
  audio: {
    theme: '/audio/little-prince-theme.mp3'
  }
}