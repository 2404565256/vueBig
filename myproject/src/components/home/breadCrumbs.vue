<template>
  <!-- 面包屑组件 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{one}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadcrumb',
  props: ['one', 'two'],
};
</script>

<style>
</style>
