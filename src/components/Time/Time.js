// @ts-nocheck
import $ from "jquery";
export default {
    name: "time-limit",
    props: {},
    data() {
        return {
            active: "",
            swiperOption: {
                slidesPerView: 5,
                spaceBetween: 10,
                centeredSlides: true,
                slideToClickedSlide: true,
                init: false,
                on: {
                    transitionEnd: () => {
                        this.currentPage = 0;
                        this.update();
                    }
                }
            },
            // swiperOptionThumbs: {
            //   touchRatio: 0.5,
            //   autoHeight: true,
            //   init: false,
            //   on: {
            //     transitionEnd: () => {
            //       this.swiperThumbs.update();
            //     }
            //   }
            // },
            times: [],



            goodsList: [],
            //是否加载完成
            finished: false,
            // 加载状态
            loading: false,
            //分页数据
            currentPage: 1,
            // 每次加载量
            pageSize: 10,
            isLoading: false,
            listData: [],
            isLock: false,
        };
    },
    methods: {
        onLoad() {
            this.update()
        },
        update() {
            let index = this.swiperTop.activeIndex
            // 更新商品列表
            if (this.isLoading) {
                // return;
            }

            if (index == 0) {
                this.getTesterday();
                return;
            }

            if (!this.times[index - 1]) {
                return;
            }

            // 先让数据等于缓存中的数据
            if (this.listData[index] && this.listData[index].length > 0) {
                this.goodsList = this.listData[index];
                return;
            } else {
                this.isLoading = true;
                // if (typeof localStorage['TimeLimitAixsListData' + index] != 'undefined') {
                //     this.listData[index] = JSON.parse(localStorage['TimeLimitAixsListData' + index]);
                // } else {
                //     this.listData[index] = [];
                // }
            }



            this.$get(
                "TimeGoods/getList",
                {
                    page: this.currentPage,
                    limit: this.pageSize,
                    start_time: this.times[index - 1].time_value
                },
                res => {
                    // this.currentPage++;

                    if (!this.listData[index]) {
                        this.listData[index] = [];
                    }

                    if (this.listData[index].length <= 0) {
                        this.goodsList = res.msg;
                    }

                    this.listData[index] = res.msg;
                    localStorage['TimeLimitAixsListData' + index] = JSON.stringify(res.msg);


                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 200);
                    });


                }
            );
        },
        init() {
            this.$nextTick(() => {
                // this.swiperTop.slideTo(i, 300, false);
                // this.update(this.active);
                // 先取出当日有商品的时刻数据

                if (typeof localStorage['TimeLimitAixs'] != 'undefined') {
                    this.bulider(JSON.parse(localStorage['TimeLimitAixs']));
                }

                this.$get("TimeGoods/getData", {}, res => {
                    localStorage['TimeLimitAixs'] = JSON.stringify(res.msg);
                    this.bulider(res.msg);
                });
            });
        },
        bulider(list) {
            let toTime = Date.parse(new Date()) / 1000;
            let index = 0;
            list.forEach((item, i) => {
                var time_value = item.time_value;

                if (toTime > time_value) {
                    // 当前的时间大于时刻时间
                    item.state = "抢购中";
                    this.update(this.active);
                    index = i;
                }
                if (toTime < time_value) {
                    item.state = "预热中";
                }

            });
            this.times = list;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.swiperTop.slideTo(index + 1, 300, false);
                }, 100);
            });
        },
        goTomorrow() {
            this.$push({
                path: "/tomorrow"
            });
        },
        getTesterday() {

            // 先让数据等于缓存中的数据
            if (this.listData[0] && this.listData[0].length > 0) {
                this.goodsList = this.listData[0];
                return;
            } else {
                this.listData[0] = [];
                this.isLoading = true;
            }

            this.$get('timeGoods/getTesterday', {
                page: this.currentPage,
                limit: this.pageSize,
            }, res => {

                if (!this.listData[0]) {
                    this.listData[0] = [];
                }

                if (this.listData[0].length <= 0) {
                    if (this.swiperTop.activeIndex == 0) {
                        this.goodsList = res.msg;
                    }
                }
                this.listData[0] = res.msg;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 200);
                });

            });

        }
    },
    computed: {
        swiperTop() {
            return this.$refs.swiperTop.swiper;
        }
        // swiperThumbs() {
        //   return this.$refs.swiperThumbs.swiper;
        // }
    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => {
            // var scrollTop = 0;
        });

    },
    // 激活调用
    activated() {
        this.$nextTick(() => {
            var scrollTopTo = $(window).scrollTop();
            var oTop = $("#TimeBox").offset().top + 35;


            if (oTop - scrollTopTo <= 46) {
                $(".time-header").css(
                    {
                        "position": "fixed",
                        "top": (46) + 'px',
                    }
                );

            } else {
                $(".time-header").css(
                    {
                        "position": "absolute",
                        "top": '0px',
                    }
                );
                // $(".van-pull-refresh__track").css('transform', 'translate3d(0px, 0px, 0px)');
            }
        });
    },
    //Vue 实例销毁后调用
    destroyed() {
        // $(window).unbind('scroll');
    },
    created() {
        this.$nextTick(() => {
            this.swiperTop.init();
            this.init();
        });
        this.$nextTick(() => {
            // $(window).unbind('scroll')
            var sTop = 0;
            var _this = this;

            $(window).scroll(function () {
                if ($('.van-tab__pane').eq(0).css('display') == 'none') {
                    return;
                }
                if ($("#TimeBox").length <= 0) {
                    return;
                }
                $(".van-pull-refresh__track").css('transform', 'none');

                var scrollTopTo = $(this).scrollTop();
                var oTop = $("#TimeBox").offset().top + 35;

                if (oTop - scrollTopTo <= 46) {
                    $(".time-header").css(
                        {
                            "position": "fixed",
                            "top": (46) + 'px',
                        }
                    );

                } else {
                    $(".time-header").css(
                        {
                            "position": "absolute",
                            "top": '0px',
                        }
                    );
                    // $(".van-pull-refresh__track").css('transform', 'translate3d(0px, 0px, 0px)');
                }

            });
        });
    },
    watch: {
        times(val) {
            this.$nextTick(() => {
                // this.swiperTop.controller.control = this.swiperThumbs;
                // this.swiperThumbs.controller.control = this.swiperTop;
                // this.swiperThumbs.init();
                if (val) {
                    // this.init();
                }
            });
        }
    },
    components: {}
};