import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Web from '@/views/Web.vue'
import Teapot from '@/views/Teapot.vue'
import News from '@/views/News.vue'
import Video from '@/views/Video.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/search/web',
    name: 'Web',
    component: Web
  },
  {
    path: '/teapot',
    name: 'Teapot',
    component: Teapot
  },
  {
    path: '/search/news',
    name: 'News',
    component: News
  },
  {
    path: '/search/video',
    name: 'Video',
    component: Video
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
