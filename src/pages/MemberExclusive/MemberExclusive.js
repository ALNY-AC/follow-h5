export default {
    name: 'MemberExclusive',
    props: {},
    data() {
        return {};
    },
    methods: {
        share() {
            //下载图片http://server.followenjoy.cn/download/img/a.jpg
            this.$loading(0, '下载中');
            window['plus'].gallery.save('/static/vip.jpg', (e) => {
                this.$clearLoading();
                setTimeout(() => {
                    this.$toast('下载成功~');
                }, 10);
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