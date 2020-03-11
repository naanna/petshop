<template>
  <div>
    <div style="display:flex;">
      <div class="detail-box">
        <el-avatar
          shape="square"
          :src="form.picture"
          style="width: 150px; height: 150px"
          slot="trigger"
        ></el-avatar>
        <p class="detail-name">粥粥</p>
      </div>
      <div class="detail-info-box">
        <div>
          <span>编号：</span>
          <span>{{form.petid}}</span>
        </div>
        <div>
          <span>性别：</span>
          <span>{{form.sex}}</span>
        </div>
        <div>
          <span>年龄：</span>
          <span>{{form.age}}</span>
        </div>
        <div>
          <span>状态：</span>
          <span v-if="form.status=='saled'">售出</span>
          <span v-else-if="form.status=='saling'">在售</span>
          <span v-else-if="form.status=='caring'">寄养</span>
          <span v-else>领回</span>
        </div>
        <div>
          <span>价格：</span>
          <span>{{form.price}}</span>
        </div>
        <div>
          <span>种类：</span>
          <span v-if="form.type=='cat'">猫</span>
          <span v-else-if="form.type=='dog'">狗</span>
          <span v-else>猪</span>
        </div>
        <div>
          <span>品种：</span>
          <span>{{form.variety}}</span>
        </div>
      </div>
    </div>
    <div>
      <p class="detail-info">介绍：</p>
      <el-input
        type="textarea"
        :rows="3"
        :readonly="true"
        style="padding-left:30px;margin-bottom:10px;"
        class="textarea"
        v-model="form.note"
      ></el-input>
    </div>
    <div class="center">
      <el-button size="small" @click="goClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "petdetail",
  data() {
    return {
      form: []
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.form = this.DialogParams().row;
    }
  },
  methods: {
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.detail-box {
  flex: 1;
  padding-left: 30px;
  padding-top: 30px;
}
.detail-info-box {
  line-height: 30px;
  font-size: 20px;
  margin-left: 40px;
  font-family: "jelly", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  flex: 2;
  color: #cc496e;
}
.detail-name {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(155, 155, 155);
  font-family: "jelly";
}
.detail-info {
  padding-left: 30px;
  font-family: "jelly";
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.textarea >>> .el-textarea__inner {
  font-family: "jelly" !important;
  font-size: 20px !important;
  width: 350px;
}
.el-avatar >>> img {
  width: 100%;
}
</style>
