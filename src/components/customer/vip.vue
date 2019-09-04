<template>
  <div>
    <span class="fontclass">全部客户</span>
    <el-row>
      <el-col :span="6" v-for="(item, index) in tabledata" :key="index">
        <el-card class="card" shadow="hover">
          <i class="el-icon-close close" @click="godel((item.username))"></i>
          <el-image class="image" :src="item.picture" :preview-src-list="[item.picture]"></el-image>
          <div style="padding: 14px;">
            <span style=" display: block; text-align: center;">{{item.name}}</span>
            <span class="admin" v-if="item.level=='vip1'">初级vip</span>
            <span class="admin" v-else-if="item.level=='vip2'">中级vip</span>
            <span class="admin" v-else>高级vip</span>
            <div class="body1">
              <el-button
                type="primary"
                plain
                size="mini"
                icon="el-icon-edit"
                @click="goupdate(item)"
              ></el-button>
              <el-switch v-model="switchvalue" disabled></el-switch>
              <el-button
                type="info"
                size="mini"
                plain
                icon="el-icon-postcard"
                @click="godetail(item)"
              ></el-button>
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
      class="fyclass"
    ></el-pagination>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import add_update from "./useradd_update.vue";
import detail from "./detail.vue";
export default {
  components: {
    Dialog
  },
  name: "vip",
  data() {
    return {
      switchvalue: true,
      total: 0,
      page_no: 1,
      page_size: 8,
      tabledata: []
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      query.vip = true;
      return query;
    },
    goquery() {
      let query = this.makependingquery();
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
    goupdate(row) {
      this.Dialog
        .title("编辑信息")
        .width("500px")
        .currentView(add_update, { row })
        .then(data => {
          this.goquery();
        })
        .show();
    },
    godel(username) {
      this.$confirm("确认删除该客户账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/deteleuser", {
              data: [{ username: username }]
            })
            .then(res => {
              if (res.data.success) {
                this.goquery();
                this.$message.success("删除成功！");
              }
            });
        })
        .catch(() => {});
    },
    godetail(row) {
      this.Dialog
        .title("详情信息")
        .width("550px")
        .currentView(detail, { row })
        .then(data => {
          this.goquery();
        })
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
.body1 {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.image {
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
}
</style>
