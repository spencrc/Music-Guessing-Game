import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Archive from '../views/Archive.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Game,
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive,
    },
  ],
})

export default router
