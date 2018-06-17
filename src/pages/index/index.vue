<template>
  <div class="page">
    <div class="swiper">
      <swiper indicator-dots='true' autoplay="true" interval="4500">
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
    <!-- <div class="author">
      <div class="line"></div>
      <p>2018 上海大学计算机学院</p>
      <p>上海大学开源社区提供技术支持</p>
    </div> -->
     <div class="weui-footer weui-footer_fixed-bottom">
      <!-- <div class="weui-footer__links">
        <navigator url="" class="weui-footer__link">WeUI首页</navigator>
      </div> -->
      <div class="weui-footer__text">上海大学开源社区提供技术支持</div>
      <div class="weui-footer__text">Copyright © 2018 上海大学计算机学院</div>
    </div>
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
          src: '/static/school.png',
          name: '学院简介',
          url: '/pages/introduce/main'
        },
        {
          src: '/static/quotation.png',
          name: '院长寄语',
          url: '/pages/quote/main'
        },
        {
          src: '/static/room1.png',
          name: '会议室预约',
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
  }
}
</script>

<style scoped>
.grid {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 5px;
}
swiper {
  height: 450rpx;
}
swiper image {
  width: 100%;
  height: 450rpx;
}
.author {
  margin-bottom: 0rpx;
  text-align: center;
  font-size: 25rpx;
}
.author p {
  color: #ccc;
}
.page__bd {
  margin-top: 50rpx;
  margin-bottom: 300rpx;
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
