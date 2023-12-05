<script setup lang="ts">
import { computed } from 'vue'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
import Menu from '@/layout/components/Menu/index.vue'
import NavBar from '@/layout/components/NavBar/index.vue'
import Footer from '@/layout/components/Footer/index.vue'
import TagView from '@/layout/components/TagView/index.vue'
import useAppState from '@/store/app/index.ts'
import useTags from '@/store/app/tags'

const useTag = useTags()

const APP = useAppState()
const routeNames = computed(() => useTag.isCatchRoute.map(item => item.name))
</script>

<template>
  <a-layout class="h-screen bg-[#f2f3f5]">
    <NavBar />
    <a-layout-sider
class="layout-slider" :style="{ width: `${APP.slideWidth}px` }" :collapsed="APP.slideCollapsed"
      breakpoint="xl">
      <div class="layout-slider-container relative h-full">
        <Menu />
        <a-button class="slide-toggle" @click="APP.toggleCollapsed">
          <IconMenuUnfold v-if="APP.slideCollapsed" />
          <IconMenuFold v-else />
        </a-button>
      </div>
    </a-layout-sider>
    <a-layout :style="{ paddingLeft: `${APP.slideWidth}px` }" class="layout-content w-full">
      <a-layout class="layout-content-container">
        <TagView />
        <a-layout-content class="p-3">
          <router-view v-slot="{ Component }">
            <transition appear name="slide-right" mode="out-in">
              <keep-alive :include="routeNames">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </a-layout-content>
        <a-layout-footer>
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="css" scoped>
.layout-slider {
  @apply pt-[60px] overflow-y-hidden fixed left-0 h-full z-[99];
}

.slide-toggle {
  @apply bg-white absolute right-1.5 bottom-1 px-1 h-[24px];
}

.layout-content {
  @apply pt-[60px];

  .layout-content-container {
    @apply relative;
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

<!-- 2023/6/25 10:25 --fcg -->
