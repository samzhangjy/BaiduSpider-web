import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Web from '@/views/Web.vue'
import Teapot from '@/views/Teapot.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
