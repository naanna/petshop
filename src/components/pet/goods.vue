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

      <el-select size="small" style="width:200px;" v-model="searchval" v-else clearable>
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
      <el-col :span="4" v-for="(item, index) in tabledata" :key="index">
        <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
          <el-image class="image" :src="item.picture"></el-image>
          <div>
            <span class="money">¥ {{item.price}}元</span>
            <span class="num">{{item.num}}件</span>
            <span class="title">{{item.name}}</span>
            <div class="flexclass">
              <el-button
                v-if="item.collect"
                type="danger"
                size="small"
                icon="el-icon-star-off"
                @click="gonocollect(item)"
              ></el-button>
              <el-button v-else size="small" icon="el-icon-star-off" plain @click="gocollect(item)"></el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                icon="el-icon-shopping-cart-1"
                @click="goaddshop(item)"
              ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[12,24,36,48]"
      :page-size="page_size"
      :total="total"
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
      money1: "",
      money2: "",
      total: 0,
      page_no: 1,
      page_size: 12,
      tabledata: [],
      collectobs: []
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
      let query = this.makependingquery();
      this.axios
        .get("/api/getgood", {
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
              this.$set(this.tabledata[i], "collect", false);
            }
            return this.axios.get("/api/getcollect", {
              params: {
                username: this.$store.state.username
              }
            });
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.collectobs = results.filter(item => item.goodid);
            this.setcollect();
          }
        });
    },
    setcollect() {
      for (let i in this.tabledata) {
        for (let j in this.collectobs) {
          if (this.tabledata[i].goodid == this.collectobs[j].goodid) {
            this.tabledata[i].collect = true;
            this.tabledata[i].collectid = this.collectobs[j].collectid;
          }
        }
      }
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    goaddshop(row) {
      this.$confirm("您确认要加入购物车吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/addshopcar", {
              goodid: row.goodid,
              username: this.$store.state.username
            })
            .then(res => {
              if (res.data.success) {
                if (res.data.message == "已达上限") {
                  this.$message.warning("购物车中数量已达最大库存！");
                } else {
                  this.$message.success("成功加入购物车！");
                }
              }
            });
        })
        .catch(() => {});
    },
    change() {
      this.money1 = "";
      this.money2 = "";
      this.searchval = "";
    },
    gocollect(row) {
      this.collect = true;
      this.axios
        .post("/api/addcollect", {
          username: this.$store.state.username,
          goodid: row.goodid
        })
        .then(res => {
          if (res.data.success) {
            this.goquery();
            this.$message.success("加入收藏!");
          }
        });
    },
    gonocollect(row) {
      this.axios
        .delete("/api/deletecollect?collectid=" + row.collectid)
        .then(res => {
          if (res.data.success) {
            this.goquery();
            this.$message.success("取消收藏!");
          }
        });
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
  height: 30px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.image {
  width: 100%;
  height: 160px;
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
