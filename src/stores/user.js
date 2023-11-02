import { getList, getItem, updateItem, deleteItem } from '@/api/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const loading = ref(false)
  const pageIndex = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const tableData = ref([])
  const tagDict = ['A', 'B', 'C', 'D']
  const statusDict = ['启用', '禁用']
  var checkEmail = (rule, value, cb) => {
    //验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (regEmail.test(value)) {
      //合法的邮箱
      return cb()
    }
    //邮箱不合法
    cb(new Error('请输入合法的邮箱！'))
  }
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
      label: '个人信息',
      fixed: 'left',
      children: [
        {
          prop: 'name',
          label: 'UserName',
          type: 'input',
          required: true,
          width: '100'
        },
        {
          label: '联系方式',
          children: [
            {
              prop: 'phone',
              label: '电话号码',
              type: 'input',
              rules: [
                { required: true, message: '手机号必填', trigger: 'blur' },
                { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
              ],
              width: '140'
            },
            {
              prop: 'email',
              label: '邮箱',
              type: 'input',
              rules: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { validator: checkEmail, trigger: 'blur' }
              ],
              width: '200'
            }
          ]
        }
      ]
    },
    {
      prop: 'content',
      label: 'Content',
      type: 'textarea',
      width: '400'
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
      prop: 'workTimeRange',
      label: '工作时间',
      type: 'datetimerange',
      width: '400'
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
      console.log('🚀 ~ file: user.js:116 ~ getList ~ records:', records)
      tableData.value = records || []
      total.value = count
    })
  }
  // 新增
  const handleAdd = () => {
    formData.value = {}
    formTitle.value = '新增'
    router.push('userEdit')
  }

  // 编辑
  const handleEdit = (id) => {
    getItem({ id }).then((res) => {
      console.log('detail res', res)
      const { data } = res.data
      formData.value = data
      formTitle.value = '编辑'
      router.push('userEdit')
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
        router.push('user')
      }
    })
  }
  // 取消
  const handleCancel = () => {
    pageIndex.value = 1
    router.push('user')
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
