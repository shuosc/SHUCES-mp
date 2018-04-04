<template lang="pug">
  q-page(style="margin-bottom:80px;")
    q-page-sticky(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md
        div
          q-btn(icon="skip_previous" label="上一天")
        div
          q-btn(flat label="3/21(周五)")
        div
          q-btn(icon-right="skip_next" label="下一天")
    q-card.q-ml-md.q-mr-md.q-mt-md
      q-card-main
        | 预约说明：
    //- q-modal(v-model="opened" minimized)
      q-card
        q-card-title 预约订单
        q-card-main
          q-field(
            icon="cloud"
            label="预约教室"
            error-label="We need a valid email"
            :count="10")
            q-input.col-12(v-model="reservationInfo.start" )
          q-field(
            icon="cloud"
            label="预约日期"
            error-label="We need a valid email"
            :count="10")
            q-input.col-12(v-model="reservationInfo.start")
          q-field(
            icon="cloud"
            label="预约教室"
            error-label="We need a valid email"
            :count="10")
            q-select(
                v-model="reservationInfo.start"
                :options="startOptions")
          q-field(
            icon="cloud"
            label="预约教室"
            error-label="We need a valid email"
            :count="10")
            q-select(
                v-model="reservationInfo.duration"
              :options="startOptions")
          //- div.row
            q-input.col-12(v-model="reservationInfo.remark" stack-label="备注")
        q-card-actions(align="end")
          q-btn(
            color="primary"
            @click="opened = false"
            label="预约")
          q-btn(
            @click="opened = false"
            label="取消")
    div.q-ml-md.q-mr-md
      room-booking-card(v-for="(room,index) in rooms" :id="room.id" :room="room" :index=index)
      //- q-card.q-mt-lg()
        q-card-title.q-ml-md(class="q-subheading") {{room.name}}
          <span slot="subtitle">x 个时间段空闲</span>
        q-card-separator
        q-card-main
          div.row
            | 教室使用情况:
          div.row.justify-between(style="overflow-x:scroll;height:5rem;")
            div
            div
              div.row.no-wrap(flat)
                div.justify-start(v-for="i in 13" :id="i" style="color:grey;height:1rem;width:3rem;") |{{schedule[i-1].start}}
              q-btn-group.row.no-wrap(flat)
                q-btn(flat
                :class="{'bg-blue-grey':room.schedule[i-1]===1,'bg-pink':room.schedule[i-1]===0,'bg-green':room.schedule[i-1]===-1}"
                v-for="i in 13" :id="i" color="white" style="height:2rem;width:3rem;" :label="i")
            div
          div.row
            q-select.col-6(
              float-label="选择开始时间"
              v-model="room.start"
              :options="startOptions[index]")
            q-select.col-6(
                float-label="选择结束时间"
                v-model="room.end"
              :options="durationOptions")
        q-card-actions(align="end")
          q-btn(flat  icon="event" label="重置" @click="onResetClick(index)")
          q-btn(flat  icon="event" label="预约" @click="onReservationClick()")
</template>

<style>

</style>

<script>
import RoomBookingCard from 'components/RoomBookingCard'
export default {
  name: 'PageIndex',
  components: {
    RoomBookingCard
  },
  data() {
    return {
      opened: false,
      rooms: [
        {
          id: 1,
          name: '504',
          schedule: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
          id: 2,
          name: '511',
          schedule: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
      ],
      date: null
    }
  },
  computed: {
  },
  methods: {}
}
</script>
