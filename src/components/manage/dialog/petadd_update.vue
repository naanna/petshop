<template>
  <div>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="照片：" label-width="100px">
        <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
      </el-form-item>
      <el-form-item label="名字：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日：" label-width="100px" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" class="formlist" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px" prop="price">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model.number="form.price"
          oninput="if(value.length>10)value=value.slice(0,10)"
        ></el-input>
      </el-form-item>
      <el-form-item label="种类：" label-width="100px" prop="type">
        <el-select size="small" class="formlist" v-model="form.type">
          <el-option value="dog" label="狗狗"></el-option>
          <el-option value="cat" label="猫咪"></el-option>
          <el-option value="pig" label="小香猪"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种：" label-width="100px" prop="variety">
        <el-input type="text" size="small" class="formlist" v-model="form.variety"></el-input>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px" prop="sex">
        <el-select size="small" class="formlist" v-model="form.sex">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px" prop="note">
        <el-input type="textarea" :rows="3" class="formlist" v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">保存</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkname, checkinput } from "@assets/validate.js";
import UploadImage from "@common/UploadImage.vue";
export default {
  components: {
    UploadImage
  },
  data() {
    var checkBirthday = (rule, value, callback) => {
      if (
        this.moment(value).valueOf() >
        this.moment()
          .startOf("day")
          .valueOf()
      ) {
        return callback(new Error("生日必须大于当天"));
      }
      callback();
    };
    return {
      form: {
        picture: "",
        name: "",
        birthday: "",
        price: "",
        type: "cat",
        variety: "",
        sex: "女",
        note: ""
      },
      imageUrl: "",
      edit: false,
      rules: {
        name: [
          { validator: checkname, types: "名字" },
          { min: 1, max: 5, message: "长度在1到5个字符" }
        ],
        birthday: [
          { validator: checkinput, trigger: "blur", message: "生日不能为空" },
          {
            validator: checkBirthday,
            trigger: "blur",
            message: "生日必须大于当天"
          }
        ],
        price: [{ type: "number", message: "价格必须为数字值" }],
        variety: [
          { validator: checkname, types: "种类" },
          { min: 1, max: 10, message: "长度在1到10个字符" }
        ],
        note: [{ min: 0, max: 300, message: "长度在0到300个字符" }]
      }
    };
  },
  mounted() {
    this.form.status = "saling";
    if (this.DialogParams().row) {
      let obs = this.DialogParams().row;
      this.form = obs;
      if (obs.picture != null) this.imageUrl = obs.picture;
      this.edit = true;
    }
    if (this.DialogParams().pet) {
      this.form.status = "caring";
      if (!this.DialogParams().pet.pet) {
        this.form = this.DialogParams().pet;
        this.imageUrl = this.DialogParams().pet.picture;
      }
    }
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.birthday = this.moment(this.form.birthday).format(
            "YYYY-MM-DD"
          );
          if (this.form.status == "caring" && !this.edit) {
            this.closeDialog(this.form);
          } else if (this.form.picture == "") {
            this.$message.warning("请选择图片！");
          } else {
            if (this.edit) {
              this.axios.put("/api/pet/update", this.form).then(res => {
                if (res.data.success) {
                  this.$message.success("编辑成功！");
                  this.closeDialog();
                }
              });
            } else {
              this.axios.post("/api/pet/add", this.form).then(res => {
                if (res.data.success) {
                  this.$message.success("添加成功！");
                  this.closeDialog();
                }
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    getSrc(src) {
      this.form.picture = src;
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
</style>
