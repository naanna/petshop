<template>
  <div>
    <span class="fontclass">管理员</span>
    <el-row>
      <el-col :span="6" v-for="(o, index) in 8" :key="o">
        <el-card class="card" shadow="hover">
          <i class="el-icon-close close" @click="godel"></i>
          <el-image class="image" :src="url" :preview-src-list="arr"></el-image>
          <div style="padding: 14px;">
            <span style=" display: block; text-align: center;">好吃的汉堡</span>
            <span class="admin">管理员</span>
            <div class="flexclass">
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
      class="pageclass"
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
  name: "admin",
  data() {
    return {
      switchvalue: true,
      arr: [],
      url:
        "https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/mmzdtx1565004868180",
      total: 0,
      page_no: 1,
      page_size: 10,
      tabledata: [{ id: 2 }, { id: 2 }, { id: 2 }]
    };
  },
  created() {
    this.arr = [this.url];
  },
  //编辑功能页面待修改
  //踢他下线功能待验证
  methods: {
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
      this.$confirm("确认删除该管理员账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {})
        .catch(() => {});
    },
    godetail() {
      this.rjDialog
        .title("详情信息")
        .width("450px")
        .currentView(detail, {})
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

.flexclass {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
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

.image {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
}
.pageclass {
  margin-top: 20px;
  text-align: right;
}
</style>
