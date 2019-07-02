<template>
  <div id="main" style="width: 100%;height:400px;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据

    this.$http({
      method: "GET",
      url: `reports/type/1`
    }).then(res => {
      res.data.data.xAxis[0].boundaryGap = false;
      res.data.data.grid = {
        left: "1%",
        right: "1%",
        bottom: "5%",
        containLabel: true
      };
      let data = res.data.data;
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(data);
    });
  }
};
</script>

<style>
</style>
