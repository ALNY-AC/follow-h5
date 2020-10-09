// @ts-nocheck
export default {
    name: 'OriginPayCard',
    props: {
        pay: {
            type: Object,
            default() {
                return {}
            }
        },
        list: {
            type: Array,
            default() {
                return []
            }
        },
        index: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            m: 0,
            s: 0,
            time: null,
            invalid: false,
        };
    },
    methods: {
        toPay() {
            this.$push({
                path: '/Pay',
                query: {
                    pay_id: this.pay.pay_id
                }
            });
        },
        cancel(is = true) {
            if (is) {
                if (confirm('确定要取消订单吗')) {
                    this.$post('order/cancel', {
                        pay_id: this.pay.pay_id
                    }, res => {
                        if (res.res >= 1) {
                            this.list.splice(this.index, 1);
                            this.$toast('取消成功！');
                        }
                    });
                }
            } else {
                this.$post('order/cancel', {
                    pay_id: this.pay.pay_id
                }, res => {
                    if (res.res >= 1) {
                        // this.$emit('on-cancel');
                        this.list.splice(this.index, 1);
                    }
                });
            }

        },
        stop() {
            clearInterval(this.time);
        },
        start() {

            this.stop();

            function formatTime(seconds) {
                return [
                    parseInt(seconds / 60 % 60),
                    parseInt(seconds % 60)
                ]
            }

            var toTime = parseInt((new Date()).getTime() / 1000);

            let ends = 1200;

            this.m = formatTime((parseInt(this.pay.add_time) + ends) - toTime)[0];
            this.s = formatTime((parseInt(this.pay.add_time) + ends) - toTime)[1];
            this.time = setInterval(() => {
                var toTime = parseInt((new Date()).getTime() / 1000);

                this.m = formatTime((parseInt(this.pay.add_time) + ends) - toTime)[0];
                this.s = formatTime((parseInt(this.pay.add_time) + ends) - toTime)[1];

            }, 1000);
        }
    },
    computed: {
        timeTitle() {
            if (parseInt(this.m) < 0) {
                return '00:00';
            }
            let m = (this.m + '').length >= 2 ? this.m : '0' + this.m;
            let s = (this.s + '').length >= 2 ? this.s : '0' + this.s;

            return m + ':' + s;
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    mounted() {
        this.start();
    },
    activated() {
        this.start();
    },
    //Vue 实例销毁后调用
    destroyed() {
        this.stop();
    },
    //组件停用
    deactivated() {
        this.stop();
    },
    components: {},
    watch: {
        m() {
        },
        s() {
            if (this.m <= 0 && this.s <= 0) {
                this.cancel(false);
            }
        }
    }
};
