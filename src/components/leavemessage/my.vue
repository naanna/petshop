<template>
  <div>
    <span class="fontclass">我的评论</span>
    <div>
      <el-button type="primary" size="small" @click="go2del" class="button">删除选中</el-button>
    </div>
    <el-table :data="tabledata" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" width="80px" align="center" header-align="center"></el-table-column>
      <el-table-column label="内容" prop="note" align="center" header-align="center"></el-table-column>
      <el-table-column label="发表时间" prop="time" align="center" header-align="center" width="150px"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="150px">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goupdate(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="godel(scope.row)">删除</el-button>
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
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import update from "./update.vue";
export default {
  components: {
    rjDialog
  },
  name: "my",
  data() {
    return {
      tabledata: [{ note: 1123123 }],
      total: 0,
      page_no: 1,
      page_size: 10,
      selectObj: []
    };
  },
  methods: {
    godel(row) {
      this.$confirm("您确认删除本条留言吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {});
    },
    go2del() {
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
          // this.axios
          //   .delete("/api/deletepet", {
          //     data: delobs
          //   })
          //   .then(res => {
          //     if (res.data.success) {
          //       this.$message.success("删除成功！");
          //       this.goquery();
          //     }
          //   });
        })
        .catch(() => {});
    },
    goupdate(row) {
      this.rjDialog
        .title("编辑留言")
        .width("500px")
        .currentView(update, {row})
        .showClose(true)
        .sizeTiny()
        .then(opt => {
          this.goquery();
        })
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
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
.button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
