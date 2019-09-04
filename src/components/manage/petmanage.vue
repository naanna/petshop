<template>
  <div>
    <span class="fontclass">宠物管理</span>
    <div>
      <div class="button">
        <el-button type="primary" size="small" @click="goadd">添加宠物</el-button>
        <el-button type="primary" size="small" @click="go2del">批量删除</el-button>
      </div>
      <div class="buttondiv">
        <el-select size="small" class="select" v-model="type" @change="change">
          <el-option value="编号" label="编号"></el-option>
          <el-option value="状态" label="状态"></el-option>
          <el-option value="种类" label="种类"></el-option>
        </el-select>
        <el-input
          v-if="type=='编号'"
          placeholder="请输入搜索内容"
          v-model="searchval"
          type="text"
          size="small"
          clearable
          class="select"
        ></el-input>
        <el-select v-else clearable size="small" class="select" v-model="searchval">
          <el-option v-if="type=='种类'" value="cat" label="猫咪"></el-option>
          <el-option v-if="type=='种类'" value="dog" label="狗狗"></el-option>
          <el-option v-if="type=='种类'" value="pig" label="香猪"></el-option>
          <el-option v-if="type=='状态'" value="saled" label="售出"></el-option>
          <el-option v-if="type=='状态'" value="saling" label="在售"></el-option>
          <el-option v-if="type=='状态'" value="caring" label="寄养"></el-option>
          <el-option v-if="type=='状态'" value="cared" label="领回"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tabledata"
      highlight-current-row
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" type="selection" width="50px" align="center" header-align="center"></el-table-column>
      <el-table-column label="编号" prop="petid" align="center" header-align="center"></el-table-column>
      <el-table-column label="名字" prop="name" align="center" header-align="center"></el-table-column>
      <el-table-column label="年龄" prop="age" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='saled'">售出</span>
          <span v-else-if="scope.row.status=='saling'">在售</span>
          <span v-else-if="scope.row.status=='caring'">寄养</span>
          <span v-else>领回</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" sortable align="center" header-align="center"></el-table-column>
      <el-table-column label="种类" prop="type" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='cat'">猫咪</span>
          <span v-else-if="scope.row.type=='dog'">狗狗</span>
          <span v-else>香猪</span>
        </template>
      </el-table-column>
      <el-table-column label="品种" prop="variety" align="center" header-align="center"></el-table-column>
      <el-table-column label="性别" prop="sex" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="godetail(scope.row)">详情</el-button>
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
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import Util from "@assets/Util.js";
import detail from "./dialog/petdetail.vue";
import add_update from "./dialog/petadd_update.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      type: "编号",
      searchval: "",
      tabledata: [],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.searchval != "") {
        if (this.type == "编号") {
          query.petid = this.searchval;
        } else if (this.type == "种类") {
          query.type = this.searchval;
        } else if (this.type == "状态") {
          query.status = this.searchval;
        }
      }

      return query;
    },
    goquery() {
      const query = this.makependingquery();
      this.axios
        .get("/api/getpet", {
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
              var now = this.moment(
                this.moment(new Date()).format("YYYY-MM-DD")
              );
              var age = Util.displayAge(this.tabledata[i].birthday, now);
              this.tabledata[i].age = age;
            }
          }
        });
    },
    godel(row) {
      this.$confirm("您确定要删除该宠物信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deletepet", {
              data: [{ petid: row.petid }]
            })
            .then(res => {
              if (res.data.success) {
                this.goquery();
                this.$message.success("删除成功！");
              }
            });
        })
        .catch(() => {});
    },
    goadd() {
      this.Dialog.title("添加宠物")
        .width("600px")
        .currentView(add_update, {})
        .then(data => {
          this.goquery();
        })
        .show();
    },
    go2del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          petid: item.petid
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除这些宠物信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deletepet", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goquery();
              }
            });
        })
        .catch(() => {});
    },
    goupdate(row) {
      this.Dialog.title("编辑宠物")
        .width("600px")
        .currentView(add_update, {
          row
        })
        .then(data => {
          this.goquery();
        })
        .show();
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    change() {
      this.searchval = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
    },
    godetail(row) {
      this.Dialog.title("宠物详情")
        .width("500px")
        .currentView(detail, {
          row
        })
        .then(data => {
          this.goquery();
        })
        .show();
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
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10px;
}

.table {
  margin-top: 10px;
}

.button {
  display: inline-block;
  margin-top: 20px;
}
.buttondiv {
  display: inline-block;
  float: right;
}

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>