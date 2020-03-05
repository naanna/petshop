<template>
  <div>
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane :label="`全部稿件(${tagNum.total})`" name="all"></el-tab-pane>
      <el-tab-pane :label="`审批中(${tagNum.no})`" name="no"></el-tab-pane>
      <el-tab-pane :label="`已通过(${tagNum.yes})`" name="yes"></el-tab-pane>
      <el-tab-pane :label="`未通过(${tagNum.refused})`" name="refused"></el-tab-pane>
    </el-tabs>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <el-card v-for="(item,index) in showTable" :key="index" class="video-list-box" shadow="hover">
        <div style="display:flex; align-items:center;">
          <el-image class="video-list-picture" :src="item.cover" fit="contain"></el-image>
          <div class="video-list-info">
            <el-link
              v-if="item.status=='yes'"
              :href="`/video/${item.videoid}`"
              class="video-list-title"
              target="_blank"
              :title="item.title"
            >{{item.title}}</el-link>
            <span v-else class="video-list-title" :title="item.title">{{item.title}}</span>
            <div class="video-list-time">
              {{item.uploadtime}}
              <div class="video-list-icon">
                <i class="el-icon-arrow-down" style="margin-right:5px;"></i>
                <span v-if="item.status=='no'">审核中</span>
                <span v-else-if="item.status=='yes'">已通过</span>
                <span v-else>未通过</span>
              </div>
            </div>
            <div class="video-list-count" title="播放">
              <i class="el-icon-video-play"></i>
              {{item.count}}
            </div>
          </div>
          <div class="video-list-button">
            <el-button plain size="small" @click="goUrl(item)" v-if="item.status=='no'">编辑</el-button>
            <el-button plain size="small" @click="goDetail(item)">详情</el-button>
            <el-button type="primary" plain size="small" @click="goDel(item)">删除</el-button>
          </div>
        </div>
      </el-card>
    </ul>
    <p class="textclass1" v-if="loading">加载中...</p>
    <p class="textclass1" v-else>没有更多了</p>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import Detail from "@components/manage/dialog/video_detail.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      active: "all",
      fileList: [],
      showTable: [],
      no: 1,
      size: 10,
      loading: false,
      stop: false,
      tagNum: {}
    };
  },
  created() {
    this.goQuery("all");
  },
  computed: {
    disabled() {
      return this.loading;
    }
  },
  methods: {
    goQuery(type) {
      this.axios
        .get("/api/video/getmyself", {
          params: {
            userName: this.$store.state.username,
            type: type
          }
        })
        .then(res => {
          if (res.data.success) {
            let results = res.data;
            this.fileList = results.message;
            this.tagNum = results.tagnum;
            this.fileList.forEach(item => {
              item.uploadtime = this.moment(item.uploadtime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            for (let i = 0; i < this.size; i++) {
              if (this.fileList[i] != undefined)
                this.showTable.push(this.fileList[i]);
            }
          }
        });
    },
    handleClick(tab, event) {
      this.showTable = [];
      this.goQuery(tab.name);
    },
    goDel(item) {
      this.$confirm("确认删除此视频吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/video/delete", {
              data: { videoId: item.videoid }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goUrl(item) {
      this.$router.push("/video/myUpload?vedioid=" + item.videoid);
    },
    //懒加载获取数据
    load() {
      this.loading = true;
      setTimeout(() => {
        for (let i = 0; i < this.size; i++) {
          if (this.fileList[i + this.size * this.no] == undefined)
            this.stop = true;
          else this.showTable.push(this.fileList[i + this.size * this.no]);
        }
        this.no = this.no + 1;
        this.loading = false;
      }, 2000);
    },
    goDetail(row) {
      this.Dialog.title("投稿视频详情")
        .width("600px")
        .currentView(Detail, { row })
        .then(data => {})
        .show();
    }
  }
};
</script>

<style scoped>
.video-list-box {
  margin-bottom: 20px;
  min-width: 700px;
}
.video-list-picture {
  width: 100px;
  height: 100px;
  flex: 1;
  cursor: pointer;
}
.video-list-info {
  display: flex;
  flex-direction: column;
  flex: 3;
}
.video-list-title {
  display: inline-block;
  max-width: 420px;
  font-size: 18px;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-list-time {
  display: inline-block;
  color: #99a2aa;
  font-weight: 400;
  font-size: 12px;
  vertical-align: middle;
  margin: 10px 0;
}
.video-list-count {
  font-size: 12px;
  color: #99a2aa;
}
.video-list-button {
  flex: 1;
}
.video-list-icon {
  color: #00a1d6;
  display: inline-block;
  margin-left: 10px;
}
.textclass1 {
  font-size: 18px;
  text-align: center;
  font-family: "jelly";
}
</style>
