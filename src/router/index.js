import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '@/views/StartPage.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartPage
  },
  {
    path: '/reader',
    name: 'Reader',
    component: () => import('@/components/novel/NovelLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router