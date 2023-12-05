<script setup lang="tsx">
import TablePro from '@/components/TablePro'
import type { TableProColumn } from '@/components/TablePro/types';

defineOptions({
  name: 'UserCenter'
})
const column: TableProColumn[] = [
  {
    dataIndex: 'index',
    title: '序号',
  },
  {
    dataIndex: 'name',
    title: '姓名',
  },
  {
    dataIndex: 'sex',
    title: '性别',
    enum: {
      0: '男',
      1: '女'
    }
  }
]

const data = [{
  name: '啧啧啧',
  id: 1,
  sex: 0
}, {
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
{
  name: '啊啊啊',
  id: 2,
  sex: 1
},
]

async function api() {
  return {
    list: data,
    total: data.length
  }
}
</script>

<template>
  <a-card :bordered="false" title="用户中心">
    <TablePro :request="api" :columns="column">
    </TablePro>
  </a-card>
</template>
