<template>
  <div>
    <div>
      <span class="__p_2362_uid_225">账号信息</span>
      <el-form label-position="right" class="__p_2362_uid_194" ref="form" :model="form">
        <el-form-item label="用户名：" label-width="300px" class="__p_2362_uid_195">
          <span style="color: #898989;">{{form.username}}</span>
        </el-form-item>
        <el-form-item label="昵称：" label-width="300px" class="__p_2362_uid_197" prop="nickname">
          <el-input type="text" size="small" class="__p_2362_uid_211" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="300px" class="__p_2362_uid_230" prop="name">
          <el-input type="text" size="small" class="__p_2362_uid_231" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" label-width="300px" class="__p_2362_uid_212" prop="sex">
          <el-select size="small" class="__p_2362_uid_224" v-model="form.sex">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日：" label-width="300px" class="__p_2362_uid_220" prop="birthday">
          <el-date-picker type="date" size="small" class="__p_2362_uid_224" v-model="form.birthday"></el-date-picker>
          <i class="el-icon-question __p_2362_uid_227"></i>
        </el-form-item>
        <el-form-item label="注册日期：" label-width="300px" class="__p_2362_uid_222">
          <span style="color: #898989;">{{form.regday}}</span>
        </el-form-item>
        <div class="__p_2362_uid_214">
          <el-button type="primary" size="small">保存</el-button>
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
          <span style="color: #898989;">{{form.leavel}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span class="__p_2362_uid_225">账号安全</span>
      <el-form class="__p_2362_uid_194">
        <el-form-item label="密码：" label-width="300px" class="__p_2362_uid_199">
          <el-input type="text" size="small" class="__p_2362_uid_200"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" label-width="300px" class="__p_2362_uid_201">
          <el-input type="text" size="small" class="__p_2362_uid_202"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "person",
  data() {
    return {
      form: {},
      old: {
        nickname: "",
        name: "",
        sex: "",
        birthday: ""
      },
      id: "505"
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
            this.form.regday = this.moment(this.form.regday).format('YYYY-MM-DD');
          }
        });
    },
    goclear() {
      this.form.nickname = this.old.nickname;
      this.form.name = this.old.name;
      this.form.sex = this.old.sex;
      this.form.birthday = this.old.birthday;
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
</style>
