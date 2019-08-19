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
      <el-table-column label="寄养订单号" prop="careid" align="center" header-align="center"></el-table-column>
      <el-table-column label="价格" prop="careprice" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名字" prop="name" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物类型" prop="type" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='cat'">猫咪</span>
          <span v-else-if="scope.row.type=='dog'">狗狗</span>
          <span v-else>香猪</span>
        </template>
      </el-table-column>
      <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
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
      <el-table-column label="领回日期" prop="endtime" align="center" header-align="center"></el-table-column>
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
        username: this.User.username
      };
      if (this.searchval != null && this.searchval != "") {
        if (this.type == "订单号") {
          query.careid = this.searchval;
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
        .get("/api/getcaretable/record", {
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
    change() {
      this.searchval = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
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