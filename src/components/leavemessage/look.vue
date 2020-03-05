<template>
  <div>
    <p class="ruleclass">留 言 板</p>
    <div class="leave-box">
      <p style="margin-bottom:10px;">目前已有{{total}}条评论，请发表您的留言:</p>
      <el-input type="textarea" :rows="5" v-model="textarea"></el-input>
      <el-button type="primary" plain size="small" class="leave-button" @click="goMessage">发表</el-button>
      <el-button
        type="info"
        plain
        size="small"
        class="leave-button"
        @click="goMy"
        style="float:right;"
      >查看我的</el-button>
    </div>
    <el-timeline>
      <el-timeline-item
        :timestamp="item.simpletime"
        placement="top"
        v-for="(item,index) in tableData"
      >
        <el-card>
          <h4 style="white-space: pre-wrap;">{{item.note}}</h4>
          <p>{{item.nickname}} 发表于 {{item.time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="15"
      class="fyclass"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "look",
  data() {
    return {
      textarea: "",
      total: 0,
      page_no: 1,
      page_size: 15,
      tableData: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        type: "show"
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
    goMessage() {
      if (this.textarea == "") {
        this.$message.warning("您还没有填写留言内容!");
      } else if (this.textarea.length > 200) {
        this.$message.warning("留言内容不能超过200个字符!");
      } else {
        this.$confirm("您确认发表本条留言吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.axios
              .post("/api/message/add", {
                username: this.$store.state.username,
                note: this.textarea,
                time: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
              })
              .then(res => {
                if (res.data.success) {
                  this.goQuery();
                  this.textarea = "";
                  this.$message.success("发表成功!");
                }
              });
          })
          .catch(() => {});
      }
    },
    handleCurrentChange(val) {
      this.page_no = val;
      this.goQuery();
    },
    goMy() {
      this.$router.push("my");
    }
  }
};
</script>

<style scoped>
.ruleclass {
  background: linear-gradient(to right, #629bdb, #56da7d);
  -webkit-background-clip: text;
  text-align: center;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 15px;
  font-family: "华文行楷";
  color: transparent;
}
.leave-button {
  margin-top: 10px;
}
.leave-box {
  margin: 10px 0 40px 40px;
}
</style>
