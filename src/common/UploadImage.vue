
<template>
  <div>
    <el-upload
      :http-request="upload"
      :multiple="true"
      :show-file-list="false"
      action
      ref="upload"
      :before-upload="beforeAvatarUpload"
    >
      <el-avatar
        shape="square"
        v-if="image&&image!='null'"
        :src="image"
        class="seePicture"
        slot="trigger"
      ></el-avatar>
      <el-avatar
        shape="square"
        v-else-if="imageUrl&&imageUrl!='null'"
        :src="imageUrl"
        class="seePicture"
        slot="trigger"
      ></el-avatar>
      <el-avatar
        shape="square"
        src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/choose.png"
        class="seePicture"
        slot="trigger"
        v-else
      ></el-avatar>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String
    }
  },
  name: "UploadImage",
  data() {
    return {
      image: ""
    };
  },
  methods: {
    //用自己方法覆盖默认上传行为，不需要利用默认钩子函数
    upload(file) {
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdpicture"
      });
      var fileName = "mmzdtx" + file.file.uid;
      client
        .put(fileName, file.file)
        .then(result => {
          this.image = result.url;
          this.$emit("src", result.url);
        })
        .catch(err => {
          this.$message.error("上传图片失败!");
        });
    },
    //上传图片前检验图片格式
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG和PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
    }
  }
};
</script>
<style>
.seePicture {
  width: 150px;
  height: 150px;
}
.seePicture img {
  width: 100%;
  height: 100%;
}
</style>
