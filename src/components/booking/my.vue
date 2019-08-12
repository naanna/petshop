<template>
  <div>
    <span class="fontclass">我的代售</span>
    <el-button type="primary" size="small" class="bookbut" @click="gobook">我要代售</el-button>
    <div class="div1">
      <el-select size="small" class="select" v-model="type" @change="change">
        <el-option value="代售单号" label="代售单号"></el-option>
        <el-option value="宠物名" label="宠物名"></el-option>
        <el-option value="代售日期" label="代售日期"></el-option>
      </el-select>
      <el-date-picker
        v-if="type=='代售日期'"
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
        clearable
      ></el-input>
      <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      <el-button type="text" size="small" style="float:right;" @click="gohistory">查看历史代售</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="table">
      <el-table-column label="代售单号  " prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物编号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="心里价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="售出日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="服务费" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goover">取消</el-button>
          <el-button type="text" size="small" @click="godown">下架</el-button>
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
import booktable from "./booktable.vue";
export default {
  components: {
    rjDialog
  },
  name: "my",
  data() {
    return {
      type: "代售单号",
      searchval: "",
      total: 0,
      tabledata: [{ id: 1 }],
      page_no: 1,
      page_size: 10
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
        if (this.type == "代售单号") {
          query.bookid = this.searchval;
        } else if (this.type == "宠物名") {
          query.petname = this.searchval;
        } else if (this.type == "代售日期") {
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
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    change() {
      this.searchval = "";
    },
    goover() {
      this.$confirm("您确定要取消代售申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功取消代售申请");
        })
        .catch(() => {});
    },
    godown() {
      this.$confirm("您确定要下架代售宠物?服务费将不会退还！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功下架代售宠物");
        })
        .catch(() => {});
    },
    gobook() {
      this.rjDialog
        .title("我要代售")
        .width("600px")
        .currentView(booktable, {})
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
    gohistory() {
      this.$router.push("historybook");
    }
  }
};
</script>

<style scoped>
.bookbut {
  float: right;
}

.select {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
}

.div1 {
  margin-top: 20px;
}

.table {
  margin-top: 10px;
}
.time {
  margin-right: 10px;
}
</style>
