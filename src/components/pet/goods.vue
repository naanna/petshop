<template>
  <div>
    <div style=" text-align: right;">
      <el-select size="small" class="search" v-model="type" @change="change">
        <el-option value="价格" label="价格"></el-option>
        <el-option value="种类" label="种类"></el-option>
      </el-select>
      <div style=" display:inline-block;" v-if="type=='价格'">
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
      </div>

      <el-select size="small" style="width:200px;" v-model="searchval" v-else>
        <el-option value="狗粮" label="狗粮"></el-option>
        <el-option value="猫粮" label="猫粮"></el-option>
        <el-option value="猪粮" label="猪粮"></el-option>
        <el-option value="玩具" label="玩具"></el-option>
        <el-option value="日用品" label="日用品"></el-option>
        <el-option value="颈链" label="颈链"></el-option>
        <el-option value="洗浴" label="洗浴"></el-option>
        <el-option value="医疗" label="医疗"></el-option>
        <el-option value="睡窝" label="睡窝"></el-option>
        <el-option value="宠物箱" label="宠物箱"></el-option>
      </el-select>
      <el-button type="primary" size="small" style="margin-left:10px;" @click="gosearch">搜索</el-button>
    </div>
    <el-row>
      <el-col :span="4" v-for="(item, index) in 8" :key="index">
        <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
          <el-image
            class="image"
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          ></el-image>
          <div>
            <span class="money">¥ 5元</span>
            <span class="num">0件</span>
            <span class="title">麦当劳板烧鸡腿堡</span>
            <div class="flexclass">
              <el-button
                v-if="collect"
                type="danger"
                size="small"
                icon="el-icon-star-off"
                @click="gonocollect"
              ></el-button>
              <el-button v-else size="small" icon="el-icon-star-off" plain @click="gocollect"></el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                icon="el-icon-shopping-cart-1"
                @click="goaddshop"
              ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-pagination
      :current-page="1"
      :page-sizes="[50,100,200]"
      :page-size="50"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper"
      class="fyclass"
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
  name: "goods",
  data() {
    return {
      type: "价格",
      searchval: "狗粮",
      collect: false,
      money1: "",
      money2: "",
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.type == "价格") {
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
        } else if (this.money1 != "" && this.money2 != "") {
          query.small = this.money1;
          query.big = this.money2;
        }
      } else {
        if (this.searchval != "") query.type = this.searchval;
      }
      return query;
    },
    goquery() {
      const query = this.makependingquery();
      console.log(query);
    },
    gosearch() {
      this.page_no = 1;
      this.go2Query();
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
    change() {
      this.money1 = "";
      this.money2 = "";
      this.searchval = "";
    },
    gocollect() {
      this.collect = true;
    },
    gonocollect() {
      this.collect = false;
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

.flexclass {
  padding: 15px 10px 10px 0;
  text-align: right;
}

.card {
  margin-right: 40px;
  margin-top: 40px;
}
.title {
  font-size: 13px;
  display: block;
  text-align: center;
}

.image {
  width: 100%;
  display: block;
}
.money {
  display: block;
  color: #f40;
  padding: 10px 0 0 10px;
}
.search {
  width: 200px;
  margin-right: 10px;
}
.num {
  text-align: right;
  display: block;
  color: #999;
  padding-right: 10px;
}
</style>
