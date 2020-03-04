<template>
  <div style="min-width: 760px;">
    <p class="ruleclass">寄养规则</p>
    <div class="rule-box">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <i class="header-icon el-icon-petchongwu icno"></i>
            宠物寄养注意事项之什么样的宠物不适宜被寄养
          </template>
          <div>
            <p>1、年纪太小的动物不适宜寄养：因为幼小的动物抵抗力弱，适应能力低，在寄养场所很容易感染细菌，比较危险。</p>
            <p>2、胆子小或平时对陌生人不很友善的宠物不适宜寄养。</p>
            <p>3、处于发情期的宠物不适宜寄养。</p>
            <p>4、正在接受疫苗的宠物不适宜寄养。</p>
            <p>5、体弱多病的宠物不适宜寄养。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="header-icon el-icon-petchongwu2 icno"></i>
            宠物寄养注意事项之主人应向寄养中心提供什么?
          </template>
          <div>
            <p>1、平时的饲养习惯，主人要将宠物进食(如食物品牌、进食量等)、睡眠等生活习惯向工作人员讲明，最好形成书面介绍。</p>
            <p>2、宠物的性格特点，宠物的喜好等资料，以及当出现特殊情况时，主人通常的应对方法及安抚措施。</p>
            <p>3、宠物喜爱的玩具，最好把宠物喜欢的玩具带上，以方便工作人员照顾宠物。</p>
            <p>4、主人应该留下联系方式，以备必要时“托宠所”随时联系。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <i class="header-icon el-icon-petchongwumao icno"></i>
            宠物寄养注意事项之店铺寄养的时间应如何控制？
          </template>
          <p>据专家介绍，第一次寄养最好不要超过5天。寄养对宠物来说，或多或少有一些心理影响，尤其是猫、狗。因为它们是群居动物，比较通人性，与主人接触时间长了，突然到一个陌生的环境，肯定会有一些不适的反应，因此寄养时间一般不要超过5天。</p>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <i class="header-icon el-icon-petchongwu3 icno"></i>
            本店规则
          </template>
          <div>
            <p>被寄养的宠物必须身体健康，且经过免疫。主人先要到宠物医院为宠物做简单检查,确保没有任何病灶(如患病最好在托养前治理),补打相关疫苗</p>
            <p>寄养的价格由宠物类型和大小而定</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "4"
    };
  }
};
</script>

<style scoped>
.icno {
  margin-right: 10px;
  font-size: 20px;
}
.ruleclass {
  background: linear-gradient(to right, #ffb08f, #5945c0);
  -webkit-background-clip: text;
  text-align: center;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 15px;
  font-family: "jelly";
  color: transparent;
}
.rule-box {
  padding: 0 60px;
}
.el-collapse >>> .el-collapse-item__header {
  font-size: 25px !important;
  font-family: "jelly";
}
</style>
