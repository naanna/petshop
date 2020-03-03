<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="mouser" @click="goUrl('/')">
          <i class="el-icon-s-home"></i>首页
        </span>
        <span class="mouser" @click="goUrl('/shpping/shopcar')">
          <i class="el-icon-shopping-cart-full"></i>购物车
        </span>
        <span class="mouser" @click="goUrl('/shpping/favorites')">
          <i class="el-icon-collection"></i>收藏夹
        </span>
        <i v-if="num==0" class="el-icon-message-solid menu-icon"></i>
        <el-badge v-else :value="num" class="item">
          <el-popover placement="bottom" width="180" trigger="click">
            <p v-for="item in list">
              <span v-if="item.type=='invest'">充值申请被</span>
              <span v-else-if="item.type=='care'">寄养申请被</span>
              <span v-else-if="item.type=='long'">延长申请被</span>
              <span v-else-if="item.type=='back'">领回申请被</span>
              <span v-else-if="item.type=='upload'">投稿申请被</span>

              <span v-if="item.status=='yes'">同意啦！</span>
              <span v-else-if="item.status=='refuse'">拒绝啦！</span>
              <span v-else-if="item.status=='agreed'">同意啦！</span>
              <span v-else-if="item.status=='refused'">拒绝啦！</span>
              <span v-else-if="item.status=='end'">同意啦！</span>
              <i
                class="el-icon-circle-close"
                style="margin-left:30px;cursor: pointer;"
                @click="goRead(item)"
              ></i>
            </p>
            <p style="text-align:center; margin-bottom:0px;">
              <el-button size="mini" @click="goAllRead">全部已读</el-button>
            </p>
            <i class="el-icon-message-solid menu-icon" slot="reference"></i>
          </el-popover>
        </el-badge>
        <el-dropdown @command="goUrl">
          <span class="mouser">{{$store.state.nickname}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/shpping/person">个人中心</el-dropdown-item>
            <el-dropdown-item command="/shpping/cost">充值</el-dropdown-item>
            <el-dropdown-item command="/shpping/order">我的消费</el-dropdown-item>
            <el-dropdown-item command="/login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container :style="conHeight">
        <el-scrollbar class="scroll">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
              style="text-align:left"
              :default-active="$route.path"
              :unique-opened="true"
              router
            >
              <NavMenu :navlist="menuList"></NavMenu>
            </el-menu>
          </el-aside>
        </el-scrollbar>

        <el-scrollbar style="height:100%;width:100%;">
          <el-main style="height:100%;width:100%;">
            <router-view></router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@common/NavMenu";
import Menulist from "@assets/munelist.js";
import { mapMutations } from "vuex";
export default {
  name: "app",
  components: {
    NavMenu
  },
  data() {
    return {
      menuList: Menulist.navlist,
      conHeight: {
        height: "",
        border: "1px solid #eee"
      },
      num: 0,
      list: []
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getUnRead();
    this.initWebSocket();
  },
  methods: {
    ...mapMutations(["delToken"]),
    getUnRead() {
      this.axios
        .get("/api/getunread", {
          params: {
            username: this.$store.state.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var message = res.data;
            this.num = message.total;
            this.list = message.message;
          }
        });
    },
    goRead(row) {
      let refobs = [];
      if (row.investid) {
        refobs = [
          {
            investid: row.investid
          }
        ];
      }
      if (row.careid) {
        refobs = [
          {
            careid: row.careid
          }
        ];
      }
      if (row.videoid) {
        refobs = [
          {
            videoid: row.videoid
          }
        ];
      }
      this.read(refobs);
    },
    goAllRead() {
      let refobs = [];
      for (let i in this.list) {
        if (this.list[i].investid) {
          refobs.push({
            investid: this.list[i].investid
          });
        }
        if (this.list[i].careid) {
          refobs.push({
            careid: this.list[i].careid
          });
        }
        if (this.list[i].videoid) {
          refobs.push({
            videoid: this.list[i].videoid
          });
        }
      }
      this.read(refobs);
    },
    read(refobs) {
      this.axios
        .post("/api/readunread", {
          refobs
        })
        .then(res => {
          if (res.data.success) {
            this.getUnRead();
          }
        });
    },
    goUrl(url) {
      if (url == "/login") {
        this.delToken();
      }
      this.$router.push(url);
    },
    getHeight() {
      this.conHeight.height = window.innerHeight - 60 + "px";
    },
    initWebSocket() {
      let _this = this; //判断页面有没有存在websocket连接
      let params = { userId: this.$store.state.username };
      if (window.WebSocket) {
        // 192.168.80.1是我本地IP地址 此处的 :8182 端口号 要与后端配置的一致
        let ws = new WebSocket("ws://192.168.80.1:8182");
        _this.ws = ws;
        ws.onopen = function(e) {
          console.log("服务器连接成功");
          _this.ws.send(JSON.stringify(params));
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭");
        };
        ws.onerror = function() {
          console.log("服务器连接出错");
        };
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: rgba(163, 206, 236, 0.808);
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.mouser {
  cursor: pointer;
  margin-right: 10px;
}
.scroll {
  height: 100%;
  width: 220px;
}
.menu-icon {
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
}
.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-scrollbar >>> .el-scrollbar__view {
  height: 100% !important;
}
</style>
