<template>
  <div>
    <div class="headclass">
      <div class="headerinfo">
        <span class="textclass">交易单号</span>
        <span>TS10086</span>
      </div>
      <div class="headerinfo">
        <span class="textclass">交易日期</span>
        <span>2019-8-1</span>
      </div>
    </div>
    <div>
      <div class="listboder">
        <div class="listhead">
          <div class="headerinfo">
            <span class="textclass">宠物</span>
            <span>1</span>
          </div>
          <div class="headerinfo">
            <span class="textclass">宠物交易编号</span>
            <span>2353</span>
          </div>
        </div>
        <div class="listclass">
          <span class="textclass">图</span>
          <span class="textclass">粥粥</span>
          <span class="textclass">2000</span>
          <span class="textclass">交易成功</span>
        </div>
      </div>
    </div>
    <el-form label-position="right" style="  margin-top: 20px;">
      <el-form-item label="总价：" label-width="650px" class="formclass">
        <span>10000</span>
      </el-form-item>
      <el-form-item label="下单者：" label-width="650px" class="formclass">
        <span>壮壮</span>
      </el-form-item>
    </el-form>

    <div class="__p_2362_uid_214">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderdetail",
  methods: {
    goclose() {
      this.closeRjDialog && this.closeRjDialog();
    }
  }
};
</script>

<style scoped>
.formclass {
  margin-bottom: 0px;
}
.headclass {
  line-height: 32px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}
.listhead {
  line-height: 42px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  padding-left: 100px;
  padding-right: 100px;
  background-color: #dddddd;
}
.headerinfo {
  display: inline-block;
}
.textclass {
  margin-right: 10px;
}
.listclass {
  display: flex;
  line-height: 32px;
  padding-left: 100px;
  padding-top: 10px;
  padding-right: 100px;
  justify-content: space-around;
}
.listboder {
  border: 1px solid #dddddd;
  padding-bottom: 10px;
}
.__p_2362_uid_214 {
  text-align: center;
  padding-top: 20px;
}
</style>
