<template>
  <div class>
    <span class="__p_C7_u_239">充值管理</span>
    <el-tabs value="first" class="__p_C7_u_277">
      <el-tab-pane label="充值审批" name="first">
        <div>
          <div class="__p_C7_u_278">
            <el-button type="primary" size="small">批量同意</el-button>
            <el-button type="primary" size="small">批量拒绝</el-button>
          </div>
          <div class="__p_C7_u_279">
            <el-date-picker
              v-model="pendingquery.historydata"
              type="daterange"
              size="small"
              style=" margin-right: 10px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="small" class="__p_C7_u_264" @click="gopendingsearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="pendingdata"
          stripe
          highlight-current-row
          class="__p_C7_u_252"
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
          class="__p_C7_u_260"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="充值记录" name="second">
        <div class="__p_2363_uid_261">
          <el-select size="small" class="__p_C7_u_269" v-model="type" @change="selectchange">
            <el-option value="审批者" label="审批者"></el-option>
            <el-option value="充值账号" label="充值账号"></el-option>
            <el-option value="充值日期" label="充值日期"></el-option>
          </el-select>
          <el-input
            v-if="type!='充值日期'"
            placeholder="请输入内容"
            type="text"
            v-model="recordquery.searchval"
            size="small"
            class="__p_C7_u_269"
          ></el-input>
          <el-date-picker
            v-else
            v-model="recordquery.historydata"
            type="daterange"
            size="small"
            style=" margin-right: 10px;"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" size="small" @click="gorecordsearch">搜索</el-button>
        </div>
        <el-table :data="data" stripe border highlight-current-row class="__p_C7_u_252">
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
          class="__p_C7_u_260"
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
      type: "审批者"
    };
  },
  created() {
    this.getpending();
    this.getrecord();
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
        .get("http://localhost:3000/api/invest/pending", {
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
      return query;
    },
    getrecord() {
      let query = this.makerecordquery();
      this.axios
        .get("http://localhost:3000/api/invest/getall", {
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
        .then(() => {})
        .catch(() => {});
    },
    gorefuse(row) {
      this.$confirm("确认拒绝账号" + row.username + "的充值申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {})
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
.__p_C7_u_239 {
  font-size: 25px;
}
.__p_C7_u_269 {
  width: 200px;
  margin-right: 10px;
}

.__p_C7_u_264 {
  margin-left: 10px;
}

.__p_C7_u_252 {
  margin-top: 10px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
.__p_C7_u_278 {
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.__p_C7_u_277 {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
