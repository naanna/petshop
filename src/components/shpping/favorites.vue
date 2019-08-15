<template>
  <div>
    <span class="fontclass">我的收藏夹</span>
    <el-scrollbar style="height:100%;">
      <el-row v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-col :span="4" v-for="(item, index) in showtable" :key="index">
          <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
            <el-image class="image" :src="item.picture"></el-image>
            <p class="textclass2">{{item.name}}</p>
            <p class="textclass">¥{{item.price}}</p>
            <el-button size="mini" class="button" @click="goadd(item)">加入购物车</el-button>
          </el-card>
        </el-col>
      </el-row>
      <p class="textclass1" v-if="loading">加载中...</p>
      <p class="textclass1" v-if="noMore">没有更多了</p>
    </el-scrollbar>
  </div>
</template>

<script>
import Util from "@assets/Util.js";
export default {
  name: "favorites",
  data() {
    return {
      count: 10,
      loading: false,
      tabledata: [],
      no: 1,
      size: 12,
      showtable: [],
      stop: false
    };
  },
  computed: {
    noMore() {
      return this.stop;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.getfavorites();
  },
  methods: {
    getfavorites() {
      this.axios
        .get("/api/getcollect", {
          params: {
            username: this.User.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.tabledata = results.sort(Util.objSort("collectid"));
            for (let i = 0; i < this.size; i++) {
              if (this.tabledata[i] != undefined)
                this.showtable.push(this.tabledata[i]);
            }
          }
        });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        for (let i = 0; i < this.size; i++) {
          if (this.tabledata[i + this.size * this.no] == undefined)
            this.stop = true;
          else this.showtable.push(this.tabledata[i + this.size * this.no]);
        }
        this.no = this.no + 1;
        this.loading = false;
      }, 2000);
    },
    goadd(row) {
      let id = {};
      if (row.petid) id.petid = row.petid;
      if (row.goodid) id.goodid = row.goodid;
      id.username = this.User.username;
      this.$confirm("您确认要加入购物车吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/addshopcar", {
              ...id
            })
            .then(res => {
              if (res.data.success) {
                if (res.data.message == "已达上限") {
                  this.$message.warning("购物车中数量已达最大库存！");
                } else if (res.data.message == "宠物已达上限") {
                  this.$message.warning("宠物购物车中数量最大为1！");
                } else {
                  this.$message.success("成功加入购物车！");
                }
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.card {
  margin-right: 40px;
  margin-top: 40px;
}
.image {
  width: 173px;
  height: 173px;
}

.textclass {
  text-align: center;
}
.textclass2 {
  font-size: 14px;
  text-align: center;
  height: 30px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
