<template>
  <div>
    <el-input type="textarea" :rows="5" v-model="textarea"></el-input>
    <div class="leave-update-button center">
      <el-button type="primary" size="small" @click="goSave">保存</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
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
    goSave() {
      if (this.textarea == "") {
        this.$message.warning("您还没有填写留言内容!");
      } else {
        this.axios
          .put("/api/message/update", {
            messageid: this.messageid,
            note: this.textarea
          })
          .then(res => {
            if (res.data.success) {
              this.$message.success("修改成功!");
              this.closeDialog();
            }
          });
      }
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.leave-update-button {
  margin-top: 10px;
}
</style>
