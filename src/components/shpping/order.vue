<template>
  <div>
    <span class="__p_2363_uid_239">我的订单</span>
    <div class="__p_2363_uid_261">
      <el-select size="small" class="__p_2363_uid_262" v-model="type">
        <el-option value="订单号" label="订单号"></el-option>
        <el-option value="种类" label="种类"></el-option>
        <el-option value="价格" label="价格"></el-option>
        <el-option value="订单日期" label="订单日期"></el-option>
      </el-select>
      <el-input placeholder="请输入搜索内容" type="text" size="small" class="__p_2363_uid_263"></el-input>
      <el-button type="primary" size="small" v-model="searchval">搜索</el-button>
    </div>
    <el-table :data="data" stripe border highlight-current-row class="__p_2363_uid_252">
      <el-table-column label=" 订单号  " prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="总价" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="订单类型" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="订单日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="购买者" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="godetail">详情</el-button>
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
import orderdetail from "./orderdetail.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      type: "订单号",
      searchval: "",
      data: [],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  methods: {
    go2Query() {
      console.log(this.page_no);
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
</style>