<template>
  <div>
    <span class="fontclass">我的寄养</span>
    <el-button type="primary" size="small" class="float" @click="goadd">我要寄养</el-button>
    <div class="botton">
      <el-select size="small" class="select" v-model="type" @change="change">
        <el-option value="宠物种类" label="宠物种类"></el-option>
        <el-option value="寄养单号" label="寄养单号"></el-option>
        <el-option value="寄养日期" label="寄养日期"></el-option>
      </el-select>
      <el-date-picker
        v-if="type=='寄养日期'"
        v-model="searchval"
        type="daterange"
        size="small"
        class="time"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-input
        v-else
        placeholder="请输入内容"
        type="text"
        size="small"
        class="select"
        v-model="searchval"
      ></el-input>
      <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      <el-button type="text" size="small" style="float:right;" @click="gohistory">查看历史寄养</el-button>
    </div>

    <el-table :data="tabledata" stripe border highlight-current-row class="table">
      <el-table-column label="寄养单号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物种类" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养时长" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="金额" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="centerDialogVisible = true">延长</el-button>
          <el-button type="text" size="small" @click="godel">结束</el-button>
          <el-button type="text" size="small" @click="goover">取消</el-button>
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
    <el-dialog title="延长寄养时间" :visible.sync="centerDialogVisible" width="35%" center>
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
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import caretable from "./caretable.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      centerDialogVisible: false,
      tabledata: [{ id: 1 }],
      type: "寄养单号",
      form: {
        longtime: ""
      },
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
        page_size: this.page_size
      };

      if (this.searchval != "" && this.searchval != null) {
        if (this.type == "寄养单号") {
          query.careid = this.searchval;
        } else if (this.type == "宠物种类") {
          query.pettype = this.searchval;
        } else if (this.type == "寄养日期") {
          var time = this.moment(this.searchval[0]).format("YYYY-MM-DD");
          var time1 = this.moment(this.searchval[1]).format("YYYY-MM-DD");
          query.starttime = time;
          query.endtime = time1;
        }
      }
      return query;
    },
    goquery() {
      const query = this.makequery();
      // this.axios
      //   .get("/api/getpet", {
      //     params: {
      //       ...query
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.success) {
      //       var results = res.data;
      //       this.tabledata = results.message;
      //       this.total = results.total;
      //       for (let i in this.tabledata) {
      //         var now = this.moment(
      //           this.moment(new Date()).format("YYYY-MM-DD")
      //         );
      //         var age = Util.displayAge(this.tabledata[i].birthday, now);
      //         this.tabledata[i].age = age;
      //       }
      //     }
      //   });
    },
    godel() {
      this.$confirm("您确定要提前结束寄养?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功提交结束申请，请等待管理员处理");
        })
        .catch(() => {});
    },
    golong() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.centerDialogVisible = false;
          this.$message.success("您已成功提交延长申请，请等待管理员处理");
        } else {
          return false;
        }
      });
    },
    goover() {
      this.$confirm("您确定要取消寄养申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功取消寄养申请");
        })
        .catch(() => {});
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    goadd() {
      var booking = true;
      this.rjDialog
        .title("我要寄养")
        .width("600px")
        .currentView(caretable, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
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
