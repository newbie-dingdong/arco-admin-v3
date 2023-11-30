import { defineComponent } from 'vue'
import { TableColumn as Td } from '@arco-design/web-vue'
import type { PropType } from 'vue'
import type { TableProColumn } from '../types'
import type { TableColumnCellItem } from '../props/table'

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<TableProColumn[]>,
      default: () => []
    }
  },
  setup(props) {
    /**
     * @description 渲染表格项
     * @returns {JSX}
     */
    function renderTableColumnCell() {
      return (
        props.columns &&
        props.columns.map((columns) => {
          return (
            <Td {...columns}>
              {{
                cell: ({ record, rowIndex }: TableColumnCellItem) => format({ record, column: columns, rowIndex })
              }}
            </Td>
          )
        })
      )
    }

    /**
     * @description 格式化显示数据
     * @param record - 每行数据
     * @param columns - 每行属性
     * @param rowIndex - 当前是第几行
     * @returns {string | JSX}
     */
    function format({ record, column, rowIndex }: TableColumnCellItem) {
      const normalValue = record[column.dataIndex as string]
      const data = column?.enum ? column.enum[normalValue] : normalValue
      if (column.dataIndex == 'index') 
return rowIndex + 1
      if (column.renderCell) 
return column.renderCell(data)
      if (column.renderTableItem) 
return column.renderTableItem(record, rowIndex)
      return data
    }
    return {
      renderTableColumnCell
    }
  },
  render() {
    return this.renderTableColumnCell()
  }
})
