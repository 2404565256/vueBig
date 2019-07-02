<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <breadCrumbs one="商品管理" two="商品列表"/>
    <!-- 消息提示文案 -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs标签页 -->
    <!-- @tab-click 被选中时触发 -->
    <el-tabs v-model="activeName" tabPosition="left" @tab-click="tabClick">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="first">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="getpost.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="getpost.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="getpost.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="getpost.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            {{selvalue}}
            <el-cascader
              clearable
              v-model="selvalue"
              :options="options"
              :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 商品参数 -->
      <el-tab-pane label="商品参数" name="second">
        <div v-for="(item,index) in Commodity" :key="index">
          <div class="attrNcccame">{{item.attr_name}}</div>
          <div>
            <el-checkbox
              border
              v-model="cheCked"
              v-for="(item2,index2) in item.attr_vals.split(',')"
              :key="index2"
            >{{item2}}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>

      <!-- 商品属性 -->
      <el-tab-pane label="商品属性" name="third">
        <el-form label-position="top" label-width="80px">
          <el-form-item v-for="(item,index) in getOnly" :key="index" :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 商品图片 -->
      <el-tab-pane label="商品图片" name="fourth">
        <!-- on-preview 点击文件列表中已上传的文件时的钩子   function(file)
        on-remove 文件列表移除文件时的钩子   function(file, fileList)
        on-success 文件上传成功时的钩子  function(response, file, fileList)-->
        <el-upload
          :headers="headUpload"
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <!-- {{imgUpload}} -->
      </el-tab-pane>
      <!-- 商品内容 -->
      <el-tab-pane label="商品内容" name="five">
        <!-- 富文本编辑框 -->
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
        ></quill-editor>
        <el-button class="qrButton" @click="SubmitGoods" size="small" type="primary">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>

    <!-- 点击上传后的图片预览弹框 -->
    <el-dialog title="图片预览" :visible.sync="uploadYl">
      <img ref="uploadTs" src alt width=" 100%">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="uploadYl=false">确 定</el-button>
      </div>
    </el-dialog>
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
      active: 0,
      //标签页默认显示
      activeName: "first",
      //级联选择器数据源
      options: [],
      //级联框绑定数据
      selvalue: [],
      //商品参数数据源
      Commodity: [],
      //商品参数 默认选中
      cheCked: true,
      //商品属性数据源
      getOnly: [],
      //上传文件的请求头
      headUpload: {
        Authorization: window.localStorage.getItem("token")
      },
      //上传图片存值
      imgUpload: [],
      uploadYl: false,
      // 提交添加数据源
      getpost: {
        // 商品名称
        goods_name: "",
        // 价格
        goods_price: "",
        // 数量
        goods_number: "",
        // 	重量
        goods_weight: ""
      },
      // 富文本数据源
      content:''
    };
  },
  methods: {
    getList() {
      this.$http({
        method: "GET",
        url: "categories"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.options = data;
        }
      });
    },
    //@tab-click 被选中时触发
    tabClick(teb) {
      this.active = +teb.index;
      //跳转判断
      if (+teb.index === 1) {
        this.selMany("many");
      }
      if (+teb.index === 2) {
        this.selOnly("only");
      }
    },
    // 商品参数
    selMany(sel) {
      if (this.selvalue.length !== 0) {
        this.$http({
          method: "GET",
          url: `categories/${
            this.selvalue[this.selvalue.length - 1]
          }/attributes?sel=${sel}`
        }).then(res => {
          const { data, meta } = res.data;
          if (meta.status === 200) {
            this.Commodity = data;
          }
        });
      } else {
        this.$message.error("请选择商品分类");
      }
    },
    // 商品属性
    selOnly(sel) {
      if (this.selvalue.length !== 0) {
        this.$http({
          method: "GET",
          url: `categories/${
            this.selvalue[this.selvalue.length - 1]
          }/attributes?sel=${sel}`
        }).then(res => {
          const { data, meta } = res.data;
          if (meta.status === 200) {
            this.getOnly = data;
          }
        });
      } else {
        this.$message.error("请选择商品分类");
      }
    },
    //文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      // console.log(response);
      // console.log(file);
      //  console.log(fileList);
      // console.log(response.data.tmp_path);
      this.imgUpload.push(response.data.tmp_path);
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // console.log(file);
      //  console.log(file.response.data.tmp_path);
      this.imgUpload.forEach((item, index) => {
        if (item === file.response.data.tmp_path) {
          this.imgUpload.splice(index, 1);
        }
      });
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      // console.log(file);
      // console.log(file.response.data.url);
      // console.log(this.$refs.uploadTs.src);
      this.uploadYl = true;
      // $nextTick将回调延迟到下次 DOM 更新循环之后执行
      // DOM 还没有更新
      this.$nextTick(function() {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.$refs.uploadTs.src = file.response.data.url;
      });
    },
    SubmitGoods() {
      this.$http({
        method: "POST",
        url: `goods`,
        data: {
          ...this.getpost,
          goods_cat: this.selvalue.join(",")
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 201) {
           this.$message({
            message: "添加商品成功",
            type: "success"
          });
          this.$router.push('/goods')
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.el-alert {
  margin-bottom: 15px;
}
.el-step__title {
  font-size: 12px;
}
.label.el-checkbox.is-bordered.is-checked {
  margin-right: 0;
}
.attrNcccame {
  margin: 15px;
}
.ql-editor {
  min-height: 400px;
}
.qrButton {
  margin: 20px auto;
}
</style>
