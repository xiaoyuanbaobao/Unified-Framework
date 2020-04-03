import request from '@/util/request'

export function fetchList(params) {
    return request({
      url: 'API/System/LCPS/ObjectClass/Road',
      method: 'get',
      params: params
    })
  }