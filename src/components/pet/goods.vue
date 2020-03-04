<template>
  <div>
    <div style=" text-align: right;">
      <el-select size="small" class="goods-search" v-model="type" @change="change">
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
          oninput="value=value.replace(/[^\d]/g,'');if(value.length>10)value=value.slice(0,10)"
        />
        <span style="margin-left:5px;margin-right:5px;">-</span>
        <input
          type="text"
          placeholder="¥"
          v-model.number="money2"
          size="small"
          class="el-input__inner inputwidth"
          oninput="value=value.replace(/[^\d]/g,'');if(value.length>10)value=value.slice(0,10)"
        />
      </div>
      <el-select size="small" style="width:200px;" v-model="searchVal" v-else clearable>
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
      <el-button type="primary" size="small" style="margin-left:10px;" @click="goSearch">搜索</el-button>
    </div>
    <el-row style="min-width:1120px;max-width:1350px;width:100%">
      <el-col :span="4" v-for="(item, index) in tableData" :key="index">
        <el-card class="goods-card" shadow="hover" :body-style="{ padding: '0px' }">
          <el-image class="goods-image" :src="item.picture"></el-image>
          <div>
            <span class="goods-money">¥ {{item.price}}元</span>
            <span class="goods-num">{{item.num}}件</span>
            <el-tooltip
              v-if="item.name.length>12"
              class="goods-title"
              effect="dark"
              :content="item.name"
              placement="bottom"
            >
              <p class="goods-title">{{item.name}}</p>
            </el-tooltip>
            <p v-else class="goods-title">{{item.name}}</p>
            <div class="goods-button-box">
              <el-button
                v-if="item.collect"
                type="danger"
                size="small"
                icon="el-icon-star-off"
                @click="goNoCollect(item)"
              ></el-button>
              <el-button v-else size="small" icon="el-icon-star-off" plain @click="goCollect(item)"></el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                icon="el-icon-shopping-cart-1"
                @click="goAddShop(item)"
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
  </div>
</template>

<script>
export default {
  name: "goods",
  data() {
    return {
      type: "价格",
      searchVal: "狗粮",
      money1: "",
      money2: "",
      total: 0,
      page_no: 1,
      page_size: 12,
      tableData: [],
      collectObs: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        show: true
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
        if (this.searchVal != "") query.type = this.searchVal;
      }
      return query;
    },
    goQuery() {
      let query = this.makePendingQuery();
      this.axios
        .get("/api/getgood", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
            for (let i in this.tableData) {
              this.$set(this.tableData[i], "collect", false);
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
            this.collectObs = results
              .filter(item => item.status == "sale")
              .map(item => {
                return item.goodid;
              });
            this.tableData.filter(item => {
              if (this.collectObs.includes(item.goodid)) {
                item.collect = true;
                return this.collectObs.includes(item.goodid);
              }
            });
          }
        });
    },
    goSearch() {
      this.page_no = 1;
      this.goQuery();
    },
    goAddShop(row) {
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
      this.searchVal = "";
    },
    goCollect(row) {
      this.axios
        .post("/api/addcollect", {
          username: this.$store.state.username,
          goodid: row.goodid
        })
        .then(res => {
          if (res.data.success) {
            row.collect = true;
            this.$message.success("加入收藏!");
          }
        });
    },
    goNoCollect(row) {
      this.axios
        .delete("/api/deletecollect", {
          data: {
            username: this.$store.state.username,
            goodid: row.goodid
          }
        })
        .then(res => {
          if (res.data.success) {
            row.collect = false;
            this.$message.success("取消收藏!");
          }
        });
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
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
.goods-button-box {
  padding: 0 10px 10px 0;
  text-align: right;
}
.goods-card {
  margin-right: 40px;
  margin-top: 40px;
}
.goods-title {
  font-size: 13px;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-image {
  width: 100%;
  height: 160px;
  display: block;
}
.goods-money {
  display: block;
  color: #f40;
  padding: 10px 0 0 10px;
}
.goods-search {
  width: 200px;
  margin-right: 10px;
}
.goods-num {
  text-align: right;
  display: block;
  color: #999;
  padding-right: 10px;
}
</style>
