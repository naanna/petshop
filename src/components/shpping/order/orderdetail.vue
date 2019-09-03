<template>
  <div>
    <div class="headclass">
      <div class="headerinfo">
        <span class="textclass">交易单号</span>
        <span>{{orderid}}</span>
      </div>
      <div class="headerinfo">
        <span class="textclass">交易时间</span>
        <span>{{time}}</span>
      </div>
    </div>
    <el-table :data="tabledata" class="table">
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
      <el-table-column label="单价" width="160px" prop="price" align="center" header-align="center">
        <template slot-scope="scope">
          <span class="money1">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        width="160px"
        prop="ordernum"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        label="金额"
        width="160px"
        prop="ordernum"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span class="money2">￥{{scope.row.ordernum*scope.row.price}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="textdiv1">
      <span>实付款：</span>
      <span>￥{{totalprice}}</span>
    </div>
    <div class="textdiv1">
      <span>下单账户：</span>
      <span>{{username}}</span>
    </div>
    <div class="button">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
import Util from "@assets/Util.js";
export default {
  name: "orderdetail",
  data() {
    return {
      orderid: "",
      tabledata: [],
      totalprice: "",
      username: "",
      time: ""
    };
  },
  created() {
    if (this.DialogParams().row) {
      this.orderid = this.DialogParams().row.orderid;
      this.totalprice = this.DialogParams().row.totalprice;
      this.username = this.DialogParams().row.username;
      this.time = this.DialogParams().row.time;
      this.goquery();
    }
  },
  methods: {
    goquery() {
      this.axios
        .get("/api/getorderdetail", {
          params: {
            orderid: this.orderid
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.tabledata = results.sort(Util.objSort("orderdetailid"));
          }
        });
    },
    goclose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.formclass {
  margin-bottom: 0px;
}
.headclass {
  line-height: 32px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}
.headerinfo {
  display: inline-block;
}
.textclass {
  margin-right: 10px;
}
.button {
  text-align: center;
  padding-top: 20px;
}
.textdiv1 {
  text-align: right;
  margin: 20px 20px 0 0;
  font-size: 18px;
}
</style>
