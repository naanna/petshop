<template>
  <div :style="conheight" class="div1">
    <el-page-header @back="goback" content="忘记密码"></el-page-header>
    <el-form
      :model="form"
      :style="location"
      label-position="right"
      class="formdiv"
      :rules="rules"
      ref="form"
      v-if="page==1"
    >
      <el-form-item prop="username">
        <el-input
          type="text"
          size="small"
          class="width250"
          v-model="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" type="text" class="form1" placeholder="请输入验证码" v-model="form.code"></el-input>
        <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="bottom">
          <span class="code" @click="gochange">{{showcode}}</span>
        </el-tooltip>
      </el-form-item>
      <el-button type="primary" size="small" @click="gonext">下一步</el-button>
    </el-form>

    <div class="formdiv" v-if="page==2" :style="location">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="身份认证"></el-step>
        <el-step title="设置操作"></el-step>
        <el-step title="完成" v-if="showsuccess"></el-step>
        <el-step status="error" title="完成" v-else></el-step>
      </el-steps>
      <div v-if="active==1">
        <el-input type="text" size="small" class="name" v-model="name" placeholder="请输入姓名"></el-input>
      </div>
      <div v-else-if="active==2">
        <el-form :model="psd" :rules="psdrules" ref="psd" class="psdform">
          <el-form-item prop="pass">
            <el-input
              type="password"
              size="small"
              class="psd"
              v-model="psd.pass"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              size="small"
              class="psd"
              v-model="psd.checkPass"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="active==3">
        <div v-if="showsuccess">
          <img src="@picture/success.png" class="picture" />
          <p>您已成功修改密码！</p>
          <span class="back" @click="goback">返回登录！</span>
        </div>
        <div v-else>
          <img src="@picture/wrong.png" class="picture" />
          <p>修改密码失败！</p>
          <span class="back" @click="goback">返回登录！</span>
        </div>
      </div>
      <el-button style="margin-top: 12px;" @click="next" v-if="active==1||active==2">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { checkinput } from "@assets/validate.js";
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
      conheight: {
        height: ""
      },
      location: {
        top: "",
        left: ""
      },
      truename: "",
      name: "",
      form: {
        username: "",
        code: ""
      },
      code: "",
      showcode: "",
      page: 1,
      rules: {
        username: [
          { validator: checkinput, message: "账号不能为空" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ]
      },
      active: 1,
      showsuccess: true,
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
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.generatedCode();
  },
  methods: {
    next() {
      if (this.active == 1) {
        if (this.name == "") {
          this.$message.warning("请输入验证账户的姓名！");
        } else {
          if (this.name != this.truename) {
            this.$message.warning("姓名错误！");
          } else {
            this.active++;
          }
        }
      } else if (this.active == 2) {
        this.$refs["psd"].validate(valid => {
          if (valid) {
            this.axios
              .post("/api/updateuser/psd", {
                psd: this.psd.pass,
                username: this.form.username
              })
              .then(res => {
                if (res.data.success) {
                  this.active++;
                } else {
                  this.showsuccess = false;
                }
              });
          } else {
            return false;
          }
        });
      }
    },
    gonext() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.code == "") {
            this.$message.warning("请输入验证码！");
          } else if (this.form.code != this.code) {
            this.$message.warning("验证码错误！");
          } else {
            this.axios
              .get("/api/getuser", {
                params: {
                  id: this.form.username
                }
              })
              .then(res => {
                if (res.data.success) {
                  this.truename = res.data.message.name;
                  this.page = 2;
                } else {
                  this.generatedCode();
                  this.form.code = "";
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    goback() {
      this.$router.push("/login");
    },
    getHeight() {
      this.conheight.height = window.innerHeight + "px";
      this.location.top = window.innerHeight / 3 + "px";
      this.location.left = window.innerWidth / 3 + "px";
    },
    gochange() {
      this.generatedCode();
    },
    generatedCode() {
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let code = "";
      let showcode = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 36);
        showcode += random[index] + " ";
        code += random[index];
      }
      this.showcode = showcode;
      this.code = code;
    }
  }
};
</script>

<style scoped>
.div1 {
  background: url("~@/assets/picture/login.jpg");
  background-size: 100% 100%;
}
.width250 {
  width: 250px;
}
.formdiv {
  position: absolute;
  background: #ffffff;
  width: 500px;
  text-align: center;
  padding: 30px 0;
  border-radius: 10px;
}
.form1 {
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
  margin-left: 20px;
  border-radius: 5px;
  cursor: pointer;
}
.el-form-item >>> .el-form-item__error {
  left: 125px !important;
}
.name {
  width: 250px;
  margin: 30px 0;
}
.psd {
  width: 250px;
}
.psdform {
  margin: 30px 0;
}
.picture {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}
.back {
  cursor: pointer;
  font-size: 14px;
  color: rgb(82, 80, 80);
}
</style>
