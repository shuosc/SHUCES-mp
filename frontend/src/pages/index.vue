<template lang="pug">
  q-page
    div.row.justify-around.full-width.q-mt-md
      div
        q-btn(icon="skip_previous" label="上一天")
      div
        q-btn(flat label="3/21(周五)")
      div
        q-btn(icon="skip_next" label="下一天")
    div.q-mt-lg(v-for="x in 6")
      div.row.q-ml-md(class="q-subheading") 504
      div.full-width
        div.row.no-wrap(style="overflow-x:scroll")
          div( v-for="i in 13" )
            div.text-grey 8:00
            q-btn.bg-positive(flat color="white" style="height:10px;" :label="i")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
