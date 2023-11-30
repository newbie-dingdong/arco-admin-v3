<script setup lang="ts">
import TablePro from '@/components/TablePro';
import type { TableProColumn } from '@/components/TablePro/types';

const cloumns: TableProColumn[] = [
  {
    dataIndex: 'index',
    title: '序号',
    hideInSearch: true
  },
  {
    dataIndex: 'name',
    title: '姓名'
  },
  {
    dataIndex: 'password',
    title: '密码'
  }
]
const list = [
  {
    id: 1,
    name: '张三',
    password: '123'
  },
  {
    id: 2,
    name: '李四',
    password: '456'
  }
]
async function fetchData() {
  return { list, total: 2 }
}
</script>

<template>
  <a-card title="用户管理" :bordered="false" class="list-container">
    <TablePro row-key="id" :request="fetchData" :columns="cloumns">

    </TablePro>
  </a-card>
</template>

<style lang="scss" scoped></style>
