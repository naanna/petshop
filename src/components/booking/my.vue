<template>
  <div>
    <span class="fontclass">我的代售</span>
    <el-button type="primary" size="small" class="bookbut">我要代售</el-button>
    <div class="div1">
      <el-select size="small" class="select">
        <el-option value="代售单号" label="代售单号"></el-option>
        <el-option value="宠物编号" label="宠物编号"></el-option>
        <el-option value="代售日期" label="代售日期"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" type="text" size="small" class="select"></el-input>
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <el-table :data="data" stripe border highlight-current-row class="table">
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
      class="fyclass"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "my"
};
</script>

<style scoped>
.bookbut {
  float: right;
}

.select {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
}

.div1 {
  margin-top: 20px;
}

.table {
  margin-top: 10px;
}
</style>
