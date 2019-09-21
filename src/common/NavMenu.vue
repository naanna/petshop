
<template>
  <div>
    <label v-for="(item,index) in activenavlist" :key="index">
      <el-submenu v-if="item.adminMenu.menuType=='list'" :index="item.adminMenu.code">
        <template slot="title">
          <i class="el-icon-sunny"></i>
          <span>{{item.adminMenu.menuName}}</span>
        </template>
        <NavMenu :navlist="item.children"></NavMenu>
      </el-submenu>

      <el-menu-item v-if="item.adminMenu.menuType=='page'" :index="item.adminMenu.url">
        <i class="el-icon-moon"></i>
        <span>{{item.adminMenu.menuName}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: ["navlist"],
  data() {
    return {};
  },
  computed: {
    activenavlist() {
      return this.navlist.filter((item, index) => {
        return (
          this.$store.state.permissions == "admin" ||
          (item.adminMenu.permissions == null &&
            this.$store.state.permissions != "admin")
        );
      });
    }
  },
  methods: {}
};
</script>
<style lang='scss' >
//如果没有此样式的话  折叠有子级菜单的父菜单文字是不会隐藏的
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
