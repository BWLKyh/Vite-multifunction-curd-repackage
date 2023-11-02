<template>
  <Form
    :title="menu.formTitle"
    :formConfig="menu.columns"
    :formData="menu.formData"
    @handleConfirm="menu.handleConfirm"
    @handleCancel="menu.handleCancel"
  >
    <template #header="{ autoFill }">
      <el-button type="primary" class="autoFill" @click="autoFill(dateTimeRange, dlgData)"
        >一键填充</el-button
      >
    </template>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
import Form from '@/components/Form.vue'
const menu = useMenuStore()

const dateTimeRange = ref({})
const dlgData = ref({
  name: '增删改查',
  route: '/curd',
  email: '123@qq.com',
  level: 1,
  content: '这是一个新功能',
  tag: ['A', 'B', 'C'],
  status: '启用',
  date: '2022-01-01'
})
</script>

<style scoped></style>
