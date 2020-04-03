<template>
    <div class="runanalysis" >
        
    </div>
</template>
<script>
    import '@/assets/css/runanalysis.css'
    import echarts from '@/util/echarts.js'
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import Highmaps from 'highcharts/modules/map';

    HighchartsMore(Highcharts)
    Highmaps(Highcharts);
    
    export default {
        name : 'runanalysis',
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