<template>
    <div class="rtmonitor">       
            <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
                    实时监测
                </div>
    </div>
</template>
<script>
    import '@/assets/css/rtmonitor.css'
    import {  } from '@/api/rtmonitor.js'

    import echarts from '@/util/echarts.js'
    
    export default {
        name : 'rtmonitor',
        components: {},
        data() {
            return {
                
            }
        },
        computed: {
           
        },
        methods: {
            
            error(message) {
                const h = this.$createElement;

                this.$notify({
                    title: '错误信息',
                    message: h('i', { style: 'color: teal'}, message)
                });
            },
        }
    }
</script>
