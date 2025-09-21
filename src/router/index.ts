import { createRouter, createWebHistory } from 'vue-router'
import TodaysGame from '@/views/TodaysGame.vue'
import PastGame from '@/views/PastGame.vue'
import Archive from '@/views/Archive.vue'
import NotFound from '@/views/NotFound.vue'
import { getDayNumber, getMsDifference } from '@/composables/day'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodaysGame,
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive,
    },
    {
      path: '/archive/:day',
      name: 'pastgame',
      component: PastGame,
      beforeEnter: (to, from, next) => {
        const dayNumber = Number(to.params.day)

        const todaysDiffMs = getMsDifference(new Date())
        const todaysNumber = getDayNumber(todaysDiffMs)

        if (dayNumber >= todaysNumber || dayNumber <= 0) {
          next({ name: 'notfound' })
        } else {
          next()
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound,
    },
  ],
})

export default router
