<template>
  <div>
    <div style="display:flex;">
      <div class="div1">
        <el-avatar shape="square" :size="120" :src="url"></el-avatar>
        <p class="pclass">粥粥</p>
      </div>
      <div class="div2">
        <div>
          <span>编号：</span>
          <span>MMZDCW00001</span>
        </div>
        <div>
          <span>性别：</span>
          <span>女</span>
        </div>
        <div>
          <span>年龄：</span>
          <span>一岁</span>
        </div>
        <div>
          <span>状态：</span>
          <span>在售中</span>
        </div>
        <div>
          <span>价格：</span>
          <span>20000</span>
        </div>
        <div>
          <span>种类：</span>
          <span>猫咪</span>
        </div>
        <div>
          <span>品种：</span>
          <span>波斯猫</span>
        </div>
      </div>
    </div>
    <div>
      <p>备注：</p>
      <el-input type="textarea" :rows="3" :readonly="true" class="inputclass"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      customer: false,
      url: "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/touxiang1.jpg"
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
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(61, 147, 245);
  font-family: "jelly";
}
.inputclass{
  width: 300px;
}
</style>
