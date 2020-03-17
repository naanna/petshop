<template>
  <div>
    <span class="fontclass">我的购物车</span>
    <el-steps :active="active" finish-status="success" simple class="step">
      <el-step title="放进购物车"></el-step>
      <el-step title="确认支付"></el-step>
      <el-step title="订单信息" v-if="showSuccess"></el-step>
      <el-step status="error" title="订单信息" v-else></el-step>
    </el-steps>
    <div v-show="active==1">
      <el-button type="primary" size="small" @click="go2Del">删除选中</el-button>
      <el-button size="small" v-if="failure" @click="goCear">清空失效</el-button>
      <el-table
        :data="tableData"
        highlight-current-row
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="status"
          type="selection"
          width="80px"
          align="center"
          header-align="center"
          :selectable="selectInit"
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
            <el-tag v-if="scope.row.status=='soldout'||scope.row.status=='saled'" type="info">失效</el-tag>
            <span class="shopcar-money1" v-else>￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="160px" prop="num" align="center" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status=='soldout'||scope.row.status=='saled'">宝贝已下架！</span>
            <el-input-number
              size="small"
              v-model="scope.row.num"
              v-else
              :min="1"
              :max="scope.row.goodnum"
              @change="changeNum(scope.row)"
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
            <span v-if="scope.row.status=='soldout'||scope.row.status=='saled'">不能够买，请联系卖家</span>
            <span v-else class="shopcar-money2">￥{{scope.row.num*scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center" header-align="center">
          <div slot-scope="scope">
            <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <div class="shopcar-info-box">
        <span>已选商品</span>
        <span class="shopcar-price">{{totalnum}}</span>
        <span class="shopcar-span">件</span>
        <span>合计：</span>
        <span class="shopcar-price">￥{{totalprice}}</span>
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
            <span class="shopcar-money1">￥{{scope.row.price}}</span>
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
            <span class="shopcar-money2">￥{{scope.row.num*scope.row.price}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="shopcar-info-box">
        <span>实付款：</span>
        <span class="shopcar-price1">￥{{totalprice}}</span>
      </div>
    </div>
    <div v-show="active==3">
      <div v-if="showSuccess">
        <div class="success-box">
          <img src="@picture/success.png" class="shopcar-picture" />
          <div class="success-info-box">
            <strong>支付成功！</strong>
            <p>恭喜您，您的支付已经成功！</p>
            <p>订单信息如下显示！</p>
            <p>如有其它问题，请立即与我们客服人员联系。</p>
            <span>返回</span>
            <span class="car" @click="goBack">购物车</span>
          </div>
        </div>
        <el-form label-position="right" class="shopcar-order-form">
          <el-form-item label="订单号：" label-width="100px">
            <span class="shopcar-span">{{form.orderid}}</span>
          </el-form-item>
          <el-form-item label="支付金额：" label-width="100px">
            <span class="shopcar-span">{{form.totalprice}}</span>
          </el-form-item>
          <el-form-item label="下单时间：" label-width="100px">
            <span class="shopcar-span">{{form.time}}</span>
          </el-form-item>
          <el-form-item label="下单账户：" label-width="100px">
            <span class="shopcar-span">{{form.username}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="success-box">
          <img src="@picture/wrong.png" class="shopcar-picture" />
          <div class="success-info-box">
            <strong>支付失败！</strong>
            <p>对不起，无法购买！</p>
            <p>当前访问页面失效，可能您停留时间过长，请重新提交申请！</p>
            <span>返回</span>
            <span class="car" @click="goBack">购物车</span>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcar-info-box">
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
      tableData: [],
      showSuccess: true,
      // 超时定时器
      overTimer: null,
      // 是否超时
      isOvertime: false,
      form: {},
      failure: false
    };
  },
  created() {
    this.getShopCar();
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
    getShopCar() {
      this.axios
        .get("/api/shopcar/get", {
          params: {
            username: this.$store.state.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            let i = 0;
            this.tableData = results.sort(Util.objSort("shopcarid"));
            this.tableData = this.tableData.sort(this.Sortfailure("status"));
            this.tableData.forEach(item => {
              if (item.petid) item.goodnum = 1;
              if (item.status == "saled" || item.status == "soldout") i++;
            });
            if (i > 0) {
              this.failure = true;
            } else {
              this.failure = false;
            }
          }
        });
    },
    //将失效的放到最底下
    Sortfailure(prop) {
      return function(obj1) {
        var val1 = obj1[prop];
        if (!isNaN(Number(val1))) {
          val1 = Number(val1);
        }
        if (val1 == "saled" || val1 == "soldout") {
          return 1;
        } else {
          return 0;
        }
      };
    },
    goDel(row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/shopcar/delete", {
              data: [{ shopcarid: row.shopcarid }]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getShopCar();
              }
            });
        })
        .catch(() => {});
    },
    go2Del() {
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
            .delete("/api/shopcar/delete", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getShopCar();
              }
            });
        })
        .catch(() => {});
    },
    next() {
      if (this.active == 2) {
        if (this.isOvertime) {
          this.showSuccess = false;
          this.active++;
        } else {
          const loading = this.$loading({
            lock: true,
            text: "订单提交中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.form.time = this.moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.form.username = this.$store.state.username;
          this.form.totalprice = this.totalprice;
          this.axios
            .post("/api/order/add", {
              username: this.form.username,
              totalprice: this.form.totalprice,
              time: this.form.time
            })
            .then(res => {
              if (res.data.success) {
                this.form.orderid = res.data.orderid;
                return this.axios.post("/api/order/detail/add", {
                  orderid: res.data.orderid,
                  totalprice: this.totalprice,
                  username: this.$store.state.username,
                  list: this.selectObj
                });
              } else {
                this.showSuccess = false;
              }
            })
            .then(res => {
              if (res.data.success) {
                if (res.data.message == "购物车内商品库存不足") {
                  this.showSuccess = false;
                } else if (res.data.message == "购物车内宠物售出购买失败") {
                  this.showSuccess = false;
                }
              } else {
                this.showSuccess = false;
              }
            });
          setTimeout(() => {
            loading.close();
            this.active++;
          }, 2000);
        }
      } else this.active++;
    },
    goCear() {
      let delobs = this.tableData.filter(item => {
        return item.status == "saled" || item.status == "soldout";
      });
      this.$confirm("确认删除所选吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/shopcar/delete", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("清空成功！");
                this.getShopCar();
              }
            });
        })
        .catch(() => {});
    },
    up() {
      this.active--;
    },
    goBack() {
      this.$router.go(0);
    },
    changeNum(row) {
      if (row.num == undefined) {
        row.num = 1;
      }
      if (row.goodid) {
        this.axios
          .put("/api/shopcar/update", {
            shopcarid: row.shopcarid,
            num: row.num
          })
          .then(res => {
            if (res.data.success) {
              this.getShopCar();
            }
          });
      }

      this.totalprice = 0;
      this.selectObj.forEach(item => {
        if (item.carid == row.carid) item.num = row.num;
        this.totalprice += item.num * item.price;
      });
    },
    selectInit(row, index) {
      if (row.status == "soldout" || row.status == "saled") {
        return false; //不可勾选
      } else {
        return true; //可勾选
      }
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
  margin: 20px 0;
}
.shopcar-span {
  margin-right: 20px;
}
.shopcar-price {
  color: #f40;
  font-size: 18px;
  margin: 0 5px 0 5px;
}
.shopcar-price1 {
  color: #f40;
  font-size: 30px;
  margin: 0 5px 0 5px;
}
.shopcar-info-box {
  display: block;
  text-align: right;
  margin-top: 20px;
}
.shopcar-money1 {
  font-size: 20px;
}
.shopcar-money2 {
  font-size: 20px;
  color: #f40;
}
.shopcar-order-form {
  margin: 0 auto;
  width: 500px;
}
.shopcar-picture {
  width: 160px;
  margin-right: 20px;
  height: 160px;
}
.success-box {
  text-align: center;
  margin-bottom: 40px;
}
.success-info-box {
  display: inline-block;
  text-align: left;
}
.shopcar-span {
  color: rgb(82, 80, 80);
}
.car {
  cursor: pointer;
  margin-left: 10px;
  color: #00a1d6;
}
</style>
