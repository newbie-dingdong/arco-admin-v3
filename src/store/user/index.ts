import { defineStore } from 'pinia'
import { Message } from '@arco-design/web-vue'
import { clearToken, setToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import useAppStore from '@/store/app'

const useUserStore = defineStore('useUserStore', () => {
  const userInfo = reactive({
    username:'',
  })
  const logoutCallBack = () => {
    const appStore = useAppStore()
    // this.resetInfo()
    clearToken()
    removeRouteListener()
    appStore.clearServerMenu()
  }
  // Logout
  const logout = async () => {
    try {
      // await userLogout()
    } finally {
      logoutCallBack()
    }
  }
  const getUser = async () => {
    Object.assign(userInfo,{username:'管理员'})
    // const ret = await getUser()
    // if (ret.code == 200) Object.assign(userInfo, ret.data)
    // else logout()
  }

  const login = async (loginForm: { username: string; password: string }) => {
    try {
      // const ret = await login(loginForm)
      // if (ret.code == 200) {
        setToken('token')
        Message.success('登录成功')
        getUser()
      // }
    } catch (err) {
      clearToken()
      throw err
    }
  }

  return {
    userInfo,
    logout,
    getUser,
    login
  }
})

export default useUserStore
