<template>
  <div :style="conHeight" class="box">
    <el-page-header @back="goBack" content="忘记密码"></el-page-header>
    <el-row type="flex" :style="conHeight" style="align-items:center;">
      <el-col :span="24">
        <el-form
          :model="form"
          label-position="right"
          class="forget-form"
          label-width="100px"
          :rules="rules"
          ref="form"
          v-if="page==1"
        >
          <el-form-item prop="username" label="账号:">
            <el-input type="text" size="small" class="width210" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码:">
            <el-input
              size="small"
              type="text"
              class="code-input"
              style="margin-right:20px"
              v-model="form.code"
            ></el-input>
            <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="right">
              <span class="code" @click="generatedCode">{{showCode}}</span>
            </el-tooltip>
          </el-form-item>
          <div class="center">
            <el-button type="primary" size="small" @click="goNext">下一步</el-button>
          </div>
        </el-form>
        <div class="forget-form" v-if="page==2" style="min-width:400px;">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="身份认证"></el-step>
            <el-step title="设置操作"></el-step>
            <el-step title="完成" v-if="showSuccess"></el-step>
            <el-step status="error" title="完成" v-else></el-step>
          </el-steps>
          <div v-if="active==0" class="center">
            <span>姓名:</span>
            <el-input type="text" size="small" class="name width210" v-model="name"></el-input>
          </div>
          <div v-else-if="active==1" style="padding:0 20px;">
            <el-form :model="psd" :rules="psdrules" ref="psd" class="psd-form" label-width="100px">
              <el-form-item prop="pass" label="新密码:">
                <el-input type="password" size="small" class="width210" v-model="psd.pass"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass" label="再次输入:">
                <el-input type="password" size="small" class="width210" v-model="psd.checkPass"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="active==3" class="center">
            <div v-if="showSuccess">
              <img src="@picture/success.png" class="picture" />
              <p>您已成功修改密码！</p>
              <span class="back" @click="goBack">点击返回登录</span>
            </div>
            <div v-else>
              <img src="@picture/wrong.png" class="picture" />
              <p>修改密码失败！</p>
              <span class="back" @click="goBack">点击返回登录</span>
            </div>
          </div>
          <div class="center">
            <el-button @click="next" v-if="active==0||active==1">下一步</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { checkinput } from "@assets/validate.js";
import random from "@assets/random.js";
export default {
  name: "demo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.psd.checkPass !== "") {
          this.$refs.psd.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.psd.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      conHeight: {
        height: ""
      },
      trueName: "",
      name: "",
      form: {
        username: "",
        code: ""
      },
      code: "",
      showCode: "",
      page: 1,
      rules: {
        username: [
          { validator: checkinput, message: "账号不能为空" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ],
        code: [{ validator: checkinput, message: "验证码不能为空" }]
      },
      active: 0,
      showSuccess: true,
      psd: {
        pass: "",
        checkPass: ""
      },
      psdrules: {
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
  created() {
    window.addEventListener("resize", this.getHeight());
    this.generatedCode();
  },
  methods: {
    next() {
      if (this.active == 0) {
        if (this.name == "") {
          this.$message.warning("请输入验证账户的姓名！");
        } else {
          this.axios
            .get("/api/user/get", {
              params: {
                id: this.form.username,
                name: this.name
              }
            })
            .then(res => {
              if (res.data.success) {
                this.active++;
              } else {
                this.generatedCode();
                this.form.code = "";
              }
            });
        }
      } else if (this.active == 1) {
        this.$refs["psd"].validate(valid => {
          if (valid) {
            this.axios
              .put("/api/user/update/psd", {
                psd: this.psd.pass,
                username: this.form.username
              })
              .then(res => {
                if (res.data.success) {
                  this.active=this.active+2;
                } else {
                  this.active=this.active+2;
                  this.showSuccess = false;
                }
              });
          } else {
            return false;
          }
        });
      }
    },
    goNext() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.code == "") {
            this.$message.warning("请输入验证码！");
          } else if (this.form.code.toLowerCase() != this.code.toLowerCase()) {
            this.$message.warning("验证码错误！");
          } else {
            this.axios
              .get("/api/user/get", {
                params: {
                  id: this.form.username,
                  type: "forget"
                }
              })
              .then(res => {
                if (res.data.success) {
                  this.page = 2;
                } else {
                  this.generatedCode();
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    goBack() {
      this.$router.push("/login");
    },
    getHeight() {
      this.conHeight.height = window.innerHeight + "px";
    },
    generatedCode() {
      let code = "";
      let showCode = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62);
        showCode += random[index] + " ";
        code += random[index];
      }
      this.showCode = showCode;
      this.code = code;
    }
  }
};
</script>

<style scoped>
.box {
  background: url("https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/login.jpg");
  background-size: 100% 100%;
}
.width210 {
  max-width: 210px;
}
.forget-form {
  background: #ffffff;
  width: 25%;
  min-width: 330px;
  padding: 30px 0;
  border-radius: 10px;
  margin: 0 auto;
}
.code-input {
  vertical-align: middle;
  width: 150px;
}
.code {
  background: #e6e3e3;
  width: 80px;
  font-size: 18px;
  line-height: 32px;
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
}
.name {
  margin: 30px 0 30px 10px;
}
.psd-form {
  margin: 30px auto;
}
.picture {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}
.back {
  cursor: pointer;
  font-size: 14px;
  color: gary;
}
</style>
