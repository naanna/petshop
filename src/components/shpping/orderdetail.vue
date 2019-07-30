<template>
  <div>
    <el-form label-position="right" class="__p_2364_uid_245">
      <el-form-item label="订单号：" label-width="300px" class="__p_2364_uid_246">
        <el-input type="text" size="small" class="__p_2364_uid_247"></el-input>
      </el-form-item>
      <el-form-item label="订单者：" label-width="300px" class="__p_2364_uid_248">
        <el-input type="text" size="small" class="__p_2364_uid_249"></el-input>
      </el-form-item>
      <el-form-item label="订单类型：" label-width="300px" class="__p_2364_uid_251">
        <el-input type="text" size="small" class="__p_2364_uid_252"></el-input>
      </el-form-item>
      <el-form-item label="价格：" label-width="300px" class="__p_2364_uid_257">
        <el-input type="text" size="small" class="__p_2364_uid_258"></el-input>
      </el-form-item>
      <el-form-item label="订单日期：" label-width="300px" class="__p_2364_uid_259">
        <el-date-picker format="yyyy-MM-dd" class="__p_2364_uid_263"></el-date-picker>
      </el-form-item>
      <el-form-item label="宠物种类：" label-width="300px" class="__p_2364_uid_253">
        <el-input type="text" size="small" class="__p_2364_uid_254"></el-input>
      </el-form-item>
      <el-form-item label="宠物名字：" label-width="300px" class="__p_2364_uid_261">
        <el-input type="text" size="small" class="__p_2364_uid_262"></el-input>
      </el-form-item>
    </el-form>
    <div class="__p_2362_uid_214">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderdetail",
  methods: {
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.__p_2364_uid_247 {
  width: 250px;
}

.__p_2364_uid_246 {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0;
}

.__p_2364_uid_249 {
  width: 250px;
}

.__p_2364_uid_248 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_252 {
  width: 250px;
}

.__p_2364_uid_251 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_258 {
  width: 250px;
}

.__p_2364_uid_257 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_263 {
  width: 250px;
}

.__p_2364_uid_259 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_254 {
  width: 250px;
}

.__p_2364_uid_253 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_262 {
  width: 250px;
}

.__p_2364_uid_261 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2364_uid_245 {
  background: #ffffff;
}
.__p_2362_uid_214 {
  text-align: center;
  padding-top: 20px;
}
</style>
