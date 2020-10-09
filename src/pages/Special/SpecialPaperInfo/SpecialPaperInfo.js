export default {
    name: "SpecialPaperInfo",
    props: {},
    data() {
        return {
            paper: null,
            special_paper_id: "",
            special: null,
        };
    },
    methods: {
        update() {
            this.$loading(0, "加载中~");
            this.$get(
                "SpecialPaper/get",
                {
                    special_paper_id: this.special_paper_id
                },
                res => {
                    this.$clearLoading();
                    if (res.res >= 1) {
                        this.paper = res.msg;
                        this.special = res.msg;
                        return;
                    }
                    if (res.res < 0) {
                        this.$toast("没有发现文章~");
                        return;
                    }
                },
                error => {
                    this.$toast("没有发现文章~");
                    this.$clearLoading();
                }
            );
        },
        share() {

            let paper = this.paper;
            let title = paper.paper_title;
            let content = paper.paper_info ? paper.paper_info : '';

            let url = `SpecialPaperInfo?special_paper_id=${this.special_paper_id}`;
            this.$store.state.showShare(
                {
                    title: title,
                    content: content,
                    href: url,
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
        goGoods(goods) {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: this.paper.goods.goods_id
                }
            });
        },
        addBag() {


        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.special_paper_id = this.$route.query.special_paper_id;
        this.update();
        this.$nextTick(() => { });
    },
    activated() {

        if (this.$route.query.special_paper_id != this.special_paper_id) {
            this.special_paper_id = this.$route.query.special_paper_id;
            this.paper = null;
            this.update();
        }

    },
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {}
};