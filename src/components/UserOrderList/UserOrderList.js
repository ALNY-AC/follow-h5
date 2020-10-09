// @ts-ignore

export default {
    name: 'UserOrderList',
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            payObj: null,
        };
    },
    methods: {
        open(item) {
            if (item.orderList.length > 1) {
                return;
            }
            let order = item.orderList[0];
            this.$push({
                path: "/orderInfo",
                query: {
                    order_id: order.order_id
                }
            });
        },
        cancel(item, i, list) {

            if (confirm('确定要取消订单吗')) {

                this.$post('order/cancel', {
                    pay_id: item.pay_id
                }, res => {
                    if (res.res >= 1) {
                        list.splice(i, 1);
                        this.$toast('取消成功！');
                    }
                });
            }

        },
        pay(item, i, list) {
            // this.$loading(0, "正在获取支付数据");
            this.$push({
                path: '/Pay',
                query: {
                    pay_id: item.pay_id
                }
            });
        },
        afterSaleLogisticsNumber(item) {

            this.$push({
                path: "/afterSaleLogisticsNumber",
                query: {
                    order_id: item.orderList[0].order_id
                }
            });

        },
        afterSale(item) {
            this.$push({
                path: "/afterSale",
                query: {
                    order_id: item.orderList[0].order_id
                }
            });
        },
        lookExpressInfo(item) {
            let com = item.logistics.logistics_name;
            let nu = item.logistics.logistics_number;
            this.$push({
                path: "/ExpressInfo",
                query: {
                    logistics_number: item.logistics.logistics_number,
                    logistics_name: item.logistics.logistics_name
                }
            });
        },
        okOrder(item) {
            if (confirm('确定收货吗？')) {

                let order = item.orderList[0];

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
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => {
        })
    },
    //Vue 实例销毁后调用
    beforeDestroy() {
        if (this.payObj) {
            this.payObj.clear();
        } else {
        }
    },
    destroyed() { },
    components: {},
    watch: {}
};