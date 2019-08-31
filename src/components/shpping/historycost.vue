<template>
  <div>
    <el-page-header @back="goBack" style="display: inline-block;"></el-page-header>
    <span class="title">充值历史</span>
    <div class="table">
      <el-date-picker
        v-model="searchval"
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="gosearch" style="margin-left:10px;">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="table">
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
    makequery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        username: this.$store.state.username
      };
      if (this.searchval != null && this.searchval != "") {
        var time = this.moment(this.searchval[0]).format("YYYY-MM-DD");
        var time1 = this.moment(this.searchval[1]).format("YYYY-MM-DD");
        query.starttime = time;
        query.endtime = time1;
      }
      return query;
    },
    goquery() {
      let query = this.makequery();
      this.axios
        .get("/api/invest/getall", {
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
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 25px;
}

.table {
  margin-top: 20px;
}
</style>