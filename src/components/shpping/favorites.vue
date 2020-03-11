<template>
  <div>
    <span class="fontclass">我的收藏夹</span>
    <el-scrollbar style="height:100%;">
      <el-row
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="min-width:1120px;max-width:1350px;width:100%"
      >
        <el-col :span="4" v-for="(item, index) in showtable" :key="index">
          <el-card class="favorites-card" shadow="hover" :body-style="{ padding: '0px' }">
            <el-image
              v-if="item.status=='soldout'||item.status=='saled'"
              class="favorites-image gray"
              :src="item.picture"
            ></el-image>
            <el-image v-else class="favorites-image" :src="item.picture"></el-image>
            <el-tooltip
              v-if="item.name.length>11"
              class="item"
              effect="dark"
              :content="item.name"
              placement="bottom"
            >
              <p class="favorites-title">{{item.name}}</p>
            </el-tooltip>
            <p v-else class="favorites-title">{{item.name}}</p>
            <p v-if="item.status=='soldout'||item.status=='saled'" class="favorites-price">已下架</p>
            <div v-if="item.status=='soldout'||item.status=='saled'" class="favorites-soldout">
              <el-tag type="info" size="medium">失效</el-tag>
              <el-button size="mini" @click="goDel(item)">删除</el-button>
            </div>
            <div v-else>
              <p class="favorites-price">¥{{item.price}}</p>
              <el-button
                size="mini"
                icon="el-icon-delete"
                class="favorites-delete"
                @click="goDel(item,index)"
              ></el-button>
              <el-button size="mini" class="favorites-button" @click="goAdd(item)">加入购物车</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p class="favorites-load" v-if="loading">加载中...</p>
      <p class="favorites-load" v-if="noMore">没有更多了</p>
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
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      this.axios
        .get("/api/collect/get", {
          params: {
            username: this.$store.state.username
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
    goAdd(row) {
      let id = {};
      if (row.petid) id.petid = row.petid;
      if (row.goodid) id.goodid = row.goodid;
      id.username = this.$store.state.username;
      this.$confirm("您确认要加入购物车吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/shopcar/add", {
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
    },
    goDel(row, index) {
      this.$confirm("您确认取消收藏吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let body = { username: this.$store.state.username };
          if (row.goodid) {
            body.goodid = row.goodid;
          } else if (row.petid) {
            body.petid = row.petid;
          }
          this.axios
            .delete("/api/collect/delete", {
              data: {
                ...body
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("成功取消收藏！");
                this.showtable.splice(index, 1);
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.favorites-card {
  margin-right: 40px;
  margin-top: 40px;
  height: 280px;
}
.favorites-image {
  width: 100%;
  height: 173px;
}
.favorites-price {
  text-align: center;
  margin: 10px 0;
}
.favorites-title {
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.favorites-load {
  font-size: 18px;
  text-align: center;
  font-family: "jelly";
}
.favorites-button {
  float: right;
  margin: 0 10px 10px 0;
}
.favorites-delete {
  cursor: pointer;
  position: absolute;
  display: none;
  margin-left: 10px;
}
.favorites-card:hover .favorites-delete {
  display: block;
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.favorites-soldout {
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
}
</style>
