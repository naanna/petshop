<template>
  <div>
    <div class="picclass">
      <el-avatar :size="120" :src="form.picture"></el-avatar>
    </div>
    <p class="nameclass">{{form.name}}</p>
    <div class="info">
      <span>{{form.variety}}</span>
      <span>{{form.age}}</span>
    </div>
    <div class="info2">
      <span>我在这里</span>
      <span>{{days}}</span>
      <span>啦！</span>
    </div>
    <p class="info2">主人的留言</p>
    <el-input
      type="textarea"
      size="small"
      class="textarea"
      :rows="3"
      :readonly="true"
      v-model="form.note"
    ></el-input>
    <div class="button">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import Util from "@assets/Util.js";
import add from "../manage/dialog/petadd_update";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      form: "",
      days: ""
    };
  },
  mounted() {
    if (this.rjDialogParams().row) {
      let obs = this.rjDialogParams().row;
      this.form = obs;
      this.goquery();
    }
  },
  methods: {
    goquery() {
      this.axios
        .get("/api/getcaretable/starttime", {
          params: {
            petid: this.form.petid
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            var now = this.moment(this.moment(new Date()).format("YYYY-MM-DD"));
            this.days = Util.displayAge(results.message, now);
          }
        });
    },
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
.info {
  display: flex;
  margin-top: 15px;
  justify-content: space-around;
  font-size: 20px;
  font-family: "jelly";
  color: rgb(236, 37, 137);
}
.info2 {
  margin-left: 90px;
  margin-top: 15px;
  font-size: 20px;
  font-family: "jelly";
  color: rgb(236, 37, 137);
}
.button {
  margin-top: 15px;
  text-align: center;
}

.pictureclass {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.picclass {
  text-align: center;
}
.nameclass {
  font-size: 25px;
  font-family: "jelly";
  margin-bottom: 10px;
  text-align: center;
}
.el-avatar >>> img {
  width: 100% !important;
}
.textarea >>> .el-textarea__inner {
  font-family: "jelly" !important;
  font-size: 20px !important;
  width: 250px;
  margin-left: 85px;
}
</style>
