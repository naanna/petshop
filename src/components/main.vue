<template>
  <div>
    <div class="card">
      <div class="carddiv">
        <div class="headdiv">
          <span>订单总数</span>
        </div>
        <div class="icondiv">
          <i class="el-icon-shopping-cart-full titleicon"></i>
          <span class="number">0</span>
        </div>
        <div class="footerdiv">
          <span class="go" @click="gourl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
          <span class="go" @click="gourl('/pet/goods')" v-else>我要下单...</span>
        </div>
      </div>
      <div class="carddiv">
        <div class="headdiv">
          <span>销售总额</span>
        </div>
        <div class="icondiv">
          <i class="el-icon-money titleicon"></i>
          <span class="number">0</span>
        </div>
        <div class="footerdiv">
          <span class="go" @click="gourl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
          <span class="go" @click="gourl('/pet/index')" v-else>我要购买...</span>
        </div>
      </div>
      <div class="carddiv">
        <div class="headdiv">
          <span>会员总数</span>
        </div>
        <div class="icondiv">
          <i class="el-icon-user titleicon"></i>
          <span class="number">0</span>
        </div>
        <div class="footerdiv">
          <span class="go" @click="gourl('/customer/index')" v-if="permissions=='admin'">显示详细...</span>
          <span class="go" @click="gourl('/shpping/person')" v-else>查看我的...</span>
        </div>
      </div>
      <div class="carddiv">
        <div class="headdiv">
          <span>代售总数</span>
        </div>
        <div class="icondiv">
          <i class="el-icon-box titleicon"></i>
          <span class="number">0</span>
        </div>
        <div class="footerdiv">
          <span class="go" @click="gourl('/manage/bookmanage')" v-if="permissions=='admin'">显示详细...</span>
          <span class="go" @click="gourl('/booking/my')" v-else>我要代售...</span>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="picdiv">
        <div class="pichead">
          <i class="el-icon-chicken icon"></i>
          <span class="titleclass">宝贝照片</span>
        </div>
        <div class="picturediv">
          <img src="@picture/cat1.png" class="picture1" />
          <img src="@picture/dog1.png" class="picture1" />
          <img src="@picture/pig1.png" class="picture1" />
          <img src="@picture/cat2.png" class="picture2" />
          <img src="@picture/dog2.png" class="picture2" />
          <img src="@picture/pig2.png" class="picture2" />
        </div>
      </div>
      <div class="chart">
        <div class="charthead">
          <i class="el-icon-menu icon"></i>
          <span class="titleclass">销售图表</span>
        </div>
        <div class="chartdiv">
          <v-chart :options="options" autoresize class="chart1"></v-chart>
        </div>
      </div>
    </div>
    <div class="third">
      <div class="userdiv">
        <div class="userhead">
          <i class="el-icon-date icon"></i>
          <span class="titleclass">用户活动</span>
        </div>
        <div>
          <div class="user">
            <div>
              <span class="usernamecolor">壮壮</span>
              <span class="join">加入我们</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span class="join">2019-07-29</span>
            </div>
          </div>
          <div class="user">
            <div>
              <span class="usernamecolor">壮壮</span>
              <span class="join">加入我们</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span class="join">2019-07-29</span>
            </div>
          </div>
          <div class="user">
            <div>
              <span class="usernamecolor">壮壮</span>
              <span class="join">加入我们</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span class="join">2019-07-29</span>
            </div>
          </div>
          <div class="user">
            <div>
              <span class="usernamecolor">壮壮</span>
              <span class="join">加入我们</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span class="join">2019-07-29</span>
            </div>
          </div>
          <div class="user">
            <div>
              <span class="usernamecolor">壮壮</span>
              <span class="join">加入我们</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span class="join">2019-07-29</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderdiv">
        <div class="userhead">
          <i class="el-icon-s-grid icon"></i>
          <span class="titleclass">今日推荐</span>
        </div>
        <el-table :data="data" stripe highlight-current-row style="padding:7px 0;">
          <el-table-column label="图片" width="100px" prop="id" align="center" header-align="center">
            <template slot-scope="scope">
              <el-image style="width: 50px; height: 50px" :src="scope.row.picture" fit="full"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="商品信息"
            prop="id"
            width="400px"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column label="价格" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="库存" prop="id" align="center" header-align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permissions: "",
      options: {
        title: {
          text: "八月销售情况"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            type: "category",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单数",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      },
      data: [
        {
          id: 1,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          id: 2,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          id: 2,
          picture:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ]
    };
  },
  created() {
    this.permissions = this.User.permissions;
  },
  methods: {
    gourl(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.headdiv {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border-radius: 10px;
}

.titleicon {
  font-size: 35px;
  opacity: 0.3;
  transition: all 1s;
}
.titleicon:hover {
  opacity: 0.95;
}
.number {
  font-size: 35px;
}

.icondiv {
  background: #2786c5;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 35px;
  justify-content: space-between;
}

.footerdiv {
  padding-left: 10px;
  border-radius: 10px;
}

.carddiv {
  background: rgb(53, 143, 201);
  flex: 1;
  border-radius: 10px;
  line-height: 35px;
  margin-right: 30px;
}

.card {
  color: #ffffff;
  display: flex;
  line-height: 24px;
}

.icon {
  font-size: 16px;
}

.titleclass {
  font-size: 16px;
  margin-left: 10px;
}

.pichead {
  padding-top: 10px;
  padding-bottom: 10px;
}

.picture1 {
  width: 160px;
  height: 160px;
  vertical-align: bottom;
  margin-right: 50px;
}

.picture2 {
  width: 160px;
  height: 160px;
  vertical-align: bottom;
  margin-top: 30px;
  margin-right: 50px;
}

.picturediv {
  margin-top: 10px;
  padding-left: 20px;
}

.picdiv {
  flex: 1;
}

.charthead {
  padding-top: 10px;
  padding-bottom: 10px;
}

.chart1 {
  width: 100%;
}

.chartdiv {
  margin-top: 10px;
}

.chart {
  flex: 1;
  margin-left: 20px;
}

.second {
  display: flex;
  margin-top: 30px;
}

.userhead {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.join {
  margin-left: 10px;
}

.user {
  line-height: 20px;
  padding-left: 10px;
  padding-top: 10px;
  background: #ffffff;
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
}

.userdiv {
  background: #e4e0e0;
  border-radius: 10px;
  border: 1px solid #dddddd;
  flex: 2;
}

.orderdiv {
  background: #e4e0e0;
  border-radius: 10px;
  border: 1px solid #dddddd;
  flex: 3;
  margin-left: 20px;
}

.third {
  display: flex;
  margin-top: 30px;
}

.usernamecolor {
  color: rgb(119, 193, 232);
}
.go {
  cursor: pointer;
}
</style>