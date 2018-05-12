<template lang="pug">
  div
    div.info.shadow-1
      | 每人每天每人每天最多有四小时的预约时间。
    div.form.shadow-1
      div(style="display:flex;")
        div 教室 
        div.ces(style="flex:4;text-align:center;") {{room.name}}
      div(style="display:flex;")
        div 日期
        div.ces(style="flex:4;text-align:center;") {{dateString}}
      div(style="padding-top:20px;padding-bottom:20px;")
        room-schedule(:rooms="[room]" :roomVisible="false")
      div(style="display:flex;")
        div 开始
        div.ces(style="flex:4;text-align:center;display:flex;") 
          picker(style="flex:1;height:100%;text-align:right;" @change="startHourChange" :value="startHourIndex" :range="startHourOptions")
            view(class="picker")
              | {{startHourOptions[startHourIndex]}}
          span(style="padding-left:10px;padding-right:10px;") :
          picker(style="flex:1;height:100%;text-align:left;" @change="startMinuteChange" :value="startMinuteIndex" :range="startMinuteOptions")
            view(class="picker")
              | {{startMinuteOptions[startMinuteIndex]}}
      div(style="display:flex;")
        div 结束
        div.ces(style="flex:4;text-align:center;display:flex;") 
          picker(style="flex:1;height:100%;text-align:right;" @change="endHourChange" :value="endHourIndex" :range="endHourOptions")
            view(class="picker")
              | {{endHourOptions[endHourIndex]}}
          span(style="padding-left:10px;padding-right:10px;") :
          picker(style="flex:1;height:100%;text-align:left;" @change="endMinuteChange" :value="endMinuteIndex" :range="endMinuteOptions")
            view(class="picker")
              | {{endMinuteOptions[endMinuteIndex]}}
      div(style="display:flex;")
        div 导师
        input.ces(style="flex:4;text-align:center;" v-model="teacher" placeholder="请输入导师姓名") 
      div(style="display:flex;")
        div 电话
        input.ces(style="flex:4;text-align:center;" v-model="contact" placeholder="请输入您的联系电话") 
      button.shadow-1(type="primary" style="margin:10px;" @click="onReservationClick")  确认预约

  //- q-page(style="margin-bottom:80px;")
    //- div.q-ml-md.q-mr-md
      q-card.q-mt-lg(v-for="order in orders" :key="order.id")
        q-card-title.q-ml-md(class="q-subheading") {{order.room}}
          <span slot="subtitle">{{order.status}}</span>
        q-card-separator
        q-card-main
          <dl class="horizontal">
            <dt>预约时间</dt>
            <dd>{{ new Date(order.date*1000)| moment("dddd, MMMM Do YYYY")}}</dd>
            <dt>预约时段</dt>
            <dd>{{order.start}}～{{order.end}}节（{{schedule[order.start-1].start}}～{{schedule[order.end-1].end}}）</dd>
            //- <dt>备注</dt>
            //- <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
          </dl>
        q-card-separator
        q-card-actions(align="end")
          //- q-btn(flat  icon="event" label="提前结束" :disable="order.status!=='已开始'")
          q-btn(flat v-if="order.status=='未开始'" icon="delete" label="取消预约" @click="onDeleteClick(order.id)")
</template>

<style>
.info {
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  font-size: 15px;
  text-align: center;
  color: #ccc;
}
.form {
  margin: 10px;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.form > div {
  border-bottom: 1px solid #eee;
  padding-top: 10px;
  /* padding-bottom: 10px; */
}
.form > div > div:first-child {
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  /* font-weight: bold; */
  font-size: 19px;
  color: #001f3f;
}
</style>

<script>
import { formatNumber } from '@/utils'
const timeOptions = Array.from({ length: 120 }, (v, k) => k)
import RoomSchedule from '@/components/RoomSchedule'
const numToTime = function(nums) {
  let options = {}
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    let index = parseInt(num / 6)
    if (!options[index]) {
      options[index] = []
    }
    options[index].push(formatNumber((num % 6) * 10))
  }
  return options
}
// const schedule = []
export default {
  components: {
    RoomSchedule
  },
  name: 'RoomBookingNew',
  computed: {
    schedule: function() {
      let schedule = Array.from({ length: 120 }, (v, k) => (k >= 8 * 6 ? 1 : 0))
      // console.log('schedule', schedule)
      for (let i = 0; i < schedule.length; i++) {
        for (let order of this.room.orders) {
          if (i >= order.start / 600 && i < order.end / 600) {
            schedule[i] = 0
          }
        }
      }
      // console.log('schedule', schedule)
      return schedule
    },
    dateString() {
      return this.date.format('YYYY-MM-DD 周dd')
    },
    start: function() {
      let hour = Object.keys(this.startOptions)[this.startHourIndex]
      let minute = parseInt(this.startOptions[hour][this.startMinuteIndex])
      return (hour * 60 + minute) / 10
    },
    end: function() {
      let hour = Object.keys(this.endOptions)[this.endHourIndex]
      let minute = parseInt(this.endOptions[hour][this.endMinuteIndex])
      return (hour * 60 + minute) / 10
    },
    startOptions: function() {
      let filterdOptions = []
      filterdOptions = this.roomSchedule
      let options = numToTime(filterdOptions)
      // console.log('start', options)
      return options
    },
    startHourOptions: function() {
      return Object.keys(this.startOptions)
    },
    startMinuteOptions: function() {
      if (this.startHourIndex !== null) {
        let hour = Object.keys(this.startOptions)[this.startHourIndex]
        // console.log('startMinuteOptions', this.startOptions[hour])
        return this.startOptions[hour]
      } else {
        return []
      }
    },
    endOptions: function() {
      let options = []
      let i = this.start
      while (this.schedule[i]) {
        options.push(i)
        i = i + 1
      }
      options = options.slice(0, 24)
      return numToTime(options)
    },
    endHourOptions: function() {
      return Object.keys(this.endOptions)
    },
    endMinuteOptions: function() {
      if (this.endHourIndex !== null) {
        let hour = Object.keys(this.endOptions)[this.endHourIndex]
        return this.endOptions[hour]
      } else {
        return []
      }
    },
    roomSchedule: function() {
      let filterdOptions = timeOptions.filter(x => {
        return this.schedule[x] === 1
      })
      console.log(filterdOptions)
      return filterdOptions
    }
    // spareCount: function() {
    //   return this.room.schedule.reduce((total, num) => {
    //     return total + num
    //   })
    // }
  },
  data: function() {
    return {
      orders: [],
      // schedule: schedule,
      room: { name: '504', orders: [] },
      selected: '',
      index: 0,
      array: ['A', 'B', 'C'],
      startHourIndex: 0,
      startMinuteIndex: 0,
      endHourIndex: 0,
      endMinuteIndex: 0,
      date: null,
      contact: '',
      teacher: ''
    }
  },
  created() {
    this.date = this.$moment()
  },
  mounted() {
    // this.getHistory()
    console.log('from new')
    let now = new Date()
    this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let rid = this.$root.$mp.query.rid
    this.date = this.$moment(this.$root.$mp.query.date, 'YYYY-MM-DD')
    this.getRoom(rid)
  },
  methods: {
    getRoom(roomID) {
      let timestamp = parseInt(this.date.valueOf() / 1000)
      this.$http
        .get(`/room-booking/rooms/${roomID}`, {
          timestamp: timestamp,
          group: 'ces'
        })
        .then(res => {
          this.room = res.room
          this.restrict = res.restrict
        })
    },
    startHourChange(event) {
      console.log(parseInt(event.target.value))
      this.startHourIndex = parseInt(event.target.value)
      this.startMinuteIndex = 0
    },
    startMinuteChange(event) {
      this.startMinuteIndex = parseInt(event.target.value)
      this.endHourIndex = 0
      this.endMinuteIndex = 0
    },
    endHourChange(event) {
      this.endHourIndex = parseInt(event.target.value)
      this.endMinuteIndex = 0
    },
    endMinuteChange(event) {
      this.endMinuteIndex = parseInt(event.target.value)
    },
    onDeleteClick(id) {
      this.$q
        .dialog({
          title: '确认',
          message: `确认取消预约吗`,
          ok: '确认',
          cancel: '取消'
        })
        .then(() => {
          this.postDeleteForm(id)
        })
        .catch(() => {
          // Picked "Cancel" or dismissed
        })
    },
    postDeleteForm(id) {
      this.$http.delete(`/room-orders/orders/${id}`).then(resp => {
        this.$q.notify('取消成功')
        this.getHistory()
      })
    },
    onReservationClick() {
      if (this.end - this.start <= 2) {
        wx.showToast({
          title: '预约时间过短',
          icon: 'none'
        })
        return
      }
      if (!this.teacher) {
        wx.showToast({
          title: '请填写导师姓名',
          icon: 'none'
        })
        return
      }
      if (!this.contact) {
        wx.showToast({
          title: '请填写您的联系方式',
          icon: 'none'
        })
        return
      }
      wx.showModal({
        title: '提示',
        content: '确认预约吗',
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            this.postReservationForm()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    postReservationForm() {
      this.$http
        .post('/room-booking/orders/', {
          roomID: this.room.id,
          start: this.start * 600,
          end: this.end * 600,
          date: parseInt(this.date.valueOf() / 1000),
          teacher: this.teacher,
          contact: this.contact
        })
        .then(resp => {
          console.log(resp)
          wx.redirectTo({
            url: '../success/main'
          })
          // this.$emit('reservateSuccess')
          // this.$q.notify('预约成功！')
        })
        .catch(err => {
          console.log(err.response.data.msg)
          wx.showToast({
            title: err.response.data.msg,
            icon: 'none',
            duration: 2000
          })
          // this.$q.notify(err.response.data.msg)
        })
    }
  }
}
</script>
