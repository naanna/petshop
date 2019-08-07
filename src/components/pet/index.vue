<template>
  <div>
    <div style="float:right;">
      <input
        type="text"
        placeholder="¥"
        v-model.number="money1"
        size="small"
        class="el-input__inner inputwidth"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <span style="margin-left:5px;margin-right:5px;">-</span>
      <input
        type="text"
        placeholder="¥"
        v-model.number="money2"
        size="small"
        class="el-input__inner inputwidth"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <el-button type="primary" size="small" style="margin-left:10px;" @click="gosearch">搜索</el-button>
    </div>
    <div style="padding-top:35px;">
      <i class="el-icon-plus __p_Cb_u_122" @click="goadd"></i>
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>

      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
      </div>
      <div class="__p_Cb_u_44">
        <i class="el-icon-close __p_Cb_u_110"></i>
        <img src="http://vve.qiniu.qjzd.net/FmNFhsiCua2mQK8NhfsODiiE1LtY" class="__p_Cb_u_45" />
        <span class="__p_Cb_u_46">粥粥</span>
        <div class="__p_Cb_u_50">
          <span class="__p_Cb_u_51">猫咪</span>
          <span class="__p_Cb_u_51">一岁</span>
        </div>
        <div class="__p_Cb_u_53">
          <span class="__p_Cb_u_51">在售</span>
          <span class="__p_Cb_u_51">2000</span>
        </div>
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
import detail from "./detail.vue";
export default {
  components: {
    rjDialog
  },
  name: "index",
  data() {
    return {
      money1: "",
      money2: ""
    };
  },
  methods: {
    gosearch() {
      const query = {};
      if (this.money1 != "" && this.money2 == "") {
        query.small = this.money1;
      } else if (this.money1 == "" && this.money2 != "") {
        query.big = this.money2;
      } else if (this.money1 > this.money2) {
        let money = this.money2;
        this.money2 = this.money1;
        this.money1 = money;
        query.small = this.money1;
        query.big = this.money2;
      } else {
        query.small = this.money1;
        query.big = this.money2;
      }
      console.log(query);
    },
    goadd() {
      this.rjDialog
        .title("添加宠物")
        .width("600px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    godetail() {
      this.rjDialog
        .title("宠物详情")
        .width("500px")
        .currentView(detail, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    }
  }
};
</script>

<style scoped>
.inputwidth {
  height: 32px;
  line-height: 32px;
  width: 70px;
}
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
.__p_Cb_u_122 {
  width: 182px;
  height: 145px;
  cursor: pointer;
  margin-top: 40px;
  margin-right: 40px;
  border: 1px solid #dddddd;
  font-size: 60px;
  color: #dddddd;
  display: inline-block;
  text-align: center;
  padding-top: 60px;
  vertical-align: bottom;
}

.__p_Cb_u_45 {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
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

.__p_Cb_u_50 {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
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
  height: 200px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 38px;
  padding-top: 5px;
  margin-top: 40px;
}
</style>
