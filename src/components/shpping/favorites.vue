<template>
  <div>
    <span class="fontclass">我的收藏夹</span>
    <div class="infinite-list-wrapper" style="overflow:auto;max-height: 630px;">
      <el-row v-infinite-scroll="load">
        <el-col :span="4" v-for="(item, index) in count" :key="index">
          <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
            <el-image
              class="image"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            ></el-image>
            <p class="textclass">狗狗吃的狗粮</p>
            <p class="textclass">¥100</p>
          </el-card>
        </el-col>
      </el-row>
      <p class="textclass" v-if="loading">加载中...</p>
      <p class="textclass" v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "favorites",
  data() {
    return {
      count: 10,
      loading: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
.card {
  margin-right: 40px;
  margin-top: 40px;
}

.textclass {
  text-align: center;
}
</style>
