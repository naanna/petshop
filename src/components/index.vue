<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="mouser" @click="gourl('/')">
          <i class="el-icon-s-home"></i>首页
        </span>
        <span class="mouser" @click="gourl('/shpping/shopcar')">
          <i class="el-icon-shopping-cart-full"></i>购物车
        </span>
        <span class="mouser" @click="gourl('/shpping/favorites')">
          <i class="el-icon-collection"></i>收藏夹
        </span>
        <el-badge :value="12" class="item">
          <el-popover placement="bottom" width="180" trigger="click">
            <p>
              申请被拒绝啦！！
              <i class="el-icon-circle-close" style="margin-left:30px;cursor: pointer;"></i>
            </p>
            <p>
              申请被拒绝啦！！
              <i class="el-icon-circle-close" style="margin-left:30px;cursor: pointer;"></i>
            </p>
            <p>
              申请被拒绝啦！！
              <i class="el-icon-circle-close" style="margin-left:30px;cursor: pointer;"></i>
            </p>
            <p>
              申请被拒绝啦！！
              <i class="el-icon-circle-close" style="margin-left:30px;cursor: pointer;"></i>
            </p>
            <p style="text-align:center; margin-bottom:0px;">
              <el-button size="mini">全部已读</el-button>
            </p>
            <i class="el-icon-message-solid messagesolid" slot="reference"></i>
          </el-popover>
        </el-badge>
        <el-dropdown @command="gourl">
          <span class="mouser">壮壮</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/shpping/person">个人中心</el-dropdown-item>
            <el-dropdown-item command="/shpping/cost">充值</el-dropdown-item>
            <el-dropdown-item command="/shpping/order">我的消费</el-dropdown-item>
            <el-dropdown-item command="/">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container :style="conheight">
        <el-scrollbar class="scroll">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
              style="text-align:left"
              :default-active="$route.path"
              :unique-opened="true"
              router
            >
              <NavMenu :navlist="menulist"></NavMenu>
            </el-menu>
          </el-aside>
        </el-scrollbar>

        <el-scrollbar style="height:100%;width:100%;">
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./NavMenu";
import Menulist from "@assets/munelist.js";
export default {
  name: "app",
  components: {
    NavMenu
  },
  data() {
    return {
      menulist: Menulist.navlist,
      conheight: {
        height: "",
        border: "1px solid #eee"
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getperson();
  },
  methods: {
    getperson() {
      this.axios
        .get("/api/getuser", {
          params: {
            id: "admin"
          }
        })
        .then(res => {
          if (res.data.success) {
            this.User.setusername(res.data.message.username);
            this.User.setpermissions(res.data.message.permissions);
            this.User.setpicture(res.data.message.picture);
          }
        });
    },
    gourl(url) {
      this.$router.push(url);
    },
    getHeight() {
      this.conheight.height = window.innerHeight - 78 + "px";
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
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
.messagesolid {
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
}
.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
