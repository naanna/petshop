<template>
  <div style="display:flex;">
    <div class="div1">
      <el-avatar shape="square" :size="180" :src="customerobs.picture"></el-avatar>
      <p class="pclass">{{customerobs.nickname}}</p>
    </div>
    <div class="div2">
      <div>
        <span>账号：</span>
        <span>{{customerobs.username}}</span>
      </div>
      <div>
        <span>姓名：</span>
        <span>{{customerobs.name}}</span>
      </div>
      <div>
        <span>性别：</span>
        <span>{{customerobs.sex}}</span>
      </div>
      <div>
        <span>余额：</span>
        <span>{{customerobs.money}}</span>
      </div>
      <div v-if="customer">
        <span>等级：</span>
        <span>{{customerobs.level}}</span>
      </div>
      <!-- <div>
        <span>历史消费：</span>
        <span>{{customerobs.money}}</span>
      </div> -->
      <div>
        <span>生日：</span>
        <span>{{customerobs.birthday}}</span>
      </div>
      <div>
        <span>注册日期：</span>
        <span>{{customerobs.regday}}</span>
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
      customerobs: []
    };
  },
  mounted() {
    if (this.rjDialogParams().row) {
      this.customer = true;
      this.customerobs = this.rjDialogParams().row;
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
  font-size: 25px;
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
