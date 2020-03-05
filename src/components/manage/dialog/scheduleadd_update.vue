<template>
  <div>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="日期：" label-width="100px" prop="day">
        <el-date-picker
          v-model="form.day"
          type="date"
          placeholder="选择日期"
          class="formlist"
          :disabled="edit"
          size="small"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动安排：" label-width="100px" prop="textarea">
        <el-input type="textarea" :rows="2" size="small" class="formlist" v-model="form.textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">保存</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkinput } from "@assets/validate.js";
export default {
  data() {
    var checkDay = (rule, value, callback) => {
      if (
        this.moment(value).valueOf() <
        this.moment()
          .startOf("day")
          .valueOf()
      ) {
        return callback(new Error("不能选择过去的日期"));
      }
      callback();
    };
    return {
      form: {
        day: "",
        textarea: ""
      },
      edit: false,
      rules: {
        day: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "日期不能为空"
          },
          {
            validator: checkDay,
            trigger: "blur",
            message: "不能选择过去的日期"
          }
        ],
        textarea: [
          {
            validator: checkinput,
            trigger: "blur",
            message: "活动安排不能为空"
          },
          { min: 1, max: 40, message: "长度在1到40个字符" }
        ]
      }
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      this.edit = true;
      this.form.day = this.DialogParams().row.day;
      this.form.textarea = this.DialogParams().row.textarea;
    }
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.edit) {
            this.axios
              .put("/api/schedule/update", {
                scheduleid: this.DialogParams().row.scheduleid,
                textarea: this.form.textarea
              })
              .then(res => {
                if (res.data.success) {
                  this.$message.success("编辑成功！");
                  this.closeDialog();
                }
              });
          } else {
            this.axios
              .post("/api/schedule/add", {
                username: this.$store.state.username,
                textarea: this.form.textarea,
                day: this.moment(this.form.day).format("YYYY-MM-DD")
              })
              .then(res => {
                if (res.data.success) {
                  this.$message.success("添加成功！");
                  this.closeDialog();
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
</style>
