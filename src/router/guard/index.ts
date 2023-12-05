import type { Router } from 'vue-router'
import setupUserLoginInfoGuard from './userLoginInfo'
import setupPermissionGuard from './permission'
import { setRouteEmitter } from '@/utils/route-listener'
import config from '@/config'
import useTags from '@/store/app/tags'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    const { addTag } = useTags()
    document.title = `${config.title}-${to?.meta?.title}`
    // emit route change
    addTag({
      name: to.name as string,
      params: to.params,
      catch: !!to.meta.catch as boolean,
      title: to.meta.title as string,
      query: to.query
    })
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
  setupPermissionGuard(router)
}
