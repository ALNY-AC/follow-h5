export default {
    name: 'Test',
    props: {},
    data() {
        return {
            localStorage: {
                user_id: '',
                token: '',
            }
        };
    },
    methods: {
        test() {
            this.$get("ShareRed/create", {}, res => {
                // this.$clearLoading();
                this.$store.state.showShare(
                    {
                        title: "【随享季】第7个领取的人红包最大！",
                        content: "10元大包等你来撩，手快有，手慢无~",
                        href: res.url,
                        image:
                            "https://mmbiz.qlogo.cn/mmbiz_png/EISicquI57gst6WUxm3ksJgTtNBSyzL1ja1UHDQNDVcTySfib4BfYRnbFXnE3Bpx1wKJ08QjnAR6scaNoicBJn5uw/0?wx_fmt=png",
                        // 下面是对应各个平台的扩展参数。
                        weixin: {
                            extra: { scene: "WXSceneSession" }
                        },
                        // 下面是组件特有的参数
                        comp: {
                            title: "分享红包",
                            btn: {
                                qrcode: false
                            },
                            isParam: false
                        }
                    },
                    res => { }
                );
            });
        },
        updateUser() {
            this.$getUserInfo(true);
            this.localStorage.user_id = localStorage.user_id;
            this.localStorage.token = localStorage.token;
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