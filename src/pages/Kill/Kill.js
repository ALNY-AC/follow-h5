export default {
    name: "Kill",
    props: {
        navId: {
            type: String,
            default: '',
        },
        lock: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            activeIndex: 0,
            boothGroupId: '',
        };
    },
    methods: {
        update() {

            this.$get('Kill/getInfo', {
            }, res => {
                if (res.res > 0) {
                    this.boothGroupId = res.boothGroupId;
                    // this.boothGroupId = 'fedaf9d4fd6a778109ba6caaea18e280';
                }
            });
        },

    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {
        //[KillActiveGoodsCard.name]: KillActiveGoodsCard,
        //[KillGoodsCard.name]: KillGoodsCard,
    }
};

