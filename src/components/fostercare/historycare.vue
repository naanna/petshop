<template>
  <div>
    <el-page-header @back="goBack" style="display: inline-block;"></el-page-header>
    <span class="title">历史寄养</span>
    <div class="table">
      <el-date-picker
        v-model="historydata"
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" size="small" style="margin-left:10px;" @click="gosearch">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="table">
      <el-table-column label="寄养单号" prop="careid" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="name" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养时长" prop="timerang" align="center" header-align="center"></el-table-column>
      <el-table-column label="领回日期" prop="endtime" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.endtime!='Invalid date'">{{scope.row.endtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="caretype" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.caretype=='care'">寄养</span>
          <span v-else-if="scope.row.caretype=='long'">延长</span>
          <span v-else>领回</span>
          <span v-if="scope.row.carestatus=='agreeing'">待同意</span>
          <span v-else-if="scope.row.carestatus=='agreed'">已同意</span>
          <span v-else-if="scope.row.carestatus=='refused'">拒绝</span>
          <span v-else>已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="careprice" align="center" header-align="center"></el-table-column>
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
      historydata: "",
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
        username: this.User.username,
        history: true
      };

      if (this.historydata != "" && this.historydata != null) {
        var time = this.moment(this.historydata[0]).format("YYYY-MM-DD");
        var time1 = this.moment(this.historydata[1]).format("YYYY-MM-DD");
        query.starttime = time;
        query.endtime = time1;
      }
      return query;
    },
    goquery() {
      const query = this.makequery();
      this.axios
        .get("/api/getcaretable/person", {
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
              this.tabledata[i].starttime = this.moment(
                this.tabledata[i].starttime
              ).format("YYYY-MM-DD");
              this.tabledata[i].endtime = this.moment(
                this.tabledata[i].endtime
              ).format("YYYY-MM-DD");
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