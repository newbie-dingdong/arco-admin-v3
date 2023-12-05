<script setup lang="ts">
import useTags from '@/store/app/tags';

const useTag = useTags();
</script>

<template>
  <div class="bg-#fff border-t-solid  border-t-1  border-t-#eee px-3">
    <a-scrollbar style="overflow: auto;">
      <div class="flex gap-10px py-1 items-center flex-nowrap">
        <div v-for="(item, index) in useTag.tagList" :key="item.name" class="bg-#fff">
          <a-tag
checkable :checked="item.name === useTag.activeName"
            :color="item.name === useTag.activeName ? '#165dff' : '#cfcccc'" closable size="medium"
            @check="useTag.checkTag(item)" @close="useTag.removeTag(index)">{{ item.title }}</a-tag>
        </div>
      </div>
    </a-scrollbar>
  </div>
</template>