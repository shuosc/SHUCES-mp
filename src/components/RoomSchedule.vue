<template lang="pug">
  div(style="font-weight:bold;display:flex;box-sizing: border-box;")
    div.ces(v-if="roomVisible" style="flex:1;")
      div.room(v-for="(room,index) in rooms",:key="room.name")
        | {{room.name}}
    div.time(style="flex:9;overflow-x:scroll;overflow-y:hidden;")
      //- div.ces(style="position:absolute;left:0;top:0;width:30px'")
      //- div.room(v-for="(room,index) in rooms",:key="room.name")
          | {{room.name}}
      //- div.time-pointer()
      div.time-row(v-for="(room,index) in rooms",:key="room.name")
        div.bg-blue.time-event(:style="order.style" v-for="(order,orderIndex) in orders[index]")
        div.time-cell(v-for="(time,timeIndex) in schedule",:key="time.start" @click="onTimeCellClick(room,time)")
          span  {{time.start}}
</template>
<style scoped>
.time {
  background-color: rgb(132, 156, 172);
  position: relative;
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
  width: 780px;
  position: relative;
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
  width: 60px;
  box-sizing: border-box;
  border-right: 1px solid;
  /* font-size: 15px; */
  /* background-color: green; */
  color: #fff;
  height: 50px;
  position: relative;
  /* display: inline; */
}
.time-pointer {
  position: absolute;
  top: 0;
  left: 120px;
  width: 2px;
  height: 500px;
  background-color: blueviolet;
}
.time-cell span {
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
}
.time-cell:hover {
  background-color: aqua !important;
}
.time-event {
  position: absolute;
  top:1;
}
.time-event:hover {
  background-color: aqua !important;
}
</style>

<script>
import { schedule } from '@/utils'
export default {
  props: {
    rooms: Array,
    roomVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      schedule: schedule
    }
  },
  computed: {
    orders: function() {
      let orders = []
      for (let room of this.rooms) {
        let roomOrders = []
        for (let order of room.orders) {
          order.style = `width:${(order.end - order.start) / 60 - 1}px;left:${(order.start - 8 * 3600) / 60}px;height:48px;z-index:100;`
          roomOrders.push(order)
        }
        orders.push(roomOrders)
      }
      return orders
    }
  },
  methods: {
    onTimeCellClick(room, time) {
      console.log(room, time)
      wx.navigateTo({ url: `/pages/room-booking/new/main?rid=${room.id}` })
    }
  }
}
</script>
