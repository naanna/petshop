<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="6" :xs="{span:12}">
        <div class="card-box">
          <div class="padding-left-10">
            <span>订单总数</span>
          </div>
          <div class="card-icon-box">
            <i class="el-icon-shopping-cart-full card-title-icon"></i>
            <span>{{totalorder}}</span>
          </div>
          <div class="padding-left-10">
            <span class="go" @click="goUrl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="goUrl('/pet/goods')" v-else>我要下单...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="card-box">
          <div class="padding-left-10">
            <span>销售总额</span>
          </div>
          <div class="card-icon-box">
            <i class="el-icon-money card-title-icon"></i>
            <span>{{totalmoeny}}</span>
          </div>
          <div class="padding-left-10">
            <span class="go" @click="goUrl('/manage/order')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="goUrl('/pet/index')" v-else>我要购买...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="card-box">
          <div class="padding-left-10">
            <span>会员总数</span>
          </div>
          <div class="card-icon-box">
            <i class="el-icon-user card-title-icon"></i>
            <span>{{totaluser}}</span>
          </div>
          <div class="padding-left-10">
            <span class="go" @click="goUrl('/customer/index')" v-if="permissions=='admin'">显示详细...</span>
            <span class="go" @click="goUrl('/shpping/person')" v-else>查看我的...</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="{span:12}">
        <div class="card-box">
          <div class="padding-left-10">
            <span>寄养总数</span>
          </div>
          <div class="card-icon-box">
            <i class="el-icon-box card-title-icon"></i>
            <span>{{totalcare}}</span>
          </div>
          <div class="padding-left-10">
            <span
              class="go"
              @click="goUrl('/manage/caremanage')"
              v-if="permissions=='admin'"
            >显示详细...</span>
            <span class="go" @click="goUrl('/fostercare/my')" v-else>我要寄养...</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:10}" :md="{span:24}">
        <div class="second-head-box">
          <i class="el-icon-chicken icon"></i>
          <span class="title">宠物萌照</span>
        </div>
        <el-row :gutter="20" class="row">
          <el-col :span="8" v-for="(item,index) in picturelist" :key="index">
            <el-image class="picture" :src="item" :preview-src-list="[item]"></el-image>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="{span:14}" :md="{span:24}">
        <div class="second-head-box">
          <i class="el-icon-menu icon"></i>
          <span class="title">销售图表</span>
        </div>
        <v-chart :options="options" autoresize class="chart"></v-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:10}" :md="{span:24}">
        <div class="user-box">
          <div class="third-head-box">
            <i class="el-icon-date icon"></i>
            <span class="title">用户活动</span>
          </div>
          <div>
            <div class="user third-head-box" v-for="(item,index) in userdata" :key="index">
              <div>
                <span>会员</span>
                <span class="user-name margin-left-10">{{item.nickname}}</span>
                <span class="margin-left-10">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="margin-left-10">{{item.regday}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="{span:14}" :md="{span:24}">
        <div class="user-box">
          <div class="third-head-box">
            <i class="el-icon-s-goods icon"></i>
            <span class="title">今日推荐</span>
          </div>
          <el-table :data="data" stripe highlight-current-row style="padding-top:10px;">
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
              min-width="280px"
              align="center"
              header-align="center"
            ></el-table-column>
            <el-table-column label="价格" prop="price" align="center" header-align="center"></el-table-column>
            <el-table-column label="库存" prop="num" align="center" header-align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :lg="{span:10}" :md="{span:24}">
        <div class="user-box">
          <div class="third-head-box">
            <i class="el-icon-sunrise icon"></i>
            <span class="title">天气预报</span>
            <AreaSelection style="float:right;margin-top: -4px;" @adcode="getAdCode"></AreaSelection>
          </div>
          <el-row class="weather" v-for="(item,index) in weatherdata.casts" :key="index">
            <el-col :span="6">{{item.date.split('-').slice(2)[0]}}日({{getTimestr(item.week)}})</el-col>
            <el-col :span="6" style="display:flex;justify-content:center;">
              <span style="display:flex;align-items:center;">
                <i :class="getWeatherIcon(item.dayweather)" style="font-size:30px;"></i>
                {{item.dayweather}}
              </span>
              <span
                v-if="item.dayweather!=item.nightweather"
                style="display:flex;align-items:center;"
              >
                <span>转</span>
                <i :class="getWeatherIcon(item.nightweather)" style="font-size:30px;"></i>
                {{item.nightweather}}
              </span>
            </el-col>
            <el-col :span="6">{{item.nighttemp}}℃～{{item.daytemp}}℃</el-col>
            <el-col :span="6">{{item.daywind}}</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="{span:14}" :md="{span:24}">
        <div class="user-box">
          <div class="third-head-box">
            <i class="el-icon-date icon"></i>
            <span class="title">日程活动</span>
          </div>
          <el-calendar>
            <template slot="dateCell" slot-scope="{date, data}">
              <p :style="data.isSelected ? 'color:#409EFF;' : ''">
                {{ data.day.split('-').slice(2)[0] }}{{ data.isSelected ? '✔️' : ''}}
                <br />
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="dealMyDate(data.day)"
                  placement="bottom"
                >
                  <span>{{dealMyDate(data.day).length>4?dealMyDate(data.day).slice(0,4)+"...":dealMyDate(data.day)}}</span>
                </el-tooltip>
              </p>
            </template>
          </el-calendar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AreaSelection from "@common/AreaSelection.vue";
import Util from "@assets/Util.js";
export default {
  components: {
    AreaSelection
  },
  data() {
    return {
      weatheradcode: "350121",
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
      userdata: [
        { nickname: "木木周", regday: "2007-08-05" },
        { nickname: "木木周", regday: "2007-08-05" }
      ],
      picturelist: [
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/cat1.png",
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/dog1.png",
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/pig1.png",
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/cat2.png",
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/dog2.png",
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/pig2.png"
      ],
      calendarDate: [],
      weatherdata: {}
    };
  },
  created() {
    this.permissions = this.$store.state.permissions;
    this.getNums();
    this.getWeather();
    this.getSchedule();
  },
  methods: {
    //获取日历活动安排
    getSchedule() {
      this.axios.get("/api/schedule/get").then(res => {
        if (res.data.success) {
          res.data.message.map(item => {
            item.day = this.moment(item.day).format("YYYY-MM-DD");
          });
        }
        this.calendarDate = res.data.message;
      });
    },
    //高德地图接口获取天气预报
    getWeather() {
      this.axios("gaode/v3/weather/weatherInfo?parameters", {
        params: {
          key: "8bbfdf6309caef7066348deed2e1f503",
          city: this.weatheradcode,
          extensions: "all"
        }
      }).then(res => {
        if (res.data.status == 1) {
          this.weatherdata = res.data.forecasts[0];
        }
      });
    },
    getAdCode(value) {
      this.weatheradcode = value[2];
      this.getWeather();
    },
    getTimestr(i) {
      return Util.getTimestr(i);
    },
    getWeatherIcon(i) {
      return Util.getWeatherIcon(i);
    },
    dealMyDate(v) {
      let len = this.calendarDate.length;
      let res = "";
      for (let i = 0; i < len; i++) {
        if (this.calendarDate[i].day == v) {
          res = this.calendarDate[i].textarea;
          break;
        }
      }
      return res;
    },
    getNums() {
      this.axios
        .get("/api/index/getnum")
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.totalorder = results.totalorder;
            this.totalmoeny = results.totalmoeny;
            this.totaluser = results.totaluser;
            this.totalcare = results.totalcare;
          }
          return this.axios.get("/api/index/getrecommended");
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.data = results;
          }
          return this.axios.get("/api/index/getuseractivity");
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
          return this.axios.get("/api/index/getsales");
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.options = results;
          }
        });
    },
    goUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.padding-left-10 {
  padding-left: 10px;
}
.card-title-icon {
  opacity: 0.3;
  transition: all 1s;
}
.card-title-icon:hover {
  opacity: 0.95;
}
.card-icon-box {
  background: #2786c5;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 35px;
}
.card-box {
  color: #ffffff;
  background: rgb(53, 143, 201);
  border-radius: 10px;
  line-height: 35px;
}
.icon {
  font-size: 16px;
}
.title {
  margin-left: 10px;
  font-size: 18px;
  font-family: "楷体";
}
.second-head-box {
  padding: 10px 0;
}
.picture {
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
}
.chart {
  width: 100%;
}
.third-head-box {
  padding: 10px;
}
.margin-left-10 {
  margin-left: 10px;
}
.user {
  line-height: 20px;
  background: #ffffff;
  font-family: "楷体";
  border-bottom: 1px solid #dddddd;
}
.user-box {
  background: #ebeff3;
  border-radius: 10px;
  border: 1px solid #dddddd;
}
.user-name {
  color: rgb(119, 193, 232);
}
.go {
  cursor: pointer;
}
.row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.weather {
  background: #ffffff;
  font-size: 18px;
  text-align: center;
  color: #767676;
  padding: 20px;
  display: flex;
  align-items: center;
}
</style>