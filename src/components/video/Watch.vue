<template>
  <div>
    <div class="video-box">
      <p class="video-title" :title="file.title">
        <i class="el-icon-video-camera"></i>
        {{file.title}}
      </p>
      <p class="video-data">{{file.uploadtime}}</p>
      <p class="video-data">
        <span style="margin-right:20px;">{{file.count+1}}播放</span>
        <i class="el-icon-error" style="margin-right:5px;color:#00a1d6;"></i>
        <span v-if="file.type=='homemade'">未经作者授权，禁止转载</span>
        <span v-else>本视频由投稿者转载</span>
      </p>
      <video
        class="video"
        :poster="file.cover"
        width="100%"
        controls
        :id="file.videoid"
        :src="file.src"
        @ended="endVideo"
      ></video>
      <div>
        <el-popover placement="top-start" trigger="hover">
          <div class="video-introduction-head">
            <el-avatar :size="50" :src="file.picture"></el-avatar>
            <div style="align-self: center">
              <span class="video-username">{{file.nickname}}</span>
              <img src="@picture/vip1.png" class="video-introduction-icon" v-if="file.level=='vip'" />
              <img
                src="@picture/vip2.png"
                class="video-introduction-icon"
                v-else-if="file.level=='vip2'"
              />
              <img
                src="@picture/vip3.png"
                class="video-introduction-icon"
                v-else-if="file.level=='vip3'"
              />
              <img src="@picture/svip.png" class="video-introduction-svipicon" v-else />
            </div>
          </div>
          <div class="video-introduction-head" slot="reference">
            <el-avatar :size="50" :src="file.picture"></el-avatar>
            <span class="video-username">{{file.nickname}}</span>
          </div>
        </el-popover>
        <div class="video-introduction">{{file.info}}</div>
        <div>
          <el-tag
            size="mini"
            class="video-tag"
            v-for="(item,index) in tagList"
            :key="index"
          >{{item}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [],
      file: {}
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goQuery() {
      this.axios
        .get("/api/video/watch", {
          params: {
            videoId: this.$route.params.id
          }
        })
        .then(res => {
          if (res.data.success) {
            let results = res.data;
            this.file = results.message;
            this.file.uploadtime = this.moment(this.file.uploadtime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            this.tagList = results.message.tag.split(",");
          }
        });
    },
    endVideo() {
      this.axios
        .put("/api/video/addwatch", {
          videoId: this.$route.params.id
        })
        .then(res => {});
    }
  }
};
</script>

<style scoped>
.video-box {
  min-width: 500px;
  width: 65%;
  margin: 0 auto;
}
.video-title {
  margin: 0;
  font-size: 18px;
  color: #212121;
  line-height: 26px;
  height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-data {
  margin-bottom: 0;
  font-size: 12px;
  height: 16px;
  color: #999;
}
.video {
  margin-top: 20px;
}
.video-introduction-head {
  display: flex;
  cursor: pointer;
}
.video-username {
  color: #636e72;
  align-self: center;
  margin-left: 10px;
}
.video-introduction {
  white-space: pre-line;
  font-size: 12px;
  color: #212121;
  letter-spacing: 0;
  line-height: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.video-introduction-icon {
  height: 20px;
  display: block;
}
.video-tag {
  margin-right: 10px;
}
.video-introduction-svipicon {
  margin-left: 10px;
  height: 30px;
  display: block;
}
.el-avatar >>> img {
  width: 100% !important;
}
</style>
