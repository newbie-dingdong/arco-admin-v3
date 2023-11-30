<script setup lang="ts">
import { reactive, ref } from 'vue'
import config from '@/config'
import type { ISubmitFormReturn } from '@/types'
import router from '@/router'
import useLoading from '@/hooks/useLoading'
import useUserStore from '@/store/user'

const userStore = useUserStore()
const { loading, setLoading } = useLoading()
const errorMessage = ref('')
const params = reactive({
  username: 'admin',
  password: 'admin',
})
async function handleSubmit(data: ISubmitFormReturn) {
  if (!data.errors) {
    if (loading.value)
      return
    setLoading(true)
    try {
      await userStore.login(params)
      const {...othersQuery } = router.currentRoute.value.query
      router.push({
        name: 'home',
        // name: 'home',
        query: {
          ...othersQuery,
        },
      })
    }
    catch (err) {
      errorMessage.value = (err as Error).message
    }
    finally {
      setLoading(false)
    }
  }
}
</script>

<template>
  <div class="login-form w-[320px]">
    <div class="font-medium text-black text-lg">
      {{ config.title }}
    </div>
    <div class="error-msg text-[0.6rem] h-4 text-red-700">
      {{ errorMessage }}
    </div>
    <div class="form mt-1">
      <a-form :model="params" @submit="handleSubmit">
        <a-form-item
          :validate-trigger="['change', 'blur']" :rules="[{ required: true, message: '请输入账号' }]"
          field="username" hide-label
        >
          <a-input v-model="params.username" placeholder="账号" allow-clear>
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-trigger="['change', 'blur']" :rules="[{ required: true, message: '请输入密码' }]"
          field="password" hide-label
        >
          <a-input-password v-model="params.password" placeholder="密码" allow-clear>
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-button :loading="loading" class="mt-2" html-type="submit" type="primary">
          登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<!-- 2023/6/25 11:35 --fcg -->
