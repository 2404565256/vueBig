<template>
  <el-container>
     <!-- header -->
    <el-header>
     <homeHeader></homeHeader>
      </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <homeLeft></homeLeft>
      </el-aside>
      <!-- 右边内容区 -->
      <el-main>
            <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import homeHeader from "@/components/home/home-header";
import homeLeft from "@/components/home/home-left";

export default {
  components: {
    homeHeader,
    homeLeft
  },
   mounted() {
     let token = window.localStorage.getItem('token')
     if(!token){
          this.$router.push('/login');
     }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.bg-purple-light h2 {
  margin: 0;
  color: #fff;
}

.el-container {
  height: 100%;
}
.bg-purple a {
  text-decoration: none;
  color: #fff;
  float: right;
}
.bg-purple a:hover {
  color: red;
}
.bg-purple svg {
  float: left;
  margin: 10px 0 0 0;
}
</style>
