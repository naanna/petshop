<template>
  <div>
    <el-form :model="loginform" label-position="right" label-width="100px">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account" label="账号">
        <el-input type="text" v-model="loginform.username" class="formitem"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginform.password" class="formitem"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">重 置</el-button>
        <el-button type="primary" size="small" @click="gologin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    gologin() {
      console.log(this.loginform);
    }
  }
};
</script>

<style scoped>
.formitem {
  width: 200px;
}
</style>
