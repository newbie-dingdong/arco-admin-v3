import type { RouteRecordNormalized, Router } from 'vue-router'

import NProgress from 'nprogress' // progress bar
import routes from '../routes'
import { NOT_FOUND, WHITE_LIST } from '../constants'
import usePermission from '@/hooks/usePermission'
import useAppState from '@/store/app'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const appStore = useAppState()
    const Permission = usePermission()
    const permissionsAllow = Permission.accessRouter(to)
    if (appStore.menuFromServer) { // 从服务器请求菜单
      if (!appStore.appAsyncMenus.length && !WHITE_LIST.find((el) => el.name === to.name)) 
await appStore.fetchServerMenuConfig()
      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]
      let exist = false
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift()
        if (element?.name === to.name) 
exist = true
        if (element?.children) 
serverMenuConfig.push(...(element.children as unknown as RouteRecordNormalized[]))
      }
      if (exist && permissionsAllow) {
        next()
      } else {
        next(NOT_FOUND)
      }
    } else {
      if (permissionsAllow) {
        next()
      } else {
        // 寻找符合权限的菜单
        const destination = Permission.findFirstPermissionRoute(routes, 'admin') || NOT_FOUND
        next(destination)
      }
    }
    NProgress.done()
  })
}
