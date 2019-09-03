<template>
  <div>
    <div>
      <el-select size="small" class="width200" v-model="type" @change="change">
        <el-option value="订单号" label="订单号"></el-option>
        <el-option value="订单日期" label="订单日期"></el-option>
      </el-select>
      <el-date-picker
        v-if="type=='订单日期'"
        v-model="searchval"
        type="daterange"
        class="timerang"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-input
        v-if="type!='订单日期'"
        v-model="searchval"
        placeholder="请输入搜索内容"
        type="text"
        clearable
        size="small"
        class="width2001"
      ></el-input>
      <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="table">
      <el-table-column label="购物订单号" prop="orderid" align="center" header-align="center"></el-table-column>
      <el-table-column label="总价" prop="totalprice" align="center" header-align="center"></el-table-column>
      <el-table-column label="购物日期" prop="time" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="godetail(scope.row)">详情</el-button>
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
import Dialog from "../../dialog.vue";
import orderdetail from "./orderdetail.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      type: "订单号",
      searchval: "",
      tabledata: [],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        username: this.$store.state.username
      };
      if (this.searchval != null && this.searchval != "") {
        if (this.type == "订单号") {
          query.orderid = this.searchval;
        } else {
          var time = this.moment(this.searchval[0]).format("YYYY-MM-DD");
          var time1 = this.moment(this.searchval[1]).format("YYYY-MM-DD");
          query.starttime = time;
          query.endtime = time1;
        }
      }
      return query;
    },
    goquery() {
      let query = this.makependingquery();
      this.axios
        .get("/api/getorder", {
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
              this.tabledata[i].time = this.moment(
                this.tabledata[i].time
              ).format("YYYY-MM-DD HH:mm:ss");
            }
          }
        });
    },
    gosearch(){
      this.page_no=1;
      this.goquery();
    },
    change() {
      this.searchval = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
    },
    godetail(row) {
      this.Dialog
        .title("订单详情")
        .width("800px")
        .currentView(orderdetail, { row })
        .then(opt => {})
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

.width2001 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
  margin-right: 10px;
}
.table {
  margin-top: 10px;
}

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>