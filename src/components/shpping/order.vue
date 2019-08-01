<template>
  <div>
    <span class="__p_2363_uid_239">消费记录</span>
    <el-tabs value="first" class="__p_2363_uid_261">
      <el-tab-pane label="购物" name="first">
        <buy></buy>
      </el-tab-pane>
      <el-tab-pane label="寄养" name="second">
        <care></care>
      </el-tab-pane>
      <el-tab-pane label="代售" name="third">
        <Instead></Instead>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buy from "./order/buy.vue";
import Instead from "./order/Instead.vue";
import care from "./order/care.vue";
export default {
  components: {
    care,
    Instead,
    buy
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.__p_2363_uid_239 {
  font-size: 25px;
}

.__p_2363_uid_261 {
  margin-top: 20px;
}
</style>