export default {
    name: 'WebView',
    props: {},
    data() {
        return {
            src: '',
            isLoad: false
        };
    },
    methods: {
        update() {
            this.isLoad = true;
            this.src = localStorage['webViewUrl'];
            document.getElementById('iframe').onload = () => {
                this.isLoad = false;
            }
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
    destroyed() {
        localStorage.removeItem('webViewUrl');
    },
    components: {},
    watch: {}
};