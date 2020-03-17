<template>
  <div class>
    <span class="fontclass">视频管理</span>
    <el-tabs value="first" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="投稿审批" name="first">
        <div>
          <div class="button-box">
            <el-button type="primary" size="small" @click="go2Yes">批量同意</el-button>
            <el-button type="primary" size="small" @click="go2Refuse">批量拒绝</el-button>
          </div>
          <div class="search-box">
            <el-date-picker
              v-model="pendingQuery.historyData"
              type="daterange"
              size="small"
              style=" margin-right: 10px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="small" class="search-button" @click="goPendingSearch">搜索</el-button>
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
          <el-table-column label="视频编号 " prop="videoid" align="center" header-align="center"></el-table-column>
          <el-table-column label="上传账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="视频" prop="src" align="center" header-align="center">
            <div slot-scope="scope">
              <video
                class="video"
                :poster="scope.row.cover"
                width="100%"
                controls
                :src="scope.row.src"
              ></video>
              <el-button type="text" @click="goDetail(scope.row)">点击查看详情</el-button>
            </div>
          </el-table-column>
          <el-table-column label="投稿时间" prop="uploadtime" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goYes(scope.row)">同意</el-button>
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

      <el-tab-pane label="投稿记录" name="second">
        <div>
          <el-select size="small" class="width200" v-model="type" @change="selectChange">
            <el-option value="审批账号" label="审批账号"></el-option>
            <el-option value="投稿账号" label="投稿账号"></el-option>
            <el-option value="投稿时间" label="投稿时间"></el-option>
            <el-option value="审批时间" label="审批时间"></el-option>
            <el-option value="状态" label="状态"></el-option>
          </el-select>
          <el-date-picker
            v-if="type=='投稿时间'||type=='审批时间'"
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
            <el-option value="yes" label="已通过"></el-option>
            <el-option value="no" label="待审批"></el-option>
            <el-option value="refused" label="未通过"></el-option>
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
        <el-table :data="data" stripe border highlight-current-row class="table">
          <el-table-column label="视频编号 " prop="videoid" align="center" header-align="center"></el-table-column>
          <el-table-column label="上传账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="视频" prop="src" align="center" header-align="center">
            <div slot-scope="scope">
              <video
                class="video"
                :poster="scope.row.cover"
                width="100%"
                controls
                :src="scope.row.src"
              ></video>
              <el-button type="text" @click="goDetail(scope.row)">点击查看详情</el-button>
            </div>
          </el-table-column>
          <el-table-column label="投稿时间" prop="uploadtime" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status=='no'">待审批</span>
              <span v-else-if="scope.row.status=='yes'">已通过</span>
              <span v-else>未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="投稿账号" prop="approvalid" align="center" header-align="center"></el-table-column>
          <el-table-column label="审批时间" prop="approvaltime" align="center" header-align="center"></el-table-column>
          <el-table-column label="播放量" prop="count" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
            </div>
          </el-table-column>
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
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import Detail from "./dialog/video_detail.vue";
export default {
  components: {
    Dialog
  },
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
      approval: "",
      selectObj: []
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
        query.startTime = time;
        query.endTime = time1;
      }
      return query;
    },
    //获取待审批投稿
    getPending() {
      let query = this.makePendingQuery();
      this.axios
        .get("/api/video/getvideo", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.pendingData = results.message;
            this.pendingQuery.total = results.total;
            for (let i in this.pendingData) {
              this.pendingData[i].uploadtime = this.moment(
                this.pendingData[i].uploadtime
              ).format("YYYY-MM-DD HH:mm:ss");
            }
          }
        });
    },
    makeRecordQuery() {
      let query = {
        page_no: this.recordQuery.page_no,
        page_size: this.recordQuery.page_size,
        type: "all"
      };
      if (this.type == "投稿时间" && this.recordQuery.historyData != "") {
        var time = this.moment(this.recordQuery.historyData[0]).format(
          "YYYY-MM-DD"
        );
        var time1 = this.moment(this.recordQuery.historyData[1]).format(
          "YYYY-MM-DD"
        );
        query.uploadStartTime = time;
        query.uploadEndTime = time1;
      }
      if (this.type == "审批时间" && this.recordQuery.historyData != "") {
        var time = this.moment(this.recordQuery.historyData[0]).format(
          "YYYY-MM-DD"
        );
        var time1 = this.moment(this.recordQuery.historyData[1]).format(
          "YYYY-MM-DD"
        );
        query.approvalStartTime = time;
        query.approvalEndTime = time1;
      }
      if (this.type == "投稿账号") {
        if (this.recordQuery.searchVal != "")
          query.userName = this.recordQuery.searchVal;
      }
      if (this.type == "审批账号") {
        if (this.recordQuery.searchVal != "")
          query.approvalId = this.recordQuery.searchVal;
      }
      if (this.type == "状态") {
        if (this.recordQuery.searchVal != "")
          query.status = this.recordQuery.searchVal;
      }
      return query;
    },
    //获取投稿记录
    getRecord() {
      let query = this.makeRecordQuery();
      this.axios
        .get("/api/video/getvideo", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.data = results.message;
            this.recordQuery.total = results.total;
            for (let i in this.data) {
              this.data[i].uploadtime = this.moment(
                this.data[i].uploadtime
              ).format("YYYY-MM-DD HH:mm:ss");
              if (this.data[i].approvaltime) {
                this.data[i].approvaltime = this.moment(
                  this.data[i].approvaltime
                ).format("YYYY-MM-DD HH:mm:ss");
              }
            }
          }
        });
    },
    goYes(row) {
      this.$confirm("确认发布账号" + row.username + "的视频投稿吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .put("/api/video/approvalvideo", {
              refobs: [
                {
                  approvalid: this.$store.state.username,
                  videoid: row.videoid,
                  status: "yes",
                  approvaltime: this.moment(new Date()).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
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
      this.$confirm(
        "确认拒绝发布账号" + row.username + "的视频投稿吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          this.axios
            .put("/api/video/approvalvideo", {
              refobs: [
                {
                  approvalid: this.$store.state.username,
                  videoid: row.videoid,
                  status: "refused",
                  approvaltime: this.moment(new Date()).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
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
    go2Yes() {
      let refobs = [];
      this.selectObj.forEach(item => {
        refobs.push({
          approvalid: this.$store.state.username,
          videoid: item.videoid,
          status: "yes",
          approvaltime: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        });
      });
      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要同意的视频投稿");
        return;
      }
      this.$confirm("确认同意这些视频投稿吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .put("/api/video/approvalvideo", {
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
          approvalid: this.$store.state.username,
          videoid: item.videoid,
          status: "refused",
          approvaltime: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        });
      });
      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要拒绝的视频投稿");
        return;
      }
      this.$confirm("确认拒绝这些视频投稿吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .put("/api/video/approvalvideo", {
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
    goDel(row) {
      this.$confirm("确认删除本条投稿记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/video/delete", {
              data: { videoId: row.videoid }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getRecord();
              }
            });
        })
        .catch(() => {});
    },
    goDetail(row) {
      this.Dialog.title("投稿视频详情")
        .width("600px")
        .currentView(Detail, { row })
        .then(data => {})
        .show();
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
.search-button {
  margin-left: 10px;
}
.table {
  margin-top: 10px;
}
.button-box {
  display: inline-block;
  vertical-align: bottom;
}
.search-box {
  float: right;
  display: inline-block;
}
.tabs {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
