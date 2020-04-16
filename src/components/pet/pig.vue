<template>
  <div>
    <div class="pig-button-box">
      <div style="display:inline-block;">
        <el-button type="primary" size="small" @click="goSeeOut">查看售出</el-button>
        <el-button type="primary" size="small" @click="goSeeIn">查看在售</el-button>
      </div>
      <div style="display:inline-block;">
        <input
          type="text"
          placeholder="¥"
          v-model.number="money1"
          size="small"
          class="el-input__inner inputwidth"
          oninput="value=value.replace(/[^\d]/g,'');if(value.length>10)value=value.slice(0,10)"
        />
        <span style="margin-left:5px;margin-right:5px;">-</span>
        <input
          type="text"
          placeholder="¥"
          v-model.number="money2"
          size="small"
          class="el-input__inner inputwidth"
          oninput="value=value.replace(/[^\d]/g,'');if(value.length>10)value=value.slice(0,10)"
        />
        <el-button type="primary" size="small" style="margin-left:10px;" @click="goSearch">搜索</el-button>
      </div>
    </div>
    <div v-if="tableData.length!=0">
      <div class="pig-list-box" @click="goDetail(item)" v-for="item in tableData">
        <div v-if="!seeOut">
          <i class="el-icon-shopping-cart-2 pig-shopcar" @click.stop="goAddShop(item)"></i>
          <el-button
            v-if="item.collect"
            type="danger"
            size="mini"
            class="pig-collect"
            icon="el-icon-star-off"
            @click.stop="goNoCollect(item)"
          ></el-button>
          <el-button
            v-else
            class="pig-collect"
            size="mini"
            icon="el-icon-star-off"
            plain
            @click.stop="goCollect(item)"
          ></el-button>
        </div>
        <el-image class="pig-picture" :src="item.picture" fit="fill"></el-image>
        <span class="pig-title">{{item.name}}</span>
        <div class="pig-info-box">
          <span class="pig-info">{{item.variety}}</span>
          <span class="pig-info">{{item.age}}</span>
        </div>
        <div class="pig-info-box">
          <span class="pig-info" v-if="item.status=='saled'">售出</span>
          <span class="pig-info" v-else>在售</span>
          <span class="pig-info">{{item.price}}</span>
        </div>
      </div>
    </div>
    <el-card class="box-card pig-card-box" v-else>
      <div slot="header" class="clearfix">
        <span>告示</span>
      </div>
      <p>暂无符合搜索要求的的宠物</p>
    </el-card>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[10,20,40,50]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="fyclass"
    ></el-pagination>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import detail from "./detail.vue";
import Util from "@assets/Util.js";
export default {
  components: {
    Dialog
  },
  name: "pig",
  data() {
    return {
      money1: "",
      money2: "",
      total: 0,
      page_no: 1,
      page_size: 10,
      seeOut: false,
      tableData: [{}],
      collectObs: []
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makeQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.seeOut) {
        query.index = "status = 'saled' and type='pig'";
      } else {
        query.index = "status ='saling' and type='pig'";
      }
      if (this.money1 != "" && this.money2 == "") {
        query.small = this.money1;
      } else if (this.money1 == "" && this.money2 != "") {
        query.big = this.money2;
      } else if (this.money1 > this.money2) {
        let money = this.money2;
        this.money2 = this.money1;
        this.money1 = money;
        query.small = this.money1;
        query.big = this.money2;
      } else if (this.money1 != "" && this.money2 != "") {
        query.small = this.money1;
        query.big = this.money2;
      }
      return query;
    },
    goQuery() {
      const query = this.makeQuery();
      this.axios
        .get("/api/pet/get", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
            for (let i in this.tableData) {
              this.$set(this.tableData[i], "collect", false);
              var now = this.moment(
                this.moment(new Date()).format("YYYY-MM-DD")
              );
              var age = Util.displayAge(this.tableData[i].birthday, now);
              this.tableData[i].age = age;
            }
            return this.axios.get("/api/collect/get", {
              params: {
                username: this.$store.state.username
              }
            });
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data.message;
            this.collectObs = results
              .filter(item => item.status == "saling")
              .map(item => {
                return item.petid;
              });
            this.tableData.filter((item, index) => {
              if (this.collectObs.includes(item.petid)) {
                item.collect = true;
                return this.collectObs.includes(item.petid);
              }
            });
          }
        });
    },
    goSearch() {
      this.page_no = 1;
      this.goQuery();
    },
    goCollect(row) {
      this.axios
        .post("/api/collect/add", {
          username: this.$store.state.username,
          petid: row.petid
        })
        .then(res => {
          if (res.data.success) {
            row.collect = true;
            this.$message.success("加入收藏!");
          }
        });
    },
    goNoCollect(row) {
      this.axios
        .delete("/api/collect/delete", {
          data: {
            username: this.$store.state.username,
            petid: row.petid
          }
        })
        .then(res => {
          if (res.data.success) {
            row.collect = false;
            this.$message.success("取消收藏!");
          }
        });
    },
    goSeeOut() {
      this.page_no = 1;
      this.money1 = "";
      this.money2 = "";
      this.seeOut = true;
      this.goQuery();
    },
    goSeeIn() {
      this.page_no = 1;
      this.seeOut = false;
      this.money1 = "";
      this.money2 = "";
      this.goQuery();
    },
    goAddShop(row) {
      this.$confirm("确定加入购物车?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .post("/api/shopcar/add", {
              petid: row.petid,
              username: this.$store.state.username
            })
            .then(res => {
              if (res.data.success) {
                if (res.data.message == "宠物已达上限") {
                  this.$message.warning("购物车中数量已达最大库存！");
                } else {
                  this.$message.success("成功加入购物车！");
                }
              }
            });
        })
        .catch(() => {});
    },
    goDetail(row) {
      this.Dialog.title("宠物详情")
        .width("500px")
        .currentView(detail, { row })
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
    }
  }
};
</script>

<style scoped>
.inputwidth {
  height: 32px;
  line-height: 32px;
  width: 70px;
}
.pig-shopcar {
  cursor: pointer;
  position: absolute;
  display: none;
}
.pig-list-box:hover .pig-shopcar {
  display: block;
}
.pig-picture {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}
.pig-collect {
  float: right;
  padding: 2px 5px;
}
.pig-list-box .pig-picture:hover {
  transform: scale(1.4);
}
.pig-title {
  font-size: 30px;
  font-family: "jelly";
  color: #67b4fc;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.pig-info {
  color: #6e6b6b;
  font-family: "jelly";
  font-size: 20px;
}
.pig-info-box {
  display: flex;
  line-height: 25px;
  justify-content: space-between;
  padding-right: 10px;
}
.pig-list-box {
  cursor: pointer;
  width: 200px;
  height: 220px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 24px;
  padding-top: 5px;
  margin-top: 30px;
}
.pig-button-box {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}
.pig-card-box {
  width: 300px;
  text-align: center;
  margin: 50px auto;
}
</style>
