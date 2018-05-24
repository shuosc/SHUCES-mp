<template lang="pug">
  div
    div.info.shadow-1
      | 每人每天多有四小时的预约时间。
    div.form.shadow-1(v-show="!loading")
      div(style="display:flex;")
        div 教室
        div.ces(style="flex:3;text-align:center;") {{room.name}}
        div(style="flex:1;")
      div(style="display:flex;")
        div 日期
        div.ces(style="flex:3;text-align:center;") {{dateString}}
        div(style="flex:1;")
      div(style="padding-top:20px;padding-bottom:20px;")
        room-schedule(:rooms="[room]" :roomVisible="false")
      div(style="display:flex;")
        div 开始
        div.ces(style="flex:3;text-align:center;display:flex;")
          picker(style="flex:1;height:100%;text-align:right;" @change="startHourChange" :value="startHourIndex" :range="startHourOptions")
            view(class="picker")
              | {{startHourOptions[startHourIndex]}}
          span(style="padding-left:10px;padding-right:10px;") :
          picker(style="flex:1;height:100%;text-align:left;" @change="startMinuteChange" :value="startMinuteIndex" :range="startMinuteOptions")
            view(class="picker")
              | {{startMinuteOptions[startMinuteIndex]}}
        div(style="flex:1;")
      div(style="display:flex;")
        div 结束
        div.ces(style="flex:3;text-align:center;display:flex;")
          picker(style="flex:1;height:100%;text-align:right;" @change="endHourChange" :value="endHourIndex" :range="endHourOptions")
            view(class="picker")
              | {{endHourOptions[endHourIndex]}}
          span(style="padding-left:10px;padding-right:10px;") :
          picker(style="flex:1;height:100%;text-align:left;" @change="endMinuteChange" :value="endMinuteIndex" :range="endMinuteOptions")
            view(class="picker")
              | {{endMinuteOptions[endMinuteIndex]}}
        div(style="flex:1;")
      div(style="display:flex;")
        div 用途
        input.ces(style="flex:3;" v-model="remark" placeholder="请输入本次预约用途")
        div(style="flex:1;")
      div(style="display:flex;" v-for="(member,memberIndex) in members")
        div 成员
        div.ces(style="flex:3;" v-model="teacher" ) {{member.name}}({{member.id}})
        div(style="flex:1;display:flex;align-items:middle;")
          button(size="mini" v-if="memberIndex!==0"  type="warn" @click="onMemberDelete(memberIndex)") -
      div(style="display:flex;")
        div 添加
        input.ces(style="flex:3;" v-model="newMemberID" placeholder="请输入成员账号")
        div(style="flex:1;display:flex;align-items:middle;")
          button(@click="onMemberAdd" size="mini") +
      div(style="display:flex;")
        div 电话
        input.ces(style="flex:3;" v-model="contact" placeholder="请输入您的联系电话")
        div(style="flex:1;")
      button.shadow-1(:loading="submitting" type="primary" style="margin:10px;" @click="onReservationClick")  确认预约

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
  height: 20px;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  font-size: 15px;
  text-align: center;
  color: #aaa;
}
.form {
  margin: 10px;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.form > div {
  border-bottom: 1px solid #eee;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
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
import { mapState } from 'vuex'
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
    ...mapState(['user']),
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
      submitting: false,
      date: null,
      contact: '',
      teacher: '',
      remark: '',
      members: [],
      loading: true,
      newMemberID: ''
    }
  },
  created() {
    this.date = this.$moment()
  },
  onUnload() {
    this.loading = true
  },
  mounted() {
    // this.getHistory()
    // wx.showNavigationBarLoading()
    this.loading = true
    console.log('from new')
    let now = new Date()
    this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let rid = this.$root.$mp.query.rid
    this.date = this.$moment(this.$root.$mp.query.date, 'YYYY-MM-DD')
    this.getRoom(rid)
    this.members = []
    this.members.push({
      id: this.user.userID,
      name: this.user.name
    })
  },
  methods: {
    onMemberDelete(memberIndex) {
      this.members.splice(memberIndex, 1)
    },
    onMemberAdd() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i]
        if (member.id === this.newMemberID) {
          wx.showToast({
            title: '用户已添加',
            icon: 'none'
          })
          return
        }
      }
      this.$http
        .get(`/users/${this.newMemberID}`)
        .then(resp => {
          this.members.push({
            id: resp.user.id,
            name: resp.user.name
          })
          this.newMemberID = ''
        })
        .catch(err => {
          wx.showToast({
            title: '用户未激活，需要在本系统进行一次登陆以激活',
            icon: 'none'
          })
          console.log(err)
        })
    },
    getRoom(roomID) {
      wx.showNavigationBarLoading()
      let timestamp = parseInt(this.date.valueOf() / 1000)
      this.$http
        .get(`/room-booking/rooms/${roomID}`, {
          timestamp: timestamp,
          group: 'ces'
        })
        .then(res => {
          this.room = res.room
          this.restrict = res.restrict
          this.loading = false
          wx.hideNavigationBarLoading()
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
      // if (!this.teacher) {
      //   wx.showToast({
      //     title: '请填写导师姓名',
      //     icon: 'none'
      //   })
      //   return
      // }
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
      this.submitting = true
      this.$http
        .post('/room-booking/orders/', {
          roomID: this.room.id,
          start: this.start * 600,
          end: this.end * 600,
          date: parseInt(this.date.valueOf() / 1000),
          // teacher: this.teacher,
          contact: this.contact,
          remark: this.remark,
          members: this.members.map(x => {
            return x.id
          })
        })
        .then(resp => {
          this.submitting = false
          console.log(resp)
          wx.redirectTo({
            url: '../success/main'
          })
          // this.$emit('reservateSuccess')
          // this.$q.notify('预约成功！')
        })
        .catch(err => {
          this.submitting = false
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
