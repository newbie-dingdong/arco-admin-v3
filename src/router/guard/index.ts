import type { Router } from 'vue-router'
import setupUserLoginInfoGuard from './userLoginInfo'
import setupPermissionGuard from './permission'
import { setRouteEmitter } from '@/utils/route-listener'
import config from '@/config'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    document.title = `${config.title}-${to?.meta?.title}`
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
  setupPermissionGuard(router)
}
