import BaseMock from '../baseMock'

export default class Role extends BaseMock {
  constructor() {
    const listApi = '/api/role/list'
    const total = 15
    const itemStruct = {
      // 单item数据结构
      id: '@increment',
      name: '@cname()',
      img: '@image'
    }

    super({ total, itemStruct, listApi })
  }
}
