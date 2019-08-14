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
      textarea: ""
    };
  },
  mounted() {
    if (this.rjDialogParams().row) {
      let obs = this.rjDialogParams().row;
      this.textarea = obs.note;
    }
  },
  methods: {
    gosave() {},
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
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
