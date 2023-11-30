import type { RouteRecordRaw } from 'vue-router'

export function loadComponents() {
  return import.meta.glob('/src/views/**/*.vue')
}
export const asynComponents = loadComponents()

export function getComponent(str: any) {
  return asynComponents[`/src/${str}.vue`]
}

export function generateRoute(routes: any[]): RouteRecordRaw[] {
  const tempRoutes: RouteRecordRaw[] = []
  routes.forEach((item) => {
    if (getComponent(item.component)) {
      tempRoutes.push({
        name: item.name,
        path: item.path,
        component: getComponent(item.component),
        meta: { ...item.meta, hideInMenu: item.hidden },
        children: item.children?.length > 0 ? generateRoute(item.children) : []
      })
    }
  })
  return tempRoutes
}