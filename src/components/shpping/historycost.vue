<template>
  <div>
    <el-page-header @back="goBack" style="display: inline-block;"></el-page-header>
    <span class="font-25">充值历史</span>
    <div class="history-search-box">
      <el-date-picker
        v-model="searchVal"
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="goSearch" style="margin-left:10px;">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe border highlight-current-row>
      <el-table-column label="充值单号 " prop="investid" align="center" header-align="center"></el-table-column>
      <el-table-column label="充值金额" prop="money" align="center" header-align="center"></el-table-column>
      <el-table-column label="充值日期" prop="time" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='no'">待同意</span>
          <span v-else-if="scope.row.status=='yes'">已同意</span>
          <span v-else>被拒绝</span>
        </template>
      </el-table-column>
      <el-table-column label="审批者" prop="approval" align="center" header-align="center"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    makeQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        username: this.$store.state.username
      };
      if (this.searchVal != null && this.searchVal != "") {
        var time = this.moment(this.searchVal[0]).format("YYYY-MM-DD");
        var time1 = this.moment(this.searchVal[1]).format("YYYY-MM-DD");
        query.starttime = time;
        query.endtime = time1;
      }
      return query;
    },
    goQuery() {
      let query = this.makeQuery();
      this.axios
        .get("/api/invest/getall", {
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
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.history-search-box {
  margin: 20px 0;
}
</style>