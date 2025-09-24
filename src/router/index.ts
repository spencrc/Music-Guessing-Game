import { createRouter, createWebHistory } from 'vue-router'
import Game from '@/components/Game.vue'
import Archive from '@/views/Archive.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import ROUTE_NAMES from '@/router/constants.ts'
import { getDayNumber, getMsDifference, getTargetDate } from '@/composables/day'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.HOME,
      component: Game,
      props: () => ({
        day: getDayNumber(getMsDifference(new Date())),
      }),
    },
    {
      path: '/archive',
      name: ROUTE_NAMES.ARCHIVE,
      component: Archive,
    },
    {
      path: '/archive/:day',
      name: ROUTE_NAMES.PAST_GAME,
      component: Game,
      props: (to) => ({
        day: getDayNumber(getMsDifference(getTargetDate(Number(to.params.day)))),
      }),
      beforeEnter: (to, from, next) => {
        const dayNumber = Number(to.params.day)

        const todaysDiffMs = getMsDifference(new Date())
        const todaysNumber = getDayNumber(todaysDiffMs)

        if (dayNumber === todaysNumber) {
          next({ name: ROUTE_NAMES.HOME })
        } else if (dayNumber > todaysNumber) {
          next({ name: ROUTE_NAMES.UNAUTHORIZED })
        } else if (dayNumber <= 0 || isNaN(dayNumber)) {
          next({ name: ROUTE_NAMES.NOT_FOUND })
        } else {
          next()
        }
      },
    },
    {
      path: '/401',
      name: ROUTE_NAMES.UNAUTHORIZED,
      component: ErrorPage,
      props: { status: 401, message: 'UNAUTHORIZED' },
    },
    {
      path: '/404',
      name: ROUTE_NAMES.NOT_FOUND,
      component: ErrorPage,
      props: { status: 404, message: 'PAGE NOT FOUND' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

export default router
