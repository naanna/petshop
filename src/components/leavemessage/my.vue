<template>
  <div>
    <span class="fontclass">
      <i class="el-icon-back leave-back-icon" @click="goBack"></i>我的评论
    </span>
    <div>
      <el-button type="primary" size="small" @click="go2Del" class="leave-button">删除选中</el-button>
    </div>
    <el-table :data="tableData" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" width="80px" align="center" header-align="center"></el-table-column>
      <el-table-column label="内容" prop="note" align="center" header-align="center"></el-table-column>
      <el-table-column label="发表时间" prop="time" align="center" header-align="center" width="180px"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="150px">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goUpdate(scope.row)">编辑</el-button>
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
import update from "./update.vue";
export default {
  components: {
    Dialog
  },
  name: "my",
  data() {
    return {
      tableData: [{ note: 1123123 }],
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
    goBack() {
      this.$router.back(-1);
    },
    goQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        username: this.$store.state.username
      };
      this.axios
        .get("/api/message/get", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
            for (let i in this.tableData) {
              this.tableData[i].time = this.moment(
                this.tableData[i].time
              ).format("YYYY-MM-DD HH:mm:ss");
              this.tableData[i].simpletime = this.moment(
                this.tableData[i].time
              ).format("YYYY-MM-DD");
            }
          }
        });
    },
    goDel(row) {
      this.$confirm("您确认删除本条留言吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/message/delete", {
              data: [{ messageid: row.messageid }]
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
          messageid: item.messageid
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除所选的评论吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/message/delete", {
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
      this.Dialog.title("编辑留言")
        .width("500px")
        .currentView(update, { row })
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
.leave-button {
  margin: 20px 0;
}
.leave-back-icon {
  cursor: pointer;
}
</style>
