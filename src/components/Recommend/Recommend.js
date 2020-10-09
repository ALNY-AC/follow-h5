export default {
    name: 'Recommend',
    props: {
        scene: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            list: [],
            page: 1,
            page_size: 5,
            loading: false,
            finished: false,
        };
    },
    methods: {
        update() {
            this.$get("recommend/getList", {
                scene: this.scene,
                page: this.page,
                page_size: this.page_size,
            }, res => {
                this.loading = false;
                if (res.res >= 1) {
                    this.finished = false;
                    this.page++;
                    res.msg.forEach(item => {
                        this.list.push(item);
                    });
                } else {
                    //加载完成
                    this.finished = true;
                }
            });
        },
        onLoad() {
            this.update();
        },
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        upSize();
        this.update();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};

function upSize() {
    function up() {
        document.getElementsByTagName("html")[0].style.fontSize =
            window.innerWidth / 10 + "px";
    }
    up();
    window.addEventListener("resize", () => {
        up();
    });
}