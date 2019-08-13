<template>
  <div>
    <div class="divbut">
      <div style="display:inline-block;">
        <el-button type="primary" size="small" @click="goseeout">查看售出</el-button>
        <el-button type="primary" size="small" @click="goseein">查看在售</el-button>
      </div>
      <div style="display:inline-block;">
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
    </div>
    <div>
      <div class="petdiv" @click="godetail(item)" v-for="(item,index) in tabledata" :key="index">
        <i
          class="el-icon-shopping-cart-2 shopcar"
          @click.stop="goaddshop"
          v-if="item.status=='saling'||item.status=='booking'"
        ></i>
        <el-image class="petpic" :src="item.picture" fit="fill"></el-image>
        <span class="text3">{{item.name}}</span>
        <div class="text">
          <span class="text1">{{item.variety}}</span>
          <span class="text1">{{item.age}}</span>
        </div>
        <div class="text2">
          <span class="text1" v-if="item.status=='booking'">代售中</span>
          <span class="text1" v-else-if="item.status=='booked'">代售出</span>
          <span class="text1" v-else-if="item.status=='saled'">售出</span>
          <span class="text1" v-else>在售</span>
          <span class="text1">{{item.price}}</span>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[12,24,36,48]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="pageclass"
    ></el-pagination>

    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import detail from "./detail.vue";
import Util from "@assets/Util.js";
export default {
  components: {
    rjDialog
  },
  name: "index",
  data() {
    return {
      money1: "",
      money2: "",
      tabledata: [],
      total: 0,
      page_no: 1,
      page_size: 12,
      seeout: false
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.seeout) {
        query.index = "status = 'booked' or status = 'saled'";
      } else {
        query.index = "status ='saling' or status = 'booking'";
      }
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
      return query;
    },
    goquery() {
      const query = this.makependingquery();
      this.axios
        .get("/api/getpet", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tabledata = results.message;
            this.total = results.total;
            for (let i in this.tabledata) {
              var now = this.moment(
                this.moment(new Date()).format("YYYY-MM-DD")
              );
              var age = Util.displayAge(this.tabledata[i].birthday, now);
              this.tabledata[i].age = age;
            }
          }
        });
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    goseeout() {
      this.page_no = 1;
      this.seeout = true;
      this.money1 = "";
      this.money2 = "";
      this.goquery();
    },
    goseein() {
      this.page_no = 1;
      this.seeout = false;
      this.money1 = "";
      this.money2 = "";
      this.goquery();
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
    godetail(row) {
      this.rjDialog
        .title("宠物详情")
        .width("500px")
        .currentView(detail, { row })
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
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
.pageclass {
  margin-top: 40px;
  margin-right: 40px;
  text-align: right;
}
.shopcar {
  cursor: pointer;
  position: absolute;
  display: none;
}
.petdiv:hover .shopcar {
  display: block;
}

.petpic {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}

.petdiv .petpic:hover {
  transform: scale(1.4);
}

.text3 {
  font-size: 30px;
  font-family: "jelly";
  color: #67b4fc;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.text1 {
  color: #6e6b6b;
  font-family: "jelly";
  font-size: 20px;
}

.text {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
}

.text2 {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  margin-top: 10px;
  padding-right: 10px;
}

.petdiv {
  cursor: pointer;
  width: 200px;
  height: 220px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 24px;
  padding-top: 5px;
  margin-top: 30px;
}
.divbut {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}
</style>
