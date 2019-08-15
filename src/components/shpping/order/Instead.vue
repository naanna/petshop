<template>
  <div>
    <div>
      <el-select size="small" class="width200" v-model="type">
        <el-option value="订单号" label="订单号"></el-option>
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
        class="width2001"
      ></el-input>
      <el-button type="primary" size="small" v-model="searchval">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="table">
      <el-table-column label="代售订单号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="代售价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="服务费" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物类型" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="售出日期" prop="id" align="center" header-align="center"></el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
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

.width200 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
}

.width2001 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
  margin-right: 10px;
}


.table {
  margin-top: 10px;
}

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
</style>