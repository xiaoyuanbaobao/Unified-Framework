<template>
  <div id="app">
      <el-container>
        <el-header>
          <div class="navbar">
            <el-row style="width:100%;">
              <el-col :span="6" style="text-align:left;padding-left:20px;"> 
                  <div class="grid-content head_nav" style="float:left;width:100px" >
                    <div v-model="isCollapse" style="height:50px;width:50px;cursor: pointer;" @click="changeMune" >
                        <img style="width:100%;height:100%;border-radius:50%;margin:5px 0px" src="./assets/imgs/ali-icon-menu.svg" alt="">
                    </div>
                    <el-menu :default-active="this.$router.path"  router style="display:inline-block; margin:20px 0 0 -250px;" class="el-menu-vertical-demo myMenu" 
                      text-color="#94B2D0" active-text-color="#ffd04b" :collapse="isCollapse">
                          <el-menu-item index="situational">
                              <i class="el-icon-menu"></i>
                              <span slot="title">态势感知</span>
                          </el-menu-item>
                          <el-menu-item index="rtmonitor">
                            <i class="el-icon-location"></i>
                            <span slot="title">实时监测</span>
                          </el-menu-item>
                          <el-menu-item index="ommanage">
                              <i class="el-icon-setting"></i>
                              <span slot="title">运维管理</span>
                            </el-menu-item>
                          <el-menu-item index="manalysis">
                              <i class="el-icon-edit"></i>
                              <span slot="title">专题分析</span>
                            </el-menu-item>         
                          <el-menu-item index="alarm">
                              <i class="el-icon-warning"></i>
                              <span slot="title">报警中心</span>
                          </el-menu-item>
                          <el-menu-item index="report">
                              <i class="el-icon-document"></i>
                              <span slot="title">报表中心</span>
                          </el-menu-item>
                          <el-menu-item index="dispatch">
                            <i class="el-icon-service"></i>
                            <span slot="title">调度中心</span>
                        </el-menu-item>
                    </el-menu> 
                </div>
              </el-col>
              <el-col class="hidden-sm-and-down" style="height:60px;text-align:center" :span="12">
                <div class="grid-content clear" style="line-height:60px;">
                  <h1>
                      变电所运行管理平台
                  </h1>
                  <!-- <p style="font-size:.9rem;margin-top:5px;">Substation operation management</p> -->
                </div>  
              </el-col>
              <el-col :span="6" >
                <div class="grid-content head_exit" style="padding-right:20px;">
                  <span class="user">{{username}}</span>
                  <img @click="handleClose" src="./assets/imgs/swt-icon-exit.svg" alt="">
                </div>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-container>
          <el-main v-bind:style="main_height">  
              <router-view/>
          </el-main>
        </el-container>
      </el-container>  
  </div>
</template>

<script>
import '@/assets/css/app.css' 
import 'element-ui/lib/theme-chalk/display.css';
import { getUser } from '@/api/login.js'
export default {
  name: 'App',
  data() {
    return {
      isCollapse: false,
      isOpen: false,
      username: ''
    }
  },
  computed: {
    main_height() {
        var main_height = document.documentElement.clientHeight - 61 + 'px';
        var main_css = 'height:' + main_height;
        return main_css;
    }
  },
  mounted () {
    this.getData();
  },
 methods: {
    getData() {
      getUser().then(res=>{
        this.username = res.data.fullName;
      }).catch(err=>{
        console.log(err);
      })
    },
    /*菜单弹出*/ 
    changeMune(){
      console.log(this.isOpen);
      if(!this.isOpen){
        $('.myMenu').animate({left:"220px"});
      }else(
        $('.myMenu').animate({left:"-200px"})
      )
      this.isOpen=!this.isOpen;
    },
    /* 点击退出当前应用事件 */
    handleClose() {
      // 返回登录页面
      // if(top.SmartApp==undefined)
      //   {
      //       top.location.href='/';
      //   }
      //   else{
      //       top.SmartApp.close();
      //   }
      //   return false;
      //  返回应用页面方法
      if(top.IOC==undefined)
        {
            top.location.href='/';
        }
        else{
            top.IOC.close();
        }
        return false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}
@keyframes rifhtToLeft{
  from {margin-left:-100px}
  to {margin-left:-20px}
}
</style>
