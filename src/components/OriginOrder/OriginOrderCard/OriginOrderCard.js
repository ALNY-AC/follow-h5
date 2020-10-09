export default {
    name: 'OriginOrderCard',
    props: {
        order: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        lookExpressInfo() {
            let com = this.order.logistics.logistics_name;
            let nu = this.order.logistics.logistics_number;
            this.$push({
                path: "/ExpressInfo",
                query: {
                    logistics_number: this.order.logistics.logistics_number,
                    logistics_name: this.order.logistics.logistics_name
                }
            });
        },
        okOrder() {
            if (confirm('确定收货吗？')) {

                let order = this.order;
                this.$getUserInfo(true);
                this.$get('order/okOrder', {
                    order_id: order.order_id
                }, res => {
                    if (res.res >= 1) {
                        this.$replace({
                            path: "/state",
                            query: {
                                state: "success",
                                title: "交易完成！"
                            }
                        });
                    }
                });
            }
        },
        afterSale() {
            this.$push({
                path: "/afterSale",
                query: {
                    order_id: this.order.order_id
                }
            });
        },

        afterSaleLogisticsNumber() {
            this.$push({
                path: "/afterSaleLogisticsNumber",
                query: {
                    order_id: this.order.order_id
                }
            });
        },
        open() {
            let order = this.order;
            this.$push({
                path: "/orderInfo",
                query: {
                    order_id: order.order_id
                }
            });
        },
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() { this.$nextTick(() => { }) },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};