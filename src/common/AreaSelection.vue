
<template>
  <div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
      :props="{label:'name',value:'adcode',children:'districts'}"
      size="mini"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "AreaSelection",
  data() {
    return {
      options: [],
      value: ["350000", "350100", "350121"]
    };
  },
  created() {
    this.goQuery();
  },
  methods: {
    goQuery() {
      this.axios("gaode/v3/config/district?parameters", {
        params: {
          key: "8bbfdf6309caef7066348deed2e1f503",
          keywords: "100000",
          subdistrict: 3
        }
      }).then(res => {
        if (res.data.status == 1) {
          let arr = res.data.districts[0].districts;
          arr.map(item => {
            item.districts.map(items => {
              items.districts.map(nullvalue => {
                delete nullvalue.districts;
              });
            });
          });
          this.options = arr;
        }
      });
    },
    handleChange() {
      this.$emit("adcode", this.value);
    }
  }
};
</script>
<style>
</style>
