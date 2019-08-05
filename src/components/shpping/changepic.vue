<template>
  <div>
    <el-page-header @back="goBack"></el-page-header>
    <div class="boderclass">
      <el-upload
        :http-request="upload"
        :multiple="true"
        :show-file-list="false"
        action
        ref="upload"
        class="uploadpic"
        :on-change="onchange"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="seepicture" slot="trigger" />
        <i v-else class="el-icon-plus icnoclass" slot="trigger"></i>
      </el-upload>
      <div class="lookpic">
        <img :src="showimageurl" class="pictureclass" v-if="showimageurl" />
        <img
          v-else
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          class="pictureclass"
        />
        <span class="spandiv" v-if="!imageUrl">当前头像</span>
        <span class="spandiv" v-else>预览头像</span>
      </div>
      <p class="pdiv">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
      <div class="buttonclass">
        <el-button type="primary" @click="goupdate">更新</el-button>
        <el-button @click="goclear">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changepic",
  data() {
    return {
      imageUrl: "",
      fileList: [],
      showimageurl: "",
      old: ""
    };
  },
  created() {
    this.getpicture();
  },
  methods: {
    getpicture() {
      this.axios
        .get("/api/getuser", {
          params: {
            id: this.User.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.showimageurl = results.picture;
            this.old = results.picture;
          }
        });
    },
    goupdate() {
      if (this.imageUrl) {
        const loading = this.$loading({
          lock: true,
          text: "头像修改中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          this.showimageurl = this.fileList[0].url;
          this.axios
            .post("/api/updateuser/picture", {
              picture: this.showimageurl,
              username: this.User.username
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("修改头像成功！");
                this.imageUrl = "";
                this.getpicture();
                loading.close();
              }
            });
        }, 4000);
      } else {
        this.$message.warning("请选择头像！");
      }
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
          _this.showimageurl = e.target.result;
        };
      }
      reader.readAsDataURL(file);
    },
    goclear() {
      this.showimageurl = this.old;
      this.imageUrl = "";
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
  margin-top: 50px;
  margin-left: 50px;
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
  margin-left: 150px;
}
.spandiv {
  display: block;
  margin-top: 15px;
  margin-left: 75px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
}
.pdiv {
  margin-top: 25px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
}
</style>
