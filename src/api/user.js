import { request } from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user/getList',
    method: 'post',
    data
  })
}

export function deleteItem(params) {
  return request({
    url: '/user/deleteItem',
    method: 'post',
    params
  })
}

export function getItem(params) {
  return request({
    url: '/user/getItem',
    method: 'post',
    params
  })
}

export function updateItem(data) {
  return request({
    url: '/user/updateItem',
    method: 'post',
    data
  })
}
