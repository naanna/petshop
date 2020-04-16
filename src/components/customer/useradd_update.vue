<template>
  <div>
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="头像：">
        <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model="form.username"
          :disabled="disable"
        ></el-input>
        <el-tooltip class="item" effect="dark" content="长度不应超过16个字符且不含空格由英文和数字组成" placement="top">
          <i class="el-icon-question icon"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-if="!edit" label="密码：" prop="pass">
        <el-input type="password" v-model="form.pass" size="small" class="formlist"></el-input>
      </el-form-item>
      <el-form-item v-if="!edit" label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" size="small" class="formlist"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input type="text" size="small" class="formlist" v-model="form.nickname"></el-input>
        <el-tooltip class="item" effect="dark" content="长度不应超过7个字符且不含空格" placement="top">
          <i class="el-icon-question icon"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限：" prop="permissions">
        <el-select size="small" class="formlist" v-model="form.permissions" @change="goClearLevel">
          <el-option value="customer" label="客户"></el-option>
          <el-option value="admin" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-select size="small" class="formlist" v-model="form.sex">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级：" prop="level">
        <el-select size="small" class="formlist" v-model="form.level">
          <el-option value="vip1" label="初级vip" v-if="form.permissions=='customer'"></el-option>
          <el-option value="vip2" label="中级vip" v-if="form.permissions=='customer'"></el-option>
          <el-option value="vip3" label="高级vip" v-if="form.permissions=='customer'"></el-option>
          <el-option value="admin" label="管理员" v-if="form.permissions=='admin'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="余额：" prop="money">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model.number="form.money"
          oninput="if(value.length>10)value=value.slice(0,10)"
        ></el-input>
      </el-form-item>
      <el-form-item label="生日：" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
          size="small"
          class="formlist"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">{{edit?'编辑':'添加'}}</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
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
import UploadImage from "@common/UploadImage.vue";
export default {
  name: "add_update",
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
    var checkBirthday = (rule, value, callback) => {
      if (
        this.moment(value).valueOf() >
        this.moment()
          .startOf("day")
          .valueOf()
      ) {
        return callback(new Error("生日必须大于当天"));
      }
      callback();
    };
    return {
      disable: false,
      imageUrl: "",
      edit: false,
      form: {
        username: "",
        pass: "",
        checkPass: "",
        nickname: "",
        name: "",
        money: 0,
        birthday: "",
        sex: "女",
        permissions: "customer",
        level: "vip1",
        picture: "",
        regday: this.moment(new Date()).format("YYYY-MM-DD")
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
        birthday: [
          { validator: checkinput, message: "生日不能为空" },
          { validator: checkBirthday, message: "生日必须大于当天" }
        ],
        money: [{ type: "number", message: "余额必须为数字值" }]
      }
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.disable = true;
      let obs = Object.assign({}, this.DialogParams().row);
      this.form = obs;
      this.form.pass = obs.psd;
      this.form.checkPass = obs.psd;
      if (obs.picture != null) this.imageUrl = obs.picture;
      this.edit = true;
    }
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: this.edit ? "编辑用户中..." : "添加用户中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          setTimeout(() => {
            if (this.imageUrl == "") this.form.picture = null;
            this.form.birthday = this.moment(this.form.birthday).format(
              "YYYY-MM-DD"
            );
            let url = "";
            if (this.edit) {
              url = "/api/user/update";
            } else {
              url = "/api/user/add";
            }
            this.axios.post(url, this.form).then(res => {
              if (res.data.success) {
                this.$message.success("操作成功！");
              }
              this.closeDialog();
              loading.close();
            });
          }, 2000);
        } else {
          return false;
        }
      });
    },
    getSrc(src) {
      this.form.picture = src;
      this.imageUrl = src;
    },
    goClearLevel() {
      if (this.form.permissions == "customer") this.form.level = "vip1";
      else this.form.level = "admin";
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.icon {
  margin-left: 10px;
}
</style>
