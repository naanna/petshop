
<template>
  <div>
    <el-submenu
      v-for="(item,index) in navlist"
      :key="index"
      v-if="item.adminMenu.menuType=='list'&&(User.permissions=='admin'||(item.adminMenu.permissions==null &&User.permissions!='admin'))"
      :index="item.adminMenu.code"
    >
      <template slot="title">
        <i class="el-icon-sunny"></i>
        <span>{{item.adminMenu.menuName}}</span>
      </template>
      <NavMenu :navlist="item.children"></NavMenu>
    </el-submenu>

    <el-menu-item
      v-for="(item,index) in navlist"
      :key="index"
      v-if="item.adminMenu.menuType=='page'&&(User.permissions=='admin'||(item.adminMenu.permissions==null &&User.permissions!='admin'))"
      :index="item.adminMenu.url"
    >
      <i class="el-icon-moon"></i>
      <span>{{item.adminMenu.menuName}}</span>
    </el-menu-item>
  </div>
</template>
  
<script>
export default {
  name: "NavMenu"
};
</script>

<script>
export default {
  name: "NavMenu",
  props: ["navlist"],
  data() {
    return {};
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
