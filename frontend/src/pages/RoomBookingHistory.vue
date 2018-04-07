<template lang="pug">
  q-page(style="margin-bottom:80px;")
    div.q-ml-md.q-mr-md
      q-card.q-mt-lg(v-for="order in orders" :key="order.id")
        q-card-title.q-ml-md(class="q-subheading") {{order.room}}
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
          //- q-btn(flat  icon="event" label="修改")
          q-btn(flat  icon="delete" label="取消预约" @click="onDeleteClick(order.id)")
</template>

<style>

</style>

<script>
import { schedule } from '../libs/const'
export default {
  name: 'RoomBookingHistory',
  data: function() {
    return {
      orders: [],
      schedule: schedule
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getHistory() {
      this.$http
        .get('/api/ces/orders/?type=personal')
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
      this.$http.delete(`/api/ces/orders/${id}`).then(resp => {
        this.$q.notify('取消成功')
        this.getHistory()
      })
    }
  }
}
</script>
