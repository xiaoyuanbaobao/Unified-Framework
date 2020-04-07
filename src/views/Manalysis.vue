<template>
    <div class="manalysis" > 
            <div style="font-size:20px;color:red;margin:200px 100px 100px 300px ">
                    专题分析
                </div>
    </div>
</template>
<script>
    import '@/assets/css/manalysis.css'
    import {  } from '@/api/manalysis.js'
    export default {
        name : 'manalysis',
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
                const h = this.$createElement;

                this.$notify({
                title: '错误信息',
                message: h('i', { style: 'color: teal'}, message)
                });
            },
        }
    }
</script>
<style scoped>
.addStr{
    width: 100%;
    background-color: rgb(29, 50, 79);
    padding-left: 20px;
}
.tableList {
    background-color: #fff;
    width: 100%;
    height: 300px;
    overflow: scroll;
}
</style>