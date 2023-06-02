<script lang="ts" setup>
defineOptions({
  name: '首页',
})

const columns = ref([
  {
    type: 'selection',
  },
  {
    prop: 'date',
    label: '日期',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    label: '地址',
    children: [
      {
        prop: 'address',
        label: '省份',
      },
    ],
  },
])
const data = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
])
</script>

<template>
  <CustomTable :columns="columns" :data="data">
    <el-table-column label="地址">
      <el-table-column
        prop="address"
        label="省份"
      />
    </el-table-column>
  </CustomTable>
</template>
