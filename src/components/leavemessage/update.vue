<template>
  <div>
    <el-input type="textarea" :rows="5" v-model="textarea"></el-input>
    <div class="button">
      <el-button type="primary" size="small" @click="gosave">保存</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      textarea: "",
      messageid: ""
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      let obs = this.DialogParams().row;
      this.textarea = obs.note;
      this.messageid = obs.messageid;
    }
  },
  methods: {
    gosave() {
      if (this.textarea == "") {
        this.$message.warning("您还没有填写留言内容!");
      } else {
        this.axios
          .post("/api/updatemessage", {
            messageid: this.messageid,
            note: this.textarea
          })
          .then(res => {
            if (res.data.success) {
              this.$message.success("修改成功!");
              this.closeDialog && this.closeDialog();
            }
          });
      }
    },
    goclose() {
      this.closeDialog && this.closeDialog();
    }
  }
};
</script>

<style scoped>
.button {
  margin-top: 10px;
  text-align: center;
}
</style>
