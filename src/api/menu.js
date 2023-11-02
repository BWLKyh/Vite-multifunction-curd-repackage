import { request } from '@/utils/request'

export function getList(data) {
  return request({
    url: '/menu/getList',
    method: 'post',
    data
  })
}

export function deleteItem(params) {
  return request({
    url: '/menu/deleteItem',
    method: 'post',
    params
  })
}

export function getItem(params) {
  return request({
    url: '/menu/getItem',
    method: 'post',
    params
  })
}

export function updateItem(data) {
  return request({
    url: '/menu/updateItem',
    method: 'post',
    data
  })
}
