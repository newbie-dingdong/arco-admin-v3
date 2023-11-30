import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from './constants'
import createRouteGuard from './guard'
import routes from './routes'

NProgress.configure({ showSpinner: false })
const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue'),
      meta: { hideInMenu: true },
    },
    ...routes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
