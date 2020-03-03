<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      if (to.name == "main" && from.name == "Login") {
        this.openFullScreen();
      }
    }
  },
  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "正在努力加载页面",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 1)"
      });
      setTimeout(() => {
        loading.close();
      }, 1500);
    }
  }
};
</script>

<style>
@import "./common/font/font.css";
.fontclass {
  font-size: 30px;
  font-family: "jelly";
}
.el-badge__content.is-fixed {
  top: 14px !important;
  right: 26px !important;
}
.fyclass {
  margin-top: 20px;
  text-align: right;
}
.formlist {
  width: 250px !important;
}
.is-horizontal {
  display: none;
}
.center {
  text-align: center;
}
.font-25{
  font-size: 25px;
}
</style>
