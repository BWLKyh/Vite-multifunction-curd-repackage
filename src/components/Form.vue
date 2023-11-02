<template>
  <div class="myForm">
    <div class="title">
      {{ title }}
      <slot name="header" :autoFill="autoFill"></slot>
    </div>
    <el-form ref="myForm" :model="dlgData" label-position="top">
      <el-form-item
        v-for="(item, index) in flat(formConfig)"
        :key="index"
        :label="item.label"
        :required="item.required"
        :prop="item.prop"
        :rules="item.rules"
      >
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="dlgData[item.prop]"
          type="date"
          :placeholder="item.placeholder || '请选择日期'"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
        <el-date-picker
          v-else-if="item.type === 'datetimerange'"
          v-model="dateTimeRange[item.prop]"
          type="datetimerange"
          unlink-panels
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
        <el-select
          v-else-if="item.type === 'tag'"
          multiple
          v-model="dlgData[item.prop]"
          :placeholder="item.placeholder || '请选择标签'"
        >
          <el-option
            v-for="(option, index1) in item.dict"
            :key="index1"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
        <el-switch
          v-else-if="item.type === 'switch'"
          :active-value="item.dict[0] || true"
          :inactive-value="item.dict[1] || false"
          v-model="dlgData[item.prop]"
          :placeholder="item.placeholder || '请选择'"
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="dlgData[item.prop]"
          :placeholder="item.placeholder || '请选择'"
        >
          <el-option
            v-for="(option, index1) in item.dict"
            :key="index1"
            :label="option.label"
            :value="option.label"
          ></el-option>
        </el-select>
        <el-input
          v-else-if="item.type === 'textarea'"
          type="textarea"
          v-model="dlgData[item.prop]"
          :placeholder="item.placeholder || '请输入文本内容'"
        />
        <el-input
          v-else-if="item.type === 'number'"
          type="number"
          v-model="dlgData[item.prop]"
          :placeholder="item.placeholder || '请输入数字'"
        />
        <el-input v-else v-model="dlgData[item.prop]" :placeholder="item.placeholder || '请输入'" />
      </el-form-item>
    </el-form>
    <div>{{ JSON.stringify(dlgData) }}</div>
    <span class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm(dlgData)"> 保存 </el-button>
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  title: String,
  formConfig: {
    type: Array,
    default: () => []
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})
const myForm = ref(null)
const dateTimeRange = ref(props.formData)
const dlgData = ref(props.formData)
watch(dateTimeRange, (n) => {
  dlgData.value = { ...dlgData.value, ...n }
})
const emits = defineEmits(['handleConfirm', 'handleCancel'])
function handleConfirm(row) {
  myForm.value.validate((valid) => {
    if (valid) {
      emits('handleConfirm', { ...row, ...dateTimeRange.value })
    } else {
      console.log('表单校验失败')
    }
  })
}
function handleCancel() {
  emits('handleCancel')
}
function flat(arr) {
  let newArr = []
  arr.forEach((l) => {
    if (Array.isArray(l.children)) {
      newArr.push(...flat(l.children))
    } else if (l.type !== 'index' && l.type !== 'option') {
      newArr.push(l)
    }
  })
  return newArr
}
function autoFill(range, data) {
  dateTimeRange.value = range
  dlgData.value = data
}
</script>

<style>
.myForm {
  /* width: 100%;
  height: 100%; */
}
.autoFill {
  position: absolute;
  right: 100px;
  top: 50px;
}
</style>
