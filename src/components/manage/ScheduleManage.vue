<template>
  <div>
    <span class="fontclass">日程管理</span>
    <div class="button-box">
      <el-button type="primary" size="small" @click="goAdd">添加日程</el-button>
      <el-button type="primary" size="small" @click="go2Del">删除选中</el-button>
    </div>
    <el-table :data="tableData" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" width="80px" align="center" header-align="center"></el-table-column>

      <el-table-column label="日期" prop="day" align="center" header-align="center" width="150px">
        <div slot-scope="scope">
          <span>{{moment(scope.row.day).format("YYYY-MM-DD")}}</span>
        </div>
      </el-table-column>
      <el-table-column label="活动安排" prop="textarea" align="center" header-align="center"></el-table-column>
      <el-table-column
        label="操作账号"
        prop="username"
        align="center"
        header-align="center"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="最新操作时间"
        prop="update_time"
        align="center"
        header-align="center"
        width="150px"
      >
        <div slot-scope="scope">
          <span>{{moment(scope.row.update_time).format("YYYY-MM-DD HH:mm")}}</span>
        </div>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="150px">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goUpdate(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
        </div>
      </el-table-column>
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
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import add_update from "./dialog/scheduleadd_update.vue";
export default {
  name: "ScheduleManage",
  components: {
    Dialog
  },
  data() {
    return {
      tableData: [],
      total: 0,
      page_no: 1,
      page_size: 10,
      selectObj: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goAdd() {
      this.Dialog.title("添加日程")
        .width("600px")
        .currentView(add_update, {})
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      this.axios
        .get("/api/getschedule", {
          params: {
            ...query
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
    goDel(row) {
      this.$confirm("您确认删除本条日程吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleschedule", {
              data: [{ scheduleid: row.scheduleid }]
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    go2Del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          scheduleid: item.scheduleid
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除所选的日程吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleschedule", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goUpdate(row) {
      this.Dialog.title("编辑日程")
        .width("600px")
        .currentView(add_update, { row })
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
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
.button-box {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
