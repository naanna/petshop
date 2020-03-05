<template>
  <div>
    <div>
      <v-chart :options="options" autoresize class="chart"></v-chart>
      <v-chart :options="option1" autoresize class="chart"></v-chart>
      <v-chart :options="option2" autoresize class="chart"></v-chart>
    </div>
  </div>
</template>

<script>
export default {
  name: "year",
  data() {
    return {
      options: {
        color: ["#4DD3D9", "#FDD67F"],
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      },
      option1: {
        title: {
          text: "等级分布",
          x: "center"
        },
        color: ["#0099cc", "#ff9933", "#ff6666"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["vip1", "vip2", "vip3"]
        },
        series: [
          {
            name: "数量",
            type: "pie",
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: "年龄分布",
          x: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "0-18",
              "18-30",
              "30-40",
              "40-50",
              "50-60",
              "60-80"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "60%",
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.getfavoritegood();
  },
  methods: {
    getfavoritegood() {
      this.axios.get("/api/count/getfavoritegood").then(res => {
        if (res.data.success) {
          var message = res.data.message;
          this.options.series[0].data = message.sex;
          this.option1.series[0].data = message.level;
          this.option2.series[0].data = message.age;
        }
      });
    }
  }
};
</script>

<style scoped>
.chart {
  margin: 0 auto;
}
</style>
