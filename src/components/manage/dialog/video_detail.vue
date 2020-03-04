<template>
  <div>
    <video class="video" :poster="form.cover" width="100%" controls :src="form.src"></video>
    <el-form label-position="right" style="margin-left:100px;" :model="form" ref="form">
      <el-form-item label="标题：" label-width="100px">
        <span>{{form.title}}</span>
      </el-form-item>
      <el-form-item label="类型：" label-width="100px">
        <el-tag v-if="form.type==='homemade'" type="info">自制</el-tag>
        <el-tag v-else type="info">转载</el-tag>
      </el-form-item>
      <el-form-item label="简介：" label-width="100px">
        <div v-for="(item,index) in form.info" :key="index">{{item}}</div>
      </el-form-item>
      <el-form-item label="标签：" label-width="100px">
        <el-tag v-for="(item,index) in form.tag" :key="index" class="tag">{{item}}</el-tag>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.form = Object.assign(this.DialogParams().row);
      this.form.tag = this.form.tag.split(",");
      this.form.info = this.form.info.split(/\n|\r\n/g);
    }
  },
  methods: {
    goclose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.tag {
  margin-left: 10px;
}
</style>
