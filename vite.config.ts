import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJSX(),
    UnoCSS(),
    vitePluginForArco({ style: 'css', iconPrefix: 'icon' }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    AutoImport({
      resolvers: [ArcoResolver()],
      imports: [
        {
          vue: ['ref', 'reactive'],
        },
      ],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        globalsPropValue: 'readonly',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  server: {
    port: 3001,
  },
})
