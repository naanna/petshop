<template>
  <div>
    <el-page-header @back="goBack" style="display: inline-block;"></el-page-header>
    <span class="title">历史代售</span>
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
      <el-table-column label="代售单号  " prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物编号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="心里价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="售出日期" prop="id" align="center" header-align="center"></el-table-column>
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
      page_no: 1,
      page_size: 10,
      total: 0
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makequery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
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
      // this.axios
      //   .get("/api/getpet", {
      //     params: {
      //       ...query
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.success) {
      //       var results = res.data;
      //       this.tabledata = results.message;
      //       this.total = results.total;
      //       for (let i in this.tabledata) {
      //         var now = this.moment(
      //           this.moment(new Date()).format("YYYY-MM-DD")
      //         );
      //         var age = Util.displayAge(this.tabledata[i].birthday, now);
      //         this.tabledata[i].age = age;
      //       }
      //     }
      //   });
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