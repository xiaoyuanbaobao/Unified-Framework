import Vue from 'vue'
import Router from 'vue-router'
import Situational from '@/views/Situational'
import RTmonitor from '@/views/RTmonitor'
import OMmanage from '@/views/OMmanage'
import Alarmcenter from '@/views/Alarmcenter'
import Reportcenter from '@/views/Reportcenter'
import Dispatchcenter from '@/views/Dispatchcenter'
import Manalysis from '@/views/Manalysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      redirect:"/situational"
    },
    {
      path: '/rtmonitor',
      name: 'rtmonitor',
      component: RTmonitor
    },
    {
      path: '/alarm',
      name: 'alarmcenter',
      component: Alarmcenter
    },
    {
      path: '/report',
      name: 'reportcenter',
      component: Reportcenter
    },
    {
      path: '/dispatch',
      name: 'dispatchcenter',
      component: Dispatchcenter
    },
    {
      path: '/situational',
      name: 'situational',
      component: Situational
    },
    {
      path: '/manalysis',
      name: 'manalysis',
      component: Manalysis
    },
    {
      path: '/ommanage',
      name: 'ommanage',
      component: OMmanage
    }
  ]
})
