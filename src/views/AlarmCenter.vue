<template>
    <div class="alarmcenter" >
            <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
                    报警中心
                </div>
        
    </div>
</template>
<script>
    import '@/assets/css/alarmcenter.css'
    import {  } from '@/api/alarmcenter.js'
    import { split_array } from '@/api/basemain.js'
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
