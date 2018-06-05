<template>
  <div class="page">
    <div class="principle">
      <image src="/static/Guoyk.jpg"/>
    </div>
    <div class = "pic-note">上海大学计算机学院院长&emsp;郭毅可</div>
    <div class = "line"></div>
    <div class = "paragraph">
      <div class = "title-block">
        <image src = "/static/block.png"/>
        <p>院长寄语</p>
      </div>
      <div class="quotation">
        <p>&emsp;什么是真正的一流大学?<br/></p>
        <div class = "quotation"><br/></div>
        <p>&emsp;在我看来，<br/></p>
        <p>&emsp;就是要凝聚一批学者，<br/></p>
        <p>&emsp;他们以为人类做出贡献、<br/></p>
        <p>&emsp;产生让人类铭记的研究为目标。<br/></p>
        <p>&emsp;有了这样一批学者当老师，<br/></p>
        <p>&emsp;继而把做科研的乐趣<br/></p>
        <p>&emsp;传递给年轻的学生，<br/></p>
        <p>&emsp;让他们觉得青春时代受到很好的教育。<br/></p>
        <div class = "quotation"><br/></div>
        <p>&emsp;——这样的大学就是一流大学。<br/></p>
        <p>&emsp;我们要为建设这样的大学而踏实奋斗！</p>
      </div>
    </div>
    <div class = "line" ></div>
    <div class="weui-footer__text"><p>Copyright © 2018 上海大学计算机学院</p></div>
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
    width: 100%;
    height: 1100rpx;
  }
  .principle image {
    width: 100%;
    height: 1100rpx;
  }
  .pic-note {
    width: 100%;
    margin-top: 28rpx;
    margin-bottom: 28rpx;
    text-align: center;
    font-size: 30rpx;
    font-family: 等线;
  }
  .line{
    margin-top: 20rpx;
    width:85%;
    height: 2rpx;
    background:#aaa;
  }
  .paragraph{
    width: 100%;
    margin: 40rpx 0rpx 5rpx 0rpx;
    text-align: center;
  }
  .title-block{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: left;
  }
  .title-block image{
    margin-left: 40rpx;
    width: 45rpx;
    height: 45rpx;
  }
  .title-block p{
    font-size: 45rpx;
    font-family: 黑体;
    font-weight: bold;
    line-height: 45rpx;
    margin-left: 20rpx;
  }
  .quotation {
    background-color:antiquewhite;
    margin: 50rpx 40rpx 20rpx 40rpx;
    /* margin: 0 auto; */
    /* quotes: '\201C''\201D''\2018''\2019'; */
  }
  .quotation p{
    text-align: left;
    font-family: 宋体;
    font-size: 33rpx;
    line-height: 2.3;
  }
  .weui-footer__text{
    margin: 15rpx 0rpx 15rpx 0rpx;
    width: 100%;
    text-align: center;
    font-size: 18rpx;
    text-decoration: 	gray;
  }

</style>