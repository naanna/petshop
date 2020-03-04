<template>
  <div>
    <span class="fontclass">帮助中心</span>
    <div class="flex">
      <div>
        <el-menu default-active="1" class="help-menu" @select="handleSelect">
          <el-menu-item index="1">
            <span slot="title">购买流程</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">寄养流程</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">留言功能</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title">会员等级</span>
          </el-menu-item>
          <el-menu-item index="6">
            <span slot="title">联系我们</span>
          </el-menu-item>
          <el-menu-item index="7">
            <span slot="title">关于我们</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="help-info-box" v-if="key==1">
        <p class="center">购物流程</p>
        <div>
          <p>为您介绍下详细购物步骤：</p>
          <p>1.登录到你的账号，点击导航上的【宠物中心】</p>
          <p>2.选择你要购买的类型，宠物或者商品</p>
          <p>3.进入购物页面，将需要的商品加入购物车</p>
          <p>4.点击右上角购物车，进入购物车页面勾选需要的商品进行结算</p>
          <p>5.核对完信息无误之后就可以支付啦！</p>
        </div>
      </div>
      <div class="help-info-box" v-else-if="key==2">
        <p class="center">寄养流程</p>
        <div>
          <p>为您介绍下详细寄养步骤：</p>
          <p>1.登录到你的账号，点击导航上的【寄养中心】->【我的寄养】</p>
          <p>2.点击右上角的【我要寄养】，填写寄养信息。</p>
          <p>3.填写完寄养信息提交申请，管理员审批后会填写寄养金额，并发送通知消息给您。</p>
          <p>4.如需要延迟寄养申请请进入我的寄养提交延长申请，管理员审批后将会填写需要补上的金额。</p>
          <p>5.寄养申请通过将会立即从账户上扣除寄养金额，请保证你的账户余额足够。</p>
          <p>6.提前结束寄养不会退还金额！请谨慎决定寄养时长。</p>
        </div>
      </div>
      <div class="help-info-box" v-else-if="key==4">
        <p class="center">留言功能</p>
        <div>
          <p>宠物商店内发布涉及色情、广告、暴力反动，招嫖，买卖枪支，毒品，或者诈骗，侵权，以及传播病毒广告等信息，都属于违规行为。</p>
          <p>我司有权核实后对该账号关闭处理，并有权追究法律责任。</p>
          <p>
            留言中出现违规信息，如非您本人操作，那可能是密码外泄帐号不安全所致，建议您尽快安装最新的杀毒软件对本机查毒后，
            再进入个人中心修改密码，然后尽快对留言的不良信息进行清理。否则将可能会导致账号永久封闭。
          </p>
          <p>请您仔细检查账号，个人档，留言板模块等位置是否存在违规信息，以下为您介绍下详细清理步骤：</p>
          <p>登录到你的账号，点击导航上的【留言板】->【我的评论】，选择相关留言进行删除即可。</p>
        </div>
      </div>
      <div class="help-info-box" v-else-if="key==5">
        <p class="center">会员等级</p>
        <div>
          <p>本店采用会员等级制</p>
          <p>1.等级越高优先级越高</p>
          <p>2.消费金额达到一定程度请联系客户更新等级</p>
          <p>3.高级vip生日礼将跟多</p>
        </div>
      </div>
      <div class="help-info-box" v-else-if="key==6">
        <p class="center">联系我们</p>
        <div>
          <p>售后电话：1000110001</p>
          <p>客服电话：1008610086</p>
          <p>email：10086086086@163.com</p>
          <p>欢迎加入我们！</p>
        </div>
      </div>
      <div class="help-info-box" v-else-if="key==7">
        <p class="center">关于我们</p>
        <div>
          <p>名字：飞宠大乱斗</p>
          <p>创立时间：2019/7/28</p>
          <p>经营范围：销售/寄养/代售</p>
          <p>地点：福州</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
      key: 1
    };
  },
  methods: {
    handleSelect(key) {
      this.key = key;
    }
  }
};
</script>

<style scoped>
.center {
  margin-top: 0px;
  text-align: center;
  font-size: 35px;
  font-family: "jelly";
  color: #fd7821;
}
.help-menu {
  flex: 1;
  border: 1px solid #e9e9e9;
}
.help-info-box {
  margin-left: 20px;
  flex: 8;
}
.flex {
  padding: 50px 150px 0 150px;
  display: flex;
  justify-content: space-between;
}
</style>
