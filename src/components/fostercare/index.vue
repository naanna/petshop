<template>
  <div style="margin-left:20px;">
    <div style="text-align: center;">
      <p class="ruleclass">寄养观赏区</p>
    </div>
    <div class="picdiv" @click="godetail">
      <el-avatar
        src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY"
        class="pic"
        @error="errorHandler"
      >
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
      <span class="name">粥粥</span>
      <div class="ifno">
        <span class="text">猫咪</span>
        <span class="text">一岁</span>
      </div>
    </div>

    <el-pagination
      :current-page="1"
      :page-sizes="[50,100,200]"
      :page-size="50"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper"
      class="pageclass"
    ></el-pagination>

    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import add_update from "./add_update.vue";
export default {
  components: {
    rjDialog
  },
  name: "index",
  data() {
    return {};
  },
  methods: {
    errorHandler() {
      return true;
    },
    godetail() {
      this.rjDialog
        .title("查看宝贝")
        .width("450px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    }
  }
};
</script>

<style scoped>
.pageclass {
  margin-top: 40px;
  margin-right: 40px;
  text-align: right;
}

.name {
  font-size: 16px;
  color: #d69191;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.text {
  color: #6ec8f5;
}

.ifno {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
}

.picdiv {
  cursor: pointer;
  width: 150px;
  height: 170px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 35px;
  padding-top: 10px;
  margin-bottom: 60px;
}
.pic {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}

.picdiv .pic:hover {
  transform: scale(1.4);
}

.ruleclass {
  background: linear-gradient(to right, #ffa264, #ff3b5f);
  -webkit-background-clip: text;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 15px;
  font-family: "jelly";
  color: transparent;
}
</style>
