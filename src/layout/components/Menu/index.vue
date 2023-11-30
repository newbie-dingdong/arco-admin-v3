<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import useMenuTree from './use-menu-tree'
import MenuIcon from './menu-icon.vue'
import useAppState from '@/store/app'
import { listenerRouteChange } from '@/utils/route-listener'

export default defineComponent({
  name: 'MenuBase',
  emit: ['collapse'],
  setup() {
    const APP = useAppState()
    const router = useRouter()
    const route = useRoute()
    const { menuTree } = useMenuTree()
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])
    const goto = (item: RouteRecordRaw) => {
      if (item.path.includes('http')) {
        window.open(item.path)
        selectedKey.value = [item.name as string];
        return;
      }
      const { hideInMenu, activeMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string]
        return
      }

      // Trigger router change
      router.push({
        name: item.name,
      })
    }
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind)
          return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }

    listenerRouteChange((newRoute) => {
      const { activeMenu, hideInMenu } = newRoute.meta
      if ((!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)
        const keySet = new Set([...menuOpenKeys.filter(p=>!!p), ...openKeys.value])
        openKeys.value = [...keySet]
        selectedKey.value = [(activeMenu as string) || menuOpenKeys[menuOpenKeys.length - 1]]
      }
    }, true)
    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon ? <MenuIcon icon={element.meta.icon as string} /> : null
            const node
              = element?.children && element?.children.length !== 0
                ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon: () => icon,
                      title: () => <span>{element?.meta?.title || ''}</span>,
                    }}>
                    {travel(element.children)}
                  </a-sub-menu>
                )
                : (
                  <a-menu-item key={element?.name} v-slots={{ icon: () => icon }} onClick={() => goto(element)}>
                    {element?.meta?.title}
                  </a-menu-item>
                )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }
    // v-model:open-keys={openKeys.value}
    return () => {
      return (
        <a-menu
          breakpoint='xl'
          collapsed={APP.slideCollapsed}
          v-model:open-keys={openKeys.value}
          selected-keys={selectedKey.value}
          auto-open-selected
          level-indent={34}
          style='height: 100%;width:100%;'>
          {renderSubMenu()}
        </a-menu>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
