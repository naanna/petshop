<template>
  <div>
    <span class="__p_C7_u_239">我的寄养</span>
    <el-button type="primary" size="small" class="__p_C7_u_266" @click="goadd">我要寄养</el-button>
    <div class="__p_C7_u_267">
      <el-select size="small" class="__p_C7_u_268" v-model="type">
        <el-option value="宠物种类" label="寄养单号"></el-option>
        <el-option value="寄养单号" label="宠物种类"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" type="text" size="small" class="__p_C7_u_269"></el-input>
      <el-button type="primary" size="small" class="__p_C7_u_270">搜索</el-button>
    </div>
    <el-table :data="tabledata" stripe border highlight-current-row class="__p_C7_u_252">
      <el-table-column label="寄养单号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物名" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="宠物种类" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养日期" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="寄养时长" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="金额" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="centerDialogVisible = true">延长</el-button>
          <el-button type="text" size="small" @click="godel">结束</el-button>
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
    <el-dialog title="延长寄养时间" :visible.sync="centerDialogVisible" width="35%" center>
      <el-form>
        <el-form-item label="延长时长：" label-width="100px" style="margin-bottom:0px;">
          <el-input type="text" size="small" v-model="longtime" class="__p_C7_u_269"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="golong">确 定</el-button>
      </span>
    </el-dialog>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import add_update from "./add_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      centerDialogVisible: false,
      tabledata: [{ id: 1 }],
      type: "寄养单号",
      longtime: ""
    };
  },
  methods: {
    godel() {
      this.$confirm("您确定要提前结束寄养?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功提交结束申请，请等待管理员处理");
        })
        .catch(() => {});
    },
    golong() {
      this.centerDialogVisible = false;
      this.$message.success("您已成功提交延长申请，请等待管理员处理");
    },
    goadd() {
      this.rjDialog
        .title("我要寄养")
        .width("800px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    }
  }
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
  margin-right: 10px;
}

.__p_C7_u_252 {
  margin-top: 10px;
}

.__p_C7_u_267 {
  margin-top: 20px;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
</style>
