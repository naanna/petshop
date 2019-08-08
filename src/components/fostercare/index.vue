<template>
  <div style="margin-left:20px;">
    <div style="text-align: center;">
      <p class="ruleclass">寄养观赏区</p>
    </div>
    <div class="__p_Cb_u_44" @click="godetail">
      <el-avatar
        src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY"
        class="__p_Cb_u_45"
        @error="errorHandler"
      >
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
      <span class="__p_Cb_u_46">粥粥</span>
      <div class="__p_Cb_u_50">
        <span class="__p_Cb_u_51">猫咪</span>
        <span class="__p_Cb_u_52">一岁</span>
      </div>
    </div>

    <el-pagination
      :current-page="1"
      :page-sizes="[50,100,200]"
      :page-size="50"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper"
      class="__p_Cb_u_111"
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
.__p_Cb_u_111 {
  margin-top: 40px;
  margin-right: 40px;
  text-align: right;
}
.__p_Cb_u_110 {
  cursor: pointer;
  float: right;
  display: none;
}
.__p_Cb_u_44:hover .__p_Cb_u_110 {
  display: block;
}

.__p_Cb_u_46 {
  font-size: 16px;
  color: #d69191;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.__p_Cb_u_51 {
  color: #6ec8f5;
}

.__p_Cb_u_52 {
  color: #6ec8f5;
}

.__p_Cb_u_50 {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
}

.__p_Cb_u_54 {
  color: #6ec8f5;
}

.__p_Cb_u_55 {
  color: #6ec8f5;
}

.__p_Cb_u_53 {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  margin-top: 10px;
  padding-right: 10px;
}

.__p_Cb_u_44 {
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
.__p_Cb_u_45 {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}

.__p_Cb_u_44 .__p_Cb_u_45:hover {
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
