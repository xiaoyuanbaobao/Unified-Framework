<template>
    <div class="ommanage" > 
            <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
                    运维管理
                </div>
       
    </div>
</template>
<script>
    import '@/assets/css/ommanage.css'
    import { getRealCont,getHisCont,getRealControlDetail,getHisControlDetail } from '@/api/ommanage.js'
    import { split_array } from '@/api/basemain.js'
    export default {
        name : 'ommanage',
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