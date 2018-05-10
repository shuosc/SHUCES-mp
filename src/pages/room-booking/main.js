import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '教室预约状态',
    enablePullDownRefresh: true
  }
}
