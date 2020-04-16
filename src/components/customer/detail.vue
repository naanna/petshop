<template>
  <div style="display:flex;">
    <div class="customer-detail-title">
      <el-avatar shape="square" :size="180" :src="customerObs.picture"></el-avatar>
      <p class="pclass">{{customerObs.nickname}}</p>
    </div>
    <div class="customer-info-box">
      <div>
        <span>账号：</span>
        <span>{{customerObs.username}}</span>
      </div>
      <div>
        <span>姓名：</span>
        <span>{{customerObs.name}}</span>
      </div>
      <div>
        <span>性别：</span>
        <span>{{customerObs.sex}}</span>
      </div>
      <div>
        <span>余额：</span>
        <span>{{customerObs.money}}</span>
      </div>
      <div v-if="customer">
        <span>等级：</span>
        <span>{{customerObs.level}}</span>
      </div>
      <div>
        <span>生日：</span>
        <span>{{customerObs.birthday}}</span>
      </div>
      <div>
        <span>注册日期：</span>
        <span>{{customerObs.regday}}</span>
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
      customerObs: []
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.customer = true;
      this.customerObs = this.DialogParams().row;
    }
  }
};
</script>

<style scoped>
.customer-detail-title {
  flex: 1;
  padding-left: 30px;
}
.customer-info-box {
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
.el-avatar >>> img {
  width: 100% !important;
}
</style>
