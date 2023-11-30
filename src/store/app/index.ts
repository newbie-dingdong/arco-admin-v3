// 2023/6/25 16:06 --fcg

import { defineStore } from 'pinia'
import { type RouteRecordRaw } from 'vue-router'
import { type Ref, computed } from 'vue'
import config from '@/config'
import { generateRoute } from '@/utils'

interface AppStateReturn {
  slideCollapsed: Ref<boolean>
  appAsyncMenus: Ref<Array<RouteRecordRaw>>
  menuFromServer: Ref<boolean>
  toggleCollapsed: () => void
  slideWidth: Ref<number>
  clearServerMenu: () => void
  fetchServerMenuConfig: () => Promise<any>
}
const useAppState = defineStore('useAppState', (): AppStateReturn => {
  const appAsyncMenus = ref<Array<any>>([])
  const slideCollapsed = ref<boolean>(false)
  const menuFromServer = ref<boolean>(config.asyncFetchMenu)
  const toggleCollapsed = () => {
    slideCollapsed.value = !slideCollapsed.value
  }
  const slideWidth = computed(() => (!slideCollapsed.value ? config.slideWidth || 220 : 48))

  const fetchServerMenuConfig = async () => {
    // const ret = await routes()
    // if (ret.code == 200) {
    //   const routes = generateRoute(ret.data)
    //   appAsyncMenus.value = routes
    // }
  }
  const clearServerMenu = () => {
    appAsyncMenus.value = []
  }
  return {
    appAsyncMenus,
    clearServerMenu,
    slideCollapsed,
    toggleCollapsed,
    slideWidth,
    menuFromServer,
    fetchServerMenuConfig
  }
})

export default useAppState
