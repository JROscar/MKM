import request from '@/utils/request'
import { ServiceUrls } from '@/config/const'
import axios from 'axios'


const { baseService } = ServiceUrls

export function login(data) {
  return request({
    //url: '/vue-admin-template/user/login',
    url: baseService + 'System/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: baseService + 'System/getUserInfo',
    method: 'get',
    //params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
