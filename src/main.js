import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import http from '@/http'
Vue.prototype.$http = http
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '上海大学计算机学院',
      navigationBarTextStyle: 'black'
    }
  }
}
