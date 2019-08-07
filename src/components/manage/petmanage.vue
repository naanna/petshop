<template>
  <div>
    <span class="fontclass">宠物管理</span>
    <div>
      <div class="__p_C7_u_278">
        <el-button type="primary" size="small" @click="goadd">添加宠物</el-button>
        <el-button type="primary" size="small" @click="go2del">批量删除</el-button>
      </div>
      <div class="__p_C7_u_279">
        <el-select size="small" class="__p_2363_uid_262" v-model="type" @change="change">
          <el-option value="编号" label="编号"></el-option>
          <el-option value="状态" label="状态"></el-option>
          <el-option value="种类" label="种类"></el-option>
        </el-select>
        <el-input
          v-if="type=='编号'"
          placeholder="请输入搜索内容"
          v-model="searchval"
          type="text"
          size="small"
          clearable
          class="__p_2363_uid_263"
        ></el-input>
        <el-select v-else clearable size="small" class="__p_2363_uid_262" v-model="searchval">
          <el-option v-if="type=='种类'" value="cat" label="猫咪"></el-option>
          <el-option v-if="type=='种类'" value="dog" label="狗狗"></el-option>
          <el-option v-if="type=='种类'" value="pig" label="香猪"></el-option>
          <el-option v-if="type=='状态'" value="booking" label="代售中"></el-option>
          <el-option v-if="type=='状态'" value="booked" label="代售出"></el-option>
          <el-option v-if="type=='状态'" value="saled" label="售出"></el-option>
          <el-option v-if="type=='状态'" value="saling" label="在售"></el-option>
          <el-option v-if="type=='状态'" value="caring" label="寄养"></el-option>
          <el-option v-if="type=='状态'" value="cared" label="领回"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="__p_2363_uid_252">
      <el-table-column label="编号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="名字" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="年龄" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="种类" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="品种" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="性别" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="godetail">详情</el-button>
          <el-button type="text" size="small" @click="goupdate">编辑</el-button>
          <el-button type="text" size="small" @click="godel">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page_no"
      :page-sizes="[10,20,50,100]"
      :page-size="page_size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      class="__p_2363_uid_260"
    ></el-pagination>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import orderdetail from "../shpping/order/orderdetail.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      type: "编号",
      searchval: "",
      tabledata: [{ id: "1" }],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.searchval != "") {
        if (this.type == "编号") {
          query.petid = this.searchval;
        } else if (this.type == "种类") {
          query.type = this.searchval;
        } else if (this.type == "状态") {
          query.status = this.searchval;
        }
      }

      return query;
    },
    go2Query() {
      const query = this.makependingquery();
      console.log(query);
    },
    godel() {
      this.$confirm("您确定要删除该宠物信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功删除");
        })
        .catch(() => {});
    },
    goadd(){
      console.log("add")},
    go2del(){
      console.log("del")
    },
    goupdate() {
      console.log("edit");
    },
    gosearch() {
      this.page_no = 1;
      this.go2Query();
    },
    change() {
      this.searchval = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
    },
    godetail() {
      this.rjDialog
        .title("订单详情")
        .width("800px")
        .currentView(orderdetail, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    }
  }
};
</script>
<style scoped>
.__p_2363_uid_262 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10px;
}

.__p_2363_uid_263 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10px;
}

.__p_2363_uid_261 {
  margin-top: 20px;
}

.__p_2363_uid_252 {
  margin-top: 10px;
}

.__p_2363_uid_260 {
  margin-top: 20px;
  text-align: right;
}
.__p_C7_u_278 {
  display: inline-block;
  margin-top:20px;
}
.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>