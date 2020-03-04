<template>
  <div>
    <el-page-header @back="goBack"></el-page-header>
    <div class="bodyStyle">
      <el-row :gutter="40">
        <el-col :span="12" :xs="{span:24}" class="pictrueLeftDiv">
          <el-upload
            :http-request="upload"
            :multiple="true"
            :show-file-list="false"
            action
            ref="upload"
            class="uploadPic"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="seePicture" slot="trigger" />
            <i v-else class="el-icon-plus icon" slot="trigger"></i>
          </el-upload>
        </el-col>
        <el-col :span="12" :xs="{span:24}" class="pictrueRightDiv">
          <div class="lookPic">
            <img :src="showimageurl" class="picture" v-if="showimageurl" />
            <img
              v-else
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              class="picture"
            />
            <span class="spanStyle" v-if="!imageUrl">当前头像</span>
            <span class="spanStyle" v-else>预览头像</span>
          </div>
        </el-col>
      </el-row>
      <p class="pStyle">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
      <div class="button">
        <el-button type="primary" @click="goupdate">更新</el-button>
        <el-button @click="goclear">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changePic",
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
            id: this.$store.state.username
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
          text: "头像更新中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          this.axios
            .put("/api/updateuser/picture", {
              picture: this.showimageurl,
              username: this.$store.state.username
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
      client
        .put(fileName, file.file)
        .then(result => {
          this.imageUrl = result.url;
          this.showimageurl = result.url;
        })
        .catch(err => {
          this.$message.error("上传图片失败!");
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
.pictrueLeftDiv {
  text-align: right;
}
.pictrueRightDiv {
  text-align: left;
}
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 50px;
}
.seePicture {
  width: 212px;
  height: 212px;
}
.icon {
  font-size: 100px;
  width: 100px;
  padding: 50px;
  height: 100px;
}
.uploadPic {
  min-width: 212px;
  min-height: 212px;
  display: inline-block;
  border: 1px solid #e5e9ef;
  vertical-align: bottom;
}
.lookPic {
  min-width: 212px;
  min-height: 212px;
  vertical-align: bottom;
  display: inline-block;
  border: 1px solid #e5e9ef;
  text-align: center;
}
.button {
  margin-top: 40px;
  text-align: center;
}
.spanStyle {
  display: block;
  margin-top: 15px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
}
.pStyle {
  margin-top: 25px;
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
  text-align: center;
}
.bodyStyle {
  margin-top: 25px;
}
</style>
