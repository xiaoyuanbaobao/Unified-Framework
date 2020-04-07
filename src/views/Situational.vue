<template>
    <div class="situational" >
        <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
            态势感知
        </div>
    </div>
</template>
<script>
    import '@/assets/css/situational.css'
    import {  } from '@/api/situational.js'

    import echarts from '@/util/echarts.js'
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import Highmaps from 'highcharts/modules/map';

    HighchartsMore(Highcharts)
    Highmaps(Highcharts);
    
    export default {
        name : 'situational',
        data() {
            return { 
                
            }
        },
        computed: {
            
        },
        mounted () {
        },
        methods: {
            success(message) {
                const h = this.$createElement;

                this.$notify({
                title: '信息提示：',
                message: h('i', { style: 'color: teal'}, message)
                });
            },
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