// @ts-nocheck
export default {
    name: 'KillActiveGoodsList',
    props: {
        lock: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            isLoading: false,
            isRefresh: false,
            finished: false,
            goodsList: [],
            page: 1,
            page_size: 5,
            empty: false,
            isLock: false,
            time:"",
        };
    },
    methods: {
        update() {
            // if (this.lock) {
            //     this.isLoading = false;
            //     this.isRefresh = false;
            //     return;
            // }
            if (this.isLock) {
                return;
            } else {
                this.isLock = true;
            }
            this.$get('kill/getActiveGoodsList', {
                page: this.page,
                page_size: this.page_size,
            }, res => {
                console.log(res)
                this.isLoading = false;
                this.isRefresh = false;
                this.isLock = false;
                
                if (res.res >= 1) {
                    if(res.msg.length>1){
                        this.time=parseInt(res.msg[0].end_time)-parseInt(res.msg[0].time);
                    }
                    this.page++;
                    console.log(res.msg)
                    res.msg.forEach(item => {
                        this.goodsList.push(item);
                    });
                }

                if (res.res <= 0) {
                    //没了
                    this.finished = true;
                }
            });
        },
        onLoad() {
            this.update();
        },
        onRefresh() {
            setTimeout(() => {
                this.init();
                this.update();
            }, 200);
        },
        init() {
            this.finished = false;
            this.isLoading = false;
            this.isRefresh = false;
            this.isLock = false;
            this.goodsList = [];
            this.page = 1;
            this.isLock = false;
            this.page_size = 5;
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.init();
        this.$nextTick(() => {
            setTimeout(() => {
                this.update()
            }, 100)
        })
    },
    //Vue 实例销毁后调用
    destroyed() {},
    components: {},
    watch: {}
}