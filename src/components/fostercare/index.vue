<template>
  <div style="margin-left:20px;">
    <div style="text-align: center;">
      <p class="ruleclass">寄养观赏区</p>
    </div>
    <div class="picdiv" @click="godetail(item)" v-for="item in tabledata">
      <el-image class="pic" :src="item.picture" fit="fill"></el-image>
      <span class="name">{{item.name}}</span>
      <div class="ifno">
        <span class="text">{{item.variety}}</span>
        <span class="text">{{item.age}}</span>
      </div>
    </div>

    <el-pagination
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
import Dialog from "../dialog.vue";
import detail from "./detail.vue";
import Util from "@assets/Util.js";
export default {
  components: {
    Dialog
  },
  name: "index",
  data() {
    return {
      tabledata: [],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size,
        index: "status ='caring'"
      };
      return query;
    },
    goquery() {
      const query = this.makependingquery();
      this.axios
        .get("/api/getpet", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tabledata = results.message;
            this.total = results.total;
            for (let i in this.tabledata) {
              var now = this.moment(
                this.moment(new Date()).format("YYYY-MM-DD")
              );
              var age = Util.displayAge(this.tabledata[i].birthday, now);
              this.tabledata[i].age = age;
            }
          }
        });
    },
    errorHandler() {
      return true;
    },
    godetail(row) {
      this.Dialog
        .title("宠物详情")
        .width("450px")
        .currentView(detail, { row })
        .then(data => {})
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
    }
  }
};
</script>

<style scoped>
.pageclass {
  margin-top: 40px;
  margin-right: 40px;
  text-align: right;
}

.name {
  font-size: 16px;
  color: #d69191;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.text {
  color: #6ec8f5;
}

.ifno {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  padding-right: 10px;
  margin-top: 10px;
}

.picdiv {
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
.pic {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  transition: all 0.6s;
}

.picdiv .pic:hover {
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
</style>
