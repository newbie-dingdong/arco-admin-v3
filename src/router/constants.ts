import type { RouteRecordRaw } from 'vue-router'

export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
]

export const NOT_FOUND = {
  name: 'notFound',
}

export const REDIRECT_ROUTE_NAME = 'redirect'

export const DEFAULT_ROUTE_NAME = 'home'

export const DEFAULT_ROUTE = {
  title: '首页',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/home',
}

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')

export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/NotFound/index.vue'),
}
