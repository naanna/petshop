<template>
  <div>
    <span class="fontclass">我的寄养</span>
    <el-button type="primary" size="small" class="float" @click="goadd">我要寄养</el-button>
    <div class="botton">
      <el-select size="small" class="select" v-model="type" @change="change">
        <el-option value="宠物种类" label="宠物种类"></el-option>
        <el-option value="寄养单号" label="寄养单号"></el-option>
      </el-select>
      <el-select size="small" class="select" v-model="searchval" v-if="type=='宠物种类'" clearable>
        <el-option value="cat" label="猫咪"></el-option>
        <el-option value="dog" label="狗狗"></el-option>
        <el-option value="pig" label="香猪"></el-option>
      </el-select>
      <el-input
        v-else
        placeholder="请输入内容"
        type="text"
        clearable
        size="small"
        class="select"
        v-model="searchval"
      ></el-input>
      <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      <el-button type="text" size="small" style="float:right;" @click="gohistory">查看历史寄养</el-button>
    </div>

    <el-table :data="tabledata" stripe highlight-current-row class="table">
      <el-table-column label="寄养单号" prop="careid" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="name" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物种类" prop="type" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='cat'">猫咪</span>
          <span v-else-if="scope.row.type=='dog'">狗狗</span>
          <span v-else>香猪</span>
        </template>
      </el-table-column>
      <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养时长" prop="timerang" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="caretype" align="center" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.caretype=='care'">寄养</span>
          <span v-else-if="scope.row.caretype=='long'">延长</span>
          <span v-else>领回</span>
          <span v-if="scope.row.carestatus=='agreeing'">待同意</span>
          <span v-else-if="scope.row.carestatus=='agreed'">已同意</span>
          <span v-else-if="scope.row.carestatus=='refused'">拒绝</span>
          <span v-else>已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="careprice" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="gotolong(scope.row)"
            v-if="scope.row.carestatus=='agreed'||scope.row.carestatus=='refused'"
          >延长</el-button>
          <el-button
            type="text"
            size="small"
            @click="godel(scope.row)"
            v-if="scope.row.carestatus=='agreed'||scope.row.carestatus=='refused'"
          >结束</el-button>
          <el-button
            type="text"
            size="small"
            @click="goover(scope.row)"
            v-if="scope.row.carestatus=='agreeing'"
          >取消</el-button>
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
    <el-dialog title="延长寄养时间" :visible.sync="centerDialogVisible" width="40%" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="延长时长：" label-width="100px" style="margin-bottom:0px;" prop="longtime">
          <el-input type="text" size="small" v-model.number="form.longtime" class="dhk"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="goclear">取 消</el-button>
        <el-button type="primary" size="small" @click="golong">确 定</el-button>
      </span>
    </el-dialog>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "../dialog";
import caretable from "./caretable.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      centerDialogVisible: false,
      tabledata: [],
      type: "寄养单号",
      form: {
        longtime: ""
      },
      lontimeobs: "",
      searchval: "",
      total: 0,
      page_no: 1,
      page_size: 10,
      rules: {
        longtime: [{ type: "number", message: "时长必须为数字值" }]
      }
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makequery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        username: this.$store.state.username
      };

      if (this.searchval != "" && this.searchval != null) {
        if (this.type == "寄养单号") {
          query.careid = this.searchval;
        } else if (this.type == "宠物种类") {
          query.pettype = this.searchval;
        }
      }
      return query;
    },
    goquery() {
      const query = this.makequery();
      this.axios
        .get("/api/getcaretable/person", {
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
              this.tabledata[i].starttime = this.moment(
                this.tabledata[i].starttime
              ).format("YYYY-MM-DD");
            }
          }
        });
    },
    godel(row) {
      this.$confirm("您确定要提前结束寄养?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/long_backcare", {
              careid: row.careid,
              type: "back"
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功提交结束申请，请等待管理员处理");
                this.goquery();
              }
            });
        })
        .catch(() => {});
    },
    gotolong(row) {
      this.centerDialogVisible = true;
      this.lontimeobs = row;
    },
    golong() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/long_backcare", {
              careid: this.lontimeobs.careid,
              longtime: this.form.longtime,
              type: "long"
            })
            .then(res => {
              if (res.data.success) {
                this.centerDialogVisible = false;
                this.$refs["form"].resetFields();
                this.$message.success("您已成功提交延长申请，请等待管理员处理");
                this.goquery();
              }
            });
        } else {
          return false;
        }
      });
    },
    goover(row) {
      this.$confirm("您确定要取消寄养申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/cancelcaretable", {
              data: {
                careid: row.careid,
                petid: row.petid,
                type: row.caretype
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功取消申请！");
                this.goquery();
              }
            });
        })
        .catch(() => {});
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    goadd() {
      this.Dialog
        .title("我要寄养")
        .width("600px")
        .currentView(caretable, {})
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
    change() {
      this.searchval = "";
    },
    gohistory() {
      this.$router.push("historycare");
    },
    goclear() {
      this.lontimeobs = "";
      this.centerDialogVisible = false;
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style scoped>
.float {
  float: right;
}
.select {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: bottom;
}
.dhk {
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}

.table {
  margin-top: 10px;
}
.time {
  margin-right: 10px;
}
.botton {
  margin-top: 20px;
}
</style>
