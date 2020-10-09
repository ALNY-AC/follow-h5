export default {
    name: 'afterSaleLogisticsNumber',
    props: {},
    data() {
        return {
            number: '',
            order_id: '',
        };
    },
    methods: {
        submit() {

            let save = {
                logistics_number: this.number,
            };

            this.$post('AfterSale/saveData', {
                order_id: this.order_id,
                save: save,
            }, res => {
                if (res.res >= 1) {
                    this.$toast('提交成功！');
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 100);
                    return;
                }
                this.$toast('提交失败！请重试');
            },
                error => {
                    this.$toast('提交失败！请重试');
                }
            );
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};