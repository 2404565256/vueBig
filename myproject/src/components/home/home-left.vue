<template>
  <el-menu
    default-active="2"
    :router="true"
    :unique-opened="true"
    class="mlck el-menu-vertical-demo"
  >
    <el-submenu v-for="item1 in userData" :key="item1.id" :index="item1.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item1.authName}}</span>
      </template>

      <el-menu-item v-for="item2 in item1.children" :key="item2.id" :index="'/'+item2.path">
        <i class="el-icon-menu"></i>
        <span>{{item2.authName}}</span>
      </el-menu-item>


    </el-submenu>
    <!-- 
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home/roleList">
          <i class="el-icon-menu"></i>
          <span>角色列表</span>
        </el-menu-item>
        <el-menu-item index="/home/permissionsList">
          <i class="el-icon-menu"></i>
          <span>权限列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">
          <i class="el-icon-menu"></i>
          <span>商品列表</span>
        </el-menu-item>
        <el-menu-item index="3-2">
          <i class="el-icon-menu"></i>
          <span>分类参数</span>
        </el-menu-item>
        <el-menu-item index="/home/Classification">
          <i class="el-icon-menu"></i>
          <span>商品分类</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">
          <i class="el-icon-menu"></i>
          <span>订单列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">
          <i class="el-icon-menu"></i>
          <span>数据统计</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据源
      userData: []
    };
  },
  methods: {
    // 左侧菜单权限
    addUser() {
      this.$http({
        method: "GET",
        url: "menus"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.userData = data;
        }
      });
    }
  },
  mounted() {
    this.addUser();
  }
};
</script>

<style>
.mlck {
  height: 100%;
}
</style>
