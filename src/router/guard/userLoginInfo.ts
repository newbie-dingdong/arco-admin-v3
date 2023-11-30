import type { LocationQueryRaw, Router } from 'vue-router'

import NProgress from 'nprogress' // progress bar

import useUserStore from '@/store/user'
import { isLogin } from '@/utils/auth'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (isLogin()) {
      if (userStore.userInfo.username) { // 正式环境修改
        next()
      } else {
        try {
          await userStore.getUser()
          next()
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query
            } as LocationQueryRaw
          })
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query
        } as LocationQueryRaw
      })
    }
  })
}
