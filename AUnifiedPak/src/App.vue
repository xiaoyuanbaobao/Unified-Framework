<template>
  <div id="app">
      <el-container>
        <el-header>
          <div class="navbar">
            <el-row style="width:100%;">
              <el-col :span="6" style="text-align:left;padding-left:20px;"> 
                  <div class="grid-content head_nav" style="float:left;width:100px" >
                    <div v-model="isCollapse" style="height:50px;width:50px;cursor: pointer;" @click="changeMenu()">
                        <img style="width:100%;height:100%;border-radius:50%;margin:5px 0px" src="./assets/imgs/ali-icon-menu.svg" alt="">
                    </div>
                    <el-menu :default-active="this.$router.path" router  style="display:inline-block; margin:20px 0 0 -15px;" class="el-menu-vertical-demo" 
                      text-color="#94B2D0" active-text-color="#ffd04b" :collapse="isCollapse">
                          <el-menu-item index="analysis">
                              <i class="el-icon-location"></i>
                              <span slot="title">运行总览</span>
                          </el-menu-item>
                          <el-menu-item index="realtime">
                            <i class="el-icon-menu"></i>
                            <span slot="title">实时监测</span>
                          </el-menu-item>
                          <el-menu-item index="record">
                              <i class="el-icon-setting"></i>
                              <span slot="title">控制中心</span>
                            </el-menu-item>
                          <el-menu-item index="strategy">
                              <i class="el-icon-edit"></i>
                              <span slot="title">策略中心</span>
                            </el-menu-item>         
                          <el-menu-item index="alarm">
                              <i class="el-icon-warning"></i>
                              <span slot="title">报警中心</span>
                          </el-menu-item>
                    </el-menu> 
                </div>
              </el-col>
              <el-col class="hidden-sm-and-down" style="height:60px;text-align:center" :span="12">
                <div class="grid-content clear">
                  <h2>
                      变电所运行管理平台
                  </h2>
                  <p style="font-size:.9rem;margin-top:5px;">Substation operation management</p>
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
      isCollapse: true,
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
    //切换菜单
    changeMenu(){
      this.isCollapse=!this.isCollapse;
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

</style>
