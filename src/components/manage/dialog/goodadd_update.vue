<template>
  <div>
    <el-form
      label-position="right"
      style="margin-left:100px;"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="图片：" label-width="100px">
        <UploadImage @src="getSrc" :imageUrl="imageUrl"></UploadImage>
      </el-form-item>
      <el-form-item label="商品名：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px" prop="price">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model.number="form.price"
          oninput="if(value.length>10)value=value.slice(0,10)"
        ></el-input>
      </el-form-item>
      <el-form-item label="种类：" label-width="100px" prop="type">
        <el-select size="small" class="formlist" v-model="form.type">
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
      </el-form-item>
      <el-form-item label="库存：" label-width="100px" prop="num">
        <el-input
          type="text"
          size="small"
          class="formlist"
          v-model.number="form.num"
          oninput="if(value.length>10)value=value.slice(0,10)"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button type="primary" size="small" @click="goAdd">保存</el-button>
      <el-button size="small" @click="goClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkgoodsname } from "@assets/validate.js";
import UploadImage from "@common/UploadImage.vue";
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      form: {
        picture: "",
        name: "",
        price: "",
        type: "猫粮",
        num: ""
      },
      imageUrl: "",
      edit: false,
      rules: {
        name: [
          { validator: checkgoodsname },
          { min: 1, max: 30, message: "长度在1到30个字符" }
        ],
        price: [{ type: "number", message: "价格必须为数字值" }],
        num: [{ type: "number", message: "库存必须为数字值" }]
      }
    };
  },
  mounted() {
    if (this.DialogParams().row) {
      let obs = this.DialogParams().row;
      this.form = obs;
      if (obs.picture != null) {
        this.imageUrl = obs.picture;
      }
      this.edit = true;
    }
  },
  methods: {
    goAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.edit) {
            this.axios.put("/api/goods/update", this.form).then(res => {
              if (res.data.success) {
                this.$message.success("编辑成功！");
                this.closeDialog();
              }
            });
          } else {
            if (this.form.picture == "") {
              this.$message.warning("请选择商品图片！");
            } else {
              this.axios.post("/api/goods/add", this.form).then(res => {
                if (res.data.success) {
                  this.$message.success("添加成功！");
                  this.closeDialog();
                }
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    getSrc(src) {
      this.form.picture = src;
    },
    goClose() {
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
</style>
