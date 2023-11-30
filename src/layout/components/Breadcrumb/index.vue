<script setup lang="ts">

defineProps<{
  list: string[]
}>()
</script>

<template>
  <a-breadcrumb class="mb-3">
    <!-- 面包屑 -->
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in list" :key="item">
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
