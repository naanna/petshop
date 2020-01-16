<template>
  <div class="div1">
    <el-row type="flex" :style="conheight" style="align-items:center;">
      <el-col :lg="{span:12, offset:12}" :md="{span:24}">
        <el-form
          :model="loginform"
          label-position="right"
          label-width="100px"
          class="form"
          :rules="rules"
          ref="loginform"
        >
          <h2 class="pclass">登录</h2>
          <el-form-item prop="username" label="账号:">
            <el-row>
              <el-input type="text" size="small" v-model="loginform.username" class="input"></el-input>
            </el-row>
          </el-form-item>
          <el-form-item prop="password" label="密码:">
            <el-input type="password" size="small" v-model="loginform.password" class="input"></el-input>
          </el-form-item>
          <el-form-item   prop="code" label="验证码:">
            <el-input
              type="text"
              v-model="loginform.code"
              size="small"
              class="input"
              style="margin-right:20px"
            ></el-input>
            <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="bottom">
              <span class="code" @click="gochange">{{showcode}}</span>
            </el-tooltip>
          </el-form-item>
          <div class="butclass">
            <el-button type="text" size="small" @click="goForget">忘记密码</el-button>
          </div>
          <div class="pclass">
            <el-button type="primary" size="small" @click="gologin">登录</el-button>
            <el-button type="primary" size="small" @click="goreset">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { checkinput } from "@assets/validate.js";
import random from "@assets/random.js";
export default {
  name: "login",
  data() {
    return {
      code: "",
      showcode: "",
      loginform: {
        username: "",
        password: "",
        code: ""
      },
      conheight: {
        height: ""
      },
      rules: {
        username: [
          { validator: checkinput, message: "账号不能为空" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ],
        password: [
          { validator: checkinput, message: "密码不能为空" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }
        ],
        code: [{ validator: checkinput, message: "验证码不能为空" }]
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight());
    this.generatedCode();
  },
  methods: {
    ...mapMutations(["setToken", "setUser"]),
    gologin() {
      this.$refs["loginform"].validate(valid => {
        if (valid) {
          let _this = this;
          if (_this.loginform.code == "") {
            this.$message.warning("请输入验证码！");
          } else if (_this.loginform.code != _this.code) {
            this.$message.warning("验证码错误！");
          } else {
            this.axios
              .post("/api/login", {
                username: _this.loginform.username,
                password: _this.loginform.password
              })
              .then(res => {
                if (res.data.success) {
                  _this.setToken({ token: res.data.token }); //store中的为token赋值方法
                  _this.axios
                    .get("/api/getuser", {
                      params: {
                        id: _this.loginform.username
                      }
                    })
                    .then(res => {
                      if (res.data.success) {
                        _this.setUser({ user: res.data.message });
                        _this.$router.push("/");
                      }
                    });
                } else {
                  _this.generatedCode();
                  _this.loginform.code = "";
                  _this.loginform.password = "";
                  _this.$nextTick(() => {
                    _this.$refs.loginform.clearValidate("password");
                  });
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    goreset() {
      this.$refs["loginform"].resetFields();
    },
    getHeight() {
      this.conheight.height = window.innerHeight + "px";
    },
    goForget() {
      this.$router.push("/forgetpsd");
    },
    generatedCode() {
      let code = "";
      let showcode = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62);
        code += random[index];
        showcode += random[index] + " ";
      }
      this.code = code;
      this.showcode = showcode;
    },
    gochange() {
      this.generatedCode();
    }
  }
};
</script>

<style scoped>
.pclass {
  text-align: center;
}
.butclass {
  padding-right: 50px;
  margin-bottom: 5px;
  text-align: right;
}
.div1 {
  background: url("https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/login.jpg");
  background-size: 100% 100%;
}
.form {
  font-size: 18px;
  background: #ffffff;
  width: 40%;
  min-width: 250px;
  max-width: 450px;
  padding: 10px 20px 20px 20px;
  border-radius: 10px;
  margin: 0 auto;
}
.code {
  background: #e6e3e3;
  width: 80px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
}
.input {
  max-width: 210px;
}
</style>
