// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入element-ui 以及样式库 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighcharts from 'vue-highcharts'

/* 全局引入base.css文件 */
import './assets/css/base.css'
/* 全局引入icon样式文件 */
// import './assets/css/iconfont.css'

/* 全局引用jquery方法 */
import '../static/base'

Vue.config.productionTip = false

Vue.use(ElementUI)

// Vue.use(VueHighcharts)

// window.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    moreChart() {
      var options = this.getMoreOptions(this.type);

      if(this.chart) {
          this.chart.destroy();
      }
      // 初始化Highcharts图表
      this.chart = new Highcharts.Chart('highcharts-more',options)
    }
  }
})

/* 字体大小设置 */
var html = document.documentElement;
var calcRem = function(){
  /* 改变表格图表宽高 */
  var w = html.clientWidth;
  /* 改变字体大小 */
  if (w <= 768) {
    html.style.fontSize = '10px';
  } else if (w <= 1024) {
    html.style.fontSize = '13px';
  }else {
    html.style.fontSize = '15px';
  }
}
calcRem();
window.addEventListener('resize',calcRem);
