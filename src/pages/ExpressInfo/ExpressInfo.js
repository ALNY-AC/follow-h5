export default {
    name: 'ExpressInfo',
    props: {},
    data() {
        return {
            logistics_number: '',
            logistics_name: '',
            info: '',
            isShow: true,
        };
    },
    methods: {
        update() {
            this.$get('Logistics/get', {
                com: this.logistics_name,
                num: this.logistics_number,
            }, res => {
                if (res.res >= 1) {
                    this.info = res.msg.data;
                }
            });
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.logistics_number = this.$route.query.logistics_number;
        this.logistics_name = this.$route.query.logistics_name;
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};
