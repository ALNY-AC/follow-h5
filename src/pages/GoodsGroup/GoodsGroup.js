export default {
    name: 'GoodsGroup',
    props: {},
    data() {
        return {
            goods_group_id: '',
            loading: false,
            finished: false,
            page: 1,
            page_size: 5,
            empty: false,
            list: [],
            lock: false,
            isRefresh: false,
            groupInfo: {
                goods_group_id: '',
                group_name: '',
                booth_group_id: '',
                temp_pages_id: '',
                add_time: '',
                edit_time: '',
                data_status: '',
            },
            tree: []
        };
    },
    methods: {
        update() {
            if (this.lock) {
                this.loading = false;
                this.isRefresh = false;
                return;
            } else {
                this.lock = true;
            }
            this.$get("GoodsGroup/getList", {
                goods_group_id: this.goods_group_id,
                page: this.page,
                page_size: this.page_size,
            }, res => {
                this.loading = false;
                this.isRefresh = false;
                this.lock = false;
                if (res.res >= 1) {
                    this.finished = false;
                    this.page++;
                    res.msg.forEach(item => {
                        this.list.push(item);
                    });
                } else {
                    //加载完成
                    this.finished = true;
                }
            });

            this.$get("GoodsGroup/info", {
                goods_group_id: this.goods_group_id,
            }, res => {
                if (res.res >= 1) {
                    this.groupInfo = res.msg;
                    if (res.msg.temp_pages_id.length > 0) {
                        this.$get('TempPages/get', {
                            temp_pages_id: res.msg.temp_pages_id,
                        }, res => {
                            let CubeData = res.msg;
                            CubeData.tree = JSON.parse(CubeData.tree);
                            this.tree = CubeData.tree;
                            this.updateRefs();
                        });
                    }
                } else {
                    this.$toast('获取分组数据失败！');
                }
            });

        },
        updateRefs() {
            this.$refs['boothGroup'].update();
        },
        onLoad() {
            this.update();
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
            this.isLock = false;
            this.page_size = 5;
        },
        share(item) {
            // 分享

            let title = "";
            let subTitle = "";
            let earn_price = item["sku"][0].earn_price;

            if (this.$userInfo.user_vip_level > 0) {
                title = "赚" + item["sku"][0].earn_price;
            } else {
                title = `成为会员分享商品，可赚${earn_price}`;
            }

            if (this.$userInfo.user_vip_level > 0) {
                subTitle = `只要你的好友通过你的连接购买此商品，你就能赚到至少<span style="color:#D7385E">${earn_price}</span>元的利润哦`;
            } else {
                subTitle = `成为会员 >`;
            }
            let goods_id = item.goods_id;
            let url = `goodsInfo?&goods_id=${goods_id}`;

            let src = this.$getThumb(item.goods_head);
            // return;

            this.$store.state.showShare(
                {
                    title: item.goods_title,
                    content: item.sub_title ? item.sub_title : "",
                    href: url,
                    image: src,
                    goods_id: item.goods_id,
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: title,
                        subTitle: subTitle,
                        subClick: () => {
                            // 点击成为会员
                            this.$push({
                                path: '/MemberExclusive',
                            })
                        },
                        btn: {
                            // qrcode: true
                        }
                    }
                },
                res => { }
            );



        },
        goInfo(item) {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: item.goods_id
                }
            });
        },
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        upSize();
        this.goods_group_id = this.$route.query.goods_group_id;
        this.$nextTick(() => {
            this.isRefresh = true;
            this.update();
        });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};
function upSize() {
    function up() {
        document.getElementsByTagName("html")[0].style.fontSize =
            window.innerWidth / 10 + "px";
    }
    up();
    window.addEventListener("resize", () => {
        up();
    });
}