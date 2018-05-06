<template lang="pug">
  div.page()
    div.toolbar.ces(style="font-size:12px;display:flex;justify-content:space-between;")
      div(style="flex:1;") 帮助提示
      div(style="flex:1;")
      div(style="flex:1;text-align:right;") 我的预约
    div.bg-white.ces(style="position:relative;top:5px;z-index:100;text-align:center;font-weight:bold;font-size:15px;height:30px;border-radius:10px;padding:5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);margin-left:10px;margin-right:10px;")
      div
        span(v-if="restrict>0")| 预约说明：您当日还可以借{{restrict}}课时
        span(v-else)| 预约说明：您当日借教室课时配额已满
    //- div.q-ml-md.q-mr-md
      //- room-booking-card(v-for="(room,index) in rooms" :id="room.id" :room="room" :index=index :key="room.id" :date="date" @reservateSuccess="getRooms")
    //- div(style="width:100vw;display:flex;overflow:scroll;" v-for="i in 10")
      //- div(style="max-width:20vw;min-width:30px;") 511
    div(style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);border-radius:10px;margin:10px;")
      div.ces.date(style="font-weight:bold;padding-top:10px;padding-bottom:10px;font-size:13px;display:flex;text-align:center;align-items:center;")
        div(style="flex:1;height:2rem;")
          | 向前
        div(:class="{'border-date':day===i}" style="flex:1" v-for="i in 4" :key="")
          p
            | 周{{i+1}}
            br
            | 05/06
        //- div(style="flex:1;")
          | {{formatteDateIndictor}}
        div(style="flex:1;height:2rem;")
          | 向后
      div(style="font-weight:bold;display:flex;box-sizing: border-box;")
        div.ces(style="flex:1;")
          div.room(v-for="(room,index) in rooms",:key="room.name")
            | {{room.name}}
        div.bg-olive(style="flex:9;overflow-x:scroll;overflow-y:hidden;")
          div.time-row(v-for="(room,index) in rooms",:key="room.name")
            div.time-cell(v-for="(time,timeIndex) in schedule",:key="time.start")
              span  {{time.start}}
    div(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md.shadow-3
        div
          button(:disable="disablePrvious" icon="skip_previous" label="上一天" @click="onPreviousClick")
        div
          button(flat disable) {{formatteDateIndictor}}
        div
          button(:disable="disableNext" icon-right="skip_next" label="下一天" @click="onNextClick")
</template>

<style scoped>
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
  padding-top: 40px;
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
.room {
  height: 50px;
  /* background-color: #eee; */
  /* border-bottom: 1px solid #eee; */
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  font-size: 12px;
  /* color: #333; */
}
.time-row {
  height: 50px;
  box-sizing: border-box;
  white-space: nowrap;
  /* background-color: #eee; */
  border-bottom: 1px solid #fff;
  display: block;
  width: 650px;
  /* flex-flow: row no-wrap; */
  /* margin: auto; */
  /* overflow: auto; */
}
.time-row:first-of-type {
  border-top: 1px solid #fff;
}
.time-cell:first-of-type {
  border-left: 1px solid #fff;
}
.time-cell {
  display: inline-block;
  width: 50px;
  box-sizing: border-box;
  border-right: 1px solid;
  /* font-size: 15px; */
  /* background-color: green; */
  color: #fff;
  height: 50px;
  position: relative;
  /* display: inline; */
}
.time-cell span {
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script>
// import { date } from 'quasar'
// const date = {}
// const { addToDate, formatDate } = date
import { schedule } from '@/utils'
// import RoomBookingCard from '@/components/RoomBookingCard'
export default {
  name: 'PageIndex',
  components: {
    // RoomBookingCard
  },
  data() {
    return {
      opened: false,
      schedule: schedule,
      day: 1,
      rooms: [
        {
          name: '402'
        },
        {
          name: '504'
        },
        {
          name: '506'
        },
        {
          name: '801'
        },
        {
          name: '1001'
        },
        {
          name: '1004'
        },
        {
          name: '1006'
        },
        {
          name: '1125'
        }
      ],
      date: null,
      restrict: 4
    }
  },
  created: function() {
    // let now = new Date()
    // this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  },
  mounted: function() {
    // this.getRooms()
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
    getRooms() {
      let timestamp = this.date.valueOf() / 1000
      this.$http
        .get('/api/rooms', {
          params: {
            timestamp: timestamp,
            group: 'ces'
          }
        })
        .then(res => {
          this.rooms = res.data.rooms
          this.restrict = res.data.restrict
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
