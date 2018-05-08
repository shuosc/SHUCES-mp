module.exports = [
  {
    alias: '/',
    path: '/pages/index/index',
    name: 'home',
    config: {
      navigationBarTitleText: '上海大学计算机学院',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/room-booking/index',
    name: 'roomBookingStatus',
    config: {
      navigationBarTitleText: '教室预约状态',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/room-booking/new',
    name: 'RoomBookingNew',
    config: {
      navigationBarTitleText: '新建教室预约'
    }
  },
  {
    path: '/pages/login/index',
    name: 'login',
    config: {
      navigationBarTitleText: '登录'
    }
  }
]
