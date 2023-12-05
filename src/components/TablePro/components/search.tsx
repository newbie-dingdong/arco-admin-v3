import { defineComponent, reactive, ref } from 'vue'
import type { PropType } from 'vue'
import { Button, Form, FormItem, Grid, GridItem, Input, Select, Space } from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import type { TableProColumn } from '../types'

function listToObject(list: TableProColumn[], key: keyof TableProColumn) {
  const obj = list.reduce((acc: any, item: any) => {
    Object.keys(item).forEach(() => {
      acc[item[key]] = ''
    })
    return acc
  }, {})
  return obj
}

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<TableProColumn[]>,
      default: () => []
    }
  },
  emits: ['handleSearch'],
  setup(props, { emit }) {
    const formRef = ref<typeof Form | null>(null)
    const collapsed = ref<boolean>(false)
    const params = reactive<any>(listToObject(props.columns, 'dataIndex'))
    function handleSubmit() {
      emit('handleSearch', { ...params, current: 1 })
    }
    function resetForm() {
      formRef.value?.resetFields()
    }

    function renderSelect(column: TableProColumn) {
      return (
        column.enum && (
          <Select allowClear defaultValue={''} placeholder={`请选择${column.title}`} v-model={params[column.dataIndex as string]}>
            <Select.Option value={''}>全部</Select.Option>
            {Object.entries(column.enum).map((item) => (
              <Select.Option value={item[0]} key={item[0]}>
                {item[1]}
              </Select.Option>
            ))}
          </Select>
        )
      )
    }

    function renderInput(column: TableProColumn) {
      return <Input allowClear v-model={params[column.dataIndex as string]} placeholder={`请输入${column.title}`} />
    }

    function renderCustom(column: TableProColumn) {
      const Component: any = column.renderFormItem?.(params)
      return <Component v-model={params[column.dataIndex as string]} />
    }

    function renderFormItem(column: TableProColumn) {
      return column.enum ? renderSelect(column) : column.renderFormItem ? renderCustom(column) : renderInput(column)
    }

    function toggleCollapsed() {
      collapsed.value = !collapsed.value
    }
    return {
      params,
      formRef,
      collapsed,
      resetForm,
      toggleCollapsed,
      renderFormItem,
      handleSubmit
    }
  },
  render() {
    return (
      <Form ref='formRef' onSubmit={this.handleSubmit} autoLabelWidth model={this.params}>
        <div class={'flex items-start flex-wrap justify-between gap-20px'}>
          <div class={'flex-1'}>
            <Grid collapsed={this.collapsed} colGap={16} cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}>
              {this.columns.map((column) => {
                return (
                  <GridItem>
                    <FormItem label={column.title} field={column.dataIndex}>
                      {this.renderFormItem(column)}
                    </FormItem>
                  </GridItem>
                )
              })}
            </Grid>
          </div>
          <div>
            <FormItem hideLabel>
              <Space>
                {/* <Button
                  v-slots={{
                    icon: () => (this.collapsed ? <IconDown /> : <IconUp />)
                  }}
                  onClick={this.toggleCollapsed}
                  type={'primary'}>
                  {this.collapsed ? '展开' : '收起'}
                </Button> */}
                <Button v-slots={{ icon: () => <IconSearch /> }} htmlType={'submit'} type={'primary'}>
                  搜索
                </Button>
                <Button onClick={() => this.resetForm()} v-slots={{ icon: () => <IconRefresh /> }}>
                  重置
                </Button>
              </Space>
            </FormItem>
          </div>
        </div>
      </Form>
    )
  }
})
