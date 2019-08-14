<template>
  <div>
    <index></index>
  </div>
</template>

<script>
import index from "./components/index";
export default {
  name: "app",
  components: {
    index
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
