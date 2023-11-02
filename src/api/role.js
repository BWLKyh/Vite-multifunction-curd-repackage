import { request } from '@/utils/request'

export function getList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}
