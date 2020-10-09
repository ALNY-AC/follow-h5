export default {
    name: 'Invite',
    props: {},
    data() {
        return {
        };
    },
    methods: {
        share() {
            let href = `HomePage?`;
            // this.$clearLoading();
            this.$store.state.showShare(
                {
                    title: "随享季VIP邀请注册",
                    content: this.$userInfo.user_name + '赠送了您50元新手礼包，邀请您注册。',
                    href: href,
                    image:
                        "https://mmbiz.qlogo.cn/mmbiz_png/EISicquI57gst6WUxm3ksJgTtNBSyzL1ja1UHDQNDVcTySfib4BfYRnbFXnE3Bpx1wKJ08QjnAR6scaNoicBJn5uw/0?wx_fmt=png",
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: "随享季VIP邀请注册",
                        btn: {
                            qrcode: false
                        },
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
        upSize();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    // 激活后调用
    activated() { },
    created() { },
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