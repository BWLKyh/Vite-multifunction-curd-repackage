<template>
  <div>
    <div class="btn-c mb20">
      <el-button link @click="user.handleAdd">新增</el-button>
    </div>
    <Table
      :loading="user.loading"
      :columns="user.columns"
      :pageIndex="user.pageIndex"
      :pageSize="user.pageSize"
      :total="user.total"
      :tableData="user.tableData"
      @handleEdit="user.handleEdit"
      @handleDelete="user.handleDelete"
      @getData="user.getData"
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
      <template #row-4="{ row, column }">
        <div class="myText" v-if="row[column.prop]">
          自定义行
          <div class="myRow">{{ row[column.prop] }}</div>
        </div>
      </template>
      <template #column-name="{ row, column }">
        <div class="myText" v-if="row[column.prop]">
          自定义列
          <div class="myColumn">{{ row[column.prop] }}</div>
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
import { useUserStore } from '@/stores/user'
const user = useUserStore()

onMounted(() => {
  user.getData()
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
  border: 1px solid #6200ff;
}
.myText {
  font-size: 10px;
  font-weight: bold;
}
</style>
