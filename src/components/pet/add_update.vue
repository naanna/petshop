<template>
  <div>
    <el-form label-position="right" style="margin-left:100px;">
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
            v-if="imageUrl"
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
      <el-form-item label="名字：" label-width="100px">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" label-width="100px">
        <el-input type="text" size="small" class="formlist" v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px">
        <el-input type="text" size="small" class="formlist" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="种类：" label-width="100px">
        <el-select size="small" class="formlist" v-model="form.type">
          <el-option value="狗狗" label="狗狗"></el-option>
          <el-option value="猫咪" label="猫咪"></el-option>
          <el-option value="迷你猪" label="迷你猪"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种：" label-width="100px">
        <el-input type="text" size="small" class="formlist" v-model="form.variety"></el-input>
      </el-form-item>
      <el-form-item label="性别：" label-width="100px">
        <el-select size="small" class="formlist" v-model="form.sex">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px">
        <el-input type="textarea" :rows="3" class="formlist" v-model="form.note"></el-input>
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
        picture: "",
        name: "",
        age: "",
        price: "",
        type: "",
        variety: "",
        sex: "",
        note: ""
      },
      imageUrl: "",
      fileList: []
    };
  },
  methods: {
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
