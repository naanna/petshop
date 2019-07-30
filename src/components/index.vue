<template>
  <div>
    <div class="__p_2365_uid_294">
      <div class="__p_2365_uid_296">
        <div class="__p_2365_uid_303">
          <div class="__p_2365_uid_331">
            <span>订单总数</span>
          </div>
          <div class="__p_2365_uid_377">
            <i class="el-icon-shopping-cart-full __p_2365_uid_378"></i>
            <span class="__p_2365_uid_379">0</span>
          </div>
          <div class="__p_2365_uid_332">
            <span>显示详细...</span>
          </div>
        </div>
        <div class="__p_2365_uid_303">
          <div class="__p_2365_uid_331">
            <span>销售总额</span>
          </div>
          <div class="__p_2365_uid_377">
            <i class="el-icon-money __p_2365_uid_378"></i>
            <span class="__p_2365_uid_379">0</span>
          </div>
          <div class="__p_2365_uid_332">
            <span>显示详细...</span>
          </div>
        </div>
        <div class="__p_2365_uid_303">
          <div class="__p_2365_uid_331">
            <span>会员总数</span>
          </div>
          <div class="__p_2365_uid_377">
            <i class="el-icon-user __p_2365_uid_378"></i>
            <span class="__p_2365_uid_379">0</span>
          </div>
          <div class="__p_2365_uid_332">
            <span>显示详细...</span>
          </div>
        </div>
        <div class="__p_2365_uid_303">
          <div class="__p_2365_uid_331">
            <span>代售总数</span>
          </div>
          <div class="__p_2365_uid_377">
            <i class="el-icon-box __p_2365_uid_378"></i>
            <span class="__p_2365_uid_379">0</span>
          </div>
          <div class="__p_2365_uid_332">
            <span>显示详细...</span>
          </div>
        </div>
      </div>
      <div class="__p_2365_uid_297">
        <div class="__p_2365_uid_307">
          <div class="__p_2365_uid_309">
            <i class="el-icon-chicken __p_2365_uid_313"></i>
            <span class="__p_2365_uid_314">宝贝照片</span>
          </div>
          <div class="__p_2365_uid_310">
            <img src="../assets/picture/cat1.png" class="__p_2365_uid_405" />
            <img src="../assets/picture/dog1.png" class="__p_2365_uid_405" />
            <img src="../assets/picture/pig1.png" class="__p_2365_uid_405" />
            <img src="../assets/picture/cat2.png" class="__p_2365_uid_408" />
            <img src="../assets/picture/dog2.png" class="__p_2365_uid_408" />
            <img src="../assets/picture/pig2.png" class="__p_2365_uid_408" />
          </div>
        </div>
        <div class="__p_2365_uid_308">
          <div class="__p_2365_uid_311">
            <i class="el-icon-menu __p_2365_uid_313"></i>
            <span class="__p_2365_uid_314">销售图表</span>
          </div>
          <div class="__p_2365_uid_312">
            <!-- <v-chart :options="options" autoresize class="__p_2365_uid_318"></v-chart> -->
          </div>
        </div>
      </div>
      <div class="__p_2365_uid_298">
        <div class="__p_2365_uid_319">
          <div class="__p_2365_uid_360">
            <i class="el-icon-date __p_2365_uid_313"></i>
            <span class="__p_2365_uid_314">用户活动</span>
          </div>
          <div>
            <div class="__p_2365_uid_412">
              <div>
                <span class="usernamecolor">壮壮</span>
                <span class="__p_2365_uid_419">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="__p_2365_uid_422">2019-07-29 20:37:14</span>
              </div>
            </div>
            <div class="__p_2365_uid_412">
              <div>
                <span class="usernamecolor">壮壮</span>
                <span class="__p_2365_uid_419">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="__p_2365_uid_422">2019-07-29 20:37:14</span>
              </div>
            </div>
            <div class="__p_2365_uid_412">
              <div>
                <span class="usernamecolor">壮壮</span>
                <span class="__p_2365_uid_419">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="__p_2365_uid_422">2019-07-29 20:37:14</span>
              </div>
            </div>
            <div class="__p_2365_uid_412">
              <div>
                <span class="usernamecolor">壮壮</span>
                <span class="__p_2365_uid_419">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="__p_2365_uid_422">2019-07-29 20:37:14</span>
              </div>
            </div>
            <div class="__p_2365_uid_412">
              <div>
                <span class="usernamecolor">壮壮</span>
                <span class="__p_2365_uid_419">加入我们</span>
              </div>
              <div>
                <i class="el-icon-time"></i>
                <span class="__p_2365_uid_422">2019-07-29 20:37:14</span>
              </div>
            </div>
          </div>
        </div>
        <div class="__p_2365_uid_320">
          <div class="__p_2365_uid_361">
            <i class="el-icon-upload __p_2365_uid_313"></i>
            <span class="__p_2365_uid_314">最新订单</span>
          </div>
          <el-table :data="data" stripe highlight-current-row class="__p_2365_uid_326">
            <el-table-column label="订单号" prop="id" align="right" header-align="center"></el-table-column>
            <el-table-column label="客户名称" prop="id" align="center" header-align="center"></el-table-column>
            <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
            <el-table-column label="生成日期" prop="id" align="center" header-align="center"></el-table-column>
            <el-table-column label="金额" prop="id" align="center" header-align="center"></el-table-column>
            <el-table-column label="管理" prop="id" align="center" header-align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        title: {
          text: "图表示例",
          x: "center"
        },
        series: [
          {
            name: "图标示例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: 335,
                name: "标签1"
              },
              {
                value: 310,
                name: "标签2"
              },
              {
                value: 234,
                name: "标签3"
              },
              {
                value: 135,
                name: "标签4"
              },
              {
                value: 1548,
                name: "标签5"
              }
            ]
          }
        ]
      },
      data: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    };
  },
  // created() {

  // }
};
</script>
<style scoped>
.__p_2365_uid_331 {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border-radius: 10px;
}

.__p_2365_uid_378 {
  font-size: 35px;
  opacity: 0.3;
  transition: all 1s;
}
.__p_2365_uid_378:hover {
  opacity: 0.95;
}
.__p_2365_uid_379 {
  font-size: 35px;
}

.__p_2365_uid_377 {
  background: #2786c5;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 35px;
  justify-content: space-between;
}

.__p_2365_uid_332 {
  padding-left: 10px;
  border-radius: 10px;
}

.__p_2365_uid_303 {
  background: rgb(53, 143, 201);
  flex: 1;
  border-radius: 10px;
  line-height: 35px;
  margin-right: 30px;
}

.__p_2365_uid_383 {
  background: #2786c5;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 35px;
  justify-content: space-between;
}

.__p_2365_uid_296 {
  color: #ffffff;
  display: flex;
  line-height: 24px;
}

.__p_2365_uid_313 {
  font-size: 16px;
}

.__p_2365_uid_314 {
  font-size: 16px;
  margin-left: 10px;
}

.__p_2365_uid_309 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.__p_2365_uid_405 {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
  margin-right: 30px;
}

.__p_2365_uid_408 {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
  margin-top: 30px;
  margin-right: 30px;
}

.__p_2365_uid_310 {
  margin-top: 10px;
  padding-left: 20px;
}

.__p_2365_uid_307 {
  flex: 1;
}

.__p_2365_uid_311 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.__p_2365_uid_318 {
  width: 100%;
}

.__p_2365_uid_312 {
  margin-top: 10px;
}

.__p_2365_uid_308 {
  flex: 1;
  margin-left: 20px;
}

.__p_2365_uid_297 {
  display: flex;
  margin-top: 30px;
}

.__p_2365_uid_360 {
  background: #e4e0e0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.__p_2365_uid_419 {
  margin-left: 10px;
}

.__p_2365_uid_422 {
  margin-left: 10px;
}

.__p_2365_uid_412 {
  line-height: 20px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
}

.__p_2365_uid_426 {
  margin-left: 10px;
}

.__p_2365_uid_429 {
  margin-left: 10px;
}

.__p_2365_uid_319 {
  background: #ffffff;
  flex: 1;
}

.__p_2365_uid_361 {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.__p_2365_uid_326 {
  margin-top: 5px;
}

.__p_2365_uid_320 {
  background: #ffffff;
  flex: 1;
  margin-left: 20px;
}

.__p_2365_uid_298 {
  display: flex;
  margin-top: 30px;
}

.__p_2365_uid_294 {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
}

.usernamecolor {
  color: rgb(119, 193, 232);
}
</style>