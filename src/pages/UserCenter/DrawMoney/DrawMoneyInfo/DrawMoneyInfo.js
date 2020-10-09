export default {
    name: 'DrawMoneyInfo',
    props: {},
    data() {
        return {
            draw_money_id: '',
            data: null,
        }

    },
    methods: {
        update() {
            this.$get('drawMoney/get', {
                draw_money_id: this.draw_money_id
            }, res => {
                if (res.res >= 1) {
                    this.data = res.msg;
                    return;
                }
                this.$toast('数据获取失败！');
            });
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.draw_money_id = this.$route.query.draw_money_id;
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};