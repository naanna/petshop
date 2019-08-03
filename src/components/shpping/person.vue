<template>
  <div>
    <div>
      <span class="__p_2362_uid_225">账号信息</span>
      <el-form
        label-position="right"
        class="__p_2362_uid_194"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="用户名：" label-width="300px" class="__p_2362_uid_195">
          <span style="color: #898989;">{{form.username}}</span>
        </el-form-item>
        <el-form-item
          label="昵称："
          label-width="300px"
          class="__p_2362_uid_197"
          prop="nickname"
          :inline-message="true"
        >
          <el-input type="text" size="small" class="__p_2362_uid_211" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名："
          label-width="300px"
          class="__p_2362_uid_230"
          prop="name"
          :inline-message="true"
        >
          <el-input type="text" size="small" class="__p_2362_uid_231" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" label-width="300px" class="__p_2362_uid_212" prop="sex">
          <el-select size="small" class="__p_2362_uid_224" v-model="form.sex">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="生日："
          label-width="300px"
          class="__p_2362_uid_220"
          prop="birthday"
          :inline-message="true"
        >
          <el-date-picker type="date" size="small" class="__p_2362_uid_224" v-model="form.birthday"></el-date-picker>
          <el-tooltip class="item" effect="dark" content="亲，生日当月将赠送优惠券（每年只享受一次）" placement="top">
            <i class="el-icon-question __p_2362_uid_227"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="注册日期：" label-width="300px" class="__p_2362_uid_222">
          <span style="color: #898989;">{{form.regday}}</span>
        </el-form-item>
        <div class="__p_2362_uid_214">
          <el-button type="primary" size="small" @click="gosave">保存</el-button>
          <el-button size="small" @click="goclear">取消</el-button>
        </div>
      </el-form>
    </div>
    <div style="margin-top:20px;">
      <span class="__p_2362_uid_225">会员信息</span>
      <el-form class="__p_2362_uid_194">
        <el-form-item label="账户余额：" label-width="300px" class="__p_2362_uid_203">
          <span style="color: #898989;">{{form.moeny}}</span>
        </el-form-item>
        <el-form-item label="会员等级：" label-width="300px" class="__p_2362_uid_205">
          <div style="margin-top:10px;display:inline-block;">
            <img src="@picture/vip1.png" style="height:25px" v-if="form.level=='vip'" />
            <img
              src="@picture/vip2.png"
              style="height:25px"
              v-else-if="form.level=='vip2'"
            />
            <img src="@picture/vip3.png" style="height:25px" v-else />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span class="__p_2362_uid_225">账号安全</span>
      <div class="__p_2364_uid_284">
        <div>
          <img src="@picture/psdicon.png" class="__p_2364_uid_293" />
        </div>
        <div class="__p_2364_uid_286">
          <span class="__p_2364_uid_287">我的密码</span>
          <span class="__p_2364_uid_288">修改密码，账号更安全</span>
          <div class="__p_2364_uid_289">
            <img src="@picture/set.png" class="__p_2364_uid_290" />
            <span class="__p_2364_uid_291" @click="gopsd">更改密码></span>
          </div>
        </div>
      </div>
    </div>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import { checkinput, checkspace } from "@assets/validate.js";
import rjDialog from "../dialog.vue";
import psd from "./psd.vue";
export default {
  components: {
    rjDialog
  },
  name: "person",
  data() {
    return {
      form: {},
      old: {
        nickname: "",
        name: "",
        sex: "",
        birthday: "",
        psd: ""
      },
      id: "505",
      rules: {
        nickname: [
          { validator: checkinput, message: "昵称不能为空" },
          { min: 1, max: 7, message: "长度在1到7个字符" }
        ],
        name: [
          { validator: checkinput, message: "姓名不能为空" },
          { validator: checkspace, message: "姓名不能包含空格" },
          { min: 1, max: 10, message: "长度在1到10个字符" }
        ],
        birthday: [{ validator: checkinput, message: "生日不能为空" }]
      }
    };
  },
  created() {
    this.getperson();
  },
  methods: {
    getperson() {
      this.axios
        .get("http://localhost:3000/api/getuser", {
          params: {
            id: this.id
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
            this.old.psd = results.psd;
            this.form.regday = this.moment(this.form.regday).format(
              "YYYY-MM-DD"
            );
          }
        });
    },
    gosave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("确认保存修改的资料吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              var time = this.moment(this.form.birthday).format("YYYY-MM-DD");
              this.axios
                .post("http://localhost:3000/api/updateuser", {
                  nickname: this.form.nickname,
                  name: this.form.name,
                  sex: this.form.sex,
                  birthday: time,
                  username: this.form.username
                })
                .then(res => {
                  if (res.data.success) {
                    this.getperson();
                    this.$message.success("修改信息成功！");
                  } else {
                    this.$message.warning("修改信息失败！");
                  }
                });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    goclear() {
      this.form.nickname = this.old.nickname;
      this.form.name = this.old.name;
      this.form.sex = this.old.sex;
      this.form.birthday = this.old.birthday;
    },
    gopsd() {
      var old = this.form;
      this.rjDialog
        .title("修改密码")
        .width("800px")
        .currentView(psd, { old })
        .showClose(true)
        .sizeTiny()
        .then(opt => {
          this.getperson();
        })
        .show();
    },
    gourl(url) {
      this.$router.replace(url);
    }
  }
};
</script>

<style scoped>
.__p_2362_uid_225 {
  font-size: 25px;
  color: #000000;
}

.__p_2362_uid_196 {
  width: 250px;
}

.__p_2362_uid_195 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_211 {
  width: 250px;
}

.__p_2362_uid_197 {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0;
}

.__p_2362_uid_200 {
  width: 250px;
}

.__p_2362_uid_199 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_202 {
  width: 250px;
}

.__p_2362_uid_201 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_231 {
  width: 250px;
}

.__p_2362_uid_230 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_224 {
  width: 250px;
}

.__p_2362_uid_212 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_221 {
  width: 250px;
}

.__p_2362_uid_227 {
  margin-left: 10px;
}

.__p_2362_uid_220 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_204 {
  width: 250px;
}

.__p_2362_uid_203 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_206 {
  width: 250px;
}

.__p_2362_uid_226 {
  margin-left: 10px;
}

.__p_2362_uid_205 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_223 {
  width: 250px;
}

.__p_2362_uid_222 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_194 {
  background: #ffffff;
  border: 1px solid #dddddd;
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.__p_2362_uid_214 {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: 0px 0px;
}
.__p_2364_uid_284 {
  margin-top: 20px;
  margin-left: 20px;
  width: 350px;
  display: flex;
}
.__p_2364_uid_293 {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-top: 10px;
}

.__p_2364_uid_287 {
  font-size: 18px;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
}

.__p_2364_uid_288 {
  font-size: 14px;
  color: #898989;
  display: block;
}
.__p_2364_uid_286 {
  flex: 1;
  margin-left: 20px;
}
.__p_2364_uid_290 {
  vertical-align: middle;
  border-radius: 10px;
}

.__p_2364_uid_291 {
  color: #52d0f3;
  vertical-align: middle;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.__p_2364_uid_289 {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
