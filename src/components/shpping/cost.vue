<template>
  <div>
    <span class="font-25">充值中心</span>
    <el-button type="text" size="small" style="float:right;" @click="goHistory">查看历史充值</el-button>
    <div class="cost-boder">
      <el-form label-position="right" class="cost-form" :model="form" :rules="rules" ref="form">
        <el-form-item label="充值金额：" class="form-item-padding" prop="money" :inline-message="true">
          <el-input
            type="text"
            size="small"
            class="formlist"
            v-model.number="form.money"
            oninput="if(value.length>10)value=value.slice(0,10)"
          ></el-input>
        </el-form-item>
        <el-form-item label="充值账户：" class="form-item-padding" prop="user" :inline-message="true">
          <el-input type="text" size="small" class="formlist" v-model="form.user"></el-input>
          <br />
          <span style="color: #898989;">请确认账户是否正确</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
      <el-button type="primary" size="small" @click="goSave">提交申请</el-button>
      <el-button size="small" @click="goClear">取消</el-button>
    </div>
    <p class="cost-text">充值说明</p>
    <p class="cost-text">
      本商店采用充值系统进行采购；
      <br />充值前请联系客服交付需要充值的金额的现金，再输入金额提交申请；
      <br />提交申请审批成功后，可以在个人账户页面内看到自己的账户余额；
      <br />因涉虚拟交易及促销返点等项目，因此不提供退款服务；
    </p>
    <p class="cost-text">客服电话：400-870-5552。【工作时间：周一至周日，如遇忙线请稍后再拨。】</p>
  </div>
</template>

<script>
import {
  checkspace,
  checkzh,
  checkspecil,
  checkinput
} from "@assets/validate.js";
export default {
  name: "cost",
  data() {
    var checkmoeny = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("充值金额不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      }
      callback();
    };
    return {
      form: {
        money: "",
        user: ""
      },
      rules: {
        money: [{ validator: checkmoeny, trigger: "blur" }],
        user: [
          { validator: checkinput, message: "充值账户不能为空" },
          { validator: checkzh },
          { validator: checkspace, message: "充值账户不能有空格" },
          { validator: checkspecil },
          { min: 3, max: 16, message: "长度在3到16个字符" }
        ]
      }
    };
  },
  methods: {
    goSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("确认充值给" + this.form.user + "吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
            this.axios
              .post("/api/invest/add", {
                money: this.form.money,
                time: this.moment().format("YYYY-MM-DD HH:mm:ss"),
                username: this.form.user
              })
              .then(res => {
                if (res.data.success) {
                  this.$message.success("充值记录提交成功！");
                }
                this.$refs["form"].resetFields();
              });
          });
        } else {
          return false;
        }
      });
    },
    goHistory() {
      this.$router.push("/shpping/historycost");
    },
    goClear() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style scoped>
.form-item-padding {
  padding: 5px 0;
  margin-bottom: 0;
}
.cost-boder {
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 10px 0;
  margin: 20px 0;
  min-width: 400px;
}
.cost-text {
  margin-top: 20px;
  color: #898989;
}
.cost-form {
  width: 350px;
  margin: 0 auto;
}
</style>
