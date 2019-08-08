<template>
  <div>
    <div style=" text-align: right;">
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
    <div>
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
      <div class="__p_Cb_u_44" @click="godetail">
        <i class="el-icon-shopping-cart-2 __p_Cb_u_110" @click.stop="goaddshop"></i>
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
    goaddshop() {
      this.$confirm("确定加入购物车?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("添加成功!");
        })
        .catch(() => {});
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
  position: absolute;
  display: none;
}
.__p_Cb_u_44:hover .__p_Cb_u_110 {
  display: block;
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

.__p_Cb_u_46 {
  font-size: 30px;
  font-family: "jelly";
  color: #67b4fc;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.__p_Cb_u_51 {
  color: #6e6b6b;
  font-family: "jelly";
  font-size: 20px;
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
  height: 220px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 30px;
  padding-top: 5px;
  margin-top: 30px;
}
</style>
