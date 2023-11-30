import { defineConfig, transformerDirectives } from 'unocss'

const rules = [
  [/^border-(solid|dashed)-([a-z]+|#[a-z0-9]+)-(\d+)$/, ([, type, color, number]) => ({
    border: `${number}rpx ${type} ${color}`,
  })],
]

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#00a4fc', // 主色
      },
      black: {
        dark: '#000000', // 纯黑
        DEFAULT: '#333333', // 主文字色
        light: '#666666', // 辅助文字
        lighter: '#999999', // 辅助文字
      },
      gray: {
        DEFAULT: '#F5F5F5', // 背景色
        100: '#eee', // 分割线色
        200: '#CCCCCC', // 失效色
        300: '#BBBBBB', // 辅助文字
      },
      orange: {
        DEFAULT: '#ff7d00',
      },
      blue: {
        DEFAULT: '#008BFD',
        100: '#61698F', // 标题链接色
      },
      red: {
        DEFAULT: '#f00',
        light: '#f56c6c',
      },
      green: {
        DEFAULT: '#46BB36',
      },
      golden: {
        DEFAULT: '#D4B076',
      },
    },
  },
  rules,
  shortcuts: [
    {
      'px': 'pl-4 pr-4',
      'py': 'pt-3 pb-3',
      'flex-center': 'flex justify-center items-center',
      'ui-page': 'bg-[#f9f9f9] h-full',
      'ui-button-primary': '!bg-primary !text-white text-xs py-2 px-3',
      'ui-button-danger': 'bg-red-light text-white text-xs py-2 px-3',
      'border-b-base': 'border-b-1 border-b-solid border-b-gray-100',
      'border-t-base': 'border-t-1 border-t-solid border-t-gray-100',
      'flex-center-between': 'flex items-center justify-between',
    },
  ],
})
