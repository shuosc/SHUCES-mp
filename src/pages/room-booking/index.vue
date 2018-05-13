<template lang="pug">
  div.page()
    //- div.toolbar.ces(style="font-size:12px;display:flex;justify-content:space-between;")
      //- div(style="flex:1;") 帮助提示
      div(style="flex:1;")
      div(style="flex:1;text-align:right;") 帮助提示
    div.booking-history.bg-white.ces
      div.booking-header(style="") 我的预约
      //- div
        | 504 09/23 18:00-19:00 已进行30分钟
      //- div
        | 504 09/23 18:00-19:00 还有三十分钟开始
      div(style="overflow-x:scroll;padding:10px;")
        div.order-card(v-for="order in orders")
          div
            | {{order.room}}
          div {{order.date}}  {{order.startTime}}-{{order.endTime}}
          //- div 
            | {{order.status}}
          div(v-if="order.status==='已开始'")
            button(size="mini") 提前结束 
          div(v-if="order.status==='未开始'")
            button(size="mini" @click="onCancelOrder(order.id)") 取消预约
          div(v-if="order.status==='已结束'")
            button(size="mini") 已结束
    div(style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);border-radius:10px;margin:10px;")
      div.ces.date(style="font-weight:bold;padding-top:10px;padding-bottom:10px;font-size:13px;display:flex;text-align:center;align-items:center;")
        //- div(style="flex:1;height:2rem;")
          | 向前
        div(:class="{'border-date':dayIndex===index}" style="flex:1" v-for="(date,index) in dates" :key="date.md",@click="onDateIndexClick(index)")
          p
            | 周{{date.dd}}
            br
            | {{date.md}}
        //- div(style="flex:1;")
          | {{formatteDateIndictor}}
        //- div(style="flex:1;height:2rem;")
          | 向后
      room-schedule(:rooms="rooms",:schedule="schedule" @onTimeCellClick="onTimeCellClick")
    //- div(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md.shadow-3
        div
          button(:disable="disablePrvious" icon="skip_previous" label="上一天" @click="onPreviousClick")
        div
          button(flat disable) {{formatteDateIndictor}}
        div
          button(:disable="disableNext" icon-right="skip_next" label="下一天" @click="onNextClick")
</template>

<style scoped >
.booking-header {
  margin-left: 10px;
  padding-left: 10px;
  margin-top: 10px;
  border-left: 4px solid blue;
}
.booking-history {
  white-space: nowrap;
  margin: 10px;
  z-index: 100;
  height: 150px;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.order-card {
  font-size: 13px;
  display: inline-block;
  text-align: center;
  height: 80px;
  width: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
}
.toolbar {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  height: 40px;
  /* margin-left: 0.5rem; */
  /* margin-right: 0.5rem; */
  /* padding-top: 1.5rem; */
  /* color: white; */
  /* padding-bottom: 1.5rem; */
  /* background-color: #7EB3EC; */
  /* border-bottom: 2px solid #6b93ad ; */
  /* background-image: linear-gradient(180deg, #85b7d8 0%, #c2e9fb 90%); */
}
.toolbar div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page {
  /* background-color: #eee; */
  /* min-height:100vh;
  box-sizing: border-box; */
  /* padding-top: 40px; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
.border-date {
  border-bottom: 3px solid;
}
.date {
  /* border-radius: 10px; */
  /* margin: 10px 10px 0px 10px; */
  box-sizing: border-box;
  /* box-shadow: rgb(50, 135, 233); */
}
.date > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { formatNumber } from '@/utils'
// import { date } from 'quasar'
// const date = {}
// const { addToDate, formatDate } = date
// import { schedule } from '@/utils'
import RoomSchedule from '@/components/RoomSchedule'
export default {
  name: 'PageIndex',
  components: {
    RoomSchedule
  },
  data() {
    return {
      opened: false,
      day: 1,
      rooms: [],
      date: null,
      dates: [],
      restrict: 4,
      orders: [],
      dayIndex: 1
    }
  },
  created: function() {
    let now = this.$moment({ hour: 0 })
    let datePointer = now.subtract(1, 'd')
    for (let i = 0; i < 7; i++) {
      this.dates.push({
        dd: datePointer.format('dd'),
        md: datePointer.format('M/D'),
        date: datePointer.clone()
      })
      datePointer.add(1, 'd')
    }
    this.date = this.dates[1]
  },
  onShow: function() {
    this.refresh()
  },
  mounted: function() {
    this.refresh()
  },
  // computed: {
  //   formatteDateIndictor: function() {
  //     return date.formatDate(this.date, 'MM/DD(ddd)')
  //   },
  //   disablePrvious: function() {
  //     let now = new Date()
  //     let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  //     return this.date <= nowDate
  //   },
  //   disableNext: function() {
  //     let now = new Date()
  //     let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  //     nowDate = date.addToDate(nowDate, { days: 3 })
  //     return this.date > nowDate
  //   }
  // },
  methods: {
    refresh() {
      this.getRooms()
      this.getHistory()
    },
    onDateIndexClick(index) {
      this.dayIndex = index
      this.date = this.dates[index]
      // console.log(this.date)
      this.getRooms()
    },
    onTimeCellClick(room, time) {
      console.log(room, time)
      wx.navigateTo({ url: `/pages/room-booking/new/main?rid=${room.id}&start=${time.no}&date=${this.date.date.format('YYYY-MM-DD')}` })
    },
    onCancelOrder(id) {
      wx.showModal({
        title: '提示',
        content: '确认取消预约吗',
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            this.cancelOrder(id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    cancelOrder(id) {
      this.$http
        .delete(`/room-booking/orders/${id}`)
        .then(resp => {
          wx.showToast({
            title: '取消预约成功',
            icon: 'success',
            duration: 2000
          })
          this.getHistory()
          this.getRooms()
        })
        .catch(err => {
          wx.showToast({
            title: err.response.data.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    getHistory() {
      this.$http
        .get('/room-booking/orders/?type=personal')
        .then(resp => {
          this.orders = []
          for (let order of resp.orders) {
            let date = new Date(order.date * 1000)
            order.date = this.$moment(date).format('M/D')
            order.startTime = `${parseInt(order.start / 3600)}:${formatNumber((order.end % 3600) / 60)}`
            order.endTime = `${parseInt(order.end / 3600)}:${formatNumber((order.end % 3600) / 60)}`
            this.orders.push(order)
            console.log(order)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRooms() {
      let timestamp = this.date.date.format('X')
      this.$http
        .get('/room-booking/rooms', {
          timestamp: timestamp,
          group: 'ces'
        })
        .then(res => {
          this.rooms = res.rooms
          this.restrict = res.restrict
        })
    },
    onPullDownRefresh: function() {
      this.refresh()
      wx.stopPullDownRefresh()
    }
    // onPreviousClick() {
    //   this.date = date.subtractFromDate(this.date, { days: 1 })
    //   this.getRooms()
    // },
    // onNextClick() {
    //   this.date = date.addToDate(this.date, { days: 1 })
    //   this.getRooms()
    // }
  }
}
</script>
