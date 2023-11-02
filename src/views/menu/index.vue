<template>
  <div>
    <div class="btn-c mb20">
      <el-button link @click="menu.handleAdd">新增</el-button>
    </div>
    <Table
      :loading="menu.loading"
      :columns="menu.columns"
      :pageIndex="menu.pageIndex"
      :pageSize="menu.pageSize"
      :total="menu.total"
      :tableData="menu.tableData"
      @handleEdit="menu.handleEdit"
      @handleDelete="menu.handleDelete"
      @getData="menu.getData"
    >
      <template #header="{ handleSearchColumn }">
        <Search column="UserName" @handleSearch="handleSearchColumn" />
        <Search column="创建日期" @handleSearch="handleSearchColumn" />
      </template>
      <template #header-content>
        <div class="myText">
          自定义表头
          <div class="myHeader">联系电话</div>
        </div>
      </template>
      <template #cell-date-2="{ row, column }">
        <div class="myText" v-if="row[column.prop]">
          自定义单元格
          <div class="myCell">{{ row[column.prop] }}</div>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Table from '@/components/Table.vue'
import Search from '@/components/Search.vue'
import { useMenuStore } from '@/stores/menu'
const menu = useMenuStore()

onMounted(() => {
  menu.getData()
})
</script>

<style scoped>
.btn-c {
  text-align: right;
}

.mb20 {
  margin-bottom: 20px;
}
.myHeader {
  padding: 10px;
  color: #0066ff;
  font-size: 20px;
}
.myRow {
  background-color: #ffe600;
  font-size: 16px;
}
.myColumn {
  color: #00ffb3;
  font-size: 16px;
}
.myCell {
  color: #ff0000;
  font-size: 16px;
  border: 1px solid #00ff40;
}
.myText {
  font-size: 10px;
  font-weight: bold;
}
</style>
