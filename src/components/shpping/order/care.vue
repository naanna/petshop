<template>
  <div>
    <div>
      <el-select size="small" class="__p_2363_uid_262" v-model="type">
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
        class="__p_2363_uid_263"
      ></el-input>
      <el-button type="primary" size="small" v-model="searchval">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="__p_2363_uid_252">
      <el-table-column label="寄养订单号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名字" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物类型" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="领回日期" prop="id" align="center" header-align="center"></el-table-column>
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