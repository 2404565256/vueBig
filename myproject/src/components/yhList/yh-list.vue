<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row>
      <el-col :span="6">
        <div style="margin-top: 15px;margin-right: 10px;">
          <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
            <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <!-- 添加数据按钮 -->
      <div style="margin-top: 15px;">
        <el-button @click.prevent="listAdd" type="success" plain>添加用户</el-button>
      </div>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tmList" border style="width: 100%;margin-top: 15px;">
        <el-table-column type="index" width="30"></el-table-column>

        <el-table-column prop="username" label="姓名" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="240"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="240"></el-table-column>
        <!-- 用户登录状态 -->
        <el-table-column prop="mg_state" width="320" label="用户状态">
          <!-- slot-scope="scope" 获取到当前行的数据源 -->
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch
              @change="zTmg_state(scope.row.id,scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click.prevent="editop(scope.row.id)"
              size="mini"
              icon="el-icon-edit"
              plain
            ></el-button>
            <el-button
              type="danger"
              @click.prevent="deleteUser(scope.row.id)"
              size="mini"
              icon="el-icon-delete"
              plain
            ></el-button>
            <el-button
              type="success"
              @click.prevent="permissions(scope.row.id,scope.row.username)"
              size="mini"
              icon="el-icon-check"
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <div class="yh_fy">
      <!-- current-page: 当前页 page-sizes: 设置页容量的选项 page-size：当前页 layout:控制组件的显示内容 -->
      <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        layout=" sizes, prev, pager, next, jumper,total"
        :current-page="pagenum"
        :total="total"
        :page-sizes="pageSizes"
        :page-size="pagesize"
      ></el-pagination>
    </div>

    <!-- 增加弹出模态框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="addUser">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="editccDialog">取 消</el-button>
        <el-button type="primary" @click.prevent="SubmitTo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form :model="xiugUser">
        <!-- :required="true"  显示红色的* -->
        <el-form-item label="用户名:" :label-width="formLabelWidth" :required="true">
          <el-input placeholder="请输入内容" v-model="xiugUser.username" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="xiugUser.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="xiugUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="quxiaoUser">取 消</el-button>
        <el-button type="primary" @click.prevent="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色模态框 -->
    <el-dialog title="分配用户角色" :visible.sync="assignRoles">
      <el-form :model="assignRolesList">
        <!-- :required="true"  显示红色的* -->
        <el-form-item label="用户名:" :label-width="formLabelWidth">{{assignRolesList.username}}</el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="请选择角色:" :label-width="formLabelWidth">
          <el-select v-model="assignRolesValue" placeholder="请选择角色">
            <el-option
              v-for="item in assignRolesNNList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="mtYYc">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
  data() {
    return {
      tmList: [],
      //查询关键字
      query: "",
      //当前页
      pagenum: 1,
      //   页容量
      pagesize: 8,
      // 容量选项
      pageSizes: [4, 8, 12],
      // 总条数
      total: 0,
      //控制添加模态框显示影藏
      addDialog: false,
      // 设置表头的宽度
      formLabelWidth: "110px",
      //添加弹框数据 双向绑定
      addUser: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //控制编辑模态框显示影藏
      editDialog: false,
      // 编辑 修改数据 双向绑定
      xiugUser: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      //控制分配角色模态框显示影藏
      assignRoles: false,
      // 分配角色 修改数据 双向绑定
      assignRolesList: {
        username: "",
        id: ""
      },
      // 分配用户角色下拉宽里的值
      assignRolesNNList: [
        {
          value: "选项1",
          label: "请选择角色",
          disabled: true
        },
        {
          value: "选项2",
          label: "主管"
        },
        {
          value: "选项3",
          label: "测试角色"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      assignRolesValue: "1"
    };
  },
  methods: {
    nEget() {
      this.$http({
        method: "GET",
        url: `http://localhost:8888/api/private/v1/users?pagenum=${
          this.pagenum
        }&pagesize=${this.pagesize}&query=${this.query}`,
        headers: { Authorization: window.localStorage.getItem("token") }
      }).then(res => {
        // console.log(res.data);
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tmList = data.users;
          this.total = data.total;
        }
      });
    },
    // currentPage 改变时会触发   当前页
    currentChange(currentChange) {
      this.pagenum = currentChange;
      this.nEget();
    },
    //pageSize 改变时会触发  每页条数
    sizeChange(sizeChange) {
      this.pagesize = sizeChange;
      this.nEget();
    },
    // 搜索
    search() {
      this.nEget();
    },
    // 添加用户按钮点击 弹出框
    listAdd() {
      this.addDialog = true;
    },
    // 添加用户弹出框  点击取消按钮事件
    cancelDialog() {
      this.addDialog = false;
    },
    // 添加用户弹出框  点击确认按钮 提交请求
    SubmitTo() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.addUser,
        headers: { Authorization: window.localStorage.getItem("token") }
      }).then(res => {
        console.log(res);
        if (res.data.meta.status === 201) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.nEget();
          this.addDialog = false;
          for (let cksl in this.addUser) {
            this.addUser[cksl] = "";
          }
        }
      });
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("确认要删除该用户么？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "delete",
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: { Authorization: window.localStorage.getItem("token") }
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.nEget();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑用户弹出框  同时用当前数据源的ID去获取 数据渲染到编辑框里
    editop(id) {
      this.$http({
        method: "GET",
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: { Authorization: window.localStorage.getItem("token") }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.xiugUser = data;
          //获取数据成功后给 设置 editDialog 为 true   弹出框显示
          this.editDialog = true;
        }
      });
    },
    //编辑用户弹框 里的取消按钮
    quxiaoUser() {
      this.editDialog = false;
    },
    //编辑弹出框里  确认按钮  提交编辑后的内容
    editUser() {
      this.$http({
        method: "put",
        url: `http://localhost:8888/api/private/v1/users/${this.xiugUser.id}`,
        data: this.xiugUser,
        headers: { Authorization: window.localStorage.getItem("token") }
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.editDialog = false;
          this.nEget();
        }
      });
    },
    // 修改用户状态的方法
    zTmg_state(id, mg_state) {
      this.$http({
        method: "put",
        url: `http://localhost:8888/api/private/v1/users/${id}/state/${mg_state}`,
        headers: { Authorization: window.localStorage.getItem("token") }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: "设置状态成功",
            type: "success"
          });
        }
      });
    },
    //点击用户权限 按钮
    permissions(id, username) {
      this.assignRoles = true;
      this.assignRolesList.username = username;
      //获取下拉框数据
      // this.$http({
      //   method: "GET",
      //   url: `http://localhost:8888/api/private/v1/roles`,
      //   headers: { Authorization: window.localStorage.getItem("token") }
      // }).then(res => {
      //   console.log(res);
        
      // });
    },
    //点击用户权限模态框 取消按钮
    mtYYc() {
      this.assignRoles = false;
    }
  },

  //当vue 加载完成后执行
  mounted() {
    //this.nEget(); 获取数据
    this.nEget();
  }
};
</script>

<style>
.yh_fy {
  text-align: center;
  margin-top: 20px;
}
</style>
