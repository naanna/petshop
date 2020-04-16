<template>
  <div>
    <p class="ruleclass">视 频 圈</p>
    <div class="button">
      <el-popover placement="bottom" width="150" trigger="hover">
        <el-row>
          <el-col :span="12" class="center">
            <div @click="goUrl('myUpload')">
              <i class="el-icon-video-camera-solid icon"></i>
              <span class="icontitle">视频投稿</span>
            </div>
          </el-col>
          <el-col :span="12" class="center">
            <div @click="goUrl('uploadManage')">
              <i class="el-icon-s-tools icon"></i>
              <span class="icontitle">投稿管理</span>
            </div>
          </el-col>
        </el-row>
        <el-button slot="reference" type="info" plain size="small">投稿</el-button>
      </el-popover>
    </div>
    <el-row :gutter="20" v-if="fileList.length!=0">
      <el-col
        :span="8"
        :xs="{span:24}"
        v-for="(item,index) in fileList"
        class="videoshow"
        :key="index"
      >
        <div @click="goWatch(item)">
          <div class="videobox">
            <video
              class="video-box"
              :poster="item.cover"
              width="100%"
              :id="item.videoid"
              :src="item.src"
            ></video>
            <div class="videomask">
              <i class="el-icon-video-play videoicon"></i>
              <span class="time">{{item.length}}</span>
            </div>
          </div>
          <div>
            <p class="videotitle" :title="item.title">{{item.title}}</p>
            <el-row class="number">
              <el-col :span="12">
                <i class="el-icon-user" style="margin-right:5px;"></i>
                <span>{{item.nickname}}</span>
              </el-col>
              <el-col :span="12">
                <i class="el-icon-view" style="margin-right:5px;"></i>
                <span>{{item.count}}</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-card class="box-card video-card-box" v-else>
      <div slot="header" class="clearfix">
        <span>告示</span>
      </div>
      <p>暂无可看视频</p>
    </el-card>
    <el-pagination
      @current-change="currentChangeHandle"
      :current-page.sync="page_no"
      :page-size="6"
      layout="total,  prev, pager, next, jumper"
      class="fyclass"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import Util from "@assets/Util.js";
export default {
  data() {
    return {
      total: 0,
      page_no: 1,
      fileList: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goQuery() {
      let query = {};
      query.page_no = this.page_no;
      query.page_size = 6;
      query.type = "watch";
      this.axios
        .get("/api/video/getvideo", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.fileList = results.message;
            this.total = results.total;
            setTimeout(() => {
              this.getTime();
            }, 500);
          }
        });
    },
    goUpload() {},
    //获取视频长度--需要配合定时器
    getTime() {
      this.fileList.forEach(item => {
        this.$set(
          item,
          "length",
          Util.countTime(document.getElementById(item.videoid).duration)
        );
      });
    },
    goUrl(url) {
      window.open("/video/" + url);
    },
    goWatch(item) {
      window.open("/video/" + item.videoid);
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
    }
  }
};
</script>

<style scoped>
.ruleclass {
  background: linear-gradient(to right, #e0c3fc, #8ec5fc);
  -webkit-background-clip: text;
  text-align: center;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "华文行楷";
  color: transparent;
}
.videoshow {
  position: relative;
  margin-top: 5px;
  cursor: pointer;
}
.videotitle {
  margin: 0;
  padding-top: 8px;
  width: 100%;
  height: 40px;
  color: #222;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.number {
  display: block;
  background: white;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: #99a2aa;
  transition: transform 0.5s;
  transform: scaleY(1);
  transform-origin: 0 0;
}
.videoshow:hover .number {
  transform: scaleY(0);
  transform-origin: 100% 100%;
}
.videoshow:hover .videotitle {
  color: #00a1d6;
}
.button {
  text-align: right;
  margin-bottom: 10px;
}
.icon {
  display: block;
  font-size: 24px;
}
.center {
  text-align: center;
}
.icontitle {
  font-size: 12px;
}
.center:hover {
  cursor: pointer;
  color: #00a1d6;
}
.videobox {
  position: relative;
}
.videomask {
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.3s;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.videoshow:hover .videomask {
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.time {
  position: absolute;
  color: white;
  bottom: 2px;
  left: 10px;
}
.videoicon {
  font-size: 60px;
  color: white;
}
.videoshow:hover .videoicon {
  opacity: 1;
}
.video-card-box {
  width: 300px;
  text-align: center;
  margin: 50px auto;
}
.video-box {
  height: 230px;
}
</style>
