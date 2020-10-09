export default {
    name: 'Agreement',
    props: {
        title: {
            type: String,
            default: '《随享季用户协议》'
        }
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        getContainer() {
            return document.getElementsByTagName('body')[0];
        }
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() { this.$nextTick(() => { }) },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};