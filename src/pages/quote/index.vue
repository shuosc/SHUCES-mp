<template>
  <div class="page">
    <div class="principle">
      <image src="/static/images/Guoyk.jpg"/>
    </div>
    <blockquote>
      <p class="quotation">
        什么是真正的一流大学，在我看来，就是要凝聚一批学者，他们以为人类做出贡献、 产生让人类铭记的研究为目标。<br/>
        有了这样一批学者当老师，继而把做科研的乐趣传递给年轻的学生， 让他们觉得青春时代受到很好的教育。——这样的大学就是一流大学。<br/>我们要为建设这样的大学而踏实奋斗！
      </p>
    </blockquote>
    <div class="footer">——郭毅可院长</div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.principle {

}
.principle image {
  height: 750rpx;
}
.remarks {
  margin-top: 50rpx;
  margin-left: 10%;
  margin-right: 10%;
  text-align: left;
  font-family: 楷体;
}
.right {
  text-align: right;
}
.quotation {
  font-size: 15px;
  border-left: 10px solid #ccc;
  /* margin: 0 auto; */
  quotes: '\201C''\201D''\2018''\2019';
  padding: 10px 20px;
  line-height: 1.4;
  margin: 10px;
}

.quotation:before {
  content: open-quote;
  display: inline;
  line-height: 0;
  left: -10px;
  position: relative;
  top: 10px;
  color: #ccc;
  font-size: 3em;
}
.quotation::after {
  content: close-quote;
  display: inline;
  line-height: 0;
  left: 10px;
  position: relative;
  top: 15px;
  color: #ccc;
  font-size: 3em;
}
.footer {
  display:block;
  margin: 0;
  width:100vw;
  margin-right:20px;
  text-align: right;
  font-size: 20px;
  font-style: italic;
}
</style>