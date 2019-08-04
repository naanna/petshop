<template>
  <div class="__p_2362_uid_193">
    <span class="__p_2362_uid_232">充值中心</span>
    <el-button type="text" size="small" style="float:right;" @click="gohistory">查看历史充值</el-button>
    <el-form
      label-position="right"
      class="__p_2362_uid_194"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item
        label="充值金额："
        label-width="300px"
        class="__p_2362_uid_197"
        prop="money"
        :inline-message="true"
      >
        <el-input type="text" size="small" class="__p_2362_uid_211" v-model.number="form.money"></el-input>
      </el-form-item>
      <el-form-item
        label="充值账户："
        label-width="300px"
        class="__p_2362_uid_199"
        prop="user"
        :inline-message="true"
      >
        <el-input type="text" size="small" class="__p_2362_uid_200" v-model="form.user"></el-input>
        <span class="__p_2362_uid_233" style="color: #898989;">请确认账户是否正确</span>
      </el-form-item>
    </el-form>
    <div class="__p_2362_uid_214">
      <el-button type="primary" size="small" @click="gosave">提交申请</el-button>
      <el-button size="small" @click="goclear">取消</el-button>
    </div>
    <p class="__p_2362_uid_234">充值说明</p>
    <p class="__p_2362_uid_234">
      本商店采用充值系统进行采购；
      <br />充值前请联系客服交付需要充值的金额的现金，再输入金额提交申请；
      <br />提交申请审批成功后，可以在个人账户页面内看到自己的账户余额；
      <br />因涉虚拟交易及促销返点等项目，因此不提供退款服务；
    </p>
    <p class="__p_2362_uid_234">客服电话：400-870-5552。【工作时间：周一至周日，如遇忙线请稍后再拨。】</p>
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
    gosave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("确认充值给" + this.form.user + "吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
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
                });
            });
        } else {
          return false;
        }
      });
    },
    gohistory() {
      this.$router.replace("/shpping/historycost");
    },
    goclear() {
      this.$refs["form"].resetFields();
    }
  }
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
  color: #898989;
}
</style>
