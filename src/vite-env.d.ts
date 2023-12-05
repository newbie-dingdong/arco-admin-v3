/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
}

declare module 'nprogress'
declare module 'lodash'
declare module 'file-saver'
declare module '@wangeditor/editor-for-vue'