<template>
  <div>
    <span class="fontclass">我的购物车</span>
    <el-steps :active="active" finish-status="success" simple class="step">
      <el-step title="放进购物车"></el-step>
      <el-step title="确认支付"></el-step>
      <el-step title="订单信息" v-if="showsuccess"></el-step>
      <el-step status="error" title="订单信息" v-else></el-step>
    </el-steps>
    <div v-show="active==1">
      <el-button type="primary" size="small" @click="go2del">删除选中</el-button>
      <el-table
        :data="tabledata"
        highlight-current-row
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="id"
          type="selection"
          width="80px"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="商品信息"
          prop="picture"
          width="160px"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-image style="width: 120px; height: 120px" :src="scope.row.picture" fit="full"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" header-align="center"></el-table-column>
        <el-table-column label="价格" width="160px" prop="price" align="center" header-align="center">
          <template slot-scope="scope">
            <span class="money1">￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="160px" prop="num" align="center" header-align="center">
          <template slot-scope="scope">
            <el-input-number
              size="small"
              v-model="scope.row.num"
              :min="1"
              :max="scope.row.goodnum"
              @change="changenum(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
          width="160px"
          prop="totalprice"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span class="money2">￥{{scope.row.num*scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center" header-align="center">
          <div slot-scope="scope">
            <el-button type="text" size="small" @click="godel(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <div class="info">
        <span>已选商品</span>
        <span class="price">{{totalnum}}</span>
        <span class="spanclass">件</span>
        <span>合计：</span>
        <span class="price">￥{{totalprice}}</span>
      </div>
    </div>
    <div v-show="active==2">
      <el-table :data="selectObj" class="table">
        <el-table-column prop="id" type="selection" v-if="false"></el-table-column>
        <el-table-column
          label="商品信息"
          prop="picture"
          width="160px"
          align="center"
          header-align="center"
          :key="Math.random()"
        >
          <template slot-scope="scope">
            <el-image style="width: 120px; height: 120px" :src="scope.row.picture" fit="full"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" header-align="center"></el-table-column>
        <el-table-column label="单价" width="160px" prop="price" align="center" header-align="center">
          <template slot-scope="scope">
            <span class="money1">￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="160px" prop="num" align="center" header-align="center"></el-table-column>
        <el-table-column
          label="金额"
          width="160px"
          prop="totalprice"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span class="money2">￥{{scope.row.num*scope.row.price}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="info">
        <span>实付款：</span>
        <span class="price1">￥{{totalprice}}</span>
      </div>
    </div>
    <div v-show="active==3">
      <div v-if="showsuccess">
        <img src="@picture/success.png" class="picture" />
        <div class="successdiv">
          <strong>支付成功！</strong>
          <p>恭喜您，您的支付已经成功！</p>
          <p>订单信息如下显示！</p>
          <p>如有其它问题，请立即与我们客服人员联系。</p>
          <span>返回</span>
          <span class="car" @click="goback">购物车</span>
        </div>
        <el-form label-position="right" class="formclass">
          <el-form-item label="订单号：" label-width="100px" prop="name">
            <span class="spanclass">123</span>
          </el-form-item>
          <el-form-item label="支付金额：" label-width="100px" prop="price">
            <span class="spanclass">123</span>
          </el-form-item>
          <el-form-item label="下单时间：" label-width="100px" prop="type">
            <span class="spanclass">123</span>
          </el-form-item>
          <el-form-item label="下单账户：" label-width="100px" prop="num">
            <span class="spanclass">123</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <img src="@picture/wrong.png" class="picture" />
        <div class="successdiv">
          <strong>支付失败！</strong>
          <p>对不起，无法购买！</p>
          <p>当前访问页面失效，可能您停留时间过长，请重新提交申请！</p>
          <span>返回</span>
          <span class="car" @click="goback">购物车</span>
        </div>
      </div>
    </div>
    <div class="info">
      <el-button type="primary" @click="next" :disabled="count" v-if="active==1">结算</el-button>
      <el-button v-if="active==2" @click="up">返回购物车</el-button>
      <el-button v-if="active==2" type="primary" @click="next">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import Util from "@assets/Util.js";
export default {
  name: "shopcar",
  data() {
    return {
      active: 1,
      totalnum: 0,
      totalprice: 0,
      count: true,
      selectObj: [],
      tabledata: [],
      showsuccess: true,
      // 超时定时器
      overTimer: null,
      // 是否超时
      isOvertime: false
    };
  },
  created() {
    this.getshopcar();
  },
  watch: {
    active: function() {
      if (this.active == 2) {
        this.overTimer = setTimeout(() => {
          this.isOvertime = true;
        }, 300000);
      }
    }
  },
  destroyed() {
    // 销毁定时器
    clearTimeout(this.overTimer);
  },
  methods: {
    getshopcar() {
      this.axios
        .get("/api/getshopcar", {
          params: {
            username: this.User.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.tabledata = results.sort(Util.objSort("shopcarid"));
            for (let i in this.tabledata) {
              if (this.tabledata[i].petid) {
                this.tabledata[i].goodnum = 1;
              }
            }
          }
        });
    },
    godel(row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleshopcar", {
              data: [{ shopcarid: row.shopcarid }]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getshopcar();
              }
            });
        })
        .catch(() => {});
    },
    go2del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          shopcarid: item.shopcarid
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除所选吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleshopcar", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getshopcar();
              }
            });
        })
        .catch(() => {});
    },
    next() {
      if (this.active == 2) {
        if (this.isOvertime) {
          this.showsuccess = false;
          this.active++;
        } else {
          const loading = this.$loading({
            lock: true,
            text: "订单提交中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.axios
            .post("/api/addorder", {
              username: this.User.username,
              totalprice: this.totalprice,
              time: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            })
            .then(res => {
              if (res.data.success) {
                return this.axios.post("/api/addorderdetail", {
                  orderid: res.data.orderid,
                  totalprice: this.totalprice,
                  username: this.User.username,
                  list: this.selectObj
                });
              }
            })
            .then(res => {
              if (res.data.success) {
                if (res.data.message == "购物车内商品库存不足") {
                  this.showsuccess = false;
                } else if (res.data.message == "购物车内宠物售出购买失败") {
                  this.showsuccess = false;
                }
              }
            });

          setTimeout(() => {
            loading.close();
            this.active++;
          }, 2000);
        }
      } else this.active++;
    },
    up() {
      this.active--;
    },
    goback() {
      this.$router.go(0);
    },
    changenum(row) {
      if (row.num == undefined) {
        row.num = 1;
      }
      if (row.goodid) {
        this.axios
          .post("/api/updateshopcar", {
            shopcarid: row.shopcarid,
            num: row.num
          })
          .then(res => {
            if (res.data.success) {
              this.getshopcar();
            }
          });
      }

      this.totalprice = 0;
      this.selectObj.forEach(item => {
        if (item.carid == row.carid) item.num = row.num;
        this.totalprice += item.num * item.price;
      });
    },
    handleSelectionChange(val) {
      let self = this;
      var obj = eval("(" + JSON.stringify(val) + ")");
      self.selectObj = [];
      self.totalprice = 0;
      self.totalnum = obj.length;
      if (obj.length > 0) {
        this.count = false;
      } else this.count = true;
      for (var i = 0; i < obj.length; i++) {
        var temp = obj[i];
        self.selectObj.push(temp);
      }
      self.selectObj.forEach(item => {
        self.totalprice += item.num * item.price;
      });
    }
  }
};
</script>

<style scoped>
.step {
  margin-top: 20px;
  margin-bottom: 20px;
}
.spanclass {
  margin-right: 20px;
}
.price {
  color: #f40;
  font-size: 18px;
  margin: 0 5px 0 5px;
}
.price1 {
  color: #f40;
  font-size: 30px;
  margin: 0 5px 0 5px;
}
.info {
  display: block;
  text-align: right;
  margin-top: 20px;
}
.money1 {
  font-size: 20px;
}
.money2 {
  font-size: 20px;
  color: #f40;
}
.formclass {
  margin-top: 40px;
  margin-left: 500px;
}
.picture {
  width: 160px;
  margin-left: 400px;
  margin-right: 20px;
  height: 160px;
}
.successdiv {
  display: inline-block;
  vertical-align: top;
  padding-top: 10px;
}
.spanclass {
  color: rgb(82, 80, 80);
}
.car {
  cursor: pointer;
  margin-left: 10px;
  color: rgb(82, 80, 80);
}
</style>
