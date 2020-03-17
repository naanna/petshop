<template>
  <div class>
    <span class="fontclass">充值管理</span>
    <el-tabs value="first" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="充值审批" name="first">
        <div class="button-box">
          <div>
            <el-button type="primary" size="small" @click="go2Agree">批量同意</el-button>
            <el-button type="primary" size="small" @click="go2Refuse">批量拒绝</el-button>
          </div>
          <div>
            <el-date-picker
              v-model="pendingQuery.historyData"
              type="daterange"
              size="small"
              style=" margin-right: 10px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="small" @click="goPendingSearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="pendingData"
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
              <el-button type="text" size="small" @click="goAgree(scope.row)">同意</el-button>
              <el-button type="text" size="small" @click="goRefuse(scope.row)">拒绝</el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pendingQuery.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="pendingQuery.page_size"
          :total="pendingQuery.total"
          layout="total, sizes, prev, pager, next, jumper"
          class="fyclass"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="充值记录" name="second">
        <div class="button-box">
          <div>
            <el-select size="small" class="width200" v-model="type" @change="selectChange">
              <el-option value="审批账号" label="审批账号"></el-option>
              <el-option value="充值账号" label="充值账号"></el-option>
              <el-option value="充值日期" label="充值日期"></el-option>
              <el-option value="状态" label="状态"></el-option>
            </el-select>
            <el-date-picker
              v-if="type=='充值日期'"
              v-model="recordQuery.historyData"
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
              v-model="recordQuery.searchVal"
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
              v-model="recordQuery.searchVal"
              clearable
              size="small"
              class="width200"
            ></el-input>
            <el-button type="primary" size="small" @click="goRecordSearch">搜索</el-button>
          </div>
          <el-dropdown @command="goExport">
            <el-button size="small">导出Excel</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="current">当前</el-dropdown-item>
              <el-dropdown-item command="all">全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
          <el-table-column label="审批账号" prop="approval" align="center" header-align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle1"
          @current-change="currentChangeHandle1"
          :current-page="recordQuery.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="recordQuery.page_size"
          :total="recordQuery.total"
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
      pendingQuery: {
        total: 0,
        page_no: 1,
        page_size: 10,
        historyData: ""
      },
      pendingData: [],
      recordQuery: {
        total: 0,
        page_no: 1,
        page_size: 10,
        historyData: "",
        searchVal: ""
      },
      data: [],
      type: "审批账号",
      selectObj: [],
      query: {}
    };
  },
  created() {
    this.getPending();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.pendingQuery.page_no,
        page_size: this.pendingQuery.page_size
      };
      if (
        this.pendingQuery.historyData != null &&
        this.pendingQuery.historyData != ""
      ) {
        var time = this.moment(this.pendingQuery.historyData[0]).format(
          "YYYY-MM-DD"
        );
        var time1 = this.moment(this.pendingQuery.historyData[1]).format(
          "YYYY-MM-DD"
        );
        query.starttime = time;
        query.endtime = time1;
      }
      return query;
    },
    getPending() {
      let query = this.makePendingQuery();
      this.axios
        .get("/api/invest/pending", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.pendingData = results.message;
            this.pendingQuery.total = results.total;
          }
        });
    },
    makeRecordQuery() {
      let query = {
        page_no: this.recordQuery.page_no,
        page_size: this.recordQuery.page_size
      };
      if (this.type == "充值日期") {
        if (
          this.recordQuery.historyData != null &&
          this.recordQuery.historyData != ""
        ) {
          var time = this.moment(this.recordQuery.historyData[0]).format(
            "YYYY-MM-DD"
          );
          var time1 = this.moment(this.recordQuery.historyData[1]).format(
            "YYYY-MM-DD"
          );
          query.starttime = time;
          query.endtime = time1;
        }
      }

      if (this.type == "充值账号") {
        if (this.recordQuery.searchVal != "")
          query.userName = this.recordQuery.searchVal;
      }
      if (this.type == "审批账号") {
        if (this.recordQuery.searchVal != "")
          query.approval = this.recordQuery.searchVal;
      }
      if (this.type == "状态") {
        if (this.recordQuery.searchVal != "")
          query.status = this.recordQuery.searchVal;
      }
      return query;
    },
    getRecord() {
      this.query = this.makeRecordQuery();
      this.axios
        .get("/api/invest/getall", {
          params: {
            ...this.query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.data = results.message;
            this.recordQuery.total = results.total;
          }
        });
    },
    goAgree(row) {
      this.$confirm("确认同意账号" + row.username + "的充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs: [
                {
                  approval: this.$store.state.username,
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
                this.getPending();
              }
            });
        })
        .catch(() => {});
    },
    goRefuse(row) {
      this.$confirm("确认拒绝账号" + row.username + "的充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/invest/approval", {
              refobs: [
                {
                  approval: this.$store.state.username,
                  id: row.investid,
                  type: "refuse"
                }
              ]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功拒绝！");
                this.getPending();
              }
            });
        })
        .catch(() => {});
    },
    go2Agree() {
      let refobs = [];
      this.selectObj.forEach(item => {
        refobs.push({
          approval: this.$store.state.username,
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
                this.getPending();
              }
            });
        })
        .catch(() => {});
    },
    go2Refuse() {
      let refobs = [];
      this.selectObj.forEach(item => {
        refobs.push({
          approval: this.$store.state.username,
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
                this.getPending();
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
    goRecordSearch() {
      this.recordQuery.page_no = 1;
      this.getRecord();
    },
    goPendingSearch() {
      this.pendingQuery.page_no = 1;
      this.getPending();
    },
    sizeChangeHandle(val) {
      this.pendingQuery.page_size = val;
      this.getPending();
    },
    currentChangeHandle(val) {
      this.pendingQuery.page_no = val;
      this.getPending();
    },
    sizeChangeHandle1(val) {
      this.recordQuery.page_size = val;
      this.getRecord();
    },
    currentChangeHandle1(val) {
      this.recordQuery.page_no = val;
      this.getRecord();
    },
    selectChange() {
      this.recordQuery.searchVal = "";
      this.recordQuery.historyData = "";
    },
    handleSelectionChange(val) {
      let self = this;
      var obj = eval("(" + JSON.stringify(val) + ")");
      self.selectObj = [];
      for (var i = 0; i < obj.length; i++) {
        var temp = obj[i];
        self.selectObj.push(temp);
      }
    },
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.getRecord();
      } else {
        this.getPending();
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
.table {
  margin-top: 10px;
}
.button-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tabs {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
