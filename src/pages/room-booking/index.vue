<template lang="pug">
  div.page()
    //- div.toolbar.ces(style="font-size:12px;display:flex;justify-content:space-between;")
      //- div(style="flex:1;") 帮助提示
      div(style="flex:1;")
      div(style="flex:1;text-align:right;") 帮助提示
    div.bg-white.ces(style="white-space:nowrap;z-index:100;font-weight:bold;font-size:15px;border-radius:10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);")
      div(style="margin-left:10px;padding-left:10px;border-left:4px solid blue;") 我的预约
      //- div
        | 504 09/23 18:00-19:00 已进行30分钟
      //- div
        | 504 09/23 18:00-19:00 还有三十分钟开始
      div(style="overflow-x:scroll;padding:10px;")
        div(style="font-size:10px;display:inline-block;height:80px;width:100px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);margin-left:10px;" v-for="i in 3")
          div
            | 504
          div 09/23 18:00-19:00
          div 
            | 提前结束
    div(style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);border-radius:10px;margin:10px;")
      div.ces.date(style="font-weight:bold;padding-top:10px;padding-bottom:10px;font-size:13px;display:flex;text-align:center;align-items:center;")
        //- div(style="flex:1;height:2rem;")
          | 向前
        div(:class="{'border-date':day===i}" style="flex:1" v-for="i in 4" :key="")
          p
            | 周{{i+1}}
            br
            | 05/06
        //- div(style="flex:1;")
          | {{formatteDateIndictor}}
        //- div(style="flex:1;height:2rem;")
          | 向后
      room-schedule(:rooms="rooms",:schedule="schedule")
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
      restrict: 4
    }
  },
  created: function() {
    let now = new Date()
    this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  },
  mounted: function() {
    this.getRooms()
    console.log('get rooms')
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
    onTimeCellClick(room, time) {
      console.log(room, time)
      wx.navigateTo({
        url: 'new'
      })
    },
    getRooms() {
      let timestamp = this.date.valueOf() / 1000
      this.$http
        .get('/room-booking/rooms', {
          timestamp: timestamp,
          group: 'ces'
        })
        .then(res => {
          this.rooms = res.rooms
          this.restrict = res.restrict
        })
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
