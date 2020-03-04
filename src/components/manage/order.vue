<template>
  <div>
    <span class="fontclass">订单管理</span>
    <div style="  margin-top: 20px;">
      <el-select size="small" class="width200" v-model="type">
        <el-option value="订单号" label="订单号"></el-option>
        <el-option value="下单账户" label="下单账户"></el-option>
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
        class="input200"
      ></el-input>
      <el-button type="primary" size="small" @click="goSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe highlight-current-row class="table">
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
      page_size: 10
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
          query.username = this.searchVal;
        }
      }
      return query;
    },
    goQuery() {
      let query = this.makePendingQuery();
      this.axios
        .get("/api/getorder", {
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
            .delete("/api/detelorder?orderid=" + row.orderid)
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
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
      this.Dialog
        .title("订单详情")
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
  display: inline-block;
  vertical-align: bottom;
}
.input200 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
  margin-right: 10px;
}
.table {
  margin-top: 10px;
}
.time-rang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>