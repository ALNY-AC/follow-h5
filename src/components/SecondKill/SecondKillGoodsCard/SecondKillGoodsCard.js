export default {
    name: 'SecondKillGoodsCard',
    props: {},
    data() {
        return {
            testImage: "http://server.followenjoy.cn/Public/Upload/admin2018-05-18/5afe835adc5bc.jpg",
            dev: 70
        };
    },
    methods: {
        init() {

        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.init();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};