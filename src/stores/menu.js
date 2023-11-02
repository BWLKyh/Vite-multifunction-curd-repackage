import { getList, getItem, updateItem, deleteItem } from '@/api/menu'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
  const router = useRouter()
  const loading = ref(false)
  const pageIndex = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const tableData = ref([])
  const tagDict = ['A', 'B', 'C', 'D']
  const statusDict = ['启用', '禁用']
  const columns = ref([
    {
      prop: 'id',
      label: 'Id',
      type: 'index',
      fixed: 'left',
      width: '200'
      // headerAlign:'center', 非必传,默认为center
      // align: 'center', 非必传,默认为center
    },
    {
      label: '菜单信息',
      fixed: 'left',
      children: [
        {
          prop: 'name',
          label: '功能',
          type: 'input',
          required: true,
          width: '100'
        },
        {
          label: '具体参数',
          children: [
            {
              prop: 'route',
              label: '路径',
              type: 'input',
              rules: [
                { required: true, message: '请输入路径', trigger: 'blur' },
                {
                  pattern: /^\/[a-zA-Z0-9]+$/,
                  message: '路径格式不正确',
                  trigger: 'blur'
                }
              ],
              width: '140'
            },
            {
              prop: 'level',
              label: '权级',
              type: 'number',
              rules: [{ required: true, message: '请输入权级', trigger: 'blur' }],
              width: '200'
            }
          ]
        }
      ]
    },
    {
      prop: 'content',
      label: '功能描述',
      type: 'textarea'
      // width: '400'
    },
    {
      prop: 'tag',
      label: '标签',
      type: 'tag',
      dict: tagDict,
      width: '100'
    },
    {
      prop: 'status',
      label: 'Status',
      type: 'switch',
      dict: statusDict,
      width: '80'
    },
    {
      prop: 'date',
      label: '创建日期',
      type: 'date',
      width: '120'
    },
    {
      label: '操作',
      type: 'option',
      fixed: 'right',
      width: '120'
    }
  ])
  const formTitle = ref('')
  const formData = ref({})
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
      console.log('🚀 ~ file: menu.js:116 ~ getList ~ records:', records)
      tableData.value = records || []
      total.value = count
    })
  }
  // 新增
  const handleAdd = () => {
    formData.value = {}
    formTitle.value = '新增'
    router.push('menuEdit')
  }

  // 编辑
  const handleEdit = (id) => {
    getItem({ id }).then((res) => {
      console.log('detail res', res)
      const { data } = res.data
      formData.value = data
      formTitle.value = '编辑'
      router.push('menuEdit')
    })
  }
  // 删除
  const handleDelete = (id) => {
    deleteItem({ id }).then((res) => {
      console.log('delete res', res)
      if (res.data) getData()
    })
  }
  // 弹窗（保存|更新）- 确定
  const handleConfirm = (row) => {
    updateItem(row).then((res) => {
      console.log('edit|save res', res)
      const { data } = res.data || {}
      if (data) {
        if (formTitle.value === '新增') {
          // 新增回到第一页
          pageIndex.value = 1
        }
        router.push('menu')
      }
    })
  }
  // 取消
  const handleCancel = () => {
    pageIndex.value = 1
    router.push('menu')
  }
  return {
    loading,
    pageIndex,
    pageSize,
    total,
    tableData,
    columns,
    formTitle,
    formData,
    getData,
    handleAdd,
    handleEdit,
    handleDelete,
    handleConfirm,
    handleCancel
  }
})
