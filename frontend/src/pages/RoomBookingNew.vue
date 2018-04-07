<template lang="pug">
  q-page(style="margin-bottom:80px;")
    q-card.q-ml-md.q-mr-md.q-mt-md
      q-card-main
        span(v-if="restrict>0")| 预约说明：您当日还可以借{{restrict}}课时
        span(v-else)| 预约说明：您当日借教室课时配额已满
    div.q-ml-md.q-mr-md
      room-booking-card(v-for="(room,index) in rooms" :id="room.id" :room="room" :index=index :key="room.id" :date="date" @reservateSuccess="getRooms")
    q-page-sticky(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md.shadow-3
        div
          q-btn(:disable="disablePrvious" icon="skip_previous" label="上一天" @click="onPreviousClick")
        div
          q-btn(flat disable) {{formatteDateIndictor}}
        div
          q-btn(:disable="disableNext" icon-right="skip_next" label="下一天" @click="onNextClick")
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
  },
  computed: {
    formatteDateIndictor: function() {
      return date.formatDate(this.date, 'MM/DD(ddd)')
    },
    disablePrvious: function() {
      let now = new Date()
      let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return this.date <= nowDate
    },
    disableNext: function() {
      let now = new Date()
      let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      nowDate = date.addToDate(nowDate, { days: 3 })
      return this.date > nowDate
    }
  },
  methods: {
    getRooms() {
      let timestamp = this.date.valueOf() / 1000
      this.$http
        .get('/api/ces/rooms/', {
          params: {
            timestamp: timestamp
          }
        })
        .then(res => {
          this.rooms = res.data.rooms
          this.restrict = res.data.restrict
        })
    },
    onPreviousClick() {
      this.date = date.subtractFromDate(this.date, { days: 1 })
      this.getRooms()
    },
    onNextClick() {
      this.date = date.addToDate(this.date, { days: 1 })
      this.getRooms()
    }
  }
}
</script>
