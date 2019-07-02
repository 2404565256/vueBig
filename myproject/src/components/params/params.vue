<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <breadCrumbs one="商品管理" two="分类参数"/>
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 下拉框 -->
    <el-form :model="getL">
      <el-form-item label-position="left" label="请选择商品分类:">
        <el-cascader
        placeholder="请选择商品分类"
          clearable
          :options="getList"
          :props="{expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- teb标签切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary">添加动态参数</el-button>
        <!-- 动态参数表格 -->
        <el-table :data="ddTtableData" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  {{scope.row}}
                  <span>1</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="date" label="商品参数"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="静态参数" name="second">
        <el-button type="primary">添加静态参数</el-button>
        <!-- 动态参数表格 -->
        <el-table :data="jjTtableData" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="date" label="属性名称"></el-table-column>
          <el-table-column prop="name" label="属性值"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import breadCrumbs from "@/components/home/breadCrumbs";
export default {
  // components  局部组件注册组件
  components: {
    breadCrumbs
  },
  data() {
    return {
      getL: {},
      //下拉宽数据源
      getList: [],
      //tabs默认 选中
      activeName: "first",
      //动态参数表格
      ddTtableData: [],
      //动态表格数据源
      jjTtableData: []
    };
  },
  methods: {
    getListFn1() {
      this.$http({
        method: "GET",
        url: "categories"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.getList = data;
        }
      });
    }
  },
  mounted() {
    this.getListFn1();
  }
};
</script>

<style scoped>
.el-alert.el-alert--warning.is-light {
  margin-bottom: 15px;
}
button.el-button.el-button--primary {
  margin-bottom: 20px;
}
</style>
