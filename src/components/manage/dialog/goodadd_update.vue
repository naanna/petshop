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
        <el-upload
          :http-request="upload"
          :multiple="true"
          :show-file-list="false"
          action
          ref="upload"
          :on-change="onchange"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar
            shape="square"
            v-if="imageUrl&&imageUrl!='null'"
            :src="imageUrl"
            class="seepicture"
            slot="trigger"
          ></el-avatar>
          <el-avatar
            shape="square"
            src="https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/choose.png"
            class="seepicture"
            slot="trigger"
            v-else
          ></el-avatar>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品名：" label-width="100px" prop="name">
        <el-input type="text" size="small" class="formlist" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="价格：" label-width="100px" prop="price">
        <el-input type="text" size="small" class="formlist" v-model.number="form.price"></el-input>
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
        <el-input type="text" size="small" class="formlist" v-model.number="form.num"></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button type="primary" size="small" @click="goadd">保存</el-button>
      <el-button size="small" @click="goclose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { checkgoodsname } from "@assets/validate.js";
export default {
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
      fileList: [],
      edit: "no",
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
      if (obs.picture != null) this.imageUrl = obs.picture;
      this.edit = "yes";
    }
  },
  methods: {
    goadd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.edit == "no") {
            if (this.fileList.length == 0)
              this.$message.warning("请选择商品图片！");
            else {
              this.form.picture = this.fileList[0].url;
              this.axios.post("/api/addgood", this.form).then(res => {
                if (res.data.success) {
                  this.$message.success("成功添加商品！");
                  this.closeDialog && this.closeDialog();
                }
              });
            }
          } else {
            this.axios.post("/api/updategood", this.form).then(res => {
              if (res.data.success) {
                this.$message.success("成功编辑商品！");
                this.closeDialog && this.closeDialog();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    upload(file) {
      let OSS = require("ali-oss");
      const client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAIMYW16QYY4WTH",
        accessKeySecret: "5I2HVy0oFPyeg3BHO1fUhzHGZvjvKp",
        bucket: "mmzdpicture"
      });
      var fileName = "mmzdtx" + file.file.uid;
      client.put(fileName, file.file).then(result => {
        this.fileList[0] = {
          name: result.name,
          url: result.url
        };
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if ((isJPG && isLt2M) || (isPNG && isLt2M)) {
        //转base64
        reader.onload = function(e) {
          _this.imageUrl = e.target.result; //将图片路径赋值给src
        };
      }
      reader.readAsDataURL(file);
    },
    goclose() {
      this.closeDialog && this.closeDialog();
    }
  }
};
</script>

<style scoped>
.seepicture {
  width: 150px;
  height: 150px;
}
.formlist {
  width: 250px;
}

.button {
  text-align: center;
}
.el-avatar >>> img {
  width: 150px;
}
</style>
