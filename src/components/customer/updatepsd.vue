<template>
  <div>
    <el-form label-position="right" :model="form" :rules="rules" ref="form">
      <el-form-item label="密码：" label-width="100px" prop="pass">
        <el-input type="password" v-model="form.pass" size="small" class="formlist"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" label-width="100px" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" size="small" class="formlist"></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">确定</el-button>
      <el-button size="small" @click="goClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "updatepsd",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.form.username = this.DialogParams().row.username;
    }
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios
            .put("/api/user/update/psd", {
              psd: this.form.pass,
              username: this.form.username
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("修改密码成功！");
                this.closeDialog();
              }
            });
        } else {
          return false;
        }
      });
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
</style>
