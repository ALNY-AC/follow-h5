export default {
    name: "Search",
    props: {},
    data() {
        return {
            key: "",
            isShowLabel: false,
            goodsList: [],
            empty: false,
            focus: true,


            loading: false,
            finished: false,
            currentPage: 1,
            pageSize: 5
        };
    },
    methods: {
        search(isReset) {
            if (!this.key) {
                this.isShowLabel = true;
                this.focus = true;
                this.finished = false;
                this.loading = false;
                return;
            }

            this.focus = false;
            this.isShowLabel = false;
            this.empty = false;
            // this.$refs["searchHistory"].push(this.key);
            this.$refs["searchLabel"].push(this.key);
            this.loading = true;
            if (isReset) {
                this.finished = false;
                this.goodsList = [];
                this.currentPage = 1;
                this.pageSize = 5;
            }
            var key = this.key;
            key = key.replace(/\s+/g, " ");
            key = key.split(" ");
            setTimeout(() => {
                this.$get(
                    "goods/search",
                    {
                        key: key,
                        page: this.currentPage,
                        limit: this.pageSize,
                    },
                    res => {
                        this.loading = false;
                        if (res.res >= 1) {
                            res.msg.forEach(item => {
                                this.goodsList.push(item);
                            });
                            this.finished = false;
                            return;
                        }
                        if (res.res == 0) {
                            this.finished = true;
                            return;
                        }
                        if (res.res < 0) {
                            this.finished = true;
                            this.empty = true;
                            this.isShowLabel = true;
                            this.$toast("搜索失败！请重试~");
                        }
                    },
                    error => {
                        this.isShowLabel = true;
                        this.$toast("搜索失败！请重试~");
                    }
                );
            }, 500);

        },
        labelChange(val) {
            this.key = val;
            this.search(true);
        },
        onLoad() {
            this.currentPage++;
            this.search();
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

        if (this.$route.query['noncestr'] !== localStorage['search_noncestr']) {
            localStorage['search_noncestr'] = this.$route.query['noncestr'];
            this.key = '';
            this.goodsList = [];
            this.search();
        }


    },
    created() {

    },
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {}
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
