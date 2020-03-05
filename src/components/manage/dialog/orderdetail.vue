<template>
  <div>
    <div id="print_html">
      <div class="head-box">
        <div class="head-info">
          <span class="head-span">交易单号</span>
          <span>{{orderid}}</span>
        </div>
        <div class="head-info">
          <span class="head-span">交易时间</span>
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
      <div class="footer-box">
        <span>实付款：</span>
        <span>￥{{totalprice}}</span>
      </div>
      <div class="footer-box">
        <span>下单账户：</span>
        <span>{{username}}</span>
      </div>
    </div>
    <div class="center"> 
      <el-button size="small" @click="goExport">导出Excel</el-button>
      <el-button size="small" @click="goPrint">打印</el-button>
      <el-button size="small" @click="goClose">关闭</el-button>
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
      this.goQuery();
    }
  },
  methods: {
    goQuery() {
      this.axios
        .get("/api/order/detail/get", {
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
    goClose() {
      this.closeDialog();
    },
    goPrint() {
      var bdhtml = window.document.body.innerHTML;
      // 通过id获取需要打印的页面
      var printHtml = document.getElementById("print_html").innerHTML;
      // 需要打印的页面
      window.document.body.innerHTML = printHtml;
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //是否ie
        remove_ie_header_and_footer();
      }
      //调用打印
      window.print();
      // 还原界面
      window.document.body.innerHTML = bdhtml;
      window.location.reload();
    },
    goExport(value) {
      this.axios
        .post(
          "/api/order/detail/export",
          {
            orderid: this.orderid
          },
          { responseType: "arraybuffer" }
        )
        .then(_res => {
          const blob = new Blob([_res.data], {
            type: "application/vnd.ms-excel;"
          });
          const a = document.createElement("a");
          // 生成文件路径
          let href = window.URL.createObjectURL(blob);
          a.href = href;
          let _fileName = _res.headers["content-disposition"]
            .split(";")[1]
            .split("=")[1]
            .split(".")[0];
          // 文件名中有中文 则对文件名进行转码
          a.download = decodeURIComponent(_fileName);
          // 利用a标签做下载
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        });
    }
  }
};
</script>

<style scoped>
.head-box {
  line-height: 32px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}
.head-info {
  display: inline-block;
}
.head-span {
  margin-right: 10px;
}
.footer-box {
  text-align: right;
  margin: 20px 20px 0 0;
  font-size: 18px;
}
</style>
