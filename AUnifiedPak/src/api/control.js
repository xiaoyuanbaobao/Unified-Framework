import request from '@/util/request'

/* 获取实时控制信息 */
export function getRealCont(params) {
    return request({
      url: 'Project/LCPS/srv/Control/getRealControl.ejs?_='+ params._,
      method: 'get'
    })
}
/* 获取历史控制信息 */
export function getHisCont(params) {
  return request({
    url: 'Project/LCPS/srv/Control/getHisControl.ejs?startTime='+ params.startTime+ '&endTime='+ params.endTime +'&_='+ params._,
    method: 'get'
  })
}
/* 获取实时控制展开页信息 */
export function getRealControlDetail(ObjID) {
  return request({ 
    url: 'Project/LCPS/srv/Control/getRealControlDetail.ejs?actionid='+ ObjID.actionid,
    method: 'get'
  })
}

/* 获取历史控制展开页信息 */
export function getHisControlDetail(ObjID) {
  return request({ 
    url: 'Project/LCPS/srv/Control/getHisControlDetail.ejs?actionid='+ ObjID.actionid,
    method: 'get'
  })
}

