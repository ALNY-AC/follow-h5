export default {
    name: 'FixedTool',
    props: {
        position: {
            type: String,
            default: 'left'
        },
        list: {
            type: Array,
            default() {
                return [

                ];
            }
        },

    },
    data() {
        return {
            isShow: true,
        };
    },
    methods: {
        click(item) {
            item.click();
        },
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.list.forEach(item => {
            if (item.init) {
                item.init(this, item);
            }
        });
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};