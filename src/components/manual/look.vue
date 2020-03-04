<template>
  <div>
    <p class="ruleclass">了解如何照顾宠物</p>
    <el-collapse v-model="activeNames" class="manual-box">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="header-icon el-icon-petchongwu icno"></i>
          为什么要养宠物
        </template>
        <div>
          宠物能够增加你的安全感
          <p
            style="margin-top:5px;"
          >在今天的世界上人与人之间越来越缺乏信任和安全感，但宠物，猫或者狗，能够使你增加安全感。当你在夜间行走时一只狗可以成为你的卫士；猫会对进入你房间的陌生人发出“瞄”的警告。因为你知道你所信任的宠物时刻伴随在你身边，即使做不了什莫，也是一种精神的支持。不论是体型大的动物还是小的，飞行的还是在地上跑的，都会因为共同生活而产生一种紧密地精神联系。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="header-icon el-icon-peticon-1 icno"></i>
          可以养什么宠物
        </template>
        <div>养什么动物都要有爱心和责任心！你要记住，你一旦养这种动物，你就要照顾这种动物到死为止，这个就是你养它的责任，绝对不能因为不喜欢或者厌倦了而去抛弃它！！</div>
        <p>在我们这里你可以买到你心仪的猫，想要的狗和可爱的香猪哦~</p>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <i class="header-icon el-icon-petzhu2 icno"></i>
          养宠物需要什么
        </template>
        <div>第一，金钱的支出</div>
        <div>第二，饲养空间</div>
        <div>第三，时间</div>
        <div>第四，耐心</div>
        <div>第五，家庭成员的认可</div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <i class="header-icon el-icon-peticon- icno"></i>
          迎接宠物到家应该做些什么
        </template>
        <div>着手规划居家空间前，必须先思考宠物在居家的定位，是单纯的宠物或是家庭成员;另外，若家中饲养宠物的类别较多，还需考虑不同宠物之间的互动。接下来则是宠物与主人生活的配合程度，基本上，仍然以主人自身的生活质量为重，再针对宠物需求来设定安排。</div>
      </el-collapse-item>
    </el-collapse>
    <p class="ruleclass1">点击图片查看如何照顾他们</p>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:8}" :md="{span:24}">
        <img
          src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/manualdog.jpg"
          class="manual-picture"
          @click="goUrl('./dog')"
        >
      </el-col>
      <el-col :lg="{span:8}" :md="{span:24}">
        <img
          src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/manualcat.jpg"
          class="manual-picture"
          @click="goUrl('./cat')"
        >
      </el-col>
      <el-col :lg="{span:8}" :md="{span:24}">
        <img
          src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/manualpig.jpg"
          class="manual-picture"
          @click="goUrl('./pig')"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: "1"
    };
  },
  methods: {
    goUrl(url) {
      this.$router.replace(url);
    }
  }
};
</script>

<style scoped>
.manual-box {
  width: 500px;
  margin: 0 auto;
}
.manual-picture {
  width: 300px;
  height: 350px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}
.ruleclass {
  text-align: center;
  background: linear-gradient(to right, #8fffff, #4187d6);
  -webkit-background-clip: text;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 15px;
  font-family: "jelly";
  color: transparent;
}
.ruleclass1 {
  text-align: center;
  background: linear-gradient(to right, #cf7979, #ac6e84);
  -webkit-background-clip: text;
  font-size: 40px;
  margin-top: 25px;
  margin-bottom: 15px;
  font-family: "jelly";
  color: transparent;
}
.icno {
  font-size: 18px;
  margin-right: 10px;
}
</style>
