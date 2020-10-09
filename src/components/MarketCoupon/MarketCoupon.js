export default {
    name: 'MarketCoupon',
    props: {},
    data() {
        return {
            list: [],
            show: false,
            item: null,
            index: 0,
        };
    },
    methods: {
        update() {

            this.$get('MarketCoupon/getAll', {}, res => {
                if (res) {
                    if (res.res >= 1) {
                        this.list = res.msg;
                    }

                }
            });

        },
        click() {
            this.index++;
            this.next();
            return;
            this.$toast({
                message: '已领取~',
                position: 'bottom',
            });
            this.$get('marketCoupon/pull', {
                market_coupon_id: this.item.market_coupon_id
            }, res => {
            });
        },
        next() {

            if (this.index < this.list.length) {
                this.item = this.list[this.index];
                this.show = true;
            } else {
                this.show = false;
            }
        },
        close() {
            this.list = [];
            this.show = false;

        },
        getBody() {
            return document.getElementsByTagName('body')[0];
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {

        this.update();
        this.$nextTick(() => {

        });

    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        $route(to, from) {
        },
        list() {
            this.index = 0;
            this.next();

        }

    }
};