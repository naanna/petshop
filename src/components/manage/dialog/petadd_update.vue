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
        <el-upload
          :http-request="upload"
          :multiple="true"
          :show-file-list="false"
          action
          ref="upload"
          :on-change="onchange"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar
            shape="square"
            v-if="imageUrl&&imageUrl!='null'"
            :src="imageUrl"
            class="seepicture"
            slot="trigger"
          ></el-avatar>
          <el-avatar
            shape="square"
            src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/choose.png"
            class="seepicture"
            slot="trigger"
            v-else
          ></el-avatar>
        </el-upload>
      </el-form-item>
      <el-form-item label="名字：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日：" label-width="100px" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" class="formlist" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px" prop="price">
        <el-input type="text" size="small" class="formlist" v-model.number="form.price"></el-input>
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
    <div class="__p_C8_u_268">
      <el-button type="primary" size="small" @click="goadd">添加</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkname, checkinput } from "@assets/validate.js";
export default {
  name: "add_update",
  data() {
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
      fileList: [],
      edit: "no",
      rules: {
        name: [
          { validator: checkname, types: "名字" },
          { min: 1, max: 5, message: "长度在1到5个字符" }
        ],
        birthday: [
          { validator: checkinput, trigger: "blur", message: "生日不能为空" }
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
    if (this.rjDialogParams().row) {
      let obs = this.rjDialogParams().row;
      this.form = obs;
      if (obs.picture != null) this.imageUrl = obs.picture;
      this.edit = "yes";
    }
  },
  methods: {
    goadd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.birthday = this.moment(this.form.birthday).format(
            "YYYY-MM-DD"
          );
          this.form.status = "saling";
          if (this.fileList.length == 0) this.form.picture = null;
          else this.form.picture = this.fileList[0].url;
          if (this.edit == "no") {
            this.axios.post("/api/addpet", this.form).then(res => {
              if (res.data.success) {
                this.$message.success("成功添加宠物！");
                this.closeRjDialog && this.closeRjDialog();
              }
            });
          } else {
            this.axios.post("/api/updatepet", this.form).then(res => {
              if (res.data.success) {
                this.$message.success("成功编辑宠物！");
                this.closeRjDialog && this.closeRjDialog();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    upload(file) {
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdpicture"
      });
      var fileName = "mmzdtx" + file.file.uid;
      client.put(fileName, file.file).then(result => {
        this.fileList[0] = {
          name: result.name,
          url: result.url
        };
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if ((isJPG && isLt2M) || (isPNG && isLt2M)) {
        //转base64
        reader.onload = function(e) {
          _this.imageUrl = e.target.result; //将图片路径赋值给src
        };
      }
      reader.readAsDataURL(file);
    },
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.seepicture {
  width: 100px;
  height: 100px;
}
.formlist {
  width: 250px;
}

.__p_C8_u_268 {
  text-align: center;
}
</style>
