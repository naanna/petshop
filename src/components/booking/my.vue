<template>
  <div>
    <span class="__p_C7_u_239">我的代售</span>
    <el-button type="primary" size="small" class="__p_C7_u_266">我要代售</el-button>
    <div class="__p_C7_u_267">
      <el-select size="small" class="__p_C7_u_268">
        <el-option value="代售单号" label="代售单号"></el-option>
        <el-option value="宠物编号" label="宠物编号"></el-option>
        <el-option value="代售日期" label="代售日期"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" type="text" size="small" class="__p_C7_u_269"></el-input>
      <el-button type="primary" size="small" class="__p_C7_u_270">搜索</el-button>
    </div>
    <el-table :data="data" stripe border highlight-current-row class="__p_C7_u_252">
      <el-table-column label="代售单号  " prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物编号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="心里价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <span class="rj-icon --detail" style="margin-right: 15px;">
            <i>&nbsp;</i>
          </span>
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
  name: "my"
};
</script>

<style scoped>
.__p_C7_u_239 {
  font-size: 25px;
}

.__p_C7_u_266 {
  float: right;
}

.__p_C7_u_268 {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_269 {
  width: 200px;
  margin-left: 10px;
}

.__p_C7_u_270 {
  margin-left: 10px;
}

.__p_C7_u_267 {
  margin-top: 20px;
}

.__p_C7_u_252 {
  margin-top: 10px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
</style>
