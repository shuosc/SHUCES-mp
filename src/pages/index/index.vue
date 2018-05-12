<template>
  <div class="page">
    <div class="swiper">
      <swiper indicator-dots='true' autoplay="true" interval="4000">
        <swiper-item v-for="img in imgs" :key="img">
          <image :src="img" />
        </swiper-item>
      </swiper>
    </div>
    <div class="page__bd">
      <div class="weui-grids grid">
        <block v-for="(item,index) in grids" :key="index">
          <navigator :url='item.url' class="weui-grid" hover-class="weui-grid_active">
            <image class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </navigator>
        </block>
      </div>
    </div>
    <div class="author">
      <div class="line"></div>
      <p>2018 上海大学计算机学院</p>
      <p>上海大学开源社区提供技术支持</p>
    </div>
    <!--<div class = "lable">
       <div class = "lable-img-row">
          <image src = "/static/developing.png"></image>
          <image src = "/static/developing.png"></image>
          <image src = "/static/developing.png"></image>
      </div>
      <div class = "lable-name-row">
        <div class = "l-n-left">label</div>
        <div class = "l-n-midd">labe2</div>
        <div class = "l-n-right">labe3</div>
      </div> 
    </div>-->
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      imgs: [
        'https://static.shuhelper.cn/shuces/mpapp/imgs/1.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/2.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/3.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/4.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/5.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/6.jpg'
      ],
      grids: [
        {
          src: '/static/quotation.png',
          name: '院长寄语',
          url: '/pages/quote/main'
        },
        {
          src: '/static/room.png',
          name: '房间预约',
          url: '/pages/room-booking/main'
        },
        {
          src: '/static/developing.png',
          name: '敬请期待',
          url: ''
        },
        {
          src: '/static/developing.png',
          name: '敬请期待',
          url: ''
        },
        {
          src: '/static/developing.png',
          name: '敬请期待',
          url: ''
        },
        {
          src: '/static/developing.png',
          name: '敬请期待',
          url: ''
        }
      ]
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  }
}
</script>

<style scoped>
.grid {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 5px;
}
swiper image {
  width: 100%;
  height: 350rpx;
}
/* .lable-img-row{
  display: flex;
  flex-direction: row;
}
.lable-name-row{
  display: flex;
  flex-direction: row;
  margin-top:15rpx;
}
.lable-img-row image{
  width:30%;
  height:50rpx;
  margin:auto;
}
.l-n-left{
  margin-left:5%;
  width:30%;
}
.l-n-midd{
  width:30%;

}
.l-n-right{
  width:30%;
  margin-right:5%;
}
.lable-name-row{
    text-align: center;
}
.lable {
  display: flex;
  flex-direction: column;
  margin-top: 50rpx;
  margin-bottom: 0;
  margin-left: 5%;
  margin-right: 5%;
  width: 50%;
  height: 70rpx;
  border-top: 1px solid #ccc;
  margin: auto;
设置所有元素居中 
}
.lable-img {
  width: 20%;
  height: 50rpx;
}
*/
.author {
  margin-bottom: 0rpx;
  text-align: center;
  font-size: 25rpx;
}
/*.line {
   margin: auto;
  width: 40%;
  height: 2px;
  background: #aaa; 
}*/
.author p {
  color: #ccc;
}
.page__bd {
  margin-top: 50rpx;
  margin-bottom: 330rpx;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
