<template lang="pug">
  q-page(style="margin-bottom:80px;")
    //- q-page-sticky(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md
        div
          q-btn(icon="skip_previous" label="上一天")
        div
          q-btn(flat label="3/21(周五)")
        div
          q-btn(icon-right="skip_next" label="下一天")
    div.q-ml-md.q-mr-md
      q-card.q-mt-lg(v-for="x in 6")
        q-card-title.q-ml-md(class="q-subheading") 504
          //- <span slot="subtitle">x 个时间段空闲</span>
        q-card-separator
        q-card-main
          <dl class="horizontal">
            <dt>预约时间</dt>
            <dd>2018/01/23 （周五）</dd>
            <dt>预约时段</dt>
            <dd>1～4节（8:00～12:00）</dd>
            <dt>备注</dt>
            <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
          </dl>
        q-card-separator
          //- div.row.justify-between(style="overflow-x:scroll")
            div
            div
              div.row.no-wrap(flat)
                div.justify-start(v-for="i in 13" style="color:grey;height:1rem;width:3rem;") 8:00
              q-btn-group.row.no-wrap(flat)
                q-btn.bg-blue-grey(flat v-for="i in 13" color="white" style="height:2rem;width:3rem;" :label="i")
            div
        q-card-actions(align="end")
          //- q-btn(flat  icon="event" label="修改")
          q-btn(flat  icon="delete" label="取消预约")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
