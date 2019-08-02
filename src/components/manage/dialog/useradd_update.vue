<template>
  <div>
    <el-form label-position="right" style="margin-left:100px;">
      <!-- <el-form-item label="照片：" label-width="100px">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/">
          <el-button type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>-->
      <el-form-item label="账户：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="密码：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_249"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_252"></el-input>
      </el-form-item>
      <el-form-item label="权限：" label-width="100px">
        <el-select size="small" class="__p_C8_u_264" v-model="form.permission" @change="goclearlevel">
          <el-option value="customer" label="客户"></el-option>
          <el-option value="admin" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px">
        <el-select size="small" class="__p_C8_u_264" v-model="form.sex">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级：" label-width="100px">
        <el-select size="small" class="__p_C8_u_264" v-model="form.level">
          <el-option value="vip1" label="初级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="vip2" label="中级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="vip3" label="高级vip" v-if="form.permission=='customer'"></el-option>
          <el-option value="admin" label="管理员" v-if="form.permission=='admin'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="余额：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_262"></el-input>
      </el-form-item>
      <el-form-item label="生日：" label-width="100px">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
          size="small"
          class="__p_C8_u_262"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="__p_C8_u_268">
      <el-button type="primary" size="small">添加</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add_update",
  data() {
    return {
      form: {
        birthday: "",
        sex: "女",
        permission: "customer",
        level: ""
      }
    };
  },
  methods: {
    goclearlevel(){
      this.form.level="";
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

.__p_C8_u_249 {
  width: 250px;
}

.__p_C8_u_252 {
  width: 250px;
}

.__p_C8_u_258 {
  width: 250px;
}

.__p_C8_u_264 {
  width: 250px;
}

.__p_C8_u_254 {
  width: 250px;
}

.__p_C8_u_262 {
  width: 250px;
}

.__p_C8_u_267 {
  width: 250px;
}

.__p_C8_u_268 {
  text-align: center;
}
</style>
