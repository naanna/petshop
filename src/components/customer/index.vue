<template>
  <div class="__p_C7_u_238">
    <span class="fontclass">全部账户</span>
    <div class="__p_C7_u_277">
      <div class="__p_C7_u_278">
        <el-button type="primary" size="small" @click="goadd">增加账户</el-button>
        <el-button type="primary" size="small" @click="go2del">删除选中</el-button>
      </div>
      <div class="__p_C7_u_279">
        <el-select size="small" class="__p_C7_u_280" v-model="type" @change="change">
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
          class="__p_C7_u_281"
          v-model="searchval"
          clearable
        ></el-input>
        <el-select
          v-else-if="type=='权限'"
          class="__p_C7_u_282"
          size="small"
          v-model="searchval"
          clearable
        >
          <el-option value="customer" label="客户"></el-option>
          <el-option value="admin" label="管理员"></el-option>
        </el-select>
        <el-date-picker
          v-else
          v-model="historydata"
          type="daterange"
          size="small"
          class="__p_C7_u_282"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" size="small" class="__p_C7_u_282" @click="goserach">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tabledata"
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
          <span v-if="scope.row.level=='vip'">初级vip</span>
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
      <el-table-column label="操作" width="130" align="center" header-align="center">
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
      class="__p_C7_u_260"
    ></el-pagination>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import add_update from "./useradd_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      type: "名字",
      historydata: "",
      searchval: "",
      selectObj: [],
      tabledata: [{ id: 1 }],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.go2Query();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.type == "名字" && this.searchval != "") {
        query.name = this.searchval;
      }

      if (this.type == "权限" && this.searchval != "") {
        query.permissions = this.searchval;
      }
      if (this.type == "注册日期" && this.historydata != "") {
        var regdaystart = this.moment(this.historydata[0]).format("YYYY-MM-DD");
        var regdayend = this.moment(this.historydata[1]).format("YYYY-MM-DD");
        query.regday = [regdaystart, regdayend];
      }
      if (this.type == "生日" && this.historydata != "") {
        var birthdaystart = this.moment(this.historydata[0]).format(
          "YYYY-MM-DD"
        );
        var birthdayend = this.moment(this.historydata[1]).format("YYYY-MM-DD");
        query.birthday = [birthdaystart, birthdayend];
      }
      return query;
    },
    go2Query() {
      let query = this.makependingquery();
      this.axios
        .get("/api/getalluser", {
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
              this.tabledata[i].birthday = this.moment(
                this.tabledata[i].birthday
              ).format("YYYY-MM-DD");
              this.tabledata[i].regday = this.moment(
                this.tabledata[i].regday
              ).format("YYYY-MM-DD");
            }
          }
        });
    },
    godel(row) {
      var delobs = [{}];
      this.$confirm("确认删除账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleuser", {
              data: [{ username: row.username }]
            })
            .then(res => {
              if (res.data.success) {
                this.go2Query();
                this.$message.success("删除成功！");
              }
            });
        })
        .catch(() => {});
    },
    go2del() {
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
            .delete("/api/deteleuser", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.go2Query();
              }
            });
        })
        .catch(() => {});
    },
    goserach() {
      this.go2Query();
    },
    goadd() {
      this.rjDialog
        .title("添加用户")
        .width("500px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {
          this.go2Query();
        })
        .show();
    },
    goupdate(row) {
      console.log(row);
      this.rjDialog
        .title("修改用户")
        .width("600px")
        .currentView(add_update, { row })
        .showClose(true)
        .sizeTiny()
        .then(opt => {
          this.go2Query();
        })
        .show();
    },
    change() {
      this.searchval = "";
      this.historydata = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
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
.__p_C7_u_278 {
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_280 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_281 {
  width: 200px;
  margin-left: 10px;
}

.__p_C7_u_282 {
  margin-left: 10px;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.__p_C7_u_277 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
</style>
