<template>
  <div>
    <span class="fontclass">订单管理</span>
    <div class="button-box">
      <div>
        <el-select size="small" class="width200" v-model="type">
          <el-option value="订单号" label="订单号"></el-option>
          <el-option value="下单账号" label="下单账号"></el-option>
          <el-option value="下单日期" label="下单日期"></el-option>
        </el-select>
        <el-date-picker
          v-if="type=='下单日期'"
          v-model="searchVal"
          type="daterange"
          class="time-rang"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-input
          v-if="type!='下单日期'"
          v-model="searchVal"
          placeholder="请输入搜索内容"
          type="text"
          size="small"
          clearable
          class="width200"
        ></el-input>
        <el-button type="primary" size="small" @click="goSearch">搜索</el-button>
      </div>
      <el-dropdown @command="goExport">
        <el-button size="small">导出Excel</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">当前</el-dropdown-item>
          <el-dropdown-item command="all">全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table :data="tableData" stripe highlight-current-row>
      <el-table-column label="订单号" prop="orderid" align="center" header-align="center"></el-table-column>
      <el-table-column label="总价" prop="totalprice" align="center" header-align="center"></el-table-column>
      <el-table-column label="下单时间" sortable prop="time" align="center" header-align="center"></el-table-column>
      <el-table-column label="下单账号" prop="username" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[10,20,50,100]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="fyclass"
    ></el-pagination>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import orderdetail from "./dialog/orderdetail.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      type: "订单号",
      searchVal: "",
      tableData: [],
      total: 0,
      page_no: 1,
      page_size: 10,
      query: {}
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.searchVal != null && this.searchVal != "") {
        if (this.type == "订单号") {
          query.orderid = this.searchVal;
        } else if (this.type == "下单日期") {
          var time = this.moment(this.searchVal[0]).format("YYYY-MM-DD");
          var time1 = this.moment(this.searchVal[1]).format("YYYY-MM-DD");
          query.starttime = time;
          query.endtime = time1;
        } else {
          query.userName = this.searchVal;
        }
      }
      return query;
    },
    goQuery() {
      this.query = this.makePendingQuery();
      this.axios
        .get("/api/order/get", {
          params: {
            ...this.query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
            for (let i in this.tableData) {
              this.tableData[i].time = this.moment(
                this.tableData[i].time
              ).format("YYYY-MM-DD HH:mm:ss");
            }
          }
        });
    },
    goSearch() {
      this.page_no = 1;
      this.goQuery();
    },
    goDel(row) {
      this.$confirm("您确定要删除记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/order/delete?orderid=" + row.orderid)
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goExport(value) {
      let obs = {};
      if (value == "current") {
        obs = this.query;
      }
      obs.exportType = value;
      this.axios
        .post(
          "/api/order/export",
          {
            ...obs
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
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
    },
    goDetail(row) {
      this.Dialog.title("订单详情")
        .width("800px")
        .currentView(orderdetail, { row })
        .then(data => {})
        .show();
    }
  }
};
</script>
<style scoped>
.width200 {
  width: 200px;
  margin-right: 10px;
}
.time-rang {
  margin-right: 10px;
}
.button-box {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px 0;
}
</style>