<template>
  <div class="__p_2362_uid_193">
    <span class="__p_2362_uid_232">充值中心</span>
    <el-form label-position="right" class="__p_2362_uid_194">
      <el-form-item label="充值金额：" label-width="300px" class="__p_2362_uid_197">
        <el-input type="text" size="small" class="__p_2362_uid_211"></el-input>
      </el-form-item>
      <el-form-item label="充值账户：" label-width="300px" class="__p_2362_uid_199">
        <el-input type="text" size="small" class="__p_2362_uid_200"></el-input>
        <span class="__p_2362_uid_233">请确认账户是否正确</span>
      </el-form-item>
    </el-form>
    <div class="__p_2362_uid_214">
      <el-button type="primary" size="small">提交申请</el-button>
      <el-button size="small">取消</el-button>
    </div>
    <p class="__p_2362_uid_234">充值说明</p>
    <p class="__p_2362_uid_235">
      本商店采用充值系统进行采购；
      <br />充值前请联系客服交付需要充值的金额的现金，再输入金额提交申请；
      <br />提交申请审批成功后，可以在个人账户页面内看到自己的账户余额；
      <br />因涉虚拟交易及促销返点等项目，因此不提供退款服务；
    </p>
    <p class="__p_2362_uid_236">客服电话：400-870-5552。【工作时间：周一至周日，如遇忙线请稍后再拨。】</p>
  </div>
</template>

<script>
export default {
  name: "cost"
};
</script>

<style scoped>
.__p_2362_uid_232 {
  font-size: 25px;
}

.__p_2362_uid_211 {
  width: 250px;
}

.__p_2362_uid_197 {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0;
}

.__p_2362_uid_200 {
  width: 250px;
}

.__p_2362_uid_233 {
  margin-left: 10px;
}

.__p_2362_uid_199 {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.__p_2362_uid_194 {
  background: #ffffff;
  border: 1px solid #dddddd;
  padding-top: 10px;
  margin-top: 20px;
  padding-bottom: 10px;
}

.__p_2362_uid_214 {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
}

.__p_2362_uid_234 {
  margin-top: 20px;
}

.__p_2362_uid_235 {
  margin-top: 10px;
}

.__p_2362_uid_236 {
  margin-top: 10px;
}
</style>
