<template>
  <el-table-column
    v-if="column.children"
    :label="column.label"
    :width="column.width"
    :fixed="column.fixed"
    :header-align="column.headerAlign || 'center'"
    :align="column.align || 'center'"
  >
    <TableColumn
      v-for="(column, index) in column.children"
      :key="index"
      :column="column"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    >
      <template v-for="slot in Object.keys(slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </TableColumn>
  </el-table-column>
  <el-table-column
    v-else
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :fixed="column.fixed"
    :header-align="column.headerAlign || 'center'"
    :align="column.align || 'center'"
  >
    <template #header v-if="slots[`header-${column.prop}`]">
      <slot :name="`header-${column.prop}`"></slot>
    </template>
    <template #default="{ row, $index }">
      <div v-if="column.type === 'option'">
        <el-button link @click="handleEdit(row.id)">编辑</el-button>
        <el-button link @click="handleDelete(row.id)">删除</el-button>
      </div>
      <!--先列后行-->
      <slot
        v-else-if="slots[`cell-${column.prop}-${$index}`]"
        :name="`cell-${column.prop}-${$index}`"
        :row="row"
        :column="column"
      ></slot>
      <slot
        v-else-if="slots[`row-${$index}`]"
        :name="`row-${$index}`"
        :row="row"
        :column="column"
      ></slot>
      <slot
        v-else-if="slots[`column-${column.prop}`]"
        :name="`column-${column.prop}`"
        :row="row"
        :column="column"
      ></slot>
      <div v-else-if="column.type === 'tag'">
        <el-tag
          :type="tagDict[tag]"
          class="myTag"
          v-for="(tag, index) in row[column.prop] || []"
          :key="index"
          >{{ tag }}</el-tag
        >
      </div>
      <div
        v-else-if="column.type === 'datetimerange' && row[column.prop] && row[column.prop].length"
      >
        {{ `${row[column.prop][0]} 至 ${row[column.prop][1]}` }}
      </div>
      <div v-else-if="column.type === 'select'">
        {{ getValue(row[column.prop], column.dict).label }}
      </div>
      <el-image
        v-else-if="column.type === 'image'"
        :src="row[column.prop]"
        :fit="column.fit"
        :style="column.style"
      ></el-image>
      <div v-else>{{ row[column.prop] }}</div>
    </template>
  </el-table-column>
</template>

<script setup>
import TableColumn from '@/components/TableColumn.vue'
import { useSlots } from 'vue'
const slots = useSlots()
defineProps({
  column: {
    type: Object,
    default: () => ({})
  }
})
const tagDict = {
  A: '',
  B: 'success',
  C: 'warning',
  D: 'danger'
}
const emits = defineEmits(['handleEdit', 'handleDelete'])
function getValue(key, dict) {
  return dict.find((l) => l.value === key) || {}
}
function handleEdit(id) {
  emits('handleEdit', id)
}
function handleDelete(id) {
  emits('handleDelete', id)
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
