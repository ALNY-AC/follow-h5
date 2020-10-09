export default {
    name: 'OriginOrderListPanel',
    props: {
        state: {
            type: [String, Number],
            default: ''
        },
        lock: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            isLoading: false,//加载中
            isRefresh: false,//刷新中
            finished: false,//已结束
            orderList: [],//订单列表
            payList: [],//订单列表
            page: 1,//当前页数
            page_size: 5,//每页加载数量
            isLock: false,
            isblank:false,
            //1 "待付款" 
            //2 "待发货" 
            //3 "待收货" 
            //4 "交易成功" 
            //5 "退款/退货" 
            //6 "交易关闭" 
            //7 "已退款" 
            //8 "退款失败"
        };
    },
    methods: {
        update() {
            this.orderList.length==0?this.isblank=true:this.isblank=false;
            
            if (this.lock) {
                this.isLoading = false;
                this.isRefresh = false;
                return;
            }

            if (this.isLock) {
                return;
            } else {
                this.isLock = true;
            }

            if (this.state == '1') {

                this.$get('OrderPlus/getListUnpaid', {
                    page: this.page,
                    page_size: this.page_size,
                    state: this.state
                }, res => {
                    res.msg.length==0?this.isblank=true:this.isblank=false;

                    this.isLoading = false;
                    this.isRefresh = false;
                    this.isLock = false;

                    if (res.res >= 1) {
                        this.page++;
                        res.msg.forEach(item => {
                            this.payList.push(item);
                        });
                    }
                    if (res.res < 0) {
                        //没了
                        this.empty = true;
                        this.finished = true;
                    }

                });

                this.finished = true;

            } else {
                this.$get('orderPlus/getList', {
                    page: this.page,
                    page_size: this.page_size,
                    state: this.state
                }, res => {

                    this.isLoading = false;
                    this.isRefresh = false;
                    this.isLock = false;
                    if (res.res >= 1) {
                        this.page++;
                        res.msg.forEach(item => {
                            this.orderList.push(item);
                            this.orderList.length==0?this.isblank=true:this.isblank=false;
                        });
                    }
                    if (res.res <= 0) {
                        //没了
                        this.empty = true;
                        this.finished = true;
                    }

                });
            }


        },
        onLoad() {
            this.update();
        },
        onRefresh() {
            setTimeout(() => {
                this.init();
                this.update();
            }, 100);
        },
        init() {

            this.finished = false;
            this.isLoading = false;
            this.isRefresh = false;
            this.isLock = false;
            this.payList = [];
            this.orderList = [];
            this.page = 1;
            this.page_size = 5;

        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};