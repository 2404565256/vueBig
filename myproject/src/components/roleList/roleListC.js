import breadCrumbs from '@/components/home/breadCrumbs';

export default {
  // components  注册组件
  components: {
    breadCrumbs,
  },
  data() {
    return {
      // 角色列表的数据源
      tableData: [],
      // 控制添加角色模态框显示影藏
      rolesDialog: false,
      // 设置表头的宽度
      formLabelWidth: '110px',
      // 添加弹框数据
      rolesUser: {
        roleName: '',
        roleDesc: '',
      },
      // 控制分配角色模态框显示影藏
      AssignPfpk: false,
      dataFpg: [],
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      // 默认选中的树形菜单
      morxzWb: [],
      // 提交角色 当前行数据源ID
      EditFunID: '',
      // 编辑角色模态框
      EditRoleTT: false,
      // 编辑角色数据
      EditUser: {
        roleName: '',
        roleDesc: '',
        id: '',
      },


    };
  },
  methods: {
    // 提交创建角色
    AddingRoles() {
      this.$http({
        method: 'POST',
        url: 'roles',
        data: this.rolesUser,
      }).then((res) => {
        const { meta } = res.data;
        if (meta.status === 201) {
          this.$message({
            message: '创建角色成功',
            type: 'success',
          });
          this.rolesDialog = false;
          this.getRoles();
        }
      });
    },
    // 获取角色列表
    getRoles() {
      this.$http({
        method: 'get',
        url: 'roles',
      }).then((res) => {
        const { data, meta } = res.data;
        // console.log(data);
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    },
    // 删除授权
    deleteRoles(roleId, rightId, sCope) {
      this.$http({
        method: 'delete',
        url: `roles/${roleId}/rights/${rightId} `,
      }).then((res) => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: '删除权限成功',
            type: 'success',
          });
          // for 循环 数据源 tableData 数组  去匹配里面的 的id  如果相同就替换掉里面的children
          //  for(var i=0;i<this.tableData.length;i++){
          //     if(this.tableData[i].id == roleId){
          //         this.tableData[i].children =data
          //     }
          //  }

          // 把这一行的数据源传过来 sCope  数据中这一条对象的数据
          sCope.row.children = data;
        }
      });
    },
    // 点击分配权限按钮
    dlogfpg(rios) {
      // 获取数据渲染树形列表
      this.$http({
        method: 'get',
        url: 'rights/tree',
      }).then((res) => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.dataFpg = data;
          this.AssignPfpk = true;
        }
      });
      // 把当前数据源 ID 传给 EditFunID
      this.EditFunID = rios.id;
      // 弹框打开时 先清除默认选中的
      this.morxzWb = [];
      // rios 数据源 把当前行的数据渲染到树形菜单中 有权限的会选中
      rios.children.forEach((obG) => {
        obG.children.forEach((obG) => {
          obG.children.forEach((obG) => {
            this.morxzWb.push(obG.id);
          });
        });
      });
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm('确认删除该角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.$http({
          method: 'delete',
          url: `roles/${id}`,
        }).then((res) => {
          const { meta } = res.data;
          if (meta.status === 200) {
            this.getRoles();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // 编辑角色 弹框打开
    EditRole(row) {
      this.EditUser.roleName = row.roleName;
      this.EditUser.roleDesc = row.roleDesc;
      this.EditUser.id = row.id;
      this.EditRoleTT = true;
    },
    // 编辑角色 弹框确定  修改角色信息
    EditSubmission() {
      this.$http({
        method: 'PUT',
        url: `roles/${this.EditUser.id}`,
        data: {
          roleName: this.EditUser.roleName,
          roleDesc: this.EditUser.roleDesc,
        },
      }).then((res) => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: '创建角色成功',
            type: 'success',
          });
          this.getRoles();
          this.EditRoleTT = false;
        }
      });
    },
    // 角色授权
    EditFun() {
      const bxJd = this.$refs.sxccDc.getHalfCheckedKeys();
      const qxJd = this.$refs.sxccDc.getCheckedKeys();
      const skc = [...bxJd, ...qxJd].join();
      this.$http({
        method: 'POST',
        url: `roles/${this.EditFunID}/rights`,
        data: {
          rids: skc,
        },
      }).then((res) => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: '权限分配成功',
            type: 'success',
          });
          this.getRoles();
          this.AssignPfpk = false;
        }
      });
    },

  },
  mounted() {
    this.getRoles();
  },
};
