import request from '@/util/request'
import qs from 'qs'

export function getLightChart(params) {
    return request({
        // url: 'API/System/LCPS/Mining/Statistics/Hour?groupby=Time&keyvalue=Illminance&NodeFullTag=LCPS.BJUT.C01.Light&startTime='+params.startTime+"&endTime="+params.endTime,
        url: 'API/System/LCPS/Facility/BJUT/C01/Light/Illminance/History?startTime='+params.startTime+"&endTime="+params.endTime,
        method: 'GET'
    })
}