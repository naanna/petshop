<template>
  <div class>
    <span class="__p_C7_u_239">审批中心</span>
    <div class="__p_C7_u_277">
      <div class="__p_C7_u_278">
        <el-button type="primary" size="small">批量同意</el-button>
        <el-button type="primary" size="small">批量拒绝</el-button>
      </div>
      <div class="__p_C7_u_279">
        <el-date-picker placeholder="请选择日期" size="small" format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" size="small" class="__p_C7_u_264">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="data"
      stripe
      highlight-current-row
      class="__p_C7_u_252"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" type="selection" width="30" align="center" header-align="center"></el-table-column>
      <el-table-column label="充值单号  " prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="账号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="金额" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="充值时间" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small">同意</el-button>
          <el-button type="text" size="small">拒绝</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[50,100,200]"
      :page-size="50"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper"
      class="__p_C7_u_260"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "approval",
  data() {
    return {
      data: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      let self = this;
      var obj = eval("(" + JSON.stringify(val) + ")");
      self.selectObj = [];
      for (var i = 0; i < obj.length; i++) {
        var temp = obj[i];
        self.selectObj.push(temp);
      }
    }
  }
};
</script>
<style scoped>
.__p_C7_u_239 {
  font-size: 25px;
}

.__p_C7_u_264 {
  margin-left: 10px;
}

.__p_C7_u_252 {
  margin-top: 10px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
.__p_C7_u_278 {
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.__p_C7_u_277 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
