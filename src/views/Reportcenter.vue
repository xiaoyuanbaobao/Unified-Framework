<template>
    <div class="reportcenter" >
            <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
                    报表中心
                </div>
        
    </div>
</template>
<script>
    import '@/assets/css/reportcenter.css'
    import {  } from '@/api/reportcenter.js'
    import { split_array } from '@/api/basemain.js'
    export default {
        name : 'reportcenter',
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
