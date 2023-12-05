import { Message, Modal } from '@arco-design/web-vue'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'

export interface HttpResponse<T = unknown> {
  code: number
  data: T
  msg: string
}
const SUCCESS_CODE = 200
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  withCredentials: true
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) 
config.headers.Authorization = `Bearer ${token}`
  if (config.params) {
    // 空值参数直接删除
    Object.keys(config.params).forEach((item) => {
      if (!config.params[item]) 
delete config.params[item]
    })
  }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data
    if(response.headers['content-disposition']) { // 文件流下载
      if (data.type && data.type == 'application/json') {
        data.text().then((res: any) => {
          const json = JSON.parse(res)
          Message.error(json.msg)
        })
        return
      }
      const fileName = response.headers['content-disposition'].split('attachment;fileName=')
      const name = decodeURI(escape(fileName[1]))
      const blob = new Blob([data])
      saveAs(blob,name)
      return
    }
    if (data.code !== SUCCESS_CODE) {
      if (response.request?.responseType != 'blob') {
        Message.error(data.msg)
      }
      if ([401].includes(data.code) && response.config.url != '/login') {
        Modal.error({
          title: '登录过期',
          content: '您可以取消以留在此页面上，或重新登录',
          okText: '重新登录',
          async onOk() {
            const userStore = useUserStore()
            await userStore.logout()
            window.location.reload()
          }
        })
      }
      // return Promise.reject(new Error(data.msg) || 'Error')
    }

    return data
  },
  (error) => {
    Message.error({
      content: error.msg || '服务器错误'
    })
  }
)

export default {
  get<T>(url: string, data?: object, responseType?: ResponseType | any, headers?: object): Promise<HttpResponse<T>> {
    return instance.get(url, { params: data, responseType, headers })
  },
  post<T>(url: string, data?: object, headers?: object): Promise<HttpResponse<T>> {
    return instance.post(url, data, { headers })
  },
  put<T>(url: string, data?: object, headers?: object): Promise<HttpResponse<T>> {
    return instance.put(url, data, { headers })
  },
  delete<T>(url: string, data?: object): Promise<HttpResponse<T>> {
    return instance.delete(url, data)
  }
}
