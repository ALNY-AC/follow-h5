// @ts-nocheck
export default {
    name: "App",
    data() {
        return {
        };
    },
    methods: {
        
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.active = parseInt(localStorage.Appactive);
    },
    // 激活调用
    activated() {
        this.$nextTick(() => {
            // this.update();
        });
    },

    //Vue 实例销毁后调用
    destroyed() { },
    watch: {
        active(val) { },
        $userInfo() {
            this.update();
        },
        $route(to, from) {
            this.$clearLoading();

            const toDepth = to.meta.index;
            const fromDepth = from.meta.index;

            if (toDepth > 1024) {
                this.isPull = true;
            } else {
                this.isPull = false;
            }

            if (toDepth == fromDepth) {
                this.transitionName = "";
                return;
            }
            if (to.path == "/login") {
                // this.transitionName = "slide-bottom";
                return;
            }

            // this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
            // this.update();
        }
    },
    components: {
    }
};