<script setup lang="ts">
import { useRoute } from 'vue-router';

import useTags from '@/store/app/tags'

const { name } = useRoute()
const useTag = useTags()
</script>

<template>
  <a-scrollbar style="overflow: auto;">
    <div class="flex border-t-1 gap-10px border-t-solid border-t-#eee bg-#fff py-1 px-3 items-center flex-nowrap w2000px">
      <a-tag
v-for="(item, index) in useTag.tagList" :key="item.name" checkable :checked="item.name === useTag.activeName"
        :color="item.name === useTag.activeName ? '#165dff' : '#cfcccc'" closable size="medium"
        @check="useTag.checkTag(item)" @close="useTag.removeTag(index)">{{ item.title }}</a-tag>
    </div>
  </a-scrollbar>
</template>