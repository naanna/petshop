<template>
  <div>
    <div style="display:flex;">
      <div class="pet-detail-box">
        <el-avatar shape="square" :size="120" :src="form.picture"></el-avatar>
        <p class="pet-name">{{form.name}}</p>
      </div>
      <div class="pet-info-box">
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
          <span v-if="form.type=='cat'">猫咪</span>
          <span v-else-if="form.type=='dog'">狗狗</span>
          <span v-else>香猪</span>
        </div>
        <div>
          <span>品种：</span>
          <span>{{form.variety}}</span>
        </div>
      </div>
    </div>
    <div>
      <p class="pet-info">介绍：</p>
      <el-input type="textarea" :rows="3" :readonly="true" class="textarea" v-model="form.note"></el-input>
    </div>

    <div class="pet-button-box">
      <el-button
        v-if="collect"
        type="danger"
        size="small"
        icon="el-icon-star-on"
        circle
        @click="goNoCollect"
      ></el-button>
      <el-button v-else size="small" icon="el-icon-star-off" circle @click="goCollect"></el-button>
      <div class="pet-button">
        <el-button type="primary" size="small" @click="goAdd">加入购物车</el-button>
        <el-button size="small" @click="goClose">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      collect: false,
      form: []
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.form = this.DialogParams().row;
    }
  },
  methods: {
    goAdd() {
      this.axios
        .post("/api/addshopcar", {
          petid: this.form.petid,
          username: this.$store.state.username
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.message == "宠物已达上限") {
              this.$message.warning("购物车中数量已达最大库存！");
            } else {
              this.$message.success("成功加入购物车！");
              this.closeDialog();
            }
          }
        });
    },
    goCollect() {
      this.collect = true;
    },
    goNoCollect() {
      this.collect = false;
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.el-avatar >>> img {
  width: 100% !important;
}
.textarea >>> .el-textarea__inner {
  font-family: "jelly" !important;
  font-size: 20px !important;
  width: 350px;
  margin-left: 30px;
}
.pet-detail-box {
  flex: 2;
  text-align: center;
  padding-left: 30px;
  padding-top: 30px;
}
.pet-info-box {
  line-height: 30px;
  font-size: 20px;
  font-family: "jelly", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  flex: 2;
  color: #cc496e;
}
.pet-name {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(155, 155, 155);
  font-family: "jelly";
}
.pet-info {
  padding-left: 30px;
  font-family: "jelly";
  font-size: 20px;
  margin-bottom: 10px;
}
.pet-button-box {
  padding-left: 30px;
  margin-top: 20px;
}
.pet-button {
  margin-left: 80px;
  display: inline-block;
}
</style>
