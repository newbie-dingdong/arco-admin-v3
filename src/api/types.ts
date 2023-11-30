export interface PaginOptions {
  pageNum: number
  pageSize: number
}

export interface ResListOptions<T> extends PaginOptions {
  total: number
  list: T
}

export type MyPickOption<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
