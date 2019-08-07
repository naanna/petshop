<template>
  <div style="display:flex;">
    <div class="div1">
      <el-avatar shape="square" :size="120" :src="url"></el-avatar>
      <p class="pclass">壮壮</p>
    </div>
    <div class="div2">
      <div>
        <span>账号：</span>
        <span>admin</span>
      </div>
      <div>
        <span>姓名：</span>
        <span>粥粥</span>
      </div>
      <div>
        <span>性别：</span>
        <span>女</span>
      </div>
      <div>
        <span>余额：</span>
        <span>10000</span>
      </div>
      <div v-if="customer">
        <span>等级：</span>
        <span>高级VIP</span>
      </div>
      <div>
        <span>历史消费：</span>
        <span>20000</span>
      </div>
      <div>
        <span>生日：</span>
        <span>2000-01-05</span>
      </div>
      <div>
        <span>注册日期：</span>
        <span>2019-08-19</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      customer: false,
      url:
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/touxiang1.jpg"
    };
  },
  mounted() {
    if (this.rjDialogParams().customer) {
      console.log(this.rjDialogParams().customer);
      this.customer = true;
    }
  }
};
</script>

<style scoped>
.div1 {
  flex: 1;
  padding-top: 50px;
  padding-left: 30px;
}
.div2 {
  line-height: 30px;
  font-size: 20px;
  margin-left: 40px;
  font-family: "jelly", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  flex: 2;
  color: rgb(32, 127, 190);
}
.pclass {
  margin-top: 10px;
  margin-top: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(61, 147, 245);
  font-family: "jelly";
}
</style>
