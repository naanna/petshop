<template>
  <div>
    <div style="display:flex;">
      <div class="div1">
        <el-avatar shape="square" :size="120" :src="url"></el-avatar>
        <p class="pclass">粥粥</p>
      </div>
      <div class="div2">
        <div>
          <span>编号：</span>
          <span>MMZDCW00001</span>
        </div>
        <div>
          <span>性别：</span>
          <span>女</span>
        </div>
        <div>
          <span>年龄：</span>
          <span>一岁</span>
        </div>
        <div>
          <span>状态：</span>
          <span>在售中</span>
        </div>
        <div>
          <span>价格：</span>
          <span>20000</span>
        </div>
        <div>
          <span>种类：</span>
          <span>猫咪</span>
        </div>
        <div>
          <span>品种：</span>
          <span>波斯猫</span>
        </div>
      </div>
    </div>
    <div>
      <p class="pclass1">介绍：</p>
      <el-input type="textarea" :rows="3" :readonly="true" class="inputclass"></el-input>
    </div>

    <div class="buttondiv">
      <el-button v-if="collect" type="danger" size="small" icon="el-icon-star-on" circle @click="gonocollect"></el-button>
      <el-button v-else size="small" icon="el-icon-star-off" circle @click="gocollect"></el-button>
      <div class="buttonclass">
        <el-button type="primary" size="small" @click="goadd">加入购物车</el-button>
        <el-button size="small" @click="goclose">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      collect: false,
      customer: false,
      url: "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/touxiang1.jpg"
    };
  },
  mounted() {
    var m1 = this.moment("2016-08-14");
    var m2 = this.moment(this.moment(new Date()).format("YYYY-MM-DD"));
    var num = this.displayAge(m1, m2);
    console.log(num);
    if (this.rjDialogParams().customer) {
      console.log(this.rjDialogParams().customer);
      this.customer = true;
    }
  },
  methods: {
    displayAge(birth, target) {
      let months = target.diff(birth, "months", true);
      let birthSpan = {
        year: Math.floor(months / 12),
        month: Math.floor(months) % 12,
        day: Math.round((months % 1) * target.daysInMonth(), 0)
      };
      if (birthSpan.year < 1 && birthSpan.month < 1) {
        return birthSpan.day + "天";
      } else if (birthSpan.year < 1) {
        return birthSpan.month + "个月" + birthSpan.day + "天";
      } else {
        return birthSpan.year + "岁" + birthSpan.month + "个月";
      }
    },
    goadd(){
      console.log("add")
    },
    gocollect(){
      this.collect=true;
    },
    gonocollect(){
      this.collect=false;
    },
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.div1 {
  flex: 1;
  padding-left: 30px;
  padding-top: 30px;
}
.div2 {
  line-height: 30px;
  font-size: 20px;
  margin-left: 40px;
  font-family: "jelly", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  flex: 2;
  color: #cc496e;
}
.pclass {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(155, 155, 155);
  font-family: "jelly";
}
.pclass1 {
  padding-left: 30px;
  font-family: "jelly";
  font-size: 20px;
  margin-bottom: 10px;
}
.inputclass {
  width: 350px;
  padding-left: 30px;
}
.buttondiv {
  padding-left: 30px;
  margin-top: 20px;
}
.buttonclass {
  margin-left: 80px;
  display: inline-block;
}
</style>
