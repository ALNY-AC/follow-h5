export default {
    name: 'MsgInfo',
    props: {},
    data() {
        return {
            msg: null,
            msg_id: "",
        };
    },
    methods: {
        update() {
            this.$loading(0, "加载中~");

            this.$get(
                "msg/get",
                {
                    msg_id: this.msg_id
                },
                res => {
                    setTimeout(() => {
                        this.$clearLoading();
                        if (res.res >= 1) {
                            this.msg = res.msg;
                            return;
                        }
                        if (res.res < 0) {
                            this.$toast("文章获取失败！请重试~");
                            return;
                        }
                    }, 200);
                },
                error => {
                    this.$toast("文章获取失败！请重试~");
                    this.$clearLoading();
                }
            );
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.msg_id = this.$route.query.msg_id;
        this.update();

        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};