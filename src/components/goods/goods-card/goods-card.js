export default {
    name: "goods-card",
    props: {
        goods: {
            type: Object,
            default: null
        },
        card: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            labels: ["label-danger", "label-warning"],
            userInfo: null,
        };
    },
    methods: {
        showInfo() {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: this.goods.goods_id,
                    activity_type: "",
                }
            });
        },
        subClick() { },
        share() {
            let title = "";
            let subTitle = "";
            let earn_price = this.goods["sku"][0].earn_price;

            if (this.$userInfo.user_vip_level > 0) {
                title = "赚" + this.goods["sku"][0].earn_price;
            } else {
                title = `成为会员分享商品，可赚${earn_price}`;
            }

            if (this.$userInfo.user_vip_level > 0) {
                subTitle = `只要你的好友通过你的连接购买此商品，你就能赚到至少<span style="color:#D7385E">${earn_price}</span>元的利润哦`;
            } else {
                subTitle = `成为会员 >`;
            }
            let goods_id = this.goods.goods_id;
            let user_id = this.userInfo.user_id;
            let url = `goodsInfo?&goods_id=${goods_id}`;

            let src = this.$getThumb(this.goods.goods_head);
            // return;

            this.$store.state.showShare(
                {
                    title: this.goods.goods_title,
                    content: this.goods.sub_title ? this.goods.sub_title : "",
                    href: url,
                    image: src,
                    goods_id: this.goods.goods_id,
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
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.userInfo = this.$getUserInfo();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    // 激活调用
    activated() { },
    // 创建完调用
    created() { },
    watch: {},
    components: {}
};