<template>
    <div>
        <el-dialog 
            :id="id"
            append-to-body
            :visible.sync="isShow"
            :title="title" 
            :size="size"
            :show-close="showClose"
            :close-on-click-modal="closeOnClickModal"
            :style="style"
            :top="top"
            :before-close="beforeClose"
            :width="width">
            <component v-bind:is="currentView"></component>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
import Vue from "vue";

export default {
  data() {
    return {
      id: new Date().getTime(),
      fj_params: undefined,
      title: "提示信息!",
      isShow: false,
      currentView: undefined,
      size: "tiny",
      showClose: true,
      closeOnClickModal: false,
      width: "",
      style: "",
      top: "6%"
    };
  },
  created() {
    let self = this;

    let rjDialog = function() {
      let subSelf = this;

      subSelf.currentView = function(currentView, params) {
        //先移除原有组件
        self.currentView = currentView;
        let methods = currentView.methods;
        methods = methods ? methods : {};
        methods.closeRjDialog = function(opt) {
          subSelf.close(opt);
        };
        methods.rjDialogParams = function() {
          return params;
        };
        currentView.methods = methods;
        return subSelf;
      };

      subSelf.title = function(title) {
        self.title = title ? title : "提示信息!";
        return subSelf;
      };

      subSelf.sizeFull = function() {
        self.size = "full";
        return subSelf;
      };

      subSelf.sizeTiny = function() {
        self.size = "tiny";
        return subSelf;
      };

      subSelf.sizeSmall = function() {
        self.size = "small";
        return subSelf;
      };

      subSelf.sizeLarge = function() {
        self.size = "large";
        return subSelf;
      };

      //命名格式要求：.el-dialog--自定义{width:100px;}， 传入参数是：xxx
      subSelf.sizeSelf = function(sizeSelf) {
        self.size = sizeSelf;
        return subSelf;
      };
      //设置宽度
      subSelf.width = function(w) {
        self.width = w;
        return subSelf;
      };
      //设置顶部
      subSelf.top = function(t) {
        self.top = t == undefined || t == "" ? "6%" : t;
        return subSelf;
      };

      subSelf.show = function() {
        self.isShow = true;
        self.$nextTick(() => {
          let dialog = document.getElementById(self.id + "");
          let header = dialog.getElementsByClassName("el-dialog__header")[0];
          let hStyle = header.getAttribute("style") || "";
          if (!self.title) hStyle = "display:none;";
          else hStyle = "display:block;";
          header.setAttribute("style", hStyle);
        });
        return subSelf;
      };

      subSelf.showClose = function(flag) {
        self.showClose = flag;
        return subSelf;
      };

      subSelf.closeOnClickModal = function(flag) {
        self.closeOnClickModal = flag;
        return subSelf;
      };

      subSelf.close = function(opt) {
        self.isShow = false;
        self.currentView = null;
        if (subSelf.rjAlertCallFun) {
          subSelf.rjAlertCallFun(opt);
        }
        return subSelf;
      };

      subSelf.then = function(callFun) {
        subSelf.rjAlertCallFun = callFun;
        return subSelf;
      };
    };

    self.$parent.rjDialog = new rjDialog();
  },
  methods: {
    beforeClose: function() {
      this.$parent.rjDialog.close();
    }
  }
};
</script>