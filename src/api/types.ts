import type { ValidatedError } from '@arco-design/web-vue'

export interface PaginOptions {
  pageNum: number
  pageSize: number
}

export interface ResListOptions<T> extends PaginOptions {
  total: number
  list: T
}

export type MyPickOption<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface FormVaildate {
  values: Record<string, any>
  errors: Record<string, ValidatedError> | undefined
  ev?: Event
}