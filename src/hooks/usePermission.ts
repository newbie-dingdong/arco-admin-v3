import { type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'

// import useUserStore from '@/store/user'

export default function usePermission() {
  // const userStore = useUserStore()
  return {
    //  路由判断
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.roles
        || (route.meta?.roles as Array<string>)?.includes('*')
        || (route.meta?.roles as Array<string>)?.includes('admin')
      )
    },
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        )
          return { name: firstElement.name }
        if (firstElement?.children)
          cloneRouters.push(...firstElement.children)
      }
      return null
    },
    // You can add any rules you want
  }
}
