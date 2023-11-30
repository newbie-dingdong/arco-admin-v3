<script setup lang="ts">
import { IconImport } from '@arco-design/web-vue/es/icon'
import dayjs from 'dayjs'
import config from '@/config'
import router from '@/router'
import Logo from '@/layout/components/Logo/index.vue'
import useUserStore from '@/store/user'
import useAppState from '@/store/app'

const userStore = useUserStore()
const useApp = useAppState()
async function goto(name: string) {
  await userStore.logout()
  router.push({ name })
}
</script>

<template>
  <div class="z-[100] fixed top-0 w-full justify-between items-center bg-white border-b h-[60px] flex">
    <div :style="{ width: `${useApp.slideWidth  }px` }" class="logo px cursor-pointer" @click="goto('dashboard')">
      <Logo />
    </div>
    <div class="right px flex-1 cursor-pointer flex-center-between">
      <div class="text-base">
        {{ config.title }}
      </div>
      <div class="flex-center">
        <div class="mr-3">{{ dayjs().format('YYYY年MM月DD日') }}</div>
        <a-dropdown>
          <a-avatar>{{ userStore?.userInfo?.username || '管理员' }}</a-avatar>
          <template #content>
            <a-button class="!text-black hover:!text-[#165dff]" type="text" @click="goto('login')">
              <template #icon>
                <IconImport :rotate="180" />
              </template>
              退出登录
            </a-button>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
