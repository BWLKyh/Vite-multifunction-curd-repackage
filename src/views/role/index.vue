<template>
  <div>
    <Table
      :loading="loading"
      :columns="columns"
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :total="total"
      :tableData="tableData"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @getData="getData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getList } from '@/api/role'
import Table from '@/components/Table.vue'

let loading = ref(false)
let pageIndex = ref(1)
let pageSize = ref(10)
let total = ref(0)
let tableData = ref([])
let columns = ref([
  {
    prop: 'id',
    label: 'Id',
    type: 'index',
    width: '60'
    // headerAlign:'center', 非必传,默认为center
    // align: 'center', 非必传,默认为center
  },
  {
    prop: 'name',
    label: 'RoleName',
    type: 'input',
    width: '100'
  },
  {
    prop: 'img',
    label: 'RoleImg',
    type: 'image',
    fit: 'fill',
    style: 'width: 100px; height: 50px'
    // width: '300'
  }
  // {
  //   label: '操作',
  //   type: 'option',
  //   width: '120'
  // }
])

onMounted(() => {
  getData()
})

// 获取数据
const getData = (params) => {
  loading.value = true
  if (params && params.pageIndex !== undefined && params.pageSize !== undefined) {
    pageIndex.value = params.pageIndex
    pageSize.value = params.pageSize
  }
  getList({ pageIndex: pageIndex.value, pageSize: pageSize.value }).then((res) => {
    console.log('getData res', res)
    loading.value = false

    const { records, total: count } = res.data
    tableData.value = records || []
    total.value = count
  })
}
</script>

<style scoped>
.mb20 {
  margin-bottom: 20px;
}
</style>
