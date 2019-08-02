<template>
  <div>
    <el-form label-position="right" style="margin-left:100px;">
      <el-form-item label="寄养时长：" label-width="100px">
        <el-input type="text" size="small" class="__p_C8_u_252"></el-input>
        <span style="margin-left:10px;">天</span>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px">
        <el-input type="textarea" size="small" class="__p_C8_u_252" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label label-width="100px">
        <el-button type="text" size="small" @click="goadd">添加宠物</el-button>
      </el-form-item>
    </el-form>
    <div class="__p_C8_u_268">
      <el-button type="primary" size="small">添加</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import add from "../pet/add_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {};
  },
  methods: {
    goadd() {
      this.rjDialog
        .title("添加宠物")
        .width("800px")
        .currentView(add, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
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
