// @ts-nocheck
export default {
    name: 'TimePanel',
    props: {
        // 此面板需要加载的时间戳
        timeInfo: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            list: [],
            total: 0,
            page: 1,
            page_size: 5,
        };
    },
    methods: {
        // 刷新，追加
        update(fun) {

            if (this.total > 0 && this.list.length >= this.total) {
                // 没有更多数据
                if (fun) {
                    fun(true);
                }
                return;
            }

            let time = this.$getDate(1);//取得时间限制的时间戳，这里是当天加1的时间戳

            

            this.$get('TimeGoods/getPlus', {
                page: this.page,
                page_size: this.page_size,
                // gt_time: time,//时间限制，取哪一天的数据
                start_time: this.timeInfo.time_value  //这里应该是取指定几点的时间戳
            }, res => {
                if (res.res >= 1) {
                    this.total = res.count;
                    this.page++;
                    res.msg.forEach(item => {
                        this.list.push(item);
                    });
                    if (fun) {
                        fun(false);
                    }
                }
                if (res.res == 0) {
                    if (fun) {
                        fun(true);
                    }
                }

            });

        }
    },
    computed: {
        day() {
            var dd = new Date();
            dd.setDate(dd.getDate() + 1);//获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期 
            var d = dd.getDate();

            m = (m + '').length < 2 ? '0' + m : m;
            d = (d + '').length < 2 ? '0' + d : d;

            return `${m}月${d}日 ${this.timeInfo.time_label} 开抢`;

        }
    },
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


