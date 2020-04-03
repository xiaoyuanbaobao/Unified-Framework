import request from '@/util/request'
import qs from 'qs'

export function getUser() {
    return request({
      url: 'API/My',
      method: 'get'
    })
  }