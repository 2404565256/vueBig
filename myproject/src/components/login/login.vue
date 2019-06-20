<template>
  <div class="dlcc">
    <div class="dlcc_nr">
      <h2>用户登录</h2>
      <el-form
        label-width="100px"
        status-icon
        :rules="rules"
        label-position="top"
        ref="formObj"
        :model="formObj"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formObj.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.prevent="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formObj: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.formObj.validate(valid => {
        if (valid) {
          //验证成功触发
          this.$http({
            method: "post",
            url: "http://localhost:8888/api/private/v1/login",
            data: this.formObj
          }).then(res => {
            const { data, meta } = res.data;
            if (meta.status === 200) {
              //登录成功后跳转
                this.$router.push("/");
              //element  弹出框
              this.$message({
                message: meta.msg,
                type: "success"
              });

              //登录成功后存一下token 值
              window.localStorage.setItem("token", data.token);
            } else {
              //element  弹出框
              this.$message.error(meta.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.dlcc {
  background-color: #324152;
  position: relative;
  width: 100%;
  height: 100%;
}

.dlcc_nr {
  padding: 40px;
  width: 500px;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-button {
  width: 100%;
}
</style>
