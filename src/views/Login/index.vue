<script setup lang="ts">
import SubmitForm from './components/submit-form.vue'
import Footer from '@/layout/components/Footer/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
</script>

<template>
  <view class="login-container h-screen flex">
    <div class="logo fixed left-4 text-white top-4">
      <Logo />
    </div>
    <div class="w-[550px] left" />
    <div class="right relative flex-1 flex justify-center items-center">
      <div class="right-inner">
        <SubmitForm />
      </div>
      <div class="login-footer absolute bottom-0">
        <Footer />
      </div>
    </div>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  .left {
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }
}
</style>

<!-- 2023/6/25 9:27 --fcg -->
