<template>
  <div class>
    <span class="__p_C7_u_239">充值管理</span>
    <el-tabs value="first" class="__p_C7_u_277">
      <el-tab-pane label="充值审批" name="first">
        <div>
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
          <el-table-column
            prop="id"
            type="selection"
            width="30"
            align="center"
            header-align="center"
          ></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="second">
        <div class="__p_2363_uid_261">
          <el-select size="small" class="__p_C7_u_269" v-model="type">
            <el-option value="审批者" label="审批者"></el-option>
            <el-option value="充值账号" label="充值账号"></el-option>
            <el-option value="充值日期" label="充值日期"></el-option>
          </el-select>
          <el-input
            v-if="type!='充值日期'"
            placeholder="请输入内容"
            type="text"
            size="small"
            class="__p_C7_u_269"
          ></el-input>
          <el-date-picker
            v-else
            v-model="historydata"
            type="daterange"
            size="small"
            style=" margin-right: 10px;"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" size="small" v-model="searchval">搜索</el-button>
        </div>
        <el-table :data="data" stripe border highlight-current-row class="__p_C7_u_252">
          <el-table-column label="充值单号 " prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值金额" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值日期" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="充值账号" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="审批者" prop="id" align="center" header-align="center"></el-table-column>
        </el-table>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "approval",
  data() {
    return {
      historydata: "",
      searchval: "",
      data: [],
      type: "审批者",
      total: 0,
      page_no: 1,
      page_size: 10,
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
.__p_C7_u_269 {
  width: 200px;
  margin-right: 10px;
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
  margin-left: 10px;
  margin-top: 10px;
}
</style>
