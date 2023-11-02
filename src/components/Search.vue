<template>
  <el-input
    class="search"
    v-model="keyword"
    clearable
    :suffix-icon="Search"
    :placeholder="`输入关键字搜索 ${column} 字段`"
    @clear="handleSearch"
    @keydown.enter="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const props = defineProps({
  column: String
})
const keyword = ref('')
const emits = defineEmits(['handleSearch'])
function handleSearch() {
  emits('handleSearch', { keyword: keyword.value, column: props.column })
}
</script>

<style></style>
