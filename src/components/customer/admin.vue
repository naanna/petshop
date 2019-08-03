<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(o, index) in 4" :key="o">
        <el-card class="card">
          <img src="@picture/touxiang.jpg" class="image" />
          <div style="padding: 14px;">
            <span style=" display: block; text-align: center;">好吃的汉堡</span>
            <span class="admin">管理员</span>
            <div class="__p_Cc_u_18">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
              <el-switch v-model="switchvalue" disabled></el-switch>
              <el-button type="danger" size="mini" plain icon="el-icon-delete"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      switchvalue: true
    };
  }
};
</script>

<style scoped>
.__p_Cc_u_18 {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.card {
  margin-top: 40px;
  margin-left: 40px;
}
.admin {
  font-size: 13px;
  margin-top: 13px;
  color: #999;
  display: block;
  text-align: center;
}

.image {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
}
</style>
