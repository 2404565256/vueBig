import breadCrumbs from '@/components/home/breadCrumbs';

export default {
    // components  注册组件
    components: {
        breadCrumbs,
    },
    data() {
        return {
            // 获取表格数据源
            tableData: [],
            // 分页数据源
            // 当前页数
            currentPage: 1,
            // 页容量
            pageSize: 5,
            // 页容量集合
            pageSizes: [5, 10, 15],
            // 总页数
            toTal: 0,
            // 分页数据源
            pageList: [],
            // 设置表头的宽度
            formLabelWidth: '110px',
            // 添加分类弹框
            clTion: false,
            // 级联框绑定的数据
            selvalue: [],
            // 添加分类数据源
            clTionUser: [],
            // 级联框的配置项
            propsObj: {
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                checkStrictly: true,
            },
            // 新增分类  分类名称
            addvalue: '',
            loading: true,
        };
    },
    methods: {
        // 获取表格数据源 方法
        getList() {
            this.$http({
                method: 'GET',
                url: 'categories',
            }).then((res) => {
                const { data, meta } = res.data;
                if (meta.status === 200) {
                    this.tableData = data;
                    this.fpugFn();
                    this.toTal = this.tableData.length;
                }
            });
        },
        // 公式截取实现假分页
        fpugFn() {
            // 开始数字  页容量5 *（当前页1-1）=0           从0开始所以 -1
            const bigen = this.pageSize * (this.currentPage - 1);
            // 结束数字  页容量5 *1-1  = 4   下面没有减1  是应为  slice 截取字符串 没包括结束位置
            const end = this.pageSize * this.currentPage;
            // slice(0, 4)   0~4   5条数据
            // slice() 一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符
            this.pageList = this.tableData.slice(bigen, end);
        },
        // 当前页发生改变时触发
        currentPageBi(val) {
            this.currentPage = val;
            this.getList();
        },
        // 页容量改变时触发
        pageSizeBi(val) {
            this.pageSize = val;
            this.getList();
        },
        // 添加分类数据获取
        clTionFn2() {
            this.$http({
                method: 'GET',
                url: 'categories?type=2',
            }).then((res) => {
                const { data, meta } = res.data;
                if (meta.status === 200) {
                    this.loading = false;
                    this.clTionUser = data;
                }
            });
        },
        // 新增分类
        addclTionFn3() {
            // alert(this.addvalue)
            // 得到当前分类的父ID
            const pid = this.selvalue.length === 0 ? 0 : this.selvalue[this.selvalue.length - 1];
            // 分类的层级
            const level = this.selvalue.length;
            this.$http({
                method: 'post',
                url: 'categories',
                data: {
                    cat_pid: pid,
                    cat_name: this.addvalue,
                    cat_level: level,
                },
            }).then((res) => {
                const { meta } = res.data;
                if (meta.status === 201) {
                    this.clTion = false;
                    this.$message({
                        message: meta.msg,
                        type: 'success',
                    });
                    this.getList();
                    this.clTionFn2();
                }
            });
        },
    },
    mounted() {
        // 获取所有分类
        this.getList();
        // 获取二级分类
        this.clTionFn2();
    },

};

