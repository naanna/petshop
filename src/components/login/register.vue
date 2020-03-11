<template>
  <div class="box">
    <el-page-header @back="goBack" content="注册账号"></el-page-header>
    <el-row type="flex" :style="conHeight" align="middle">
      <el-col :lg="{span:12, offset:6}" :md="{span:24}">
        <el-form
          label-position="right"
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="register-form"
        >，
          <h2 class="center">注册账号</h2>
          <el-form-item label="账号：" prop="username">
            <el-input type="text" size="mini" class="formlist" v-model="form.username"></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="长度不应超过16个字符且不含空格由英文和数字组成"
              placement="top"
            >
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="form.pass" size="mini" class="formlist"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" size="mini" class="formlist"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input type="text" size="mini" class="formlist" v-model="form.nickname"></el-input>
            <el-tooltip class="item" effect="dark" content="长度不应超过7个字符且不含空格" placement="top">
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input type="text" size="mini" class="formlist" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select size="mini" class="formlist" v-model="form.sex">
              <el-option value="男" label="男"></el-option>
              <el-option value="女" label="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日：" prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              size="mini"
              class="formlist"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="code" label="验证码:">
            <el-input
              type="text"
              v-model="form.code"
              size="mini"
              class="formlist"
              style="margin-right:20px"
            ></el-input>
          </el-form-item>
            <el-form-item>
            <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="bottom">
              <span class="code" @click="generatedCode">{{showCode}}</span>
            </el-tooltip> 
          </el-form-item>
          <div class="center">
            <el-button type="primary" size="mini" @click="goRegister">注册</el-button>
            <el-button size="mini" @click="goReset">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  checkinput,
  checkspace,
  checkspecil,
  checkzh,
  checkname
} from "@assets/validate.js";
import random from "@assets/random.js";
import UploadImage from "@common/UploadImage.vue";
export default {
  name: "login",
  components: {
    UploadImage
  },
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
    var checkCode = (rule, value, callback) => {
      if (value.toLowerCase() != this.code.toLowerCase()) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      code: "",
      showCode: "",
      form: {
        username: "",
        pass: "",
        checkPass: "",
        nickname: "",
        name: "",
        birthday: "",
        sex: "女",
        code: "",
        regday: this.moment(new Date()).format("YYYY-MM-DD")
      },
      conHeight: {
        height: ""
      },
      rules: {
        pass: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        nickname: [
          { validator: checkinput, message: "昵称不能为空" },
          { min: 1, max: 7, message: "长度在1到7个字符" }
        ],
        name: [
          { validator: checkname, types: "名字" },
          { min: 1, max: 10, message: "长度在1到10个字符" }
        ],
        username: [
          { validator: checkinput, message: "账号不能为空" },
          { validator: checkspace, message: "姓名不能包含空格" },
          { validator: checkzh, message: "账号不能包含中文" },
          { validator: checkspecil, message: "账号不能包含特殊字符" },
          { min: 1, max: 16, message: "长度在1到16个字符" }
        ],
        birthday: [{ validator: checkinput, message: "生日不能为空" }],
        code: [
          { validator: checkinput, message: "验证码不能为空" },
          { validator: checkCode, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight());
    this.generatedCode();
  },
  methods: {
    goRegister() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.birthday = this.moment(this.form.birthday).format(
            "YYYY-MM-DD"
          );
          this.axios.post("/api/user/register", { ...this.form }).then(res => {
            if (res.data.success) {
              this.$message.success("注册成功！正在跳转登录页面······");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            }
          });
        } else {
          return false;
        }
      });
    },
    goReset() {
      this.$refs["form"].resetFields();
    },
    getHeight() {
      this.conHeight.height = window.innerHeight + "px";
    },
    generatedCode() {
      let code = "";
      let showCode = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62);
        code += random[index];
        showCode += random[index] + " ";
      }
      this.code = code;
      this.showCode = showCode;
    },
    goBack() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.forget-button {
  margin-bottom: 5px;
  text-align: right;
}
.box {
  background: url("https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/login.jpg");
  background-size: 100% 100%;
}
.register-form {
  background: #ffffff;
  width: 40%;
  min-width: 300px;
  max-width: 400px;
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
.formlist {
  max-width: 180px;
  margin-right: 5px;
}
.el-form-item {
  margin-bottom: 12px;
}
</style>
