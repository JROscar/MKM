import request from '@/utils/request'
import { ServiceUrls } from '@/config/const'
import axios from 'axios'


const { baseService } = ServiceUrls

export function getList() {
  return request({
    url: baseService + 'Demo/getDemoTableData',
    method: 'get',
  })
}
