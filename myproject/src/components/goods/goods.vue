<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <breadCrumbs one="商品管理" two="商品列表"/>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="6">
        <div style="margin-right: 10px;">
          <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
            <el-button @click.prevent="getTableData()" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <!-- 添加数据按钮 -->
      <el-button @click="$router.push('/goodsAdd')" type="success" plain>添加用户</el-button>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="640"></el-table-column>
      <el-table-column prop="goods_number" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="120"></el-table-column>
      <!-- <el-table-column prop="add_time"  label="创建时间" width="220"></el-table-column> -->
      <el-table-column label="创建时间" width="220">
        <template slot-scope="scope">
        <div >{{scope.row.add_time | timeformate}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="currentPageSize"
      @current-change="changeNumber"
      :current-page="pageNumber"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import breadCrumbs from "@/components/home/breadCrumbs";

export default {
  // components  注册组件
  components: {
    breadCrumbs
  },
  data() {
    return {
      //表格数据源
      tableData: [],
      //搜索数据源
      query: "",
      //当前页
      pageNumber: 1,
      //页容量
      pageSize: 10,
      //页容量集合
      pageSizes: [10, 20, 30],
      //   分页总条数
      total: 0
    };
  },
  methods: {
    //请求数据渲染页面
    getTableData() {
      this.$http({
        method: "GET",
        url: `goods?query=${this.query}&pagenum=${this.pageNumber}&pagesize=${
          this.pageSize
        }`
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.total = data.total;
          this.tableData = data.goods;
        }
      });
    },
    //当前页改变时触发
    changeNumber(number) {
      this.pageNumber = number;
      this.getTableData();
    },
    //当前页容量改变触发
    currentPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getTableData();
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style>
</style>
