<template lang="pug">
  q-page(style="margin-bottom:80px;")
    q-card.q-ml-md.q-mr-md.q-mt-md
      q-card-main
        | 预约说明：
    div.q-ml-md.q-mr-md
      room-booking-card(v-for="(room,index) in rooms" :id="room.id" :room="room" :index=index :key="room.id" :date="date")
    q-page-sticky(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md
        div
          q-btn(icon="skip_previous" label="上一天" @click="onPreviousClick")
        div
          q-btn(flat) {{formatteDateIndictor}}
        div
          q-btn(icon-right="skip_next" label="下一天" @click="onNextClick")
</template>

<style>

</style>

<script>
import { date } from 'quasar'
// const { addToDate, formatDate } = date
import RoomBookingCard from 'components/RoomBookingCard'
export default {
  name: 'PageIndex',
  components: {
    RoomBookingCard
  },
  data() {
    return {
      opened: false,
      rooms: [],
      date: null
    }
  },
  created: function() {
    let now = new Date()
    this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    this.getRooms()
    // let newDate = new Date(2017, 2, 7)
    // newDate = date.addToDate(newDate, { days: 7, month: 1 })
    // console.log(newDate)
  },
  computed: {
    formatteDateIndictor: function() {
      return date.formatDate(this.date, 'MM/DD(ddd)')
    }
  },
  methods: {
    getRooms() {
      let timestamp = this.date.valueOf() / 1000
      this.$http
        .get('/api/ces/rooms', {
          params: {
            timestamp: timestamp
          }
        })
        .then(res => {
          this.rooms = res.data.rooms
          console.log(res.data.rooms)
        })
    },
    onPreviousClick() {
      // console.log(addToDate)
      let now = new Date()
      let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      if (this.date > nowDate) {
        this.date = date.subtractFromDate(this.date, { days: 1 })
        this.getRooms()
      }
    },
    onNextClick() {
      this.date = date.addToDate(this.date, { days: 1 })
      this.getRooms()
    }
  }
}
</script>
