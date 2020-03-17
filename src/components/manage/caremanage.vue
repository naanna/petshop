<template>
  <div>
    <span class="fontclass">寄养管理</span>
    <el-tabs value="first" class="tabs"  @tab-click="handleClick">
      <el-tab-pane label="寄养申请" name="first">
        <div style="margin-bottom:10px;">
          <div class="right">
            <el-select size="small" class="width200" v-model="approval.type" @change="change1">
              <el-option value="寄养账号" label="寄养账号"></el-option>
              <el-option value="寄养编号" label="寄养编号"></el-option>
              <el-option value="申请类型" label="申请类型"></el-option>
            </el-select>
            <el-select
              v-if="approval.type=='申请类型'"
              size="small"
              class="width200"
              v-model="approval.searchVal"
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
              class="width200"
              v-model="approval.searchVal"
              clearable
            ></el-input>
            <el-button type="primary" size="small" @click="goApprovaSearch">搜索</el-button>
          </div>
        </div>
        <el-table :data="approvalData" stripe highlight-current-row>
          <el-table-column
            prop="id"
            type="selection"
            width="30"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column label="寄养编号" prop="careid" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="petid" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center"></el-table-column>
          <el-table-column label="延迟天数" prop="longtime" align="center" header-align="center"></el-table-column>
          <el-table-column label="申请类型" prop="caretype" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.caretype=='care'">寄养</span>
              <span v-else-if="scope.row.caretype=='long'">延迟</span>
              <span v-else>领回</span>
            </template>
          </el-table-column>
          <el-table-column label="寄养账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="操作" width="130" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goAgree(scope.row)">同意</el-button>
              <el-button type="text" size="small" @click="goRefuse(scope.row)">拒绝</el-button>
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
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="价格：" label-width="100px" style="margin-bottom:0px;" prop="price">
              <el-input
                type="text"
                size="small"
                v-model.number="form.price"
                class="width200"
                oninput="if(value.length>10)value=value.slice(0,10)"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="goClose">取 消</el-button>
            <el-button type="primary" @click="goYes">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="记录管理" name="second">
        <div class="button-box">
          <div>
            <el-button type="primary" size="small" @click="goAdd">添加寄养</el-button>
            <el-button type="primary" size="small" @click="go2Del">批量删除</el-button>
          </div>
          <div>
            <el-select size="small" class="width200" v-model="recode.type" @change="change">
              <el-option value="寄养账号" label="寄养账号"></el-option>
              <el-option value="寄养时间" label="寄养时间"></el-option>
              <el-option value="类型" label="类型"></el-option>
            </el-select>
            <el-select
              v-if="recode.type=='类型'"
              size="small"
              class="width200"
              v-model="recode.searchVal"
              clearable
            >
              <el-option value="care" label="寄养"></el-option>
              <el-option value="long" label="延迟"></el-option>
              <el-option value="back" label="领回"></el-option>
            </el-select>
            <el-input
              v-if="recode.type=='寄养账号'"
              placeholder="请输入内容"
              type="text"
              size="small"
              class="width200"
              v-model="recode.searchVal"
              clearable
            ></el-input>
            <el-date-picker
              v-if="recode.type=='寄养时间'"
              v-model="recode.searchVal"
              type="daterange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" size="small" class="search-button" @click="goRecodeSearch">搜索</el-button>
          </div>
        </div>
        <el-table
          :data="recodeData"
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
          <el-table-column label="寄养编号" prop="careid" align="center" header-align="center"></el-table-column>
          <el-table-column label="宠物编号" prop="petid" align="center" header-align="center"></el-table-column>
          <el-table-column label="寄养日期" prop="starttime" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.starttime!='Invalid date'">{{scope.row.starttime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="寄养时长" prop="timerang" align="center" header-align="center"></el-table-column>
          <el-table-column label="金额" prop="price" align="center" header-align="center"></el-table-column>
          <el-table-column label="领回日期" prop="endtime" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.endtime!='Invalid date'">{{scope.row.endtime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="寄养账号" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type=='care'">寄养</span>
              <span v-else-if="scope.row.type=='long'">延迟</span>
              <span v-else>领回</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" align="center" header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status=='agreeing'">待同意</span>
              <span v-else-if="scope.row.status=='agreed'">已同意</span>
              <span v-else-if="scope.row.status=='refused'">拒绝</span>
              <span v-else>已结束</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130" align="center" header-align="center">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="goUpdate(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
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
      obs: "",
      centerDialogVisible: false,
      form: { price: "" },
      rules: {
        price: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ]
      },
      selectObj: [],
      approvalData: [],
      recodeData: [],
      approval: {
        type: "寄养账号",
        searchVal: "",
        total: 0,
        page_no: 1,
        page_size: 10
      },
      recode: {
        type: "寄养账号",
        searchVal: "",
        total: 0,
        page_no: 1,
        page_size: 10
      }
    };
  },
  created() {
    this.getPending();
  },
  methods: {
    makeApprovalQuery() {
      let query = {
        page_no: this.approval.page_no,
        page_size: this.approval.page_size
      };
      if (this.approval.searchVal != "") {
        if (this.approval.type == "寄养账号") {
          query.username = this.approval.searchVal;
        } else if (this.approval.type == "寄养编号") {
          query.careid = this.approval.searchVal;
        } else if (this.approval.type == "申请类型") {
          query.type = this.approval.searchVal;
        }
      }
      return query;
    },
    getPending() {
      let query = this.makeApprovalQuery();
      this.axios
        .get("/api/caretable/get", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.approvalData = results.message;
            this.approval.total = results.total;
          }
        });
    },
    makeRecodeQuery() {
      let query = {
        page_no: this.recode.page_no,
        page_size: this.recode.page_size
      };
      if (this.recode.searchVal != "" && this.recode.searchVal != null) {
        if (this.recode.type == "寄养账号") {
          query.username = this.recode.searchVal;
        } else if (this.recode.type == "寄养时间") {
          var time = this.moment(this.recode.searchVal[0]).format("YYYY-MM-DD");
          var time1 = this.moment(this.recode.searchVal[1]).format(
            "YYYY-MM-DD"
          );
          query.starttime = time;
          query.endtime = time1;
        } else if (this.recode.type == "类型") {
          query.type = this.recode.searchVal;
        }
      }
      return query;
    },
    getRecord() {
      let query = this.makeRecodeQuery();
      this.axios
        .get("/api/caretable/getall", {
          params: {
            ...query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.recodeData = results.message;
            this.recode.total = results.total;
          }
        });
    },
    goRefuse(row) {
      this.$confirm("您确定要拒绝本条申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .put("/api/caretable/long_back/yesorno", {
              careid: row.careid,
              type: row.caretype,
              typestatus: "no",
              petid: row.petid
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功拒绝！");
                this.getPending();
                this.getRecord();
              }
            });
        })
        .catch(() => {});
    },
    goAgree(row) {
      if (row.caretype == "back") {
        this.$confirm("您确定要同意本条领回申请记录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.axios
              .put("/api/caretable/long_back/yesorno", {
                careid: row.careid,
                type: row.caretype,
                petid: row.petid,
                typestatus: "yes",
                endtime: this.moment(new Date()).format("YYYY-MM-DD")
              })
              .then(res => {
                if (res.data.success) {
                  this.$message.success("您已同意！");
                  this.getPending();
                  this.getRecord();
                }
              });
          })
          .catch(() => {});
      } else {
        this.centerDialogVisible = true;
        this.obs = row;
      }
    },
    goYes() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios
            .put("/api/caretable/long_back/yesorno", {
              careid: this.obs.careid,
              type: this.obs.caretype,
              typestatus: "yes",
              longtime: this.obs.longtime,
              username: this.obs.username,
              price: this.form.price
            })
            .then(res => {
              if (res.data.success) {
                this.centerDialogVisible = false;
                this.$message.success("您已成功同意延迟寄养！");
                this.$refs["form"].resetFields();
                this.getPending();
                this.getRecord();
              }
            });
        } else {
          return false;
        }
      });
    },
    goDel(row) {
      this.$confirm("您确定要删除本条寄养记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let delobs = { careid: row.careid };
          this.axios
            .delete("/api/caretable/delete", {
              data: {
                delobs
              }
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("您已成功删除");
                this.getPending();
                this.getRecord();
              }
            });
        })
        .catch(() => {});
    },
    goClose() {
      this.centerDialogVisible = false;
      this.$refs["form"].resetFields();
    },
    goAdd() {
      this.Dialog.title("添加寄养记录")
        .width("600px")
        .currentView(add_update, {})
        .then(data => {
          this.getPending();
          this.getRecord();
        })
        .show();
    },
    go2Del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          careid: item.careid
        });
      });
      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm("确认删除选中吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios
            .delete("/api/caretable/delete", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                this.$message.success("删除成功！");
                this.getPending();
                this.getRecord();
              }
            });
        })
        .catch(() => {});
    },
    goUpdate(row) {
      this.Dialog.title("修改寄养记录")
        .width("600px")
        .currentView(add_update, { row })
        .then(data => {
          this.getPending();
          this.getRecord();
        })
        .show();
    },
    change() {
      this.recode.searchVal = "";
    },
    change1() {
      this.approval.searchVal = "";
    },
    goRecodeSearch() {
      this.recode.page_no = 1;
      this.getRecord();
    },
    goApprovaSearch() {
      this.approval.page_no = 1;
      this.getPending();
    },
    sizeChangeHandle1(val) {
      this.approval.page_size = val;
      this.getPending();
    },
    currentChangeHandle1(val) {
      this.approval.page_no = val;
      this.getPending();
    },
    sizeChangeHandle(val) {
      this.recode.page_size = val;
      this.getRecord();
    },
    currentChangeHandle(val) {
      this.recode.page_nopage_no = val;
      this.getRecord();
    },
    handleSelectionChange(val) {
      let self = this;
      var obj = eval("(" + JSON.stringify(val) + ")");
      self.selectObj = [];
      for (var i = 0; i < obj.length; i++) {
        var temp = obj[i];
        self.selectObj.push(temp);
      }
    },
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.getRecord();
      } else {
        this.getPending();
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
.button-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.width200 {
  width: 200px;
  margin-right: 10px;
}
.search-button {
  margin-left: 10px;
}
</style>
