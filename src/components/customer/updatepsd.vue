<template>
  <div>
    <el-form label-position="right" :model="form" :rules="rules" ref="form">
      <el-form-item label="密码：" label-width="100px" prop="pass">
        <el-input type="password" v-model="form.pass" size="small" class="width250"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" label-width="100px" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" size="small" class="width250"></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button type="primary" size="small" @click="goadd">确定</el-button>
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add_update",
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
    goadd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/updateuser/psd", {
              psd: this.form.pass,
              username: this.form.username
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("修改密码成功！");
                this.closeDialog && this.closeDialog();
              }
            });
        } else {
          return false;
        }
      });
    },
    goclose() {
      this.closeDialog && this.closeDialog();
    }
  }
};
</script>

<style scoped>
.width250 {
  width: 250px;
}
.button {
  text-align: center;
}
</style>
