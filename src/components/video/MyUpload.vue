<template>
  <div style="padding-left:100px;">
    <div class="step-box" v-if="stepActive===1">
      <el-steps :active="stepActive" simple>
        <el-step title="填写投稿信息"></el-step>
        <el-step title="投稿审核中"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div>
        <el-image
          class="step-picture"
          src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/jin.jpg"
        ></el-image>
      </div>
      <h3 class="step-title">稿件投递成功</h3>
      <el-divider></el-divider>
      <div style="text-align:center;">
        <el-button size="small" @click="goUrl">查看稿件</el-button>
        <el-button size="small" @click="goBack">再投一个</el-button>
      </div>
    </div>
    <div v-else>
      <div class="flex-center">
        <h1 class="title">文件上传</h1>
        <p class="title-info">（推荐采用mp4，可有效缩短审核转码耗时）</p>
      </div>
      <div>
        <el-upload
          class="upload-demo"
          v-if="progress===0&&again===0"
          drag
          :http-request="upload"
          :multiple="true"
          :show-file-list="false"
          action
          ref="upload"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将视频拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传mp4文件</div>
        </el-upload>
        <div v-else>
          <i class="el-icon-video-camera-solid title-icon"></i>
          <el-progress
            class="title-progress"
            v-if="progress===100"
            :percentage="progress"
            status="success"
          ></el-progress>
          <el-progress v-else class="title-progress" :percentage="progress"></el-progress>
        </div>
      </div>
      <div v-if="form.src!==''">
        <el-upload
          :http-request="upload"
          :multiple="true"
          :show-file-list="false"
          action
          ref="upload"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" lot="trigger">修改视频</el-button>
        </el-upload>
        <el-divider></el-divider>
        <h1 class="title">基本信息</h1>
        <el-form label-position="top" :model="form" :rules="rules" ref="form" class="video-form">
          <el-form-item
            label="封面（格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）"
            label-width="100px"
            prop="cover"
            class="video-picture"
          >
            <UploadImage class="formlist" @src="getSrc" :imageUrl="form.cover"></UploadImage>
          </el-form-item>
          <el-form-item label="类型：" label-width="100px" prop="type">
            <el-radio v-model="form.type" label="homemade">自制</el-radio>
            <el-radio v-model="form.type" label="reprinted">转载</el-radio>
          </el-form-item>
          <el-form-item label="标题：" label-width="100px" prop="title">
            <el-input
              type="text"
              size="small"
              class="formlist"
              v-model="form.title"
              placeholder="请输入视频标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="简介：" label-width="100px" prop="info">
            <el-input
              type="textarea"
              :rows="4"
              size="small"
              class="formlist"
              v-model="form.info"
              placeholder="填写更全面的相关信息，让更多的人能够找到你的视频吧！"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签：" label-width="100px" prop="tag" required>
            <div class="tagform">
              <el-tag
                v-for="(item,index) in form.tag"
                :key="index"
                closable
                class="tag"
                size="small"
                @close="handleClose(index)"
              >{{item}}</el-tag>
              <p class="tag-info">还可以添加{{count}}个标签</p>
            </div>
          </el-form-item>
          <el-form-item label="推荐标签" label-width="100px">
            <div class="formlist tag-list">
              <el-checkbox-group v-model="form.tag" size="mini" @change="goChange">
                <el-checkbox-button
                  v-for="(item,index) in tagList"
                  :key="index"
                  :label="item"
                >{{item}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
        <el-button size="small" type="primary" @click="goUpload" :disabled="disable">立即投稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImage from "@common/UploadImage.vue";
export default {
  components: {
    UploadImage
  },
  data() {
    var checkTagCount = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("至少选择一个标签！"));
      }
      callback();
    };
    return {
      updateId: "",
      edit: false,
      stepActive: 0,
      again: 0,
      progress: 0,
      count: 10,
      tagList: [
        "自制",
        "原创",
        "VLOG",
        "MV",
        "日常",
        "新人",
        "剪辑",
        "可爱",
        "特效",
        "汪星人",
        "喵星人",
        "猪星人",
        "铲屎官",
        "搞笑",
        "卖萌",
        "治愈"
      ],
      form: {
        title: "",
        type: "homemade",
        cover: "",
        info: "",
        tag: [],
        src: ""
      },
      disable: false,
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 50, message: "长度在1到50个字符" }
        ],
        cover: [{ required: true, message: "请选择封面图片", trigger: "blur" }],
        info: [{ min: 0, max: 250, message: "长度在0到250个字符" }],
        tag: [{ validator: checkTagCount, trigger: "blur" }]
      }
    };
  },
  created() {
    if (window.location.href.split("?").length > 1) {
      this.updateId = decodeURI(
        window.location.href.split("?")[1].split("=")[1]
      );
      this.again = 1;
      this.progress = 100;
      this.edit = true;
      this.getUpdate();
    }
  },
  methods: {
    getUpdate() {
      this.axios
        .get("/api/video/watch", {
          params: {
            videoId: this.updateId
          }
        })
        .then(res => {
          if (res.data.success) {
            let results = res.data.message;
            this.form.src = results.src;
            this.form.cover = results.cover;
            this.form.title = results.title;
            this.form.type = results.type;
            this.form.info = results.info;
            this.form.tag = results.tag.split(",");
          }
        });
    },
    goUpload() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.disable = true;
          this.form.username = this.$store.state.username;
          if (this.edit) {
            this.form.videoId = this.updateId;
            this.axios.put("/api/video/updatevideo", this.form).then(res => {
              if (res.data.success) {
                this.stepActive = 1;
              }
            });
          } else {
            this.axios.post("/api/video/addvideo", this.form).then(res => {
              if (res.data.success) {
                this.stepActive = 1;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //上传视频文件到阿里云OSS，并获取上传进度
    upload(file) {
      const that = this;
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdvideo"
      });
      const baseAli = "oss-cn-hangzhou.aliyuncs.com";
      async function multipartUpload() {
        let fileName = "mmzdsp" + file.file.uid + ".mp4";
        client
          .multipartUpload(fileName, file.file, {
            progress: function(p) {
              that.progress = Math.floor(p * 100);
            }
          })
          .then(result => {
            that.again = 1;
            that.form.src =
              "http://" + result.bucket + "." + baseAli + "/" + result.name;
          })
          .catch(err => {
            that.$message.error("上传视频失败!");
          });
      }
      multipartUpload();
    },
    beforeAvatarUpload(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt100M =
        file.size / 1024 / 1024 > 1 && file.size / 1024 / 1024 < 1024;
      if (!isMP4) {
        this.$message.error("请上传正确的mp4视频格式!");
        return false;
      }
      if (!isLt100M) {
        this.$message.error("上传视频大小要在1MB~1GB之间哦!");
        return false;
      }
    },
    getSrc(src) {
      this.form.cover = src;
      this.$refs.form.clearValidate("cover");
    },
    handleClose(index) {
      this.form.tag.splice(index, 1);
    },
    goChange() {
      if (this.form.tag.length > 10) {
        this.form.tag.splice(10, 1);
        this.$message.error("允许添加的标签已经达到上限了");
      } else {
        this.count = 10 - this.form.tag.length;
      }
      this.$refs.form.clearValidate("tag");
    },
    goUrl() {
      this.$router.push("/video/uploadManage");
    },
    goBack() {
      this.progress = 0;
      this.stepActive = 0;
      this.again = 0;
      this.disable = false;
      this.form = {
        title: "",
        type: "homemade",
        cover: "",
        info: "",
        tag: [],
        src: ""
      };
      this.stepActive = 0;
    }
  }
};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 20px;
  margin: 0;
  color: #222;
  margin-right: 10px;
  display: inline-block;
}
.title-info {
  display: inline-block;
  margin: 0;
  font-size: 12px;
  color: #666;
}
.title-icon {
  color: #75c0da;
  font-size: 28px;
}
.title-progress {
  display: inline-block;
  max-width: 400px;
  width: 100%;
  margin-left: 10px;
  margin-bottom: 20px;
}
.formlist {
  width: 400px;
}
.tag {
  margin-right: 10px;
}
.el-checkbox-button,
.el-checkbox-button__inner {
  margin-right: 10px;
}
.tag-list >>> .el-checkbox-button__inner {
  border: 1px solid #dcdfe6;
  border-radius: 4px !important;
}
.tag-list >>> .el-checkbox-button.is-checked .el-checkbox-button__inner {
  box-shadow: 0 0 0 0 #8cc5ff;
}
.tagform {
  width: 378px;
  border: 1px solid #dcdfe6;
  min-height: 32px;
  border-radius: 4px;
  padding: 0 10px;
}
.tag-info {
  font-size: 10px;
  color: #858585;
  margin: 0;
  cursor: default;
  text-align: right;
}
.el-form-item {
  margin-bottom: 10px;
}
.video-picture >>> .el-form-item__content {
  line-height: 0 !important;
}
.video-form >>> .el-form-item__label {
  padding-bottom: 0 !important;
}
.step-box {
  max-width: 600px;
  width: 100%;
}
.step-title {
  margin-top: 16px;
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
}
.step-picture {
  width: 200px;
  height: 300px;
  display: block;
  margin: 10px auto 0;
}
</style>

