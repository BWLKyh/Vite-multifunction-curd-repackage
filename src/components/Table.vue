<template>
  <div>
    <el-input
      class="search"
      v-model="keyword"
      clearable
      placeholder="输入关键字搜索任意字段, 清空恢复"
      @clear="handleSearch"
      @keydown.enter="handleSearch"
    />
    <slot name="header" :handleSearchColumn="handleSearchColumn"></slot>
    <el-table
      v-loading="loading"
      :data="myData"
      class="mb20"
      stripe
      border
      height="500"
      style="width: 100%"
    >
      <TableColumn
        v-for="(column, index) in columns"
        :key="index"
        :column="column"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      >
        <template v-for="slot in Object.keys(slots)" #[slot]="scope">
          <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
          <slot :name="slot" v-bind="scope" />
        </template>
      </TableColumn>
    </el-table>
    <el-pagination
      v-model:page-size="pSize"
      v-model:current-page="pIndex"
      background
      layout="total, sizes, prev, pager, next"
      :total="pTotal"
      :page-sizes="[10, 20, 30, 50]"
      @size-change="getData"
      @current-change="getData"
    />
  </div>
</template>

<script setup>
import TableColumn from '@/components/TableColumn.vue'
import { ref, watch, useSlots } from 'vue'
const slots = useSlots()
const props = defineProps({
  loading: Boolean,
  pageIndex: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  columns: {
    type: Array,
    default: () => []
  },
  tableData: {
    type: Array,
    default: () => []
  }
})
const pIndex = ref(props.pageIndex)
const pSize = ref(props.pageSize)
const pTotal = ref(props.total)
const myData = ref(props.tableData)
const keyword = ref('')
const tagDict = {
  A: '',
  B: 'success',
  C: 'warning',
  D: 'danger'
}
watch(
  () => props.tableData,
  (n) => (myData.value = n),
  { immediate: true, deep: true }
)
const emits = defineEmits(['handleEdit', 'handleDelete', 'getData'])
function handleEdit(id) {
  emits('handleEdit', id)
}
function handleDelete(id) {
  emits('handleDelete', id)
}
function getData() {
  emits('getData', { pageIndex: pIndex.value, pageSize: pSize.value })
}
function handleSearchColumn({ keyword, column }) {
  let key = (props.columns.find((l) => l.label === column) || {}).prop
  if (keyword && key) {
    myData.value = props.tableData.filter((l) => {
      return l[key].toString().indexOf(keyword) > -1
    })
  } else {
    myData.value = props.tableData
  }
}
function handleSearch() {
  if (keyword.value) {
    let keys = Object.keys(props.tableData[0])
    myData.value = props.tableData.filter((l) => {
      return keys.some((key) => {
        return l[key].toString().indexOf(keyword.value) > -1
      })
    })
  } else {
    myData.value = props.tableData
  }
}
</script>

<style>
.search {
  width: 300px;
  margin: 0 10px 10px 0;
}
.myTag {
  margin: 5px;
}
</style>
