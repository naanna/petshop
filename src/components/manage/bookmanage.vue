<template>
  <div>
    <span class="fontclass">代售管理</span>
    <el-tabs value="first" class="tabs">
      <el-tab-pane label="代售申请" name="first">
        <div style="margin-bottom:10px;">
          <el-button class="button" type="primary" size="small" @click="goallrefused">批量拒绝</el-button>
          <div class="floatdiv">
            <el-select size="small" class="width2001" v-model="type">
              <el-option value="代售者" label="代售者"></el-option>
              <el-option value="代售订单号" label="代售订单号"></el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              type="text"
              clearable
              size="small"
              class="width200"
              v-model="searchval"
            ></el-input>
            <el-button type="primary" size="small" class="searchbut">搜索</el-button>
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
          <el-table-column label="代售订单号" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售价格" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物类型" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售者" prop="id" align="center" header-align="center"></el-table-column>
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
          class="fyclass"
        ></el-pagination>
        <el-dialog title="服务费" :visible.sync="centerDialogVisible" width="35%" center>
          <el-form>
            <el-form-item label="价格：" label-width="100px" style="margin-bottom:0px;">
              <el-input type="text" size="small" v-model="longtime" class="width200"></el-input>
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
          <div class="button">
            <el-button type="primary" size="small" @click="goadd">添加代售</el-button>
            <el-button type="primary" size="small" @click="go2del">批量删除</el-button>
          </div>
          <div class="floatdiv">
            <el-select size="small" class="width2001" v-model="recordtype">
              <el-option value="代售者" label="代售者"></el-option>
              <el-option value="代售订单号" label="代售订单号"></el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              type="text"
              size="small"
              clearable
              class="width200"
              v-model="searchval"
            ></el-input>
            <el-button type="primary" size="small" class="searchbut">搜索</el-button>
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
          <el-table-column label="代售订单号" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售价格" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物类型" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售日期" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="代售者" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="id" align="center" header-align="center"></el-table-column>
          <el-table-column label="售出日期" prop="id" align="center" header-align="center"></el-table-column>
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
          class="fyclass"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import add_update from "./dialog/careadd_update.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      centerDialogVisible: false,
      type: "代售者",
      recordtype: "代售者",
      searchval: "",
      tabledata: [{ id: 1 }],
      total: 0,
      page_no: 1,
      page_size: 10
    };
  },
  created() {
    this.goquery();
  },
  methods: {
    goquery() {},
    gorefused() {
      this.$confirm("您确定要拒绝本条代售?", "提示", {
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
      this.$message.success("您已成功同意本次代售");
    },
    godel() {
      this.$confirm("您确定要删除本条代售记录?", "提示", {
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
      this.Dialog
        .title("修改代售记录")
        .width("800px")
        .currentView(add_update, {})
        .then(data => {})
        .show();
    },
    gonote() {
      this.$message("弹出备注框,只能查看记录");
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goquery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goquery();
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
.tabs {
  margin-left: 10px;
  margin-top: 10px;
}
.button {
  display: inline-block;
  vertical-align: bottom;
}

.width2001 {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: bottom;
}

.width200 {
  width: 200px;
}

.searchbut {
  margin-left: 10px;
}

.floatdiv {
  float: right;
  display: inline-block;
}
</style>
