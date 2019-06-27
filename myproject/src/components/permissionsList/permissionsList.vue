<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <breadCrumbs one="权限管理" two="权限列表"/>
    <!-- 列表 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="30"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="层级"></el-table-column>
      </el-table>
    </template>
  </el-card>
</template>
</el-card>

</template>

<script>
import breadCrumbs from '@/components/home/breadCrumbs';

export default {
  // components  注册组件
  components: {
    breadCrumbs,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getList() {
      this.$http({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/rights/list',
      }).then((res) => {
        const { data, meta } = res.data;
        console.log(data);
        if (meta.status === 200) {
          this.tableData = data;
          for (let i = 0; i < this.tableData.length; i++) {
            switch (this.tableData[i].level) {
              case '0':
                this.tableData[i].level = '一级';
                break;
              case '1':
                this.tableData[i].level = '二级';
                break;
              case '2':
                this.tableData[i].level = '三级';
                break;
            }
          }
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
</style>
