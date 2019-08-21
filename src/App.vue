<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import login from "./components/login";
export default {
  name: "app",
  components: {
    login
  },
  data() {
    return {};
  },
  methods: {}
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
.is-horizontal {
  display: none;
}
</style>
