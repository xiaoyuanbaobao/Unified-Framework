import request from '@/util/request'
import qs from 'qs'

/* 实时报警数据  */
export function getRealAlarm(params) {
    return request({
      url: 'Project/LCPS/srv/alarm/getRealAlarm.ejs?_='+params._,
      method: 'get'
    })
}
/* 历史报警数据 */ 
export function getHisAlarm(params) {
  return request({
    // url: 'Project/ECPS/srv/alarm/getRealAlarm.tjs?',  
    url: 'Project/LCPS/srv/alarm/getHisAlarm.ejs?startTime='+params.startTime+"&endTime="+params.endTime+'&_='+params._,
    method: 'get'
  })
}

/* 实时报警数据展开信息 */
export function getRealAlarmDetail(ObjID) {
  return request({ 
    url: 'Project/LCPS/srv/alarm/getRealAlarmDetail.ejs?alarmid='+ ObjID.alarmid,
    method: 'get'
  })
}

/* 历史报警数据展开信息 */
export function getHisAlarmDetail(ObjID) {
  return request({ 
    url: 'Project/LCPS/srv/alarm/getHisAlarmDetail.ejs?alarmid='+ ObjID.alarmid,
    method: 'get'
  })
}

/* 取消报警 */
export function CannelAlarm(data) {
  return request({
    url: 'Project/LCPS/srv/alarm/setAlarmRemove.tjs',
    method: 'post',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    data: data,
    transformRequest: [function (data) {
      return qs.stringify(data);
    }]
  })
}