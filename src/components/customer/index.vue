<template>
  <div>
    <span class="fontclass">全部账户</span>
    <div class="but1">
      <div class="button">
        <el-button type="primary" size="small" @click="goAdd">增加账户</el-button>
        <el-button type="primary" size="small" @click="go2Del" class="margin-right10">删除选中</el-button>
        <el-dropdown @command="goExport">
          <el-button size="small">导出Excel</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="current">当前</el-dropdown-item>
            <el-dropdown-item command="all">全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-select size="small" class="select" v-model="type" @change="change">
          <el-option value="注册日期" label="注册日期"></el-option>
          <el-option value="生日" label="生日"></el-option>
          <el-option value="名字" label="名字"></el-option>
          <el-option value="权限" label="权限"></el-option>
        </el-select>
        <el-input
          v-if="type=='名字'"
          placeholder="请输入内容"
          type="text"
          size="small"
          class="select"
          v-model="searchVal"
          clearable
        ></el-input>
        <el-select v-else-if="type=='权限'" class="select" size="small" v-model="searchVal" clearable>
          <el-option value="customer" label="客户"></el-option>
          <el-option value="admin" label="管理员"></el-option>
        </el-select>
        <el-date-picker
          v-else
          v-model="historyData"
          type="daterange"
          size="small"
          class="margin-right10"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="goSearch">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" type="selection" width="30" align="center" header-align="center"></el-table-column>
      <el-table-column label="账号" prop="username" align="center" header-align="center"></el-table-column>
      <el-table-column label="昵称" prop="nickname" align="center" header-align="center"></el-table-column>
      <el-table-column label="名字" prop="name" align="center" header-align="center"></el-table-column>
      <el-table-column label="生日" prop="birthday" align="center" header-align="center"></el-table-column>
      <el-table-column label="性别" prop="sex" align="center" header-align="center"></el-table-column>
      <el-table-column label="注册日期" prop="regday" align="center" header-align="center"></el-table-column>
      <el-table-column label="级别" prop="leavel" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level=='vip1'">初级vip</span>
          <span v-else-if="scope.row.level=='vip2'">中级vip</span>
          <span v-else-if="scope.row.level=='vip3'">高级vip</span>
          <span v-else>管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" prop="money" align="center" header-align="center"></el-table-column>
      <el-table-column label="权限" prop="permissions" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.permissions=='customer'">客户</span>
          <span v-else>管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goUpdatePsd(scope.row)">修改密码</el-button>
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
import add_update from "./useradd_update.vue";
import psd from "./updatepsd.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      type: "名字",
      historyData: "",
      searchVal: "",
      selectObj: [],
      tableData: [{ id: 1 }],
      total: 0,
      page_no: 1,
      page_size: 10,
      query: {}
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.type == "名字" && this.searchVal != "") {
        query.name = this.searchVal;
      }

      if (this.type == "权限" && this.searchVal != "") {
        query.permissions = this.searchVal;
      }
      if (this.type == "注册日期" && this.historyData != "") {
        var regdaystart = this.moment(this.historyData[0]).format("YYYY-MM-DD");
        var regdayend = this.moment(this.historyData[1]).format("YYYY-MM-DD");
        query.regday = [regdaystart, regdayend];
      }
      if (this.type == "生日" && this.historyData != "") {
        var birthdaystart = this.moment(this.historyData[0]).format(
          "YYYY-MM-DD"
        );
        var birthdayend = this.moment(this.historyData[1]).format("YYYY-MM-DD");
        query.birthday = [birthdaystart, birthdayend];
      }
      return query;
    },
    goQuery() {
      this.query = this.makePendingQuery();
      this.axios
        .get("/api/user/getall", {
          params: {
            ...this.query
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
      this.$confirm("确认删除账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/user/delete", {
              data: [{ username: row.username }]
            })
            .then(res => {
              if (res.data.success) {
                this.goQuery();
                this.$message.success("删除成功！");
              }
            });
        })
        .catch(() => {});
    },
    go2Del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          username: item.username
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除这些用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/user/delete", {
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
    goSearch() {
      this.page_no = 1;
      this.goQuery();
    },
    goUpdatePsd(row) {
      this.Dialog.title("修改密码")
        .width("500px")
        .currentView(psd, { row })
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goAdd() {
      this.Dialog.title("添加用户")
        .width("500px")
        .currentView(add_update, {})
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goUpdate(row) {
      this.Dialog.title("修改用户")
        .width("600px")
        .currentView(add_update, { row })
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    change() {
      this.searchVal = "";
      this.historyData = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
    },
    goExport(value) {
      let obs = {};
      if (value == "current") {
        obs = this.query;
      }
      obs.exportType = value;
      this.axios
        .post(
          "/api/user/export",
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
.select {
  width: 200px;
  margin-right: 10px;
}
.margin-right10 {
  margin-right: 10px;
}
.but1 {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
</style>
