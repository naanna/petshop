<template>
  <div>
    <span class="fontclass">商品管理</span>
    <div class="botton-box">
      <div>
        <el-button type="primary" size="small" @click="goAdd">添加商品</el-button>
        <el-button type="primary" size="small" @click="go2Del" class="margin-right-10">批量删除</el-button>
        <el-dropdown @command="goExport">
          <el-button size="small" class="margin-right-10">导出Excel</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="current">当前</el-dropdown-item>
            <el-dropdown-item command="all">全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" @click="goImport">导入Excel</el-button>
      </div>
      <div>
        <el-select size="small" class="select" v-model="type" @change="change">
          <el-option value="编号" label="编号"></el-option>
          <el-option value="商品名" label="商品名"></el-option>
          <el-option value="种类" label="种类"></el-option>
          <el-option value="状态" label="状态"></el-option>
        </el-select>
        <el-input
          v-if="type!='种类'&&type!='状态'"
          placeholder="请输入搜索内容"
          v-model="searchVal"
          type="text"
          size="small"
          clearable
          class="select"
        ></el-input>
        <el-select size="small" class="select" v-model="searchVal" v-else clearable>
          <el-option value="狗粮" label="狗粮" v-if="type=='种类'"></el-option>
          <el-option value="猫粮" label="猫粮" v-if="type=='种类'"></el-option>
          <el-option value="猪粮" label="猪粮" v-if="type=='种类'"></el-option>
          <el-option value="玩具" label="玩具" v-if="type=='种类'"></el-option>
          <el-option value="日用品" label="日用品" v-if="type=='种类'"></el-option>
          <el-option value="颈链" label="颈链" v-if="type=='种类'"></el-option>
          <el-option value="洗浴" label="洗浴" v-if="type=='种类'"></el-option>
          <el-option value="医疗" label="医疗" v-if="type=='种类'"></el-option>
          <el-option value="睡窝" label="睡窝" v-if="type=='种类'"></el-option>
          <el-option value="宠物箱" label="宠物箱" v-if="type=='种类'"></el-option>
          <el-option value="sale" label="在售" v-if="type=='状态'"></el-option>
          <el-option value="soldout" label="下架" v-if="type=='状态'"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="goSearch">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" type="selection" width="50px" align="center" header-align="center"></el-table-column>
      <el-table-column label="编号" width="150px" prop="goodid" align="center" header-align="center"></el-table-column>
      <el-table-column label="商品名" prop="name" align="center" header-align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
          <el-popover placement="right" trigger="click">
            <el-image style="width: 200px; height: 200px" :src="scope.row.picture" fit="fill"></el-image>
            <i class="el-icon-picture icon" slot="reference"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="120px" prop="type" align="center" header-align="center"></el-table-column>
      <el-table-column
        label="价格"
        width="120px"
        sortable
        prop="price"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        label="库存"
        width="120px"
        sortable
        prop="num"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" width="250px" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goUpdate(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status=='sale'"
            type="text"
            size="small"
            @click="goDown_Up(scope.row,'soldout')"
          >下架</el-button>
          <el-button v-else type="text" size="small" @click="goDown_Up(scope.row,'sale')">上架</el-button>
          <el-button type="text" size="small" @click="goDel(scope.row)">删除</el-button>
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
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "@common/dialog.vue";
import add_update from "./dialog/goodadd_update.vue";
import GoodsImport from "./dialog/GoodsImport.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      type: "编号",
      searchVal: "",
      tableData: [],
      total: 0,
      page_no: 1,
      page_size: 10,
      selectObj: [],
      query: {}
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    makePendingQuery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.searchVal != "") {
        if (this.type == "编号") {
          query.goodid = this.searchVal;
        } else if (this.type == "商品名") {
          query.name = this.searchVal;
        } else if (this.type == "种类") {
          query.type = this.searchVal;
        } else if (this.type == "状态") {
          query.status = this.searchVal;
        }
      }
      return query;
    },
    goQuery() {
      this.query = this.makePendingQuery();
      this.axios
        .get("/api/goods/get", {
          params: {
            ...this.query
          }
        })
        .then(res => {
          if (res.data.success) {
            var results = res.data;
            this.tableData = results.message;
            this.total = results.total;
          }
        });
    },
    goDel(row) {
      this.$confirm(
        "您确定要删除该商品吗?用户购物车和收藏表内将不出现此商品!",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          let length = this.tableData.length;
          this.axios
            .delete("/api/goods/delete", {
              data: [{ goodid: row.goodid }]
            })
            .then(res => {
              if (res.data.success) {
                //只剩一条时返回上一页
                if (length === 1 && this.page_no != 1) {
                  this.page_no = this.page_no - 1;
                }
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goDown_Up(row, status) {
      let statusinfo = "";
      if (status == "sale")
        statusinfo = "您确定要上架该商品吗?用户购物车和收藏表内将显示有效！";
      else statusinfo = "您确定要下架该商品吗?用户购物车和收藏表内将显示失效！";
      this.$confirm(statusinfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          row.status = status;
          row.downorup = "downorup";
          this.axios.put("/api/updategood", row).then(res => {
            if (res.data.success) {
              this.$message.success("操作成功！");
              this.goQuery();
            }
          });
        })
        .catch(() => {});
    },
    go2Del() {
      let delobs = [];
      this.selectObj.forEach(item => {
        delobs.push({
          goodid: item.goodid
        });
      });

      if (this.selectObj.length == 0) {
        this.$message.warning("请选中要删除的对象！");
        return;
      }
      this.$confirm(
        "确认删除这些商品信息吗?用户购物车和收藏表内将显示失效！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          let length = this.tableData.length;
          let selecLength = this.selectObj.length;
          this.axios
            .delete("/api/goods/delete", {
              data: delobs
            })
            .then(res => {
              if (res.data.success) {
                //全部删除时返回上一页
                if (length === selecLength && this.page_no != 1) {
                  this.page_no = this.page_no - 1;
                }
                this.$message.success("删除成功！");
                this.goQuery();
              }
            });
        })
        .catch(() => {});
    },
    goAdd() {
      this.Dialog.title("添加商品")
        .width("600px")
        .currentView(add_update, {})
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goImport() {
      this.Dialog.title("导入商品")
        .width("400px")
        .currentView(GoodsImport, {})
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goUpdate(row) {
      this.Dialog.title("编辑商品")
        .width("600px")
        .currentView(add_update, { row })
        .then(data => {
          this.goQuery();
        })
        .show();
    },
    goExport(value) {
      let obs = {};
      if (value == "current") {
        obs = this.query;
      }
      obs.exportType = value;
      this.axios
        .post(
          "/api/goods/export",
          {
            ...obs
          },
          { responseType: "arraybuffer" }
        )
        .then(_res => {
          const blob = new Blob([_res.data], {
            type: "application/vnd.ms-excel;"
          });
          const a = document.createElement("a");
          // 生成文件路径
          let href = window.URL.createObjectURL(blob);
          a.href = href;
          let _fileName = _res.headers["content-disposition"]
            .split(";")[1]
            .split("=")[1]
            .split(".")[0];
          // 文件名中有中文 则对文件名进行转码
          a.download = decodeURIComponent(_fileName);
          // 利用a标签做下载
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        });
    },
    goSearch() {
      this.page_no = 1;
      this.goQuery();
    },
    change() {
      this.searchVal = "";
    },
    sizeChangeHandle(val) {
      this.page_size = val;
      this.goQuery();
    },
    currentChangeHandle(val) {
      this.page_no = val;
      this.goQuery();
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
.select {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10px;
}
.table {
  margin-top: 10px;
}
.botton-box {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px 0;
}
.icon {
  font-size: 18px;
  margin-left: 5px;
  cursor: pointer;
}
.margin-right-10 {
  margin-right: 10px;
}
</style>