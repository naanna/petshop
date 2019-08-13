<template>
  <div>
    <p class="ruleclass">留  言  板</p>
    <div class="leave">
      <p style="margin-bottom:10px;">目前已有{{total}}条评论，请发表您的留言:</p>
      <el-input type="textarea" :rows="5" v-model="textarea"></el-input>
      <el-button type="primary" plain size="small" class="button" @click="gomessage">发表</el-button>
    </div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>真滴是太便宜啦啦啦啦啦真滴是太便宜啦啦啦啦啦</h4>
          <p>王小虎 发表于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="15"
      class="fyclass"
      layout="prev, pager, next, jumper"
      :total="1000"
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
    };
  },
  methods: {
    goquery() {
      const query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      console.log(query);
    },

    gomessage() {
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
            var textarea = this.textarea.split(/[(\r\n)\r\n]+/);
            if (textarea.length == 0) {
              console.log("直接插入");
            } else {
              let text = "";
              for (let i in textarea) {
                if (i != textarea.length - 1) text += textarea[i] + "<br>";
                else text += textarea[i];
              }
            }
            this.$message.success("发表成功!");
          })
          .catch(() => {});
      }
    },
    handleCurrentChange(val) {
      this.page_no = val;
      this.goquery();
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
.button {
  margin-top: 10px;
}
.leave {
  margin: 10px 0 40px 40px;
}
</style>
