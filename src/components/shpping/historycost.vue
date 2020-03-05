<template>
  <div>
    <el-page-header @back="goBack" style="display: inline-block;"></el-page-header>
    <span class="font-25">充值历史</span>
    <div class="button-box">
      <div>
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
      <el-dropdown @command="goExport">
        <el-button size="small">导出Excel</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">当前</el-dropdown-item>
          <el-dropdown-item command="all">全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      page_size: 10,
      query: {}
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
      this.query = this.makeQuery();
      this.axios
        .get("/api/invest/getall", {
          params: {
            ...this.query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
          }
        });
    },
    goExport(value) {
      let obs = {};
      if (value == "current") {
        obs = this.query;
      } else {
        obs.username = this.$store.state.username;
      }
      obs.exportType = value;
      this.axios
        .post(
          "/api/invest/export",
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
.button-box {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px 0;
}
</style>