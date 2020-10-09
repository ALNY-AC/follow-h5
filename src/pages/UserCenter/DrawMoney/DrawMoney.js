export default {
    name: 'DrawMoney',
    props: {},
    data() {
        return {
            empty: false,
            list: false
        };
    },
    methods: {
        update() {

            this.$get('drawMoney/getList', {}, res => {
                console.log(res);
                if (res.res >= 1) {
                    this.list = res.msg;
                    return;
                }
                if (res.res == 0) {
                    this.empty = true;
                    return;
                }

                this.$toast('列表获取失败！');
            });

        },
        showInfo(item) {
            this.$push({
                path: '/userCenter/DrawMoney/DrawMoneyInfo',
                query: {
                    draw_money_id: item.draw_money_id
                }
            });
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};