<template>
  <div>
    <el-page-header @back="goBack"></el-page-header>
    <div class="boderclass">
      <el-upload
        action="123"
        ref="upload"
        class="uploadpic"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-change="onchange"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="seepicture" slot="trigger" />
        <i v-else class="el-icon-plus icnoclass" slot="trigger"></i>
      </el-upload>
      <div class="lookpic">
        <img src="@picture/touxiang.jpg" class="pictureclass" />
      </div>
      <el-button type="primary" class="buttonclass">更新</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "changepic",
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
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
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      console.log(_this.imageUrl);
      reader.readAsDataURL(file);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.pictureclass {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 50px;
}
.seepicture {
  width: 212px;
  height: 212px;
}
.icnoclass {
  font-size: 100px;
  width: 100px;
  padding: 50px;
  height: 100px;
}
.boderclass {
  padding: 100px 400px;
}
.uploadpic {
  width: 212px;
  height: 212px;
  display: inline-block;
  border: 1px solid #e5e9ef;
  vertical-align: bottom;
}
.lookpic {
  width: 212px;
  vertical-align: bottom;
  height: 212px;
  margin-left: 50px;
  display: inline-block;
  border: 1px solid #e5e9ef;
}
.buttonclass {
  margin-top: 40px;
  margin-left: 200px;
}
</style>
