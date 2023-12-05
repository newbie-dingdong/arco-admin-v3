<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, shallowRef } from 'vue';
import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { uploadApi } from '@/api/common';


defineProps<{
  modelValue: any
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', data: string): void
}>()

const editorRef = shallowRef()

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video']
}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容',
  MENU_CONF:{
    uploadImage:{
      async customUpload(file:File,insertFn: any){
        const formData = new FormData()
        formData.append('file', file)
        const ret = await uploadApi(formData)
        if(ret.code==200) {
          insertFn(ret.msg,'','')
        }
      }
    }
  }
}



function handleChange(e: any) {
  const html = e.getHtml()
  emits('update:modelValue', html)
}

function handleCreated(editor: any) {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

</script>

<template>
  <div class="w-full h-400px overflow-y-hidden border-1 border-#ccc border-solid">
    <Toolbar style="border-bottom: 1px solid #ccc" :default-config="toolbarConfig" :editor="editorRef" />
    <Editor :default-config="editorConfig" :model-value="modelValue" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<style lang="css">
@import '@wangeditor/editor/dist/css/style.css';
</style>
