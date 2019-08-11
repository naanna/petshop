<template>
  <div class="__p_C7_u_238">
    <span class="fontclass">寄养管理</span>
    <el-tabs value="first" class="__p_2363_uid_261">
      <el-tab-pane label="寄养申请" name="first">
        <div style="margin-bottom:10px;">
          <el-button class="__p_C7_u_278" type="primary" size="small" @click="goallrefused">批量拒绝</el-button>
          <div class="__p_C7_u_279">
            <el-select size="small" class="__p_C7_u_280" v-model="approval.type">
              <el-option value="寄养者" label="寄养者"></el-option>
              <el-option value="寄养单号" label="寄养单号"></el-option>
              <el-option value="申请类型" label="申请类型"></el-option>
            </el-select>
            <el-select
              v-if="approval.type=='申请类型'"
              size="small"
              class="__p_C7_u_281"
              v-model="approval.searchval"
              clearable
            >
              <el-option value="care" label="寄养"></el-option>
              <el-option value="back" label="领回"></el-option>
              <el-option value="long" label="延迟"></el-option>
            </el-select>
            <el-input
              v-else
              placeholder="请输入内容"
              type="text"
              size="small"
              class="__p_C7_u_281"
              v-model="approval.searchval"
              clearable
            ></el-input>
            <el-button type="primary" size="small" @click="goapprovalsearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="approvaldata"
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
          <el-table-column label="寄养单号" prop="careid" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="petid" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养时长" prop="timerang" align="center" header-align="center"></el-table-column>
          <el-table-column label="申请类型" prop="caretype" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.caretype=='care'">寄养</span>
              <span v-else-if="scope.row.caretype=='long'">延迟</span>
              <span v-else>领回</span>
            </template>
          </el-table-column>
          <el-table-column label="寄养者" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" width="130" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="centerDialogVisible=true">同意</el-button>
              <el-button type="text" size="small" @click="gorefused">拒绝</el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle1"
          @current-change="currentChangeHandle1"
          :current-page="approval.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="approval.page_size"
          :total="approval.total"
          layout="total, sizes, prev, pager, next, jumper"
          class="fyclass"
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
            <el-select size="small" class="__p_C7_u_280" v-model="recode.type">
              <el-option value="寄养者" label="寄养者"></el-option>
              <el-option value="寄养单号" label="寄养单号"></el-option>
              <el-option value="状态" label="状态"></el-option>
            </el-select>
            <el-select
              v-if="recode.type=='状态'"
              size="small"
              class="__p_C7_u_281"
              v-model="recode.searchval"
              clearable
            >
              <el-option value="agreeing" label="待同意"></el-option>
              <el-option value="agreed" label="已同意"></el-option>
              <el-option value="refused" label="拒绝"></el-option>
              <el-option value="end" label="已结束"></el-option>
            </el-select>
            <el-input
              v-else
              placeholder="请输入内容"
              type="text"
              size="small"
              class="__p_C7_u_281"
              v-model="recode.searchval"
              clearable
            ></el-input>
            <el-button type="primary" size="small" class="__p_C7_u_282" @click="gorecodesearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="recodedata"
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
          <el-table-column label="寄养单号" prop="careid" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="petid" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养时长" prop="timerang" align="center" header-align="center"></el-table-column>
          <el-table-column label="金额" prop="careprice" align="center" header-align="center"></el-table-column>
          <el-table-column label="领回日期" prop="endtime" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养者" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="状态" prop="carestatus" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.carestatus=='agreeing'">待同意</span>
              <span v-else-if="scope.row.carestatus=='agreed'">已同意</span>
              <span v-else-if="scope.row.carestatus=='refused'">拒绝</span>
              <span v-else>已结束</span>
            </template>
          </el-table-column>
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
          :current-page="recode.page_no"
          :page-sizes="[10,20,50,100]"
          :page-size="recode.page_size"
          :total="recode.total"
          layout="total, sizes, prev, pager, next, jumper"
          class="fyclass"
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
      approvaldata: [],
      longtime: "",
      recodedata: [],
      approval: {
        type: "寄养者",
        searchval: "",
        total: 0,
        page_no: 1,
        page_size: 10
      },
      recode: {
        type: "寄养者",
        searchval: "",
        total: 0,
        page_no: 1,
        page_size: 10
      }
    };
  },
  created() {
    this.goapprovalquery();
    this.gorecodequery();
  },
  methods: {
    makeapprovalquery() {
      let query = {
        page_no: this.approval.page_no,
        page_size: this.approval.page_size
      };
      if (this.approval.searchval != "") {
        if (this.approval.type == "寄养者") {
          query.username = this.approval.searchval;
        } else if (this.approval.type == "寄养单号") {
          query.careid = this.approval.searchval;
        } else if (this.approval.type == "申请类型") {
          query.type = this.approval.searchval;
        }
      }
      return query;
    },
    goapprovalquery() {
      let query = this.makeapprovalquery();
      this.axios
        .get("/api/getcaretable", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.approvaldata = results.message;
            for (let i in this.approvaldata) {
              this.approvaldata[i].starttime = this.moment(
                this.approvaldata[i].starttime
              ).format("YYYY-MM-DD");
              this.approvaldata[i].endtime = this.moment(
                this.approvaldata[i].endtime
              ).format("YYYY-MM-DD");
            }
            this.approval.total = results.total;
          }
        });
    },
    makerecodequery() {
      let query = {
        page_no: this.recode.page_no,
        page_size: this.recode.page_size
      };
      if (this.recode.searchval != "") {
        if (this.recode.type == "寄养者") {
          query.username = this.recode.searchval;
        } else if (this.recode.type == "寄养单号") {
          query.careid = this.recode.searchval;
        } else if (this.recode.type == "状态") {
          query.status = this.recode.searchval;
        }
      }
      return query;
    },
    gorecodequery() {
      let query = this.makerecodequery();
      this.axios
        .get("/api/getcaretable", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.recodedata = results.message;
            for (let i in this.recodedata) {
              this.recodedata[i].starttime = this.moment(
                this.recodedata[i].starttime
              ).format("YYYY-MM-DD");
            }
            this.recode.total = results.total;
          }
        });
    },
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
    gorecodesearch() {
      this.recode.page_no = 1;
      this.gorecodequery();
    },
    goapprovalsearch() {
      this.approval.page_no = 1;
      this.goapprovalquery();
    },
    sizeChangeHandle1(val) {
      this.approval.page_size = val;
      this.goapprovalquery();
    },
    currentChangeHandle1(val) {
      this.approval.page_no = val;
      this.goapprovalquery();
    },
    sizeChangeHandle(val) {
      this.recode.page_size = val;
      this.gorecodequery();
    },
    currentChangeHandle(val) {
      this.recode.page_nopage_no = val;
      this.gorecodequery();
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
  margin-right: 10px;
}

.__p_C7_u_282 {
  margin-left: 10px;
}

.__p_C7_u_279 {
  float: right;
  display: inline-block;
}
</style>
