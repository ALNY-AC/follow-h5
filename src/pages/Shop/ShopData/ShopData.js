export default {
    name: 'ShopData',
    props: {},
    data() {
        return {
            userInfo: null
        };
    },
    methods: {},
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.userInfo = this.$getUserInfo();

        console.log(this.userInfo);

        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};