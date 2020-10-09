export default {
    name: 'OriginOrderList',
    props: {},
    data() {
        return {
            stateList: [
                { state: '1', title: "待付款" },
                { state: '2', title: "待发货" },
                { state: '3', title: "待收货" },
                { state: '4', title: "交易成功" },
                { state: '5', title: "退款/退货" },
                { state: '6', title: "交易关闭" },
                { state: '7', title: "已退款" },
                { state: '8', title: "退款失败" }
            ],
            active: 0,
            payCount: 0,
        };
    },
    methods: {
        init() {
            this.payCount = 0;
            this.$get('OrderPlus/getUnpaidCount', {}, res => {
                this.payCount = res.total;
            })
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.init();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    deactivated() {
        this.init();
        localStorage["order_list_activeIndex"] = this.active;
    },
    activated() {
        this.init();
        if (this.$route.query["noncestr"] !== localStorage["order_list_noncestr"]) {
            localStorage["order_list_noncestr"] = this.$route.query["noncestr"];
            this.active = this.$route.query.active;
        } else {
            this.active = parseInt(localStorage["order_list_activeIndex"]);
        }
    },
    components: {},
    watch: {}
};