<template>
  <div class="about-box">
    <div class="about-picture-box">
      <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/touxiang.jpg" class="about-picture" />
      <p class="about-name">mxy</p>
      <p class="about-name">木木周</p>
    </div>
    <div class="about-info-box">
      <p class="p">技术栈</p>
      <span class="about-English">The skill of my shop</span>
      <el-divider></el-divider>
      <p>整个项目基于vue-cli</p>
      <p>vue+element+axios+node.js+mysql</p>
      <p class="p">关于我</p>
      <span class="about-English">The info about me</span>
      <el-divider></el-divider>
      <p>昵称:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;壮壮</p>
      <p>来自:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;福州</p>
      <p>技能:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;java/html/css/js</p>
      <p>坐标:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;福建师范大学</p>
      <p>github:&nbsp;&nbsp;&nbsp;&nbsp;https://github.com/naanna</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style scoped>
.about-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 150px 0 150px;
  display: flex;
  background-color: #9ad4e2;
  background-image: url("~@/assets/picture/fish.png");
}
.about-picture-box {
  flex: 1;
  text-align: center;
  padding-top: 140px;
}
.about-picture {
  height: 250px;
  width: 250px;
  border-radius: 50%;
}
.about-name {
  font-family: "楷体";
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 25px;
}
.about-info-box {
  flex: 2;
  margin-left: 20px;
}
.p {
  margin-top: 90px;
  margin-bottom: 5px;
  font-size: 20px;
}
.el-divider {
  background-color: #949aa0 !important;
  margin-top: 10px !important;
}
.about-English {
  font-family: "Times new roman";
}
</style>