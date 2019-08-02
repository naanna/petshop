<template>
  <div class="__p_C7_u_238">
    <span class="__p_C7_u_239">寄养管理</span>
    <el-tabs value="first" class="__p_2363_uid_261">
      <el-tab-pane label="寄养申请" name="first">
        <div style="margin-bottom:10px;">
          <el-button class="__p_C7_u_278" type="primary" size="small" @click="goallrefused">批量拒绝</el-button>
          <div class="__p_C7_u_279">
            <el-select size="small" class="__p_C7_u_280" v-model="type">
              <el-option value="寄养者" label="寄养者"></el-option>
              <el-option value="寄养单号" label="寄养单号"></el-option>
              <el-option value="申请类型" label="申请类型"></el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              type="text"
              size="small"
              class="__p_C7_u_281"
              v-model="searchval"
            ></el-input>
            <el-button type="primary" size="small" class="__p_C7_u_282">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="tabledata"
          stripe
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="id"
            type="selection"
            width="30"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column label="寄养单号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="nickname" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物名" prop="nickname" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="name" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养时长" prop="birthday" align="center" header-align="center"></el-table-column>
          <el-table-column label="申请类型" prop="sex" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养者" prop="leavel" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" width="130" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="centerDialogVisible=true">同意</el-button>
              <el-button type="text" size="small" @click="gorefused">拒绝</el-button>
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
          class="__p_C7_u_260"
        ></el-pagination>
        <el-dialog title="寄养价格" :visible.sync="centerDialogVisible" width="35%" center>
          <el-form>
            <el-form-item label="价格：" label-width="100px" style="margin-bottom:0px;">
              <el-input type="text" size="small" v-model="longtime" class="__p_C7_u_281"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="goyes">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="记录管理" name="second">
        <div style="margin-bottom:10px;">
          <div class="__p_C7_u_278">
            <el-button type="primary" size="small" @click="goadd">添加寄养</el-button>
            <el-button type="primary" size="small" @click="go2del">批量删除</el-button>
          </div>
          <div class="__p_C7_u_279">
            <el-select size="small" class="__p_C7_u_280" v-model="recordtype">
              <el-option value="寄养者" label="寄养者"></el-option>
              <el-option value="寄养单号" label="寄养单号"></el-option>
              <el-option value="状态" label="状态"></el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              type="text"
              size="small"
              class="__p_C7_u_281"
              v-model="searchval"
            ></el-input>
            <el-button type="primary" size="small" class="__p_C7_u_282">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="tabledata"
          stripe
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="id"
            type="selection"
            width="30"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column label="寄养单号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="nickname" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="name" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养时长" prop="birthday" align="center" header-align="center"></el-table-column>
          <el-table-column label="金额" prop="sex" align="center" header-align="center"></el-table-column>
          <el-table-column label="领回日期" prop="birthday" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养者" prop="leavel" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="leavel" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" width="130" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goupdate">编辑</el-button>
              <el-button type="text" size="small" @click="godel">删除</el-button>
              <el-button type="text" size="small" @click="gonote">备注</el-button>
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
          class="__p_C7_u_260"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog";
import add_update from "./dialog/careadd_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      centerDialogVisible: false,
      type: "寄养者",
      recordtype: "寄养者",
      searchval: "",
      tabledata: [{ id: 1 }],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.go2Query();
  },
  methods: {
    go2Query() {},
    gorefused() {
      this.$confirm("您确定要拒绝本条寄养?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功拒绝");
        })
        .catch(() => {});
    },
    goyes() {
      this.centerDialogVisible = false;
      this.$message.success("您已成功同意本次寄养");
    },
    godel() {
      this.$confirm("您确定要删除本条寄养记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功删除");
        })
        .catch(() => {});
    },
    goallrefused() {
      this.$message.success("未实现");
    },
    goadd() {
      this.$message.success("未实现");
    },
    go2del() {
      this.$message.success("未实现");
    },
    goupdate() {
      this.rjDialog
        .title("修改寄养记录")
        .width("800px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    gonote() {
      this.$message("弹出备注框,只能查看记录");
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.go2Query();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.go2Query();
    },
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
.__p_2363_uid_261 {
  margin-left: 10px;
  margin-top: 10px;
}
.__p_C7_u_278 {
  display: inline-block;
  vertical-align: bottom;
}

.__p_C7_u_280 {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: bottom;
}

.__p_C7_u_281 {
  width: 200px;
}

.__p_C7_u_282 {
  margin-left: 10px;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}

.__p_C7_u_260 {
  margin-top: 20px;
  text-align: right;
}
</style>
