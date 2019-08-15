<template>
  <div class>
    <span class="fontclass">充值管理</span>
    <el-tabs value="first" class="tabs">
      <el-tab-pane label="充值审批" name="first">
        <div>
          <div class="button">
            <el-button type="primary" size="small" @click="go2yes">批量同意</el-button>
            <el-button type="primary" size="small" @click="go2refuse">批量拒绝</el-button>
          </div>
          <div class="search">
            <el-date-picker
              v-model="pendingquery.historydata"
              type="daterange"
              size="small"
              style=" margin-right: 10px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="small" class="searchbut" @click="gopendingsearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="pendingdata"
          stripe
          highlight-current-row
          class="table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="id"
            type="selection"
            width="30"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column label="充值单号  " prop="investid" align="center" header-align="center"></el-table-column>
          <el-table-column label="账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="金额" prop="money" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值时间" prop="time" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goyes(scope.row)">同意</el-button>
              <el-button type="text" size="small" @click="gorefuse(scope.row)">拒绝</el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pendingquery.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="pendingquery.page_size"
          :total="pendingquery.total"
          layout="total, sizes, prev, pager, next, jumper"
          class="fyclass"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="充值记录" name="second">
        <div>
          <el-select size="small" class="width200" v-model="type" @change="selectchange">
            <el-option value="审批者" label="审批者"></el-option>
            <el-option value="充值账号" label="充值账号"></el-option>
            <el-option value="充值日期" label="充值日期"></el-option>
            <el-option value="状态" label="状态"></el-option>
          </el-select>
          <el-date-picker
            v-if="type=='充值日期'"
            v-model="recordquery.historydata"
            type="daterange"
            size="small"
            style=" margin-right: 10px;"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
          ></el-date-picker>
          <el-select
            size="small"
            class="width200"
            clearable
            v-model="recordquery.searchval"
            v-else-if="type=='状态'"
          >
            <el-option value="yes" label="已同意"></el-option>
            <el-option value="no" label="待审批"></el-option>
            <el-option value="refuse" label="被拒绝"></el-option>
          </el-select>
          <el-input
            v-else
            placeholder="请输入内容"
            type="text"
            v-model="recordquery.searchval"
            clearable
            size="small"
            class="width200"
          ></el-input>
          <el-button type="primary" size="small" @click="gorecordsearch">搜索</el-button>
        </div>
        <el-table :data="data" stripe border highlight-current-row class="table">
          <el-table-column label="充值单号 " prop="investid" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值金额" prop="money" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值日期" prop="time" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status=='no'">待审批</span>
              <span v-else-if="scope.row.status=='yes'">已同意</span>
              <span v-else>被拒绝</span>
            </template>
          </el-table-column>
          <el-table-column label="审批者" prop="approval" align="center" header-align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle1"
          @current-change="currentChangeHandle1"
          :current-page="recordquery.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="recordquery.page_size"
          :total="recordquery.total"
          layout="total, sizes, prev, pager, next, jumper"
          class="fyclass"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pendingquery: {
        total: 0,
        page_no: 1,
        page_size: 10,
        historydata: ""
      },
      pendingdata: [],
      recordquery: {
        total: 0,
        page_no: 1,
        page_size: 10,
        historydata: "",
        searchval: ""
      },
      data: [],
      type: "审批者",
      approval: "",
      selectObj: []
    };
  },
  created() {
    this.getpending();
    this.getrecord();
    this.approval = this.User.username;
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.pendingquery.page_no,
        page_size: this.pendingquery.page_size
      };
      if (
        this.pendingquery.historydata != null &&
        this.pendingquery.historydata != ""
      ) {
        var time = this.moment(this.pendingquery.historydata[0]).format(
          "YYYY-MM-DD"
        );
        var time1 = this.moment(this.pendingquery.historydata[1]).format(
          "YYYY-MM-DD"
        );
        query.starttime = time;
        query.endtime = time1;
      }
      return query;
    },
    getpending() {
      let query = this.makependingquery();
      this.axios
        .get("/api/invest/pending", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.pendingdata = results.message;
            this.pendingquery.total = results.total;
            for (let i in this.pendingdata) {
              this.pendingdata[i].time = this.moment(
                this.pendingdata[i].time
              ).format("YYYY-MM-DD HH:mm:ss");
            }
          }
        });
    },
    makerecordquery() {
      let query = {
        page_no: this.recordquery.page_no,
        page_size: this.recordquery.page_size
      };
      if (this.type == "充值日期") {
        if (
          this.recordquery.historydata != null &&
          this.recordquery.historydata != ""
        ) {
          var time = this.moment(this.recordquery.historydata[0]).format(
            "YYYY-MM-DD"
          );
          var time1 = this.moment(this.recordquery.historydata[1]).format(
            "YYYY-MM-DD"
          );
          query.starttime = time;
          query.endtime = time1;
        }
      }

      if (this.type == "充值账号") {
        if (this.recordquery.searchval != "")
          query.username = this.recordquery.searchval;
      }
      if (this.type == "审批者") {
        if (this.recordquery.searchval != "")
          query.approval = this.recordquery.searchval;
      }
      if (this.type == "状态") {
        if (this.recordquery.searchval != "")
          query.status = this.recordquery.searchval;
      }
      return query;
    },
    getrecord() {
      let query = this.makerecordquery();
      this.axios
        .get("/api/invest/getall", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.data = results.message;
            this.recordquery.total = results.total;
            for (let i in this.data) {
              this.data[i].time = this.moment(this.data[i].time).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
          }
        });
    },
    goyes(row) {
      this.$confirm("确认同意账号" + row.username + "的充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs: [
                {
                  approval: this.approval,
                  id: row.investid,
                  type: "yes",
                  money: row.money,
                  username: row.username
                }
              ]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已同意！");
                this.getpending();
              }
            });
        })
        .catch(() => {});
    },
    gorefuse(row) {
      this.$confirm("确认拒绝账号" + row.username + "的充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs: [
                {
                  approval: this.approval,
                  id: row.investid,
                  type: "refuse"
                }
              ]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功拒绝！");
                this.getpending();
              }
            });
        })
        .catch(() => {});
    },
    go2yes() {
      let refobs = [];
      this.selectObj.forEach(item => {
        refobs.push({
          approval: this.approval,
          id: item.investid,
          type: "yes",
          money: item.money,
          username: item.username
        });
      });
      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要同意的充值申请");
        return;
      }
      this.$confirm("确认同意这些充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已同意！");
                this.getpending();
              }
            });
        })
        .catch(() => {});
    },
    go2refuse() {
      let refobs = [];
      this.selectObj.forEach(item => {
        refobs.push({
          approval: this.approval,
          id: item.investid,
          type: "refuse"
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要拒绝的充值申请");
        return;
      }
      this.$confirm("确认拒绝这些充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已拒绝！");
                this.getpending();
              }
            });
        })
        .catch(() => {});
    },
    gorecordsearch() {
      this.recordquery.page_no = 1;
      this.getrecord();
    },
    gopendingsearch() {
      this.pendingquery.page_no = 1;
      this.getpending();
    },
    sizeChangeHandle(val) {
      this.pendingquery.page_size = val;
      this.getpending();
    },
    currentChangeHandle(val) {
      this.pendingquery.page_no = val;
      this.getpending();
    },
    sizeChangeHandle1(val) {
      this.recordquery.page_size = val;
      this.getrecord();
    },
    currentChangeHandle1(val) {
      this.recordquery.page_no = val;
      this.getrecord();
    },
    selectchange() {
      this.recordquery.searchval = "";
      this.recordquery.historydata = "";
    },
    handleSelectionChange(val) {
      let self = this;
      var obj = eval("(" + JSON.stringify(val) + ")");
      self.selectObj = [];
      for (var i = 0; i < obj.length; i++) {
        var temp = obj[i];
        self.selectObj.push(temp);
      }
    }
  }
};
</script>
<style scoped>
.width200 {
  width: 200px;
  margin-right: 10px;
}

.searchbut {
  margin-left: 10px;
}

.table {
  margin-top: 10px;
}

.button {
  display: inline-block;
  vertical-align: bottom;
}

.search {
  float: right;
  display: inline-block;
}

.tabs {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
