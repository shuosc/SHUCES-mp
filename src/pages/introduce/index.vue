<template>
  <div class="weui-artical">
    <div class="picture">
      <image src="https://static.shuhelper.cn/shuces/mpapp/imgs/yh.gif" style="height:300rpx;"/>
    </div>
    <div class="weui-artical__h2">建院历史>></div>
    <blockquote>
      <p class="introduce" id="stretch">
        上海大学计算机工程与科学学院始建于1988年，由上海工业大学计算机工程系和上海科学技术大学计算机科学系联合成立，
        学院是在<span style="color:#FF4136">钱伟长老校长</span>亲切关怀下成立的<span style="color:#FF851B">上海市高校中第一所计算机学院</span>，清华大学教授<span style="color:#FF4136">李三立院士</span>为首任院长。
        1994年，随着新上海大学的诞生，原上海大学计算机应用系和原上海高等科技专科学校计算机应用系也加入计算机学院，
        联合成立的计算机学院正式命名为上海大学计算机工程与科学学院。<br>
        1999年9月，学院搬迁至延长校区。<br>
        2012年9月，学院搬迁至宝山校区。
      </p>
    </blockquote>
    <div class="picture">
      <image src="/static/fgx2.png" style="height:100rpx"/>
    </div>
    <div class="weui-artical__h2">组织结构>></div>
    <div class="weui-artical__h3">3个研究中心</div>
      <ul class="a">
        <li>上海大学先进计算中心</li>
        <li>上海市上大多媒体应用技术研究中心</li>
        <li>上海市高性能计算机及网络技术研发平台</li>
      </ul>
    <div class="weui-artical__h3">2个系（筹）</div>
      <ul class="a">
        <li>计算机科学与技术系</li>
        <li>智能科学与技术系</li>
      </ul>
    <div class="weui-artical__h3">1个公共平台</div>
      <ul class="a">
        <li>上海大学高性能计算中心</li>
      </ul>
    <div class="weui-artical__h3">学科点</div>
    <p class="sample" style="text-align:center;font-size:13px">本科：计算机科学与技术</p>
    <p style="text-align:center;font-size:13px">工学硕士：计算机科学与技术、软件工程</p>
    <p style="text-align:center;font-size:13px">工程硕士：软件工程、计算机技术</p>
    <p class="sample" style="font-size:13px;text-align:center">博士：计算机应用技术</p>
    <div class="picture">
      <image src="/static/fgx2.png" style="height:100rpx"/>
    </div>
    <div class="weui-artical__h2">办学定位>></div>
    <blockquote>
      <p class="introduce">
        学院自成立以来，<span style="color:#FF851B">已完成或正在完成的国家级和省部级项目300余项</span>。
        学院培养的学生主要从事计算机软硬件的系统设计开发、销售维护、信息服务及其他行业的计算机管理应用工作，
        部分学生选择继续攻读硕士、博士学位或出国深造。
        学院毕业生遍布全球，五年来，近八成学生服务上海社会经济发展，成为行业精英。
      </p>
    </blockquote>
    <div class="weui-artical__h3">学院的定位</div>
      <p class="introduce1">形成以计算科学与人工智能技术为学科特色的计算机人才培养模式，成为
        行业高端人才培养的重要基地，促进高水平学科的形成和多学科交叉的发展，
        服务上海和国家产业和经济发展，成为国家经济建设和社会发展的重要支撑，
        努力建设特色鲜明、国内外有重大影响力的一流研究型学院。
      </p>
    <div class="weui-artical__h3">人才培养目标</div>
      <p class="introduce1">培养具有良好的道德修养和科学修养，系统掌握本学科的基本理论、基本
        技能与方法，具有国际视野和跨文化沟通能力，从事计算机科学与技术相关行业的优秀创新型复合人才。
      </p>
    <div class="picture">
      <image src="/static/fgx2.png" style="height:100rpx"/>
    </div>
    <div class="weui-artical__h2">发展方向>></div>
    <blockquote>
      <p class="introduce">
          2015年起，英国帝国理工学院终身教授、数据研究所所长<span style="color:#FF4136">郭毅可</span>担任学院院长。
          学院进入新一轮发展，确立了四个学科发展方向：<span style="color:#FF851B">类脑智能计算、媒体创意计算、高效能计算和智慧社会计算</span>，
          并与材料、社会学、通信、电影、美术等学科进行交叉学科合作，
          在世界一流大学和一流学科建设的道路上努力做出贡献，服务上海，服务全国。
      </p>
    </blockquote>
    <!--<div class="footer" style="background-color:#AAAAAA">
       <p style="font-size:10px;text-align:center">Copyright © 2018 上海大学计算机学院</p> 
    </div> -->
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
ul.a {
  list-style-type: lower-roman;
  text-align: center;
  font-size: 13px;
}
.weui-artical {
  flex-direction: column;
  margin-top: 5%;
  margin-bottom: 75rpx;
}
.weui-artical__h1 {
  text-align: center;
  font-style: bold;
  font-size: 30px;
  color: black;
  letter-spacing: 0;
}
.weui-artical__h2 {
  margin-left: 5%;
  width: max-content;
  text-shadow: 5px 5px 5px grey;
  background-color: #39cccc;
  color: white;
}
.weui-artical__h3 {
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  color: #39cccc;
  width: 90%;
  font-size: 15px;
  font-style: bold;
  display: inline-block;
}
.introduce {
  font-size: 13px;
  font-style: bold;
  padding: 10px 20px;
  line-height: 1.9;
  margin-bottom: 30rpx;
  margin-left: 5%;
  margin-right: 5%;
  text-indent: 2em;
  text-align: justify;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px grey;
  border-top-style: solid;
  border-left-style: solid;
  border-color: #39cccc;
  border-width: 1.5px;
}
.introduce1 {
  margin-left: 9%;
  margin-right: 9%;
  font-size: 13px;
  text-indent: 2em;
  text-align: justify;
  line-height: 1.9;
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
  border-color: #39cccc;
  border-width: 1px;
  padding: 10px 20px;
}
.picture image {
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
}
#line {
  width: 50%;
  height: 20rpx;
}
</style>