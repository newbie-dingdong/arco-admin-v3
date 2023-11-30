import { ref } from 'vue'
import type { TableRowSelection } from '@arco-design/web-vue'

type IKeys = (string | number)[]

function useSelection(defaultSelectedKeys?: IKeys) {
  const selectedKeys = ref<IKeys>(defaultSelectedKeys || [])

  const selectionConfig: TableRowSelection = {
    type: 'checkbox',
    showCheckedAll: true
  }

  function setSelectedKeys(keys: IKeys) {
    selectedKeys.value = keys
  }

  return {
    selectedKeys,
    setSelectedKeys,
    selectionConfig
  }
}

export default useSelection
