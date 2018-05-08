<template lang="pug">
  div
    div.info.shadow-1
    div.form.shadow-1
      div(style="display:flex;")
        div 教室 
        div.ces(style="flex:4;text-align:center;") 504
      div(style="display:flex;")
        div 日期
        div.ces(style="flex:4;text-align:center;") 2018-05-02
      div(style="padding-top:20px;padding-bottom:20px;")
        room-schedule(:rooms="rooms" :roomVisible="false")
      div(style="display:flex;")
        div 开始
        div.ces(style="flex:4;text-align:center;display:flex;") 
          picker(style="flex:1;height:100%;text-align:right;" @change="bindPickerChange" :value="index" :range="array")
            view(class="picker")
              | {{array[index]}}
          span(style="padding-left:10px;padding-right:10px;") :
          picker(style="flex:1;height:100%;text-align:left;" @change="bindPickerChange" :value="index" :range="array")
            view(class="picker")
              | {{array[index]}}
      div(style="display:flex;")
        div 结束
        div.ces(style="flex:4;text-align:center;") 
          picker(style="height:100%;" @change="bindPickerChange" :value="index" :range="array")
            view(class="picker")
              | {{array[index]}}
      button.shadow-1(type="primary" style="margin:10px;")  确认预约

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
// const timeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
import RoomSchedule from '@/components/RoomSchedule'
const schedule = []
export default {
  components: {
    RoomSchedule
  },
  name: 'RoomBookingNew',
  // computed: {
  //   startOptions: function() {
  //     let options = []
  //     options = rawStartOptions.filter(x => {
  //       return this.room.schedule[x.value - 1] === 1
  //     })
  //     return options
  //   },
  //   endOptions: function() {
  //     let options = []
  //     if (this.start === null) {
  //       return options
  //     } else {
  //       let start = this.start - 1
  //       let i = this.start - 1
  //       while (this.room.schedule[i]) {
  //         options.push({
  //           label: `第${i + 1}节（${schedule[i].end}）`,
  //           value: i + 1
  //         })
  //         if (i - start + 1 >= 4) {
  //           break
  //         }
  //         i += 1
  //       }
  //       return options
  //     }
  //   },
  //   roomSchedule: function() {
  //     let schedule = this.room.schedule.slice()
  //     if (this.start !== null && this.end !== null) {
  //       for (let i = this.start - 1; i < this.end; i++) {
  //         if (schedule[i] === 1) {
  //           schedule[i] = -1
  //         }
  //       }
  //     }
  //     // console.log(schedule)
  //     return schedule
  //   },
  //   spareCount: function() {
  //     return this.room.schedule.reduce((total, num) => {
  //       return total + num
  //     })
  //   }
  // },
  data: function() {
    return {
      orders: [],
      schedule: schedule,
      rooms: [{ name: '504' }],
      selected: '',
      index: 0,
      array: ['A', 'B', 'C']
    }
  },
  mounted() {
    this.getHistory()
    console.log('from new')
  },
  methods: {
    getHistory() {
      this.$http
        .get('/room-booking/orders/?type=personal')
        .then(resp => {
          this.orders = resp.data.orders
        })
        .catch(err => {
          console.log(err)
        })
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
    }
  }
}
</script>
