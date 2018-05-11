<template>
  <div class="page">
    <div class = "principle">
      <image src = "/static/images/ykguo.jpg"/>
    </div>
    <div class = "remarks">
      <p>&emsp;&emsp;什么是真正的一流大学，在我看来，就是要凝聚一批学者，他们以为人类做出贡献、
        产生让人类铭记的研究为目标。有了这样一批学者当老师，继而把做科研的乐趣传递给年轻的学生，
        让他们觉得青春时代受到很好的教育——这样的大学就是一流大学。我们要为建设这样的大学而踏实奋斗！
      </p>
      <div class = "right">——郭毅可院长寄语</div>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped>
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .principle{
    margin-top: 15%;
  }
  .principle image{
    width: 200rpx;
    height: 200rpx;
    margin:auto;
  }
  .remarks{
    margin-top: 50rpx;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
    font-family: 楷体;
  }
 .right{
    text-align: right;
 }
</style>