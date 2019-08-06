<template>
  <div>
    <div class="__p_C8_u_268">
      <el-image class="pictureclass" :src="url" :preview-src-list="arr"></el-image>
    </div>
    <p class="__p_C8_u_268">粥粥</p>
    <div class="info">
      <span>布偶</span>
      <span>一岁</span>
    </div>
    <div class="info2">
      <span>我在这里</span>
      <span>5</span>
      <span>天啦！</span>
    </div>
    <p class="info2">主人的留言</p>
    <el-input
      type="textarea"
      size="small"
      class="__p_C8_u_252"
      :rows="3"
      :readonly="true"
      v-model="text"
    ></el-input>
    <div class="buttonclass">
      <el-button size="small" @click="goclose">关闭</el-button>
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
    return {
      text: "123132",
      arr: [],
      url: "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/mmzdtx1565004868180"
    };
  },
  created() {
    this.arr = [this.url];
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
.__p_C8_u_252 {
  width: 250px;
  margin-left: 85px;
}
.info {
  display: flex;
  margin-top: 15px;
  justify-content: space-around;
}
.info2 {
  margin-left: 90px;
  margin-top: 15px;
}
.__p_C8_u_268 {
  text-align: center;
}

.buttonclass {
  margin-top: 20px;
  text-align: center;
}
.pictureclass {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
