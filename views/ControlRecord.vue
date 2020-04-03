<template>
    <div class="controlrecord" > 
        
    </div>
</template>
<script>
    import '@/assets/css/controlrecord.css'
    import { getRealCont,getHisCont,getRealControlDetail,getHisControlDetail } from '@/api/control.js'
    import { split_array } from '@/api/road.js'
    export default {
        name : 'controlrecord',
        data() {
            return {
                
            }
        },
        computed: {
            
        },
        mounted () {

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
<style scoped>

</style>