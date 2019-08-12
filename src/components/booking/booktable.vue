<template>
  <div>
    <p class="title">代售申请</p>
    <el-form label-position="right" style="margin-left:100px;" :model="form" ref="form">
      <el-form-item label="宠物信息：" label-width="100px" prop="name">
        <el-button size="small" @click="goadd" v-if="pet.pet">添加宠物</el-button>
        <el-button size="small" @click="goadd" v-else>编辑宠物</el-button>
        <el-popover placement="right" width="400" trigger="click">
          <el-form label-position="right">
            <el-form-item label="名字：" label-width="100px" prop="name">
              <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="pet.name"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="生日：" label-width="100px" prop="birthday">
              <el-date-picker
                v-model="pet.birthday"
                type="date"
                class="formlist"
                size="small"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="价格：" label-width="100px" prop="price">
              <el-input
                type="text"
                size="small"
                class="formlist"
                v-model.number="pet.price"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="种类：" label-width="100px" prop="type">
              <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="pet.type"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="品种：" label-width="100px" prop="variety">
              <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="pet.variety"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别：" label-width="100px" prop="sex">
              <el-input
                type="text"
                size="small"
                class="formlist"
                v-model="pet.sex"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" label-width="100px" prop="note">
              <el-input
                type="textarea"
                :rows="3"
                class="formlist"
                v-model="pet.note"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-form>
          <i class="header-icon el-icon-view icon" slot="reference"></i>
        </el-popover>
      </el-form-item>
      <el-form-item label="申请者：" label-width="100px">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model="form.username"
          :disabled="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button type="primary" size="small" @click="gosave">提交</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import add_update from "../manage/dialog/petadd_update.vue";
export default {
  components: {
    rjDialog
  },
  name: "booktable",
  data() {
    return {
      form: {
        username: ""
      },
      pet: { pet: true }
    };
  },
  created() {
    this.form.starttime = this.moment(new Date()).format("YYYY-MM-DD");
    this.form.username = this.User.username;
  },
  methods: {
    gosave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/addpet", this.pet)
            .then(res => {
              if (res.data.success) {
                this.form.petid = res.data.petid;
                return this.axios.post("/api/addcaretable", this.form);
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("成功提交寄养申请！");
                this.closeRjDialog && this.closeRjDialog();
              }
            });
        } else {
          return false;
        }
      });
    },
    goadd() {
      var pet = this.pet;
      this.rjDialog
        .title("我要寄养")
        .width("800px")
        .currentView(add_update, { pet })
        .showClose(true)
        .sizeTiny()
        .then(opt => {
          if (opt) {
            this.pet = opt;
          }
        })
        .show();
    },
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.seepicture {
  width: 150px;
  height: 150px;
}
.title {
  text-align: center;
  font-size: 25px;
  margin-top: 0px;
}
.formlist {
  width: 250px;
}
.button {
  text-align: center;
}
.icon {
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
