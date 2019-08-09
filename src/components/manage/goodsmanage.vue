<template>
  <div>
    <span class="fontclass">商品管理</span>
    <div>
      <div class="botton">
        <el-button type="primary" size="small" @click="goadd">添加商品</el-button>
        <el-button type="primary" size="small" @click="go2del">批量删除</el-button>
      </div>
      <div class="searchdiv">
        <el-select size="small" class="select" v-model="type" @change="change">
          <el-option value="编号" label="编号"></el-option>
          <el-option value="商品名" label="商品名"></el-option>
          <el-option value="种类" label="种类"></el-option>
        </el-select>
        <el-input
          v-if="type!='种类'"
          placeholder="请输入搜索内容"
          v-model="searchval"
          type="text"
          size="small"
          clearable
          class="select"
        ></el-input>
        <el-select size="small" class="select" v-model="searchval" v-else clearable>
          <el-option value="狗粮" label="狗粮"></el-option>
          <el-option value="猫粮" label="猫粮"></el-option>
          <el-option value="猪粮" label="猪粮"></el-option>
          <el-option value="玩具" label="玩具"></el-option>
          <el-option value="日用品" label="日用品"></el-option>
          <el-option value="颈链" label="颈链"></el-option>
          <el-option value="洗浴" label="洗浴"></el-option>
          <el-option value="医疗" label="医疗"></el-option>
          <el-option value="睡窝" label="睡窝"></el-option>
          <el-option value="宠物箱" label="宠物箱"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="gosearch">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tabledata"
      stripe
      border
      highlight-current-row
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" type="selection" width="50px" align="center" header-align="center"></el-table-column>
      <el-table-column label="编号" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="商品名" prop="id" align="center" header-align="center">
        <template slot-scope="scope">
          <span>123</span>
          <el-popover placement="right" trigger="click">
            <el-image style="width: 200px; height: 150px" :src="url" fit="fill"></el-image>
            <i class="el-icon-picture icon" slot="reference"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="价格" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="库存" prop="id" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <div slot-scope="scope">
          <el-button type="text" size="small" @click="goupdate(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="godel(scope.row)">删除</el-button>
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
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import rjDialog from "../dialog.vue";
import add_update from "./dialog/goodadd_update.vue";
export default {
  components: {
    rjDialog
  },
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      type: "编号",
      searchval: "",
      tabledata: [{ id: "1" }],
      total: 0,
      page_no: 1,
      page_size: 10,
      selectObj: []
    };
  },
  methods: {
    makependingquery() {
      let query = {
        page_no: this.page_no,
        page_size: this.page_size
      };
      if (this.searchval != "") {
        if (this.type == "编号") {
          query.goodid = this.searchval;
        } else if (this.type == "商品名") {
          query.name = this.searchval;
        } else if (this.type == "种类") {
          query.type = this.type;
        }
      }

      return query;
    },
    goquery() {
      const query = this.makependingquery();
      console.log(query);
    },
    godel(row) {
      this.$confirm("您确定要删除该宠物信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("您已成功删除");
        })
        .catch(() => {});
    },
    goadd() {
      this.rjDialog
        .title("添加商品")
        .width("600px")
        .currentView(add_update, {})
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    go2del() {
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
      // this.$confirm("确认删除这些商品信息吗？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消"
      // })
      //   .then(() => {
      //     this.axios
      //       .delete("/api/deletepet", {
      //         data: delobs
      //       })
      //       .then(res => {
      //         if (res.data.success) {
      //           this.$message.success("删除成功！");
      //           this.goquery();
      //         }
      //       });
      //   })
      //   .catch(() => {});
    },
    goupdate(row) {
      this.rjDialog
        .title("编辑商品")
        .width("600px")
        .currentView(add_update, { row })
        .showClose(true)
        .sizeTiny()
        .then(opt => {})
        .show();
    },
    gosearch() {
      this.page_no = 1;
      this.goquery();
    },
    change() {
      this.searchval = "";
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
.select {
  width: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10px;
}

.table {
  margin-top: 10px;
}

.botton {
  display: inline-block;
  margin-top: 20px;
}
.searchdiv {
  float: right;
  display: inline-block;
}

.timerang {
  margin-left: 10px;
  margin-right: 10px;
}
.icon {
  font-size: 18px;
  margin-left: 5px;
  cursor: pointer;
}
</style>