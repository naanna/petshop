<template>
  <div>
    <div>
      <span class="font-25">账号信息</span>
      <div class="person-boder">
        <el-form label-position="right" :model="form" :rules="rules" ref="form" class="form">
          <el-form-item label="用户名：" class="form-item-padding">
            <span style="color: #898989;">{{form.username}}</span>
          </el-form-item>
          <el-form-item
            label="昵称："
            class="form-item-padding"
            prop="nickname"
            :inline-message="true"
          >
            <el-input type="text" size="small" class="formlist" v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" class="form-item-padding" prop="name" :inline-message="true">
            <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：" class="form-item-padding" prop="sex">
            <el-select size="small" class="formlist" v-model="form.sex">
              <el-option value="男" label="男"></el-option>
              <el-option value="女" label="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="生日："
            class="form-item-padding"
            prop="birthday"
            :inline-message="true"
          >
            <el-date-picker type="date" size="small" class="formlist" v-model="form.birthday"></el-date-picker>
            <el-tooltip class="item" effect="dark" content="亲，生日当月将有小惊喜哦（每年只享受一次）" placement="top">
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="注册日期：" class="form-item-padding">
            <span style="color: #898989;">{{form.regday}}</span>
          </el-form-item>
          <div class="center">
            <el-button type="primary" size="small" @click="goSave">保存</el-button>
            <el-button size="small" @click="goClear">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div style="margin-top:20px;">
      <span class="font-25">会员信息</span>
      <div class="person-boder">
        <el-form class="form">
          <el-form-item label="账户余额：" class="form-item-padding">
            <span style="color: #898989;">{{form.money}}</span>
          </el-form-item>
          <el-form-item label="会员等级：" class="form-item-padding">
            <div style="margin-top:10px;display:inline-block;">
              <img src="@picture/vip1.png" style="height:25px" v-if="form.level=='vip'" />
              <img src="@picture/vip2.png" style="height:25px" v-else-if="form.level=='vip2'" />
              <img src="@picture/vip3.png" style="height:25px" v-else />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <span class="font-25">我的头像</span>
      <div class="person-boder">
        <div class="picture-box">
          <el-button class="look-botton" circle @click="isShowImageDialog=true">
            <span style="display:block;">查看</span>
            <span>头像</span>
          </el-button>
          <el-avatar class="picture" :src="form.picture" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <el-button class="change-button" circle @click="goUrl('./changepic')">
            <span style="display:block;">更改</span>
            <span>头像</span>
          </el-button>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;">
      <span class="font-25">账号安全</span>
      <div class="psd-box">
        <div>
          <img src="@picture/psdicon.png" class="psd-picture" />
        </div>
        <div class="psd-info-box">
          <span class="psd-info-title">我的密码</span>
          <span class="psd-info">修改密码，账号更安全</span>
          <div class="psd-change-box">
            <img src="@picture/set.png" class="psd-change-pic" />
            <span class="psd-change-title" @click="goPsd">更改密码></span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowImageDialog">
      <img
        :src="form.picture"
        style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"
      />
    </el-dialog>
    <Dialog></Dialog>
  </div>
</template>
<script>
import {
  checkinput,
  checkspace,
  checkspecil,
  checknum
} from "@assets/validate.js";
import Dialog from "@common/dialog.vue";
import psd from "./psd.vue";
export default {
  components: {
    Dialog
  },
  name: "person",
  data() {
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
      isShowImageDialog: false,
      imageUrl: "",
      form: {},
      old: {
        nickname: "",
        name: "",
        sex: "",
        birthday: "",
      },
      rules: {
        nickname: [
          { validator: checkinput, message: "昵称不能为空" },
          { min: 1, max: 7, message: "长度在1到7个字符" }
        ],
        name: [
          { validator: checkinput, message: "姓名不能为空" },
          { validator: checkspecil, message: "姓名不能包含特殊字符" },
          { validator: checknum, message: "姓名不能包含数字" },
          { validator: checkspace, message: "姓名不能包含空格" },
          { min: 1, max: 10, message: "长度在1到10个字符" }
        ],
        birthday: [
          { validator: checkinput, message: "生日不能为空" },
          { validator: checkBirthday, message: "生日必须大于当天" }
        ]
      }
    };
  },
  created() {
    this.getPerson();
  },
  methods: {
    getPerson() {
      this.axios
        .get("/api/user/get", {
          params: {
            id: this.$store.state.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.form = results;
            this.old.nickname = results.nickname;
            this.old.name = results.name;
            this.old.sex = results.sex;
            this.old.birthday = results.birthday;
            this.form.regday = this.moment(this.form.regday).format(
              "YYYY-MM-DD"
            );
          }
        });
    },
    goSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("确认保存修改的资料吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
            var time = this.moment(this.form.birthday).format("YYYY-MM-DD");
            this.axios
              .post("/api/user/update", {
                nickname: this.form.nickname,
                name: this.form.name,
                sex: this.form.sex,
                birthday: time,
                username: this.form.username
              })
              .then(res => {
                if (res.data.success) {
                  this.getPerson();
                  this.$message.success("修改信息成功！");
                }
              });
          });
        } else {
          return false;
        }
      });
    },
    goClear() {
      this.form.nickname = this.old.nickname;
      this.form.name = this.old.name;
      this.form.sex = this.old.sex;
      this.form.birthday = this.old.birthday;
    },
    goPsd() {
      this.Dialog.title("修改密码")
        .width("800px")
        .currentView(psd, {})
        .then(data => {
          this.getPerson();
        })
        .show();
    },
    errorHandler() {
      return true;
    },
    goUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.icon {
  margin-left: 10px;
}
.form-item-padding {
  margin-bottom: 0;
  padding: 5px 0;
}
.person-boder {
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 10px 0;
  margin: 20px 0;
  min-width: 420px;
}
.psd-picture {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-top: 10px;
}
.el-avatar >>> img {
  width: 100% !important;
}
.psd-box {
  margin-top: 20px;
  margin-left: 20px;
  width: 350px;
  display: flex;
}
.psd-info-title {
  font-size: 18px;
  display: block;
  padding: 10px 0;
}
.psd-info {
  font-size: 14px;
  color: #898989;
  display: block;
}
.psd-info-box {
  flex: 1;
  margin-left: 20px;
}
.psd-change-pic {
  vertical-align: middle;
  border-radius: 10px;
}
.psd-change-title {
  color: #52d0f3;
  vertical-align: middle;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}
.psd-change-box {
  padding: 10px 0;
}
.picture-box {
  width: 100px;
  height: 100px;
  border: 1px solid #e5e9ef;
  border-radius: 50%;
  padding: 40px;
  margin: 0 auto;
  position: relative;
}
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.change-button {
  position: absolute;
  top: 65px;
  right: -25px;
  color: #ffffff;
  background-color: #00a1d6;
}
.look-botton {
  position: absolute;
  top: 65px;
  left: -25px;
  color: #00a1d6;
  border: 1px solid #00a1d6;
  background-color: #ffffff;
}
.form {
  width: 350px;
  margin: 0 auto;
}
</style>
