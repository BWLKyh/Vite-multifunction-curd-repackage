import Mock from 'mockjs'

export default class BaseMock {
  listApi = /\/*\/getList/
  detailApi = /\/*\/getItem/
  deleteApi = /\/*\/deleteItem/
  updateApi = /\/*\/updateItem/

  itemStruct = {
    // 单item数据结构
    id: '@increment',
    name: '@cname()',
    content: '@csentence(30)',
    'status|1': ['启用', '禁用'],
    date: '@date(yyyy-MM-dd)'
  }
  listData = null // 总数据

  constructor({
    total = 15,
    itemStruct = null,
    listApi = null,
    detailApi = null,
    deleteApi = null,
    updateApi = null
  }) {
    this.total = total // 总数
    this.itemStruct = itemStruct ?? this.itemStruct
    this.listApi = listApi ?? this.listApi
    this.detailApi = detailApi ?? this.detailApi
    this.deleteApi = deleteApi ?? this.deleteApi
    this.updateApi = updateApi ?? this.updateApi

    this.init()
  }

  init() {
    this.initData()
    this.mockApiList()
    this.mockApiDetail()
    this.mockApiEdit()
    this.mockApiDelete()
  }

  initData() {
    this.listData = Mock.mock({
      total: this.total,
      [`records|${this.total}`]: [this.itemStruct]
    })
    console.log('mock-data -> this.listData', this.listData)
  }

  mockApiList() {
    Mock.mock(this.listApi, 'post', (params) => {
      // console.log('params', params)
      const paramsObj = JSON.parse(params.body)
      const { pageIndex, pageSize } = paramsObj

      const start = (pageIndex - 1) * pageSize
      const end = pageIndex * pageSize

      return {
        code: 200,
        total: this.listData.records.length,
        records: this.listData.records.slice(start, end)
      }
    })
  }

  mockApiDetail() {
    Mock.mock(this.detailApi, 'post', (params) => {
      const id = this._getUrlParams(params.url, 'id')

      let data = null
      let msg = ''
      if (id) {
        const index = this.listData.records.findIndex((item) => String(item.id) === String(id))
        if (index !== -1) {
          data = this.listData.records[index]
        } else {
          msg = '没有发现id'
        }
      } else {
        msg = '缺少id'
      }

      return {
        code: 200,
        data,
        msg
      }
    })
  }

  mockApiEdit() {
    Mock.mock(this.updateApi, 'post', (params) => {
      const paramsObj = JSON.parse(params.body)

      let result = true
      let msg = ''

      if (paramsObj.id) {
        // 更新
        const index = this.listData.records.findIndex(
          (item) => String(item.id) === String(paramsObj.id)
        )
        if (index !== -1) {
          this.listData.records[index] = paramsObj
          msg = '修改成功'
        } else {
          result = false
          msg = '没有发现id'
        }
      } else {
        paramsObj.id = Mock.mock('@Guid')
        this.listData.records.unshift(paramsObj)
        msg = '新增成功'
      }

      return {
        code: 200,
        data: result,
        msg
      }
    })
  }

  mockApiDelete() {
    Mock.mock(this.deleteApi, 'post', (params) => {
      // console.log('params', params)
      const id = this._getUrlParams(params.url, 'id')

      let result = true
      let msg = ''
      if (id) {
        const index = this.listData.records.findIndex((item) => String(item.id) === String(id))
        if (index !== -1) {
          this.listData.records.splice(index, 1)
        } else {
          result = false
          msg = '没有发现id'
        }
      } else {
        result = false
        msg = '缺少id'
      }

      return {
        code: 200,
        data: result,
        msg
      }
    })
  }

  // 根据url获取query参数
  _getUrlParams(url, name) {
    //获取参数中？的索引位置
    const queryIndex = url.indexOf('?')
    //获取？后面的字符串
    if (queryIndex != -1) {
      const queryStr = url.substr(queryIndex + 1)

      //把pageIndex和pageSize切割成数组
      const queryStrArr = queryStr.split('&')

      //遍历数组,
      for (let i = 0; i < queryStrArr.length; i++) {
        //把pageIndex和pageSize的值分割出来
        const itemArr = queryStrArr[i].split('=')
        //判断
        if (itemArr[0] === name) {
          //返回pageIndex和pageSize的值给getQuery函数
          return itemArr[1]
        }
      }
    }
    //如果没有获取到？的索引就返回空
    return null
  }
}
