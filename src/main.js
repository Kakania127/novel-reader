import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// 导入 Motion 插件
import { MotionPlugin } from '@vueuse/motion'
// 导入路由
import router from './router'

const app = createApp(App)

// 注册 Motion 插件
app.use(MotionPlugin)
// 注册路由
app.use(router)

app.mount('#app')