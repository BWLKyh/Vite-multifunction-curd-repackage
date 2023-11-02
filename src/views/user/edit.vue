<template>
  <Form
    :title="user.formTitle"
    :formConfig="user.columns"
    :formData="user.formData"
    @handleConfirm="user.handleConfirm"
    @handleCancel="user.handleCancel"
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
import { useUserStore } from '@/stores/user'
import Form from '@/components/Form.vue'
const user = useUserStore()

const dateTimeRange = ref({
  workTimeRange: ['2023-11-25 00:00:00', '2023-12-21 00:00:00']
})
const dlgData = ref({
  name: '张三',
  phone: '13512345678',
  email: '123@qq.com',
  content: '这是一条自动填充的消息',
  tag: ['A', 'B', 'C'],
  status: '启用',
  date: '2022-01-01'
})
</script>

<style scoped></style>
