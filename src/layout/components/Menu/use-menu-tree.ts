import { computed } from 'vue'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash'
import useAppState from '@/store/app'
import usePermission from '@/hooks/usePermission'
import routes from '@/router/routes'

export default function useMenuTree() {
  const permission = usePermission()
  const appState = useAppState()
  const appRoute = computed(() => {
    if (appState.menuFromServer)
      return appState.appAsyncMenus
    else
      return routes
  })
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[]
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes)
        return null
      const collector: any = _routes.map((element) => {
        // no access
        if (!permission.accessRouter(element))
          return null

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter(x => x.meta?.hideInMenu !== true)

        // Associated child node
        const subItem = travel(element.children, layer + 1)
        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (!element.meta?.hideInMenu)
          return element

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })
  return {
    menuTree,
  }
}
