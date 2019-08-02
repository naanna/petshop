<template>
  <div>
    <span class="__p_2363_uid_239">订单管理</span>
    <div style="  margin-top: 20px;">
      <el-select size="small" class="__p_2363_uid_262" v-model="type">
        <el-option value="订单号" label="订单号"></el-option>
        <el-option value="购物者" label="购物者"></el-option>
        <el-option value="订单日期" label="订单日期"></el-option>
      </el-select>
      <el-date-picker
        v-if="type=='订单日期'"
        v-model="historydata"
        type="daterange"
        class="timerang"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-input
        v-if="type!='订单日期'"
        placeholder="请输入搜索内容"
        type="text"
        size="small"
        class="__p_2363_uid_263"
      ></el-input>
      <el-button type="primary" size="small" v-model="searchval">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="__p_2363_uid_252">
      <el-table-column label="购物订单号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="总价" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="购物日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="购物者" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="godetail">详情</el-button>
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
      historydata: "",
      type: "订单号",
      searchval: "",
      tabledata: [{ id: "1" }],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  methods: {
    go2Query() {
      console.log(this.page_no);
    },
    godel() {
      this.$confirm("您确定要删除本条购物记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功删除");
        })
        .catch(() => {});
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
.__p_2363_uid_239 {
  font-size: 25px;
}

.__p_2363_uid_262 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
}

.__p_2363_uid_263 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
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

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>