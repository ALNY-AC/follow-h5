export default {
    name: 'OrderInfo',
    props: {},
    data() {
        return {
            order_id: '',
            state: '',
            data: null,
        };
    },
    methods: {
        update() {
            this.$get('order/get', {
                order_id: this.order_id
            }, res => {
                this.state = res.msg.order.state;
                this.data = res.msg;
            }, error => {
                // activity_id: null;
                // add_time: "1526727892";
                // count: "1";
                // coupon_id: null;
                // earn_price: "1.00";
                // edit_time: "1526727892";
                // goods_id: "26";
                // goods_title: "锋味茶餐厅系列（咖啡、奶茶、阿华田、麦香奶） 310g*1/盒";
                // img: "Public/Upload/admin2018-05-14/5af92d9d3426b.jpg";
                // order_id: "2018051919055351824";
                // price: "10.00";
                // purchase_price: "1.00";
                // s1: "密集补水（6片*3盒+好友共享装）";
                // s2: "密集补水凝润面膜（单片)";
                // s3: "致臻·敏肌舒润套装";
                // shop_code: "0";
                // sku_id: "3ec8d5e897878a27bc9ca3c83f8e6225";
                // snapshot_id: "dcfbc1bc10d0350fc56ecd59d7788917";
                // tax: "0.10";
                // user_id: "17621643903";

            });
        }
    },
    computed: {
        payType() {
            // pay_type
            let type = this.data.pay.pay_type;
            //支付类型，1：支付宝支付，2：微信支付，
            let text = '无';
            if (type == '1') {
                text = "支付宝";
            }
            if (type == '2') {
                text = "微信支付";
            }
            return text;
        },
        total() {
            let total = this.data.order.price;
            return total;
        },
        logisticsPrice() {
            let total = this.data.logistics.price;
            return total;
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};