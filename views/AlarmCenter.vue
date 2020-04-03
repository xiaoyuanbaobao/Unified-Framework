<template>
    <div class="alarmcenter" >
        
    </div>
</template>
<script>
    import '@/assets/css/alarmcenter.css'
    import { getRealAlarm,getHisAlarm,CannelAlarm,getRealAlarmDetail,getHisAlarmDetail } from '@/api/alarm.js'
    import { split_array } from '@/api/road.js'
    export default {
        name : 'alarmcenter',
        data() {
            return {
                
            }
        },
        computed: {
            
        },
        created () {

        },
        methods: {
            
            error(message) {
                this.$notify({
                title: '错误信息',
                message: h('i', { style: 'color: teal'}, message)
                });
            },
        }
    }
</script>
