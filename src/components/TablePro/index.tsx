import { Pagination, Table } from '@arco-design/web-vue'
import { type Slots, computed, defineComponent, watch } from 'vue'
import TableProColumn from './components/column'
import TableProSearch from './components/search'
import tableProps from './props/table'
import useLoading from '@/hooks/useLoading'

export default defineComponent({
  name: 'TablePro',
  props: tableProps,
  setup(props, { expose }) {
    // 表格加载状态
    const { loading, setLoading } = useLoading(props.loading || true)
    // 筛选表格不隐藏的数据
    const tableColumns = props.columns.filter((columns) => !columns.hideInTable)
    // 筛选搜索不隐藏的数据
    const searchColumns = props.columns.filter((columns) => !columns.hideInSearch && columns.dataIndex !== 'index')
    // 异步请求数据列表
    const tableData = ref<any>([])
    // 总条数
    const total = ref<number>(0)
    // 公共请求参数
    const baseParams = reactive<{
      current: number
      pageSize: number
      [k: string]: any
    }>({
      current: 1,
      pageSize: 10
    })
    // 异步请求方法
    async function api() {
      if (!props.request) 
return
      setLoading(true)
      const ret = await props?.request?.(baseParams)
      setLoading(false)
      total.value = ret?.total || 0
      tableData.value = ret?.list || []
      return ret?.list || []
    }
    /**
     * @description 渲染表格
     */
    function renderTableColumn(slots: Slots) {
      return slots?.columns ? props.data && props.data.map((item) => slots.columns?.(item)) : <TableProColumn columns={tableColumns} />
    }
    // 传入data普通数据
    const protoData = computed(() => {
      setLoading(false)
      return props.data
    })
    /**
     * 渲染分页器
     */
    function renderPagination() {
      return total.value > 0 ? (
        <div class={'flex mt-4 items-center justify-between'}>
          <div class='flex items-center'>
            共&nbsp;<span class='text-#0066FF'>{total.value}</span>&nbsp;条信息
          </div>
          <div class={'flex items-center'}>
            <div class='w80px mr-2'>
              <a-select v-model={baseParams.pageSize} style='color:#0066FF'>
                <a-option value={10}>10</a-option>
                <a-option value={20}>20</a-option>
                <a-option value={50}>50</a-option>
                <a-option value={100}>100</a-option>
              </a-select>
            </div>
            <Pagination
              page-item-style={{
                backgroundColor: '#fff',
                border: '1px solid #E5E6EB',
                borderRadius: '4px'
              }}
              active-page-item-style={{
                backgroundColor: '#0066FF',
                border: '1px solid #0066FF',
                color: '#fff',
                borderRadius: '4px'
              }}
              onChange={(e) => (baseParams.current = e)}
              onPageSizeChange={(e) => (baseParams.pageSize = e)}
              total={total.value}
              current={baseParams.current}
              showTotal={false}>
              {{
                'page-item-step': ({ type }: { type: 'previous' | 'next' }) => (type == 'next' ? '下一页' : '上一页')
              }}
            </Pagination>
          </div>
        </div>
      ) : null
    }

    /**
     * 自动请求
     */
    watch(baseParams, () => {
      api()
    })

    api()

    function search(params: any) {
      Object.assign(baseParams, params)
    }

    function reload() {
      baseParams.current = 1
      api()
    }

    function renderToolbar() {
      return props.renderToolbar?.()
    }

    expose({ reload })
    return {
      renderTableColumn,
      renderPagination,
      loading,
      search,
      renderToolbar,
      searchColumns,
      data: props.request ? tableData : protoData
    }
  },
  render() {
    return (
      <div>
        <TableProSearch onHandleSearch={(params) => this.search(params)} columns={this.searchColumns} />
        <div class={'py-4 border-t-1 border-t-#eee border-t-solid'}>{this.renderToolbar && this.renderToolbar()}</div>
        <Table {...this.$props} loading={this.loading} data={this.data}>
          {{
            columns: () => this.renderTableColumn(this.$slots)
          }}
        </Table>
        {this.renderPagination()}
      </div>
    )
  }
})
