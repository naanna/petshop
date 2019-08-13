<template>
  <div>
    <div class="headclass">
      <div class="headerinfo">
        <span class="textclass">交易单号</span>
        <span>TS10086</span>
      </div>
      <div class="headerinfo">
        <span class="textclass">交易时间</span>
        <span>2019-8-1 14：00</span>
      </div>
    </div>
    <el-table :data="tabledata" class="table">
      <el-table-column
        label="商品信息"
        prop="picture"
        width="160px"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-image style="width: 120px; height: 120px" :src="scope.row.picture" fit="full"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" header-align="center"></el-table-column>
      <el-table-column label="单价" width="160px" prop="price" align="center" header-align="center">
        <template slot-scope="scope">
          <span class="money1">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="160px" prop="num" align="center" header-align="center"></el-table-column>
      <el-table-column
        label="金额"
        width="160px"
        prop="totalprice"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span class="money2">￥{{scope.row.num*scope.row.price}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="textdiv1">
      <span>实付款：</span>
      <span>￥10000</span>
    </div>
    <div class="textdiv1">
      <span>下单者：</span>
      <span>壮壮</span>
    </div>
    <div class="button">
      <el-button size="small" @click="goclose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderdetail",
  data() {
    return {
      tabledata: [
        {
          carid: 1,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          name: "宠物狗的狗粮呀呀呀呀呀呀呀哈哈哈哈",
          price: 100,
          num: 1
        },
        {
          carid: 2,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          name: "宠物狗的狗粮呀呀呀呀呀呀呀哈哈哈哈",
          price: 100,
          num: 1
        },
        {
          carid: 3,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          name: "宠物狗的狗粮呀呀呀呀呀呀呀哈哈哈哈",
          price: 100,
          num: 1
        }
      ]
    };
  },
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
.headerinfo {
  display: inline-block;
}
.textclass {
  margin-right: 10px;
}
.button {
  text-align: center;
  padding-top: 20px;
}
.textdiv1 {
  text-align: right;
  margin: 20px 20px 0 0;
  font-size: 18px;
}
</style>
