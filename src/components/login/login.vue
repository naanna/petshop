<template>
  <div :style="conheight" class="div1">
    <el-form
      :model="loginform"
      label-position="right"
      label-width="130px"
      class="form"
      :rules="rules"
      ref="loginform"
    >
      <h2 class="pclass">登录</h2>
      <el-form-item prop="username" label="账号:">
        <el-input type="text" size="small" v-model="loginform.username" class="formitem"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input type="password" size="small" v-model="loginform.password" class="formitem"></el-input>
      </el-form-item>
      <el-form-item label="验证码:">
        <el-input type="text" v-model="loginform.code" size="small" class="form1"></el-input>
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
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { checkinput } from "@assets/validate.js";
export default {
  name: "demo",
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
        ]
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight());
    this.generatedCode();
  },
  methods: {
    ...mapMutations(["setToken"]),
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
              .get("/api/login", {
                params: {
                  username: _this.loginform.username,
                  password: _this.loginform.password
                }
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
                        _this.User.setusername(res.data.message.username);
                        _this.User.setnickname(res.data.message.nickname);
                        _this.User.setpermissions(res.data.message.permissions);
                        _this.User.setpicture(res.data.message.picture);
                        _this.User.setregday(res.data.message.regday);
                        _this.$router.push("/");
                      }
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
.formitem {
  width: 200px;
}
.pclass {
  text-align: center;
}
.butclass {
  padding-right: 50px;
  margin-bottom: 5px;
  text-align: right;
}
.div1 {
  background: url("~@/assets/picture/login.jpg");
  background-size: 100% 100%;
}
.form {
  position: absolute;
  background: #ffffff;
  width: 430px;
  top: 200px;
  right: 200px;
  padding-bottom: 20px;
  border-radius: 10px;
}
.code {
  background: #e6e3e3;
  width: 80px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  margin-left: 20px;
  border-radius: 5px;
  cursor: pointer;
}
.form1 {
  vertical-align: middle;
  width: 100px;
}
</style>
