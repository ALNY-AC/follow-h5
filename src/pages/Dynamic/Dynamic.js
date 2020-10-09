import $ from "jquery";

export default {
    name: "Dynamic",
    props: {},
    data() {
        return {
            dynamics: [],
            dynamicsFollow: [],
            carousels: [],
            isLoading: false,
            upUsers: [],
            finished: false,
            loading: false,
            page: 1,
            lock: false,
        };
    },
    methods: {
        showUser(item) {
            this.$push({
                path: "/dynamic/user",
                query: {
                    user_id: item.user_id
                }
            });
        },
        onRefresh() {
            this.finished = false;
            this.page = 1;
            this.update((res) => {
                if (res.res >= 1) {
                    this.page++;
                    this.dynamics = res.msg;
                }
            });

        },
        update(fun) {
            //取得发现页面数据包
            if (this.lock) {
                return;
            }

            if (this.finished || this.dynamics.length === 0 && this.dynamics.length >= this.total) {
                this.finished = true;
                this.isLoading = false;
                return;
            } else {
                this.finished = false;
            }

            this.isLoading = true;


            if (this.page == 1) {
                if (typeof localStorage['DynamicListPages'] != 'undefined') {
                    // this.dynamics = [];
                    this.dynamics = JSON.parse(localStorage['DynamicListPages']);
                }
            }

            this.$get("dynamic/getList", {
                page: this.page,
                page_size: 5
            }, res => {

                this.isLoading = false;
                this.total = res.count;

                if (this.page == 1) {
                    localStorage['DynamicListPages'] = JSON.stringify(this.dynamics);
                }

                if (res.res == 0 || res.count == 0) {
                    this.finished = true;
                }
                if (fun) {
                    fun(res);
                    return;
                }
                if (res.res >= 1) {
                    this.page++;
                    res.msg.forEach(item => {
                        this.dynamics.push(item);
                    });
                }
            });

            this.$get('dynamic/getUpUser', {
            }, res => {
                if (res.res >= 1) {
                    this.upUsers = res.msg;
                }
            });

        },
        onLoad() {
            this.update();
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        $("html").css("font-size", window.innerWidth / 10);
        $(window).resize(function () {
            $("html").css("font-size", window.innerWidth / 10);
        });
        this.update();
        this.$nextTick(() => { });
    },
    activated() {
        this.lock = false;
        $("html").css("font-size", window.innerWidth / 10);
        $(window).resize(function () {
            $("html").css("font-size", window.innerWidth / 10);
        });
    },
    deactivated() {
        this.lock = true;
    },
    //Vue 实例销毁后调用
    destroyed() {
    },
    watch: {},
    components: {}
};