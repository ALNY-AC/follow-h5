import $ from "jquery";

export default {
    name: 'Tomorrow',
    props: {},
    data() {
        return {
            timeList: [],
            list: [],
            index: 0,
            loading: false,
            finished: false,
        };
    },
    methods: {

        init() {

            let time = this.$getDate(1);//这是明天的时间戳

            // 先取出明日需要加载的时刻数据包
            this.$get('TimeGoods/getTomorrow', {
                gt_time: time
            }, res => {
                if (res.res >= 1) {

                    this.timeList = res.msg;
                    this.list.push(this.timeList[this.list.length]);
                    this.$nextTick(() => {
                        this.update();
                    });

                }
            });
        },
        update() {

            if (this.$refs['timePanel']) {
                this.loading = true;
                this.$refs['timePanel'][this.$refs['timePanel'].length - 1].update((is) => {

                    this.loading = false;

                    if (is === true) {
                        // 加载完成
                        if (this.list.length >= this.timeList.length) {
                            this.finished = true;
                            // 加载完成
                        } else {
                            // 未完成
                            this.list.push(this.timeList[this.list.length]);
                            this.$nextTick(() => {
                                this.update();
                            });
                        }
                    }

                });
            }

        },
        onLoad() {
            this.update();
        }

    },
    computed: {
        title() {
            if (this.timeList.length <= 0) {
                return '明日预告';
            } else {
                let count = 0;
                this.timeList.forEach(item => {
                    count += item.goods_count
                });
                return `明日预告(${count}款)`;
            }
        }
    },
    //过滤器
    filters: {},
    mounted() {
        upSize();
        this.init();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {},
    created() {
        this.$nextTick(() => {
            // $(window).unbind('scroll')
            var sTop = 0;
            var _this = this;

            $(window).scroll(function () {

                var scrollTopTo = $(this).scrollTop();

                $(".time-panel").each(function (i) {
                    // if (i == 1) {

                    let $el = $(this);
                    var oTop = $el.offset().top;

                    if ($el.offset().top - scrollTopTo <= 46) {

                        $el.find('.time-header-title').css(
                            {
                                "position": "fixed",
                                "top": (46) + 'px',
                                "zIndex": '900',
                                "borderBottom": "solid 1px #ddd"
                            }
                        );

                        $el.css(
                            {
                                "paddingTop": "34px",
                            }
                        );


                    } else {
                        $el.find('.time-header-title').css(
                            {
                                "position": "relative",
                                "zIndex": '1',
                                "top": (0) + 'px',
                            }
                        );
                        $el.css(
                            {
                                "paddingTop": "0",
                            }
                        );
                    }
                    // }


                });

                // if (oTop - scrollTopTo <= 46) {
                //     $(".time-header").css(
                //         {
                //             "position": "fixed",
                //             "top": (46) + 'px',
                //         }
                //     );

                // } else {
                //     $(".time-header").css(
                //         {
                //             "position": "absolute",
                //             "top": '0px',
                //         }
                //     );
                //     // $(".van-pull-refresh__track").css('transform', 'translate3d(0px, 0px, 0px)');
                // }

            });
        });
    },
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