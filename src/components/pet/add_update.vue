<template>
  <div>
    <el-form label-position="right" style="margin-left:100px;">
      <el-form-item label="照片：" label-width="100px">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/">
          <el-button type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="名字：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_247"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_249"></el-input>
      </el-form-item>
      <el-form-item label="状态：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_252"></el-input>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_258"></el-input>
      </el-form-item>
      <el-form-item label="种类：" label-width="100px">
        <el-select size="small" class="__p_C8_u_264">
          <el-option value="狗狗" label="狗狗"></el-option>
          <el-option value="猫咪" label="猫咪"></el-option>
          <el-option value="迷你猪" label="迷你猪"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_254"></el-input>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_262"></el-input>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px">
        <el-input type="textarea" :rows="3" class="__p_C8_u_267"></el-input>
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
    return {};
  },
  methods: {
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
