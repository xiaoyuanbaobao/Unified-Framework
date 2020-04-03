import Vue from 'vue'
import Router from 'vue-router'
import RunAnalysis from '@/views/RunAnalysis'
import RealTime from '@/views/RealTime'
import ControlRecord from '@/views/ControlRecord'
import AlarmCenter from '@/views/AlarmCenter'
import StrategyCenter from '@/views/StrategyCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      redirect:"/analysis"
    },
    {
      path: '/realtime',
      name: 'realtime',
      component: RealTime
    },
    {
      path: '/alarm',
      name: 'alarmcenter',
      component: AlarmCenter
    },
    {
      path: '/analysis',
      name: 'runanalysis',
      component: RunAnalysis
    },
    {
      path: '/strategy',
      name: 'strategycenter',
      component: StrategyCenter
    },
    {
      path: '/record',
      name: 'controlrecord',
      component: ControlRecord
    }
  ]
})
