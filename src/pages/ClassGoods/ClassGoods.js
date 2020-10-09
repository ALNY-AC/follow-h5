export default {
    name: 'ClassGoods',
    props: {

    },
    data() {
        return {
            class_id: '',
            loading: false,
            finished: false,
            goodsList: [],
            page: 1,
            page_size: 5,
            empty: false,
            title: '',
        };
    },
    methods: {
        update(is) {

            // this.loading = true;

            this.$get('Class/getGoodsList', {
                page: this.page,
                page_size: this.page_size,
                class_id: this.class_id
            }, res => {
                this.loading = false;
                if (res.res >= 0) {
                    this.finished = false;
                    this.empty = false;
                    this.page++;
                    res.msg.forEach(item => {
                        this.goodsList.push(item);
                    });
                } else {
                    //加载完成
                    this.finished = true;
                    this.empty = true;
                }
            });

        },
        onLoad() {
            this.update();
        },
        init() {
            this.class_id = this.$route.query.class_id;
            this.title = this.$route.query.title;
            this.goodsList = [];
            this.page = 1;
            this.page_size = 5;
            this.empty = false;
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    activated() {

        upSize();

        if (this.class_id != this.$route.query.class_id) {
            this.init();
            this.update();
        }

    },
    created() {
        this.init();
        this.update();
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