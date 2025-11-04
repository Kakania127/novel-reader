// utils/fonts.js
export const fonts = {
  serif: '"Noto Serif SC", "Source Han Serif SC", "Source Han Serif", "SimSun", serif',
  sans: 'Inter, "Noto Sans SC", "Source Han Sans SC", "Source Han Sans", "Microsoft YaHei", sans-serif',
  mono: '"JetBrains Mono", "Cascadia Code", "Fira Code", "Consolas", monospace',
  handwriting: '"Caveat", cursive, "楷体", "华文行楷"'
}

export const getFontFamily = (fontType) => {
  return fonts[fontType] || fonts.serif
}

export const fontOptions = [
  { 
    value: 'serif', 
    label: '衬线体'
  },
  { 
    value: 'sans', 
    label: '无衬线体'
  },
  { 
    value: 'mono', 
    label: '等宽体'
  },
  { 
    value: 'handwriting', 
    label: '手写体'
  }
]

// 字体预加载
export const preloadCriticalFonts = () => {
  if (typeof window !== 'undefined') {
    console.log('字体预加载准备就绪')
  }
}