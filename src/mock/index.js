import Mock from 'mockjs'

Mock.setup({
  timeout: '200-1000' // 指定被拦截的 Ajax 请求的响应时间，单位是毫秒
})

const modules = import.meta.globEager('./module/*.js')

Object.keys(modules).forEach((key) => {
  const Obj = modules[key].default
  new Obj()
})
