export default {
    name: 'BecomeVip',
    props: {},
    data() {
        return {};
    },
    methods: {
        share() {

            let qrcode = this.$serverDefault + 'ShareMember/qrcode?' + 'user_id=' + this.$userInfo.user_id;


            this.$get('ShareMember/create', {}, res => {

                if (res.res >= 1) {

                    let href = res.msg + '' + '/share_id/' + this.$userInfo.user_id + '/shop_id/' + this.$userInfo.shop_id;

                    qrcode += '&share_member_id=' + res.share_member_id;
                    qrcode += '&href=' + encodeURIComponent(href);


                    this.$store.state.showShare(
                        {
                            title: "随享季会员大礼包",
                            content: this.$userInfo.user_name + '邀您成为VIP会员。',
                            href: href,
                            image: this.$getThumb("http://server.followenjoy.cn/Public/Upload/admin2018-05-18/5afea75ba9fbf.jpg"),
                            // 下面是对应各个平台的扩展参数。
                            goods_id: '396',
                            weixin: {
                                extra: { scene: "WXSceneSession" }
                            },
                            // 下面是组件特有的参数
                            comp: {
                                title: "随享季会员大礼包",
                                btn: {
                                    // qrcode: false
                                },
                                qrcode: qrcode
                            }
                        },
                        res => { }
                    );

                }

            });


        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};