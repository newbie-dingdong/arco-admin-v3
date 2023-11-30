// 2023/6/25 9:33 --fcg
import { createPinia } from 'pinia'
import plugin from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(plugin)

export default pinia
