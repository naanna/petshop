<template>
  <div>
    <!-- <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>-->
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      v-if="fileList[0].url!=''"
      :options="{
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          type:'',
          src:fileList[0].url
        }],
        poster: '../../static/images/test.jpg', 
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
         controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true 
        }
      }"
    ></video-player>
    <el-upload
      :http-request="upload"
      :multiple="true"
      :show-file-list="false"
      action
      ref="upload"
      :on-change="onchange"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary" lot="trigger">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      fileList: [
        {
          src: ""
        }
      ],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src:
              "https://mmzdvideo.oss-cn-hangzhou.aliyuncs.com/mmzdsp1577521338930" //url地址
          }
        ],
        poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {},
  methods: {
    upload(file) {
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdvideo"
      });
      var fileName = "mmzdsp" + file.file.uid + ".mp4";
      client.put(fileName, file.file).then(result => {
        this.fileList[0] = {
          name: result.name,
          url: result.url
        };
        console.log("fileList", this.fileList);
        console.log(this.fileList[0]);
        console.log(this.fileList[0].url);
      });
    },
    beforeAvatarUpload(file) {
      const isMP4 = file.type === "video/mp4";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isMP4) {
        this.$message.error("请上传正确的mp4视频格式!");
        return false;
      }
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      // var reader = new FileReader();
      // const isJPG = file.type === "image/jpeg";
      // const isPNG = file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if ((isJPG && isLt2M) || (isPNG && isLt2M)) {
      //   //转base64
      //   reader.onload = function(e) {
      //     _this.imageUrl = e.target.result; //将图片路径赋值给src
      //   };
      // }
      // reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
</style>
