<template lang="pug">
  q-card.q-mt-lg
    q-card-title.q-ml-md(class="q-subheading") {{room.name}}
        <span slot="subtitle">x 个时间段空闲</span>
    q-card-separator
    q-card-main
      div.row
      | 教室预约情况:
      div.row.justify-between(style="overflow-x:scroll;height:5rem;")
        div
        div
          div.row.no-wrap(flat)
            div.justify-start(v-for="i in 13" :id="i" style="color:grey;height:1rem;width:3rem;") |{{schedule[i-1].start}}
          q-btn-group.row.no-wrap(flat)
            q-btn(flat
            :class="{'bg-blue-grey':roomSchedule[i-1]===1,'bg-pink':roomSchedule[i-1]===0,'bg-green':roomSchedule[i-1]===-1}"
            v-for="i in 13" :id="i" color="white" style="height:2rem;width:3rem;" :label="i")
        div
      div.row
        q-select.col-6(
            float-label="选择开始时间"
            v-model="start"
            :options="startOptions")
        q-select.col-6(
            float-label="选择结束时间"
            v-model="end"
            :options="endOptions")
    q-card-actions(align="end")
        q-btn(flat icon="event" label="重置" @click="onResetClick()")
        q-btn(flat icon="event" label="预约" @click="onReservationClick()")
</template>
<script>
const schedule = [
  { no: 1, start: '08:00', end: '08:45' },
  { no: 2, start: '08:55', end: '09:40' },
  { no: 3, start: '10:00', end: '10:45' },
  { no: 4, start: '10:55', end: '11:40' },
  { no: 5, start: '12:10', end: '12:55' },
  { no: 6, start: '13:05', end: '13:50' },
  { no: 7, start: '14:10', end: '14:55' },
  { no: 8, start: '15:05', end: '15:50' },
  { no: 9, start: '16:00', end: '16:45' },
  { no: 10, start: '16:55', end: '17:40' },
  { no: 11, start: '18:00', end: '18:45' },
  { no: 12, start: '18:55', end: '19:40' },
  { no: 13, start: '19:50', end: '20:35' }
]
const rawStartOptions = [
  {
    label: '第一节 (8：00)',
    value: 1
  },
  {
    label: '第二节 (8：55)',
    value: 2
  },
  {
    label: '第三节 (10：00)',
    value: 3
  },
  {
    label: '第四节 (10：55)',
    value: 4
  },
  {
    label: '第五节 (12：10)',
    value: 5
  },
  {
    label: '第六节 (13：05)',
    value: 6
  },
  {
    label: '第七节 (14：10)',
    value: 7
  },
  {
    label: '第八节 (15：05)',
    value: 8
  },
  {
    label: '第九节 (16：00)',
    value: 9
  },
  {
    label: '第十节 (16：55)',
    value: 10
  },
  {
    label: '第十一节 (18：00)',
    value: 11
  },
  {
    label: '第十二节 (18：55)',
    value: 12
  },
  {
    label: '第十三节 (19：50)',
    value: 13
  }
]
export default {
  props: {
    index: Number,
    room: {
      type: Object,
      default() {
        return {}
      }
    },
    date: Object
  },
  data() {
    return {
      schedule: schedule,
      start: null,
      end: null
    }
  },
  computed: {
    startOptions: function() {
      let options = []
      options = rawStartOptions.filter(x => {
        return this.room.schedule[x.value - 1] === 1
      })
      return options
    },
    endOptions: function() {
      let options = []
      if (this.start === null) {
        return options
      } else {
        let start = this.start - 1
        let i = this.start - 1
        while (this.room.schedule[i]) {
          options.push({
            label: `第${i + 1}节（${schedule[i].end}）`,
            value: i + 1
          })
          if (i - start + 1 >= 4) {
            break
          }
          i += 1
        }
        return options
      }
    },
    roomSchedule: function() {
      let schedule = this.room.schedule.slice()
      // console.log(this.start, this.end)
      if (this.start !== null && this.end !== null) {
        for (let i = this.start - 1; i < this.end; i++) {
          if (schedule[i] === 1) {
            schedule[i] = -1
          }
        }
      }
      // console.log(schedule)
      return schedule
    }
  },
  watch: {
    start: function(newStart, oleStart) {
      this.end = null
    },
    room: function() {
      this.onResetClick()
    }
  },
  methods: {
    onResetClick() {
      this.start = null
      this.end = null
    },
    onReservationClick() {
      this.$q
        .dialog({
          title: '确认',
          message: `确认预约吗`,
          ok: '确认',
          cancel: '取消'
        })
        .then(() => {
          this.postReservationForm()
          // Picked "OK"
        })
        .catch(() => {
          // Picked "Cancel" or dismissed
        })
      this.opened = true
    },
    postReservationForm() {
      this.$http
        .post('/api/ces/orders/', {
          roomID: this.room.id,
          start: this.start,
          end: this.end,
          date: this.date.valueOf() / 1000
        })
        .then(resp => {
          console.log(resp)
          this.$q.notify('预约成功！')
        })
        .catch(err => {
          console.log(err)
          this.$q.notify('时间被占用')
        })
    }
  }
}
</script>
