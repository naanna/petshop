<template>
  <div>
    <span>请按模板格式导入商品数据！</span>
    <el-link
      target="_blank"
      href="https://mmzdexcel.oss-cn-hangzhou.aliyuncs.com/%E5%95%86%E5%93%81%E8%AE%B0%E5%BD%95.xls"
      :underline="false"
    >点击下载模板</el-link>
    <el-popover
      placement="top-start"
      width="200"
      trigger="hover"
      content="狗粮/猫粮/猪粮/玩具/日用品/颈链/洗浴/医疗/睡窝/宠物箱"
    >
      <p slot="reference">
        <i class="el-icon-view view-icon"></i>查看类型数据枚举
      </p>
    </el-popover>
    <el-upload
      :limit="1"
      class="upload-box"
      :headers="headers"
      ref="upload"
      action="/api/goods/import"
      :file-list="fileList"
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      :on-success="onSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        plain
        type="primary"
        @click="submitUpload"
      >导入</el-button>
      <div slot="tip" class="el-upload__tip">注意：只能导入xls文件。导入商品默认下架状态，待上传图片后点击上架按钮方可在售</div>
    </el-upload>
    <div class="center">
      <el-button size="small" @click="goClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsImport",
  data() {
    return {
      headers: {},
      fileList: []
    };
  },
  mounted() {
    this.headers = { Authorization: this.$store.state.token };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSuccess(res, file) {
      if (res.success) {
        this.$message.success("导入成功!");
        this.closeDialog();
      } else {
        this.$message.error(res.reason);
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type === "application/vnd.ms-excel";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isXLS) {
        this.$message.error("导入的文档只能是xls格式!");
      }
      if (!isLt10M) {
        this.$message.error("导入的文档大小不能超过10MB!");
      }
      return isXLS && isLt10M;
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.upload-box {
  margin-top: 10px;
}
.view-icon {
  margin-right: 5px;
}
</style>
