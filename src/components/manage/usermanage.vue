<template>
  <div class="__p_C7_u_238">
    <span class="__p_C7_u_239">全部账户</span>
    <div class="__p_C7_u_277">
      <div class="__p_C7_u_278">
        <el-button type="primary" size="small" @click="goadd">增加账户</el-button>
        <el-button type="primary" size="small">删除选中</el-button>
      </div>
      <div class="__p_C7_u_279">
        <el-select size="small" class="__p_C7_u_280" v-model="type">
          <el-option value="账号" label="账号"></el-option>
          <el-option value="注册日期" label="注册日期"></el-option>
          <el-option value="生日" label="生日"></el-option>
          <el-option value="级别" label="级别"></el-option>
        </el-select>
        <el-input
          placeholder="请输入内容"
          type="text"
          size="small"
          class="__p_C7_u_281"
          v-model="searchval"
        ></el-input>
        <el-button type="primary" size="small" class="__p_C7_u_282">搜索</el-button>
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
          <span v-if="scope.row.leavel=='vip'">初级vip</span>
          <span v-else-if="scope.row.leavel=='vip2'">中级vip</span>
          <span v-else>高级vip</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" prop="moeny" align="center" header-align="center"></el-table-column>
      <el-table-column label="权限" prop="permissions" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.permissions=='customer'">客户</span>
          <span v-else>管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goupdate">编辑</el-button>
          <el-button type="text" size="small" @click="godel">删除</el-button>
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
import add_update from "./dialog/useradd_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      type: "账号",
      searchval: "",
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
    go2Query() {
      this.axios
        .get("http://localhost:3000/api/getalluser", {
          params: {
            page_no: this.page_no,
            page_size: this.page_size
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
            console.log(results);
          }
        });
    },
    godel() {
      this.$confirm("确认删除账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {})
        .catch(() => {});
    },
    goadd() {
      this.rjDialog
        .title("添加用户")
        .width("800px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    goupdate() {
      this.rjDialog
        .title("修改用户")
        .width("800px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
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
.__p_C7_u_239 {
  font-size: 25px;
}

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
