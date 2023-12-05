// 2023/6/5 10:07 --fcg
import type { RouteRecordRaw } from 'vue-router'
import defaultLayout from '@/layout/default-layout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: defaultLayout,
    name: 'home',
    meta: { title: '首页', icon: 'icon-apps' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', hideInMenu: true, activeMenu: 'home' }
      }
    ]
  },
  // {
  //   path: 'https://baidu.com',
  //   component: defaultLayout,
  //   name:'link',
  //   meta: { icon: 'icon-apps', title: '百度' },
  //   children: [
  //     {
  //       path: '/baidu',
  //       name: 'baidu',
  //       component: () => null,
  //       meta: { title: '百度',hideInMenu:true }
  //     }
  //   ]
  // },
  {
    component: defaultLayout,
    meta: { icon: 'icon-user', title: '用户管理' },
    path: '/user',
    redirect: '/user/list',
    name: 'user',
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/user-manager/index.vue'),
        meta: { title: '用户管理',catch:true, activeMenu: 'user', icon: 'icon-user', hideInMenu: true }
      }
    ]
  },

  {
    path: '/aa',
    component: defaultLayout,
    redirect: '/aa/b',
    name: 'aa',
    meta: { icon: 'icon-user', title: '用户中心', roles: ['admin'] },
    children: [
      {
        path: '/aa/b',
        name: 'UserCenter',
        component: () => import('@/views/user/user-center/index.vue'),
        meta: { title: '用户中心', activeMenu: 'aa', icon: 'icon-user', hideInMenu: true }
      }
    ]
  }
]
export default routes
