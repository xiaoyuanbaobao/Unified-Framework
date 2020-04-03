import request from '@/util/request'
import qs from 'qs'

export function fetchRoadList(GroupFullTag) {
  return request({
    // url: 'API/System/LCPS/ObjectClass/Road?v=2',
    url: 'API/System/LCPS/Facility' + GroupFullTag,
    method: 'get'
  })
}

export function fetchRoadLists() {
  return request({
    url: '/API/System/LCPS/ObjectClass/LDZM',
    method: 'get'
  })
}
/* 获取实时监测表格数据 */
export function fetchRoadDetail(GroupFullTag) {
  // 将GroupFullTag字符串中所有的 . 替换成 /
  GroupFullTag = GroupFullTag.slice(5).replace(/\./g,"/");
  return request({
    url: 'API/System/LCPS/Facility/'+ GroupFullTag,
    method: 'get'
  });
}

/* 获取路灯数量 */
export function getLampCount(){
  return request({
    url: '/API/System/LCPS/Facility/BJUT/C01/RunKPI',
    method: 'get'
  })
}

/* 获取路等地图的方法 */
export function getMapArea() {
  return request({
    url: 'Project/LCPS/srv/map/getMapArea.tjs',
    method: 'get',
    dataType: "json",
    context: this,
  })
}

/* 获取历史运行模式信息 */
export function getHisModeStatus(szOPCFullPath,time1) {
  szOPCFullPath = szOPCFullPath.slice(5).replace(/\./g,"/");
  return request({
    url: 'API/System/LCPS/Facility/'+szOPCFullPath+'/ModeStatus/Statistics/Hour',
    methods: 'get'
  })
}

/* 获取历史开关状态信息 */
export function getHisStartStopStatus(szOPCFullPath,time1) {
  szOPCFullPath = szOPCFullPath.slice(5).replace(/\./g,"/");
  return request({
    url: 'API/System/LCPS/Facility/'+szOPCFullPath+'/StartStopStatus/Statistics/Hour',
    methods: 'get'
  })
}

/* 获取路灯用电量排名的信息 */
export function getStreetNode() {
  return request({
    url: 'API/System/ECPS/Facility/BJUT/C01/G0001/L0002',
    methods: 'get'
  })
}

export function getPowerRanking(params) {
  return request({
    url: 'API/System/ECPS/Facility/BJUT/C01/G0001/L0002/'+ params.nodeTag+'/TotalEnergy/Statistics/Day?year='+params.year+'&month='+params.month+'&day='+params.day,
    methods: 'get'
  })
}


/* 获取运行分析历史用电数据方法 */
export function getUseTotalE(params) {
  // 将GroupFullTag字符串中所有的 . 替换成 /
  // szOPCFullPath = szOPCFullPath.slice(5).replace(/\./g,"/");
  return request({
    // url: 'API/System/LCPS/Facility/'+ szOPCFullPath+'/TotalEReal/Statistics/Day?year='+time2.year+'&month='+time2.month,
    url: 'API/System/LCPS/Mining/Statistics/Hour?groupby=Time&keyvalue=TotalEReal&startTime='+params.startTime+'&endTime='+params.endTime+'&NodeFullTag='+params.NodeFullTag,
    method: 'get'
  });
}

/* 开、关灯时获取RuleID 时的get请求 params中包括 */
export function getActionTaskList(params) {
  return request({
    url: 'PROJECT/LCPS/API/GetActionTaskList',
    method: 'get',
    params:params
  })
}

/* 发送post开、关灯请求事件 */
export function pushActionTask(data) {
  // console.log(qs.stringify({"a":1,"b":[1,2,3],"c":{"D":4,"F":5}}))
  return request({
    url: 'PROJECT/LCPS/API/PushActionTask',
    method: 'PUT',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    data: data,
    transformRequest: [function (data) {
      return qs.stringify(data);
    }]
  })
}

/* 该方法处理分页时的请求数据 */
export function split_array(arr,start,end) {
  const result = [];
  for (let i = start; i < arr.length&&i<end; i++) {
      result.push(arr[i]);
  }
  return result;
}
