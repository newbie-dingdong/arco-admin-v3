<script setup lang="ts">
import { useFormItem } from '@arco-design/web-vue'
import { ref } from 'vue'
import request from '@/request'

const props = withDefaults(defineProps<{
  label?: string
  value?: string
  showAll?: boolean
  url: string
  multiple?: boolean
  placeholder?: string
  modelValue: string | Array<any>
}>(), {
  label: '',
  placeholder: '请选择',
  showAll: true,
  value: '',
  multiple: false,
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const { eventHandlers } = useFormItem()
const list = ref<Array<any>>([])
async function fetchData() {
  const ret = await request.get(props.url)
  if (ret.code == 200)
    list.value = ret.data as any
}
fetchData()
function handleChange(e: any) {
  emits('update:modelValue', e)
  eventHandlers.value?.onChange?.(e)
}
</script>

<template>
  <a-select :model-value="modelValue" :placeholder="placeholder" :multiple="multiple" @change="handleChange">
    <a-option v-if="showAll" label="全部" value="" />
    <a-option v-for="item in list" :key="item[value]" :value="item[value]" :label="item[label]" />
  </a-select>
</template>
