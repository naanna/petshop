<template>
  <div>
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
      :title="title"
      :width="width"
      :close-on-click-modal="closeOnClickModal"
      :before-close="beforeClose"
    >
      <component v-bind:is="currentView"></component>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title: "",
      width: "",
      closeOnClickModal: false,
      currentView: null
    };
  },
  created() {
    let _this = this;
    let Dialog = function() {
      let cur_this = this;
      cur_this.currentView = function(currentView, params) {
        //初始化
        _this.currentView = currentView;
        let methods = currentView.methods;
        methods = methods ? methods : {};

        methods.closeDialog = function(data) {
          cur_this.close(data);
        };

        methods.DialogParams = function() {
          return params;
        };
        currentView.methods = methods;
        return cur_this;
      };

      //显示
      cur_this.show = function() {
        _this.dialogVisible = true;
        return cur_this;
      };
      //设置标题
      cur_this.title = function(title) {
        _this.title = title;
        return cur_this;
      };

      //设置宽
      cur_this.width = function(w) {
        _this.width = w;
        return cur_this;
      };

      //关闭
      cur_this.close = function(data) {
        _this.dialogVisible = false;
        _this.currentView = null;
        if (cur_this.responsedata) {
          cur_this.responsedata(data);
        }
        return cur_this;
      };

      //回调
      cur_this.then = function(responsefun) {
        cur_this.responsedata = responsefun;
        return cur_this;
      };
    };

    _this.$parent.Dialog = new Dialog();
  },
  methods: {
    beforeClose: function() {
      this.$parent.Dialog.close();
    }
  }
};
</script>
<style>
.el-dialog {
  background-image: url("~@/assets/picture/dialog.png");
  border-radius: 12px;
}
</style>