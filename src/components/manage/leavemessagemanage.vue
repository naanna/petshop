<template>
  <div>
    <span class="fontclass">评论管理</span>
    <div class="botton-box">
      <el-button type="primary" size="small" @click="go2Del">删除选中</el-button>
      <el-dropdown @command="goExport">
        <el-button size="small">导出Excel</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">当前</el-dropdown-item>
          <el-dropdown-item command="all">全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table :data="tableData" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" width="80px" align="center" header-align="center"></el-table-column>
      <el-table-column label="内容" prop="note" align="center" header-align="center"></el-table-column>
      <el-table-column
        label="发表账号"
        prop="username"
        align="center"
        header-align="center"
        width="150px"
      ></el-table-column>
      <el-table-column label="发表时间" prop="time" align="center" header-align="center" width="180px"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="150px">
        <div slot-scope="scope">
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
  </div>
</template>

<script>
export default {
  name: "LeaveMessageManage",
  data() {
    return {
      total: 0,
      page_no: 1,
      page_size: 10,
      tableData: [],
      selectObj: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
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
              let length = this.tableData.length;
              if (res.data.success) {
                //只剩一条时返回上一页
                if (length === 1 && this.page_no != 1) {
                  this.page_no = this.page_no - 1;
                }
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
          let length = this.tableData.length;
          let selecLength = this.selectObj.length;
          this.axios
            .delete("/api/message/delete", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                //全部删除时返回上一页
                if (length === selecLength && this.page_no != 1) {
                  this.page_no = this.page_no - 1;
                }
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goExport(value) {
      let obs = { type: value };
      if (value == "current") {
        obs.page_no = this.page_no;
        obs.page_size = this.page_size;
      }
      this.axios
        .post(
          "/api/message/export",
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
.botton-box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
