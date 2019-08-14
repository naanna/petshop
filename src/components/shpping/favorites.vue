<template>
  <div>
    <span class="fontclass">我的收藏夹</span>
    <el-scrollbar style="height:100%;">
      <el-row v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-col :span="4" v-for="(item, index) in count" :key="index">
          <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
            <el-image
              class="image"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            ></el-image>
            <p class="textclass">狗狗吃的狗粮</p>
            <p class="textclass">¥100</p>
            <el-button size="mini" class="button">加入购物车</el-button>
          </el-card>
        </el-col>
      </el-row>
      <p class="textclass1" v-if="loading">加载中...</p>
      <p class="textclass1" v-if="noMore">没有更多了</p>
    </el-scrollbar>
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
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
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
.textclass1 {
  font-size: 18px;
  text-align: center;
  font-family: "jelly";
}
.button {
  float: right;
  margin: 0 10px 10px 0;
}
</style>
