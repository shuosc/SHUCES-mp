<template lang="pug">
  div.page()
    //- div.toolbar
    //- div.q-ml-md.q-mr-md.q-mt-md
      div
        span(v-if="restrict>0")| 预约说明：您当日还可以借{{restrict}}课时
        span(v-else)| 预约说明：您当日借教室课时配额已满
    //- div.q-ml-md.q-mr-md
      //- room-booking-card(v-for="(room,index) in rooms" :id="room.id" :room="room" :index=index :key="room.id" :date="date" @reservateSuccess="getRooms")
    //- div(style="width:100vw;display:flex;overflow:scroll;" v-for="i in 10")
      //- div(style="max-width:20vw;min-width:30px;") 511
    div.date(style="display:flex;")
      div(style="flex:1;height:2rem;")
        | PREV
      div(style="flex:1;height:2rem;" v-for="i in 7" :key="")
        | {{i+1}}
      div(style="flex:1;height:2rem;")
        | NEXT
    div(style="display:flex;background-color:white; box-sizing: border-box;")
      div(style="flex:1;")
        div.room(v-for="(room,index) in rooms",:key="room.name")
          | {{room.name}}
      div(style="flex:9;overflow-x:scroll;")
        div.time-row(v-for="(room,index) in rooms",:key="room.name")
          div.bg-gray.time-cell(v-for="(time,timeIndex) in schedule",:key="time.start")
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
.toolbar{
  height: 56px;
  width:100vw;
  position: fixed;
  top:0;
  background-color: white;
  box-shadow: 0 10px 10px #eee;
}
.page {
  /* background-color: #eee; */
  /* min-height:100vh;
  box-sizing: border-box; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
.date {
  border-radius: 10px;
  background-color: white;
  margin: 10px 10px 0px 10px;
  box-sizing: border-box;
  box-shadow: rgb(50, 135, 233);
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
  font-size: 15px;
  color: #333;
}
.time-row {
  height: 50px;
  box-sizing: border-box;
  /* background-color: #eee; */
  border-bottom: 1px solid #bbb;
  display: inline-flex;
}
.time-row:first-of-type{
  border-top: 1px solid #bbb;
}
.time-cell:first-of-type{
  border-left: 1px solid #ebbbee;
}
.time-cell {
  width: 50px;
  box-sizing: border-box;
  border-right: 1px solid #bbb;
  /* font-size: 15px; */
  /* background-color: green; */
  color:#eee;
  height: 100%;
}
.time-cell span {
  font-size: 15px;
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
