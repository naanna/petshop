<template>
  <div class="fostercare-box">
    <p class="ruleclass center">寄养观赏区</p>
    <div class="fostercare-pircture-box" @click="goDetail(item)" v-for="item in tableData">
      <el-image class="fostercare-pircture" :src="item.picture" fit="fill"></el-image>
      <span class="fostercare-name">{{item.name}}</span>
      <div class="fostercare-info-box">
        <span class="fostercare-text">{{item.variety}}</span>
        <span class="fostercare-text">{{item.age}}</span>
      </div>
    </div>
    <el-card class="box-card fostercare-card-box" v-if="tableData.length==0">
      <div slot="header" class="clearfix">
        <span>告示</span>
      </div>
      <p>目前暂无宠物寄养，敬请期待</p>
    </el-card>
    <el-pagination
      v-else
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[10,20,50,100]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="pageclass"
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
  name: "index",
  data() {
    return {
      tableData: [],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        index: "status ='caring'"
      };
      return query;
    },
    goQuery() {
      const query = this.makePendingQuery();
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
              var now = this.moment(
                this.moment(new Date()).format("YYYY-MM-DD")
              );
              var age = Util.displayAge(this.tableData[i].birthday, now);
              this.tableData[i].age = age;
            }
          }
        });
    },
    errorHandler() {
      return true;
    },
    goDetail(row) {
      this.Dialog.title("宠物详情")
        .width("450px")
        .currentView(detail, { row })
        .then(data => {})
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
.pageclass {
  margin-top: 20px;
  margin-right: 40px;
  text-align: right;
}
.fostercare-name {
  font-size: 16px;
  color: #d69191;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.fostercare-text {
  color: #6ec8f5;
}
.fostercare-info-box {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
  margin-top: 10px;
}
.fostercare-pircture-box {
  cursor: pointer;
  width: 190px;
  height: 180px;
  border: 1px solid #dddddd;
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 24px;
  padding-top: 5px;
  margin-top: 30px;
}
.fostercare-pircture {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}
.fostercare-pircture-box .fostercare-pircture:hover {
  transform: scale(1.4);
}
.ruleclass {
  background: linear-gradient(to right, #ffa264, #ff3b5f);
  -webkit-background-clip: text;
  font-size: 100px;
  margin-top: 0px;
  margin-bottom: 15px;
  font-family: "jelly";
  color: transparent;
}
.fostercare-card-box {
  width: 300px;
  text-align: center;
  margin: 50px auto;
}
.fostercare-box {
  min-width: 800px;
}
</style>
