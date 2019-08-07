<template>
  <div class="__p_C7_u_238">
    <span class="fontclass">全部客户</span>
    <el-row>
      <el-col :span="6" v-for="(o, index) in 8" :key="o">
        <el-card class="card" shadow="hover">
          <i class="el-icon-close close" @click="godel"></i>
          <el-image class="image" :src="url" :preview-src-list="arr"></el-image>
          <div style="padding: 14px;">
            <span style=" display: block; text-align: center;">好吃的汉堡</span>
            <span class="admin">高级vip</span>
            <div class="__p_Cc_u_18">
              <el-button
                type="primary"
                plain
                size="mini"
                icon="el-icon-edit"
                @click="goupdate('row')"
              ></el-button>
              <el-switch v-model="switchvalue" disabled></el-switch>
              <el-button type="info" size="mini" plain icon="el-icon-postcard" @click="godetail"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[10,20,50,100]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="__p_C7_u_260"
    ></el-pagination>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import add_update from "./useradd_update.vue";
import detail from "./detail.vue";
export default {
  components: {
    rjDialog
  },
  name: "vip",
  data() {
    return {
      type: "名字",
      switchvalue: true,
      arr: [],
      url:
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/touxiang1.jpg",
      total: 0,
      page_no: 1,
      page_size: 10,
      tabledata: [{ id: 2 }, { id: 2 }, { id: 2 }]
    };
  },
  created() {
    this.go2Query();
    this.arr = [this.url];
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.type == "名字" && this.searchval != "") {
        query.name = this.searchval;
      }

      if (this.type == "注册日期" && this.historydata != "") {
        var regdaystart = this.moment(this.historydata[0]).format("YYYY-MM-DD");
        var regdayend = this.moment(this.historydata[1]).format("YYYY-MM-DD");
        query.regday = [regdaystart, regdayend];
      }
      if (this.type == "生日" && this.historydata != "") {
        var birthdaystart = this.moment(this.historydata[0]).format(
          "YYYY-MM-DD"
        );
        var birthdayend = this.moment(this.historydata[1]).format("YYYY-MM-DD");
        query.birthday = [birthdaystart, birthdayend];
      }
      return query;
    },
    go2Query() {
      let query = this.makependingquery();
      console.log(query);
      this.axios
        .get("/api/getalluser", {
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
              this.tabledata[i].birthday = this.moment(
                this.tabledata[i].birthday
              ).format("YYYY-MM-DD");
              this.tabledata[i].regday = this.moment(
                this.tabledata[i].regday
              ).format("YYYY-MM-DD");
            }
          }
        });
    },
    goadd() {
      this.rjDialog
        .title("添加客户")
        .width("500px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    goupdate(row) {
      this.rjDialog
        .title("编辑信息")
        .width("500px")
        .currentView(add_update, { row })
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    godel() {
      this.$confirm("确认删除该客户账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {})
        .catch(() => {});
    },
    godetail() {
      var customer = "customer";
      this.rjDialog
        .title("详情信息")
        .width("450px")
        .currentView(detail, { customer })
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
    }
  }
};
</script>

<style scoped>
.close {
  cursor: pointer;
  float: right;
  display: none;
}
.card:hover .close {
  display: block;
}

.card {
  margin-top: 40px;
  margin-left: 40px;
}
.admin {
  font-size: 13px;
  margin-top: 13px;
  color: #999;
  display: block;
  text-align: center;
}
.__p_Cc_u_18 {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.image {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
}
.__p_C7_u_278 {
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_280 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_281 {
  width: 200px;
  margin-left: 10px;
}

.__p_C7_u_282 {
  margin-left: 10px;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.__p_C7_u_277 {
  margin-top: 20px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
</style>
