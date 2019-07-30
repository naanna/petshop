<template>
  <div>
    <div>
      <!-- <p class="__p_2362_uid_225">账号信息</p> -->
      <span class="__p_2362_uid_225">账号信息</span>
      <el-form label-position="right" class="__p_2362_uid_194">
        <el-form-item label="用户名：" label-width="300px" class="__p_2362_uid_195">
          <el-input type="text" size="small" class="__p_2362_uid_196"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" label-width="300px" class="__p_2362_uid_197">
          <el-input type="text" size="small" class="__p_2362_uid_211"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="300px" class="__p_2362_uid_199">
          <el-input type="text" size="small" class="__p_2362_uid_200"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" label-width="300px" class="__p_2362_uid_201">
          <el-input type="text" size="small" class="__p_2362_uid_202"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="300px" class="__p_2362_uid_230">
          <el-input type="text" size="small" class="__p_2362_uid_231"></el-input>
        </el-form-item>
        <el-form-item label="性别：" label-width="300px" class="__p_2362_uid_212">
          <el-select size="small" class="__p_2362_uid_224">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日：" label-width="300px" class="__p_2362_uid_220">
          <el-input type="text" size="small" class="__p_2362_uid_221"></el-input>
          <i class="el-icon-question __p_2362_uid_227"></i>
        </el-form-item>
        <el-form-item label="账户余额：" label-width="300px" class="__p_2362_uid_203">
          <el-input type="text" size="small" class="__p_2362_uid_204"></el-input>
        </el-form-item>
        <el-form-item label="会员等级：" label-width="300px" class="__p_2362_uid_205">
          <el-input type="text" size="small" class="__p_2362_uid_206"></el-input>
          <i class="el-icon-question __p_2362_uid_226"></i>
        </el-form-item>
        <el-form-item label="注册日期：" label-width="300px" class="__p_2362_uid_222">
          <el-input type="text" size="small" class="__p_2362_uid_223"></el-input>
        </el-form-item>
      </el-form>
      <div class="__p_2362_uid_214">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small" @click="gourl('/')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "person",
  methods: {
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
  padding-bottom: 10px;
}

.__p_2362_uid_214 {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: 0px 0px;
}
</style>
