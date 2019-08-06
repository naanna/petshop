<template>
  <div>
    <el-form label-position="right" :model="form" :rules="rules" ref="form">
      <el-form-item label="头像：" label-width="100px">
        <el-upload
          :http-request="upload"
          :multiple="true"
          :show-file-list="false"
          action
          ref="upload"
          class="uploadpic"
          :on-change="onchange"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar
            shape="square"
            v-if="imageUrl"
            :src="imageUrl"
            class="seepicture"
            slot="trigger"
          ></el-avatar>
          <el-avatar
            shape="square"
            src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/choose.png"
            class="seepicture"
            slot="trigger"
            v-else
          ></el-avatar>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号：" label-width="100px" prop="username">
        <el-input
          type="text"
          size="small"
          class="__p_C8_u_247"
          v-model="form.username"
          :disabled="disable"
        ></el-input>
        <el-tooltip class="item" effect="dark" content="长度不应超过16个字符且不含空格由英文和数字组成" placement="top">
          <i class="el-icon-question incoclass"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="密码：" label-width="100px" prop="pass">
        <el-input type="password" v-model="form.pass" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" label-width="100px" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" label-width="100px" prop="nickname">
        <el-input type="text" size="small" class="__p_C8_u_247" v-model="form.nickname"></el-input>
        <el-tooltip class="item" effect="dark" content="长度不应超过7个字符且不含空格" placement="top">
          <i class="el-icon-question incoclass"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="姓名：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="__p_C8_u_247" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限：" label-width="100px" prop="permission">
        <el-select
          size="small"
          class="__p_C8_u_247"
          v-model="form.permission"
          @change="goclearlevel"
        >
          <el-option value="customer" label="客户"></el-option>
          <el-option value="admin" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px" prop="sex">
        <el-select size="small" class="__p_C8_u_247" v-model="form.sex">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级：" label-width="100px" prop="level">
        <el-select size="small" class="__p_C8_u_247" v-model="form.level">
          <el-option value="vip1" label="初级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="vip2" label="中级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="vip3" label="高级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="admin" label="管理员" v-if="form.permission=='admin'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="余额：" label-width="100px" prop="money">
        <el-input type="text" size="small" class="__p_C8_u_247" v-model.number="form.money"></el-input>
      </el-form-item>
      <el-form-item label="生日：" label-width="100px" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
          size="small"
          class="__p_C8_u_247"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="__p_C8_u_268">
      <el-button type="primary" size="small" @click="goadd">添加</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  checkinput,
  checkspace,
  checkspecil,
  checkzh,
  checknum
} from "@assets/validate.js";
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
      disable: false,
      imageUrl: "",
      fileList: [],
      form: {
        username: "",
        pass: "",
        checkPass: "",
        nickname: "",
        name: "",
        money: 0,
        birthday: "",
        sex: "女",
        permission: "customer",
        level: "vip1",
        picture: ""
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
          { validator: checkinput, message: "姓名不能为空" },
          { validator: checkspace, message: "姓名不能包含空格" },
          { validator: checkspecil, message: "姓名不能包含特殊字符" },
          { validator: checknum, message: "姓名不能包含数字" },
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
        money: [{ type: "number", message: "余额必须为数字值" }]
      }
    };
  },
  mounted() {
    if (this.rjDialogParams().row) {
      console.log(this.rjDialogParams().row);
      this.disable = true;
    }
  },
  methods: {
    goadd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.fileList.length == 0) this.form.picture = null;
          else this.form.picture = this.fileList[0].url;
          this.form.birthday = this.moment(this.form.birthday).format(
            "YYYY-MM-DD"
          );
          console.log(this.form);
        } else {
          return false;
        }
      });
    },
    upload(file) {
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdpicture"
      });
      var fileName = "mmzdtx" + file.file.uid;
      client.put(fileName, file.file).then(result => {
        this.fileList[0] = {
          name: result.name,
          url: result.url
        };
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if ((isJPG && isLt2M) || (isPNG && isLt2M)) {
        //转base64
        reader.onload = function(e) {
          _this.imageUrl = e.target.result; //将图片路径赋值给src
        };
      }
      reader.readAsDataURL(file);
    },
    goclearlevel() {
      if (this.form.permission == "customer") this.form.level = "vip1";
      else this.form.level = "admin";
    },
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.__p_C8_u_247 {
  width: 250px;
}
.incoclass {
  margin-left: 10px;
}
.__p_C8_u_268 {
  text-align: center;
}
.seepicture {
  width: 100px;
  height: 100px;
}
.icnoclass {
  font-size: 50px;
  width: 100px;
  height: 100px;
}
</style>
