export default {
    name: 'SpecialPaper',
    props: {},
    data() {
        return {
            list: [],
            special_id: '',
            special: null,
            page: 1,
            page_size: 5,
            loading: false,
            finished: false,
            isLoading: false
        };
    },
    methods: {
        share() {

            let url = `SpecialPaper?special_id=${this.special_id}`;

            this.$store.state.showShare(
                {
                    title: this.$route.query.title,
                    href: url,
                    content: '',
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: '分享',
                        subClick: () => {

                        },
                        btn: {
                            qrcode: false
                        }
                    }
                },
                res => { }
            );

        },
        open(item) {
            this.$push({
                path: "/SpecialPaperInfo",
                query: {
                    special_paper_id: item.special_paper_id
                }
            });
        },
        onLoad() {
            this.update()
        },
        update() {
            // this.$loading(200, "加载中~");
            this.$get(
                "SpecialPaper/getList",
                {
                    where: {
                        special_id: this.special_id
                    },
                    page: this.page,
                    page_size: this.page_size
                },

                res => {
                    this.loading = false;
                    // this.$clearLoading();
                    // this.special = res.msg;
                    if (res.res >= 1) {
                        this.page++;
                        res.msg.forEach(item => {
                            this.list.push(item);
                        });
                        return;
                    }
                    if (res.res <= 0) {
                        this.empty = true;
                        this.finished = true;
                        return;
                    }
                }
            );
        },
        onRefresh() {
            setTimeout(() => {
                this.init();
                this.update();
            }, 100);
        },
        init() {
            this.finished = false;
            this.isLoading = false;
            this.list = [];
            this.page = 1;
            this.page_size = 5;
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    activated() {
        if (this.$route.query.special_id != this.special_id) {
            this.special = null;
            this.update();
        }
    },
    created() {
        this.special_id = this.$route.query.special_id;
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};
