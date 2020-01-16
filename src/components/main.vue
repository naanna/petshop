<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="6" :xs="{span:12}">
        <div class="carddiv">
          <div class="headfootdiv">
            <span>订单总数</span>
          </div>
          <div class="icondiv">
            <i class="el-icon-shopping-cart-full titleicon"></i>
            <span>{{totalorder}}</span>
          </div>
          <div class="headfootdiv">
            <span class="go" @click="gourl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="gourl('/pet/goods')" v-else>我要下单...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="carddiv">
          <div class="headfootdiv">
            <span>销售总额</span>
          </div>
          <div class="icondiv">
            <i class="el-icon-money titleicon"></i>
            <span>{{totalmoeny}}</span>
          </div>
          <div class="headfootdiv">
            <span class="go" @click="gourl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="gourl('/pet/index')" v-else>我要购买...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="carddiv">
          <div class="headfootdiv">
            <span>会员总数</span>
          </div>
          <div class="icondiv">
            <i class="el-icon-user titleicon"></i>
            <span>{{totaluser}}</span>
          </div>
          <div class="headfootdiv">
            <span class="go" @click="gourl('/customer/index')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="gourl('/shpping/person')" v-else>查看我的...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="carddiv">
          <div class="headfootdiv">
            <span>寄养总数</span>
          </div>
          <div class="icondiv">
            <i class="el-icon-box titleicon"></i>
            <span>{{totalcare}}</span>
          </div>
          <div class="headfootdiv">
            <span
              class="go"
              @click="gourl('/manage/caremanage')"
              v-if="permissions=='admin'"
            >显示详细...</span>
            <span class="go" @click="gourl('/fostercare/my')" v-else>我要寄养...</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:8}" :md="{span:24}">
        <div class="pichead">
          <i class="el-icon-chicken icon"></i>
          <span class="titleclass">宝贝照片</span>
        </div>
        <el-row :gutter="20" class="row">
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/cat1.png" class="picture">
          </el-col>
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/dog1.png" class="picture">
          </el-col>
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/pig1.png" class="picture">
          </el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/cat2.png" class="picture">
          </el-col>
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/dog2.png" class="picture">
          </el-col>
          <el-col :span="8">
            <img src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/pig2.png" class="picture">
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="{span:16}" :md="{span:24}">
        <div class="pichead">
          <i class="el-icon-menu icon"></i>
          <span class="titleclass">销售图表</span>
        </div>
        <v-chart :options="options" autoresize class="chart"></v-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:8}" :md="{span:24}">
        <div class="userdiv">
          <div class="userhead">
            <i class="el-icon-date icon"></i>
            <span class="titleclass">用户活动</span>
          </div>
          <div>
            <div class="user userhead" v-for="(item,index) in userdata" :key="{index}">
              <div>
                <span>会员</span>
                <span class="usernamecolor join">{{item.nickname}}</span>
                <span class="join">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="join">{{item.regday}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="{span:16}" :md="{span:24}">
        <div class="userdiv">
          <div class="userhead">
            <i class="el-icon-s-grid icon"></i>
            <span class="titleclass">今日推荐</span>
          </div>
          <el-table :data="data" stripe highlight-current-row style="padding:7px 0;">
            <el-table-column
              label="图片"
              width="100px"
              prop="id"
              align="center"
              header-align="center"
            >
              <template slot-scope="scope">
                <el-image style="width: 50px; height: 50px" :src="scope.row.picture" fit="full"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              label="商品信息"
              prop="name"
              width="400px"
              align="center"
              header-align="center"
            ></el-table-column>
            <el-table-column label="价格" prop="price" align="center" header-align="center"></el-table-column>
            <el-table-column label="库存" prop="num" align="center" header-align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permissions: "",
      totalorder: 0,
      totalmoeny: 0,
      totaluser: 0,
      totalcare: 0,
      options: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      },
      data: [],
      userdata: [{ nickname: "123", regday: "2007-08-05" },{ nickname: "123", regday: "2007-08-05" }, ]
    };
  },
  created() {
    this.permissions = this.$store.state.permissions;
    this.getnums();
  },
  methods: {
    getnums() {
      this.axios
        .get("/api/getindex")
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.totalorder = results.totalorder;
            this.totalmoeny = results.totalmoeny;
            this.totaluser = results.totaluser;
            this.totalcare = results.totalcare;
          }
          return this.axios.get("/api/getrecommended");
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.data = results;
          }
          return this.axios.get("/api/getuseractivity");
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.userdata = results;
            for (let i in this.userdata) {
              this.userdata[i].regday = this.moment(
                this.userdata[i].regday
              ).format("YYYY-MM-DD");
            }
          }
          return this.axios.get("/api/getsales");
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.options = results;
          }
        });
    },
    gourl(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.headfootdiv {
  padding-left: 10px;
}
.titleicon {
  opacity: 0.3;
  transition: all 1s;
}
.titleicon:hover {
  opacity: 0.95;
}
.icondiv {
  background: #2786c5;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 35px;
}
.carddiv {
  color: #ffffff;
  background: rgb(53, 143, 201);
  border-radius: 10px;
  line-height: 35px;
}
.icon {
  font-size: 16px;
}
.titleclass {
  margin-left: 10px;
  font-size: 18px;
  font-family: "楷体";
}
.pichead {
  padding-top: 10px;
  padding-bottom: 10px;
}
.picture {
  width: 160px;
  height: 160px;
}
.chart {
  width: 100%;
}
.userhead {
  padding: 10px;
}
.join {
  margin-left: 10px;
}
.user {
  line-height: 20px;
  background: #ffffff;
  font-family: "楷体";
  border-bottom: 1px solid #dddddd;
}
.userdiv {
  background: #e4e0e0;
  border-radius: 10px;
  border: 1px solid #dddddd;
}
.usernamecolor {
  color: rgb(119, 193, 232);
}
.go {
  cursor: pointer;
}
.row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>