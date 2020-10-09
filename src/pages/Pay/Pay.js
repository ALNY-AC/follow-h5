// @ts-ignore
import Pay from "@/plugin/Pay.js";

export default {
    name: 'Pay',
    props: {},
    data() {
        return {
            pay_id: '',
            pay_type: 1,
            payInfo: null,
            total: 0,
            payObj: null,
        };
    },
    methods: {
        pay() {
            let conf = {
                vm: this,
                pay_id: this.pay_id,
                pay_type: this.pay_type,
                data: this.payInfo,
            };
            this.payObj = new Pay(conf);
            this.payObj.pay();
        },
        update() {
            if (!this.pay_id) {
                return;
            }
            this.$get('Pay/getPayInfo', {
                pay_id: this.pay_id
            }, res => {
                if (res.res >= 1) {

                    if (res.msg.state == 1) {
                        //已支付订单，无需再次支付

                        this.$router.replace({
                            path: "/state",
                            query: {
                                state: "success",
                                title: "支付成功！",
                                model: 'order',
                            }
                        });

                        return;

                    }
                    this.payInfo = res.msg;
                    this.total = this.payInfo.price;
                    this.pay_type = this.payInfo.pay_type;
                }
            })
        }

    },
    computed: {
    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    beforeDestroy() {
        if (this.payObj) {
            this.payObj.clear();
        } else {
        }
    },
    activated() {
        if (this.$route.query.pay_id != this.pay_id) {
            this.pay_id = this.$route.query.pay_id;
            this.update();
        } else {
        }
    },
    created() {
        this.pay_id = this.$route.query.pay_id;
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};