<script setup lang="ts">
import { computed } from 'vue';
import { useFormItem } from '@arco-design/web-vue'
import { uploadApi } from '@/api/common'

const props = withDefaults(defineProps<{
  modelValue: any
  limit?: number
  disabled?: boolean
}>(), {
  disabled: false,
  limit: 1
})
const emits = defineEmits<{
  (e: 'update:modelValue', data: string | string[]): void
}>()
const { eventHandlers } = useFormItem()
const fileList = computed({
  get() {
    return typeof props.modelValue === 'string' && props.modelValue ? [{ url: props.modelValue }] : Array.isArray(props.modelValue) ? props.modelValue.map(item => ({ url: item })) : []
  },
  set(value: { url: string }[]) {
    if (props.limit === 1) {
      emits('update:modelValue', value[0].url)
    } else {
      emits('update:modelValue', value.map(item => item.url))
    }
  }
})

async function upload(option: any) {
  const formData = new FormData()
  formData.append('file', option.fileItem.file)
  const ret = await uploadApi(formData)
  if (ret.code == 200) {
    const list = fileList.value
    if (props.limit === 1) {
      fileList.value = [{ url: ret.msg }]
    } else {
      list.push({ url: ret.msg })
      fileList.value = list
    }
    eventHandlers.value?.onChange?.(fileList.value as any)
  }
}


function removeFile(fileItem: any) {
  console.log(fileList.value);
  console.log(fileItem);
  const url = fileItem.url
  const list = fileList.value
  const index = list.findIndex(item => item.url === url)
  if (index !== -1) {
    list.splice(index, 1)
    if (props.limit === 1) {
      fileList.value = [{ url: '' }]
    } else {
      fileList.value = list
    }
  }
}
</script>

<template>
  <a-upload
image-loading="lazy" image-preview :disabled="disabled" :custom-request="(upload as any)"
    list-type="picture-card" :file-list="(fileList as any)" :limit="limit" @before-remove="removeFile" />
</template>