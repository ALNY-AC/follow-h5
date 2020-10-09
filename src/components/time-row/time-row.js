// @ts-nocheck
export default {
    name: "time-row",
    props: {

        goodsId: {
            type: String,
            default: ''
        },
        notTime: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // 天
            d: '--',
            //时
            h: "--",
            //分
            m: "--",
            //秒
            s: "--",
            time: null,
            reach: false, //到没到时间
            isEnd: false,
            startTime: '',
            endTime: '',
            state: '',
            isShow: false,
        };
    },
    methods: {
        init() {
            let toTime = Date.parse(new Date()) / 1000;

            var stateDate = new Date(this.startTime * 1000);
            var endDate = new Date(this.endTime * 1000);


            if (toTime >= this.startTime) {
                // 当前的时间大于开始时间
                this.$emit('update:notTime', false);//活动已经开始，所以这个为false

            } else {
                // 当前的时间小于开始时间
                // 显示几点开卖
                // stateDate
                let m = stateDate.getMonth() + 1;
                let d = stateDate.getDate();

                let h = stateDate.getHours();
                let i = stateDate.getMinutes();

                h = (h + '').length < 2 ? '0' + h : h;
                i = (i + '').length < 2 ? '0' + i : i;

                this.state = `${m}月${d}日 ${h}:${i} 开卖`;
                // this.$emit("update:isTime", false); //没有限时购
                this.$emit('update:notTime', true);//活动未开始，所以这个为true

            }

            if (toTime >= this.endTime) {
                // 过期
                this.state = `活动已结束`;

            } else {
            }

            if (toTime >= this.startTime && toTime <= this.endTime) {
                this.state = `活动进行中`;
                // this.dateCount();
                this.initTime();
            }


        },
        dateCount() {
            // 获取现在的时间
            var date = new Date();
            // 2018的第一天
            var until = new Date(this.endTime * 1000);
            // 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
            var days = (until - date) / 1000 / 3600 / 24;

            // 下面都是简单的数学计算
            var day = Math.floor(days);
            var hours = (days - day) * 24;
            var hour = Math.floor(hours);
            var minutes = (hours - hour) * 60;
            var minute = Math.floor(minutes);
            var seconds = (minutes - minute) * 60;
            var second = Math.floor(seconds);
            var back =
                "距离结束还剩下" +
                day +
                "天" +
                hour +
                "小时" +
                minute +
                "分钟" +
                second +
                "秒";

            return {
                d: day,
                h: hour,
                m: minute,
                s: second,
            };
        },

        //初始化计时器
        initTime() {
            let update = (() => {
                return () => {
                    let data = this.dateCount();
                    this.d = data.d;
                    this.h = (data.h + "").length <= 1 ? "0" + data.h : data.h;
                    this.m = (data.m + "").length <= 1 ? "0" + data.m : data.m;
                    this.s = (data.s + "").length <= 1 ? "0" + data.s : data.s;

                    if (data.h <= 0 && data.m <= 0 && data.s <= 0) {
                        this.reach = false; //时间过期
                        this.isEnd = true; //时间结束
                        // 结束
                        // this.clearTime();
                    } else {
                    }
                };
            })();
            this.time = setInterval(() => {
                update();
            }, 1000);

        },
        //结束计时器
        clearTime() {
            clearInterval(this.time);
        },
        update() {

            this.$get('TimeGoods/get', {
                goods_id: this.goodsId,
            }, res => {
                if (!res.msg) {
                    this.isShow = false;
                    return;
                } else {
                    this.isShow = true;
                }
                this.startTime = parseInt(res.msg.start_time);
                this.endTime = parseInt(res.msg.end_time);
                this.init();
            });


        }
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() {
        this.clearTime();
    },
    watch: {
        reach() {
            if (!this.reach) {
                this.h = "--";
                this.m = "--";
                this.s = "--";
            }
        }
    },
    components: {}
};