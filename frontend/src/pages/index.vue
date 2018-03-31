<template lang="pug">
  q-page(style="margin-bottom:80px;")
    q-page-sticky(expand position="bottom" style="z-index:1000;")
      div.row.justify-around.full-width.bg-white.q-pb-md.q-pt-md
        div
          q-btn(icon="skip_previous" label="上一天")
        div
          q-btn(flat label="3/21(周五)")
        div
          q-btn(icon="skip_next" label="下一天")
    div.q-ml-md.q-mr-md
      q-card.q-mt-lg(v-for="x in 6")
        q-card-title.q-ml-md(class="q-subheading") 504
          <span slot="subtitle">x 个时间段空闲</span>
        q-card-separator
        q-card-main.full-width
          div.row(style="overflow-x:scroll")
            div.row.no-wrap(flat)
              div.justify-start(v-for="i in 13" style="color:grey;height:1rem;width:3rem;") 8:00
            q-btn-group.row(flat)
              q-btn.bg-blue-grey(flat v-for="i in 13" color="white" style="height:2rem;width:3rem;" :label="i")
        q-card-actions(align="end")
          q-btn(flat   icon="event" label="预定")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
