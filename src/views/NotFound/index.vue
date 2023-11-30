<script setup lang="ts">
import router from '@/router'
</script>

<template>
  <a-result status="404" subtitle="访问的路径不存在">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="router.back()">
          返回
        </a-button>
      </a-space>
    </template>
  </a-result>
</template>

<style lang="scss" scoped></style>

<!-- 2023/6/27 11:34 --fcg -->
