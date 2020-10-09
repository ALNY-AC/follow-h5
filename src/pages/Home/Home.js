// @ts-nocheck
import {
    Stepper,
    Card
} from "vant";
import $ from "jquery";


export default {
    name: "Home",
    data() {
        return {
            //拖动导航当前选中项
            tapActive: localStorage['tapActive'] ? localStorage['tapActive'] : '',
            //tab是否允许滑动
            isSwipeable: true,
            isLoading: false,
            //是否加载完成
            finished: false,
            // 加载状态
            loading: false,
            // 用户数据
            userInfo: null,
            config: null,
            // =================
            navListPlus: [],
            toolList: [{
                icon: 'fa fa-angle-up',
                click: () => {
                    $('html,body').animate({
                        scrollTop: '0px'
                    }, 300);
                },
                init: (vm, item) => {

                    if ($(window).scrollTop() <= 200) {
                        vm.isShow = false;
                    } else {
                        vm.isShow = true;
                    }

                    $(window).scroll(() => {
                        if ($(window).scrollTop() <= 200) {
                            vm.isShow = false;
                        } else {
                            vm.isShow = true;
                        }
                    });

                }
            }],
            cubeHome: "",
        };
    },
    methods: {

        goSearch() {
            let noncestr = (Date.parse(new Date()) / 1000) + '' + parseInt(Math.random() * 100);
            this.$push({
                path: '/search',
                query: {
                    noncestr: noncestr
                }
            });
        },
        //下拉刷新
        onRefresh() {
            this.update();
        },
        update(fun) {
            this.isLoading = true;
            //获得首页数据包
            this.$getConfig(true);
            this.$getUserInfo(true);
            this.updateHomeNavList();
            this.updateHomeCube();
            this.$nextTick(() => {
                // this.$refs['main'].update();
                this.$refs['time'].update();
                this.$refs['mainCube'].update();
                this.$refs['banner'].update();
            });
        },
        updateHomeNavList() {
            if (typeof localStorage['navListPlus'] != 'string') {
                localStorage['navListPlus'] = '[]';
            }
            this.navListPlus = JSON.parse(localStorage['navListPlus']);
            this.$get('nav/getList', {}, res => {
                this.isLoading = false;
                if (res.res >= 1) {
                    this.navListPlus = res.msg;
                    localStorage['navListPlus'] = JSON.stringify(this.navListPlus);
                }
            });
        },
        updateHomeCube() {
            this.$get('Cube/getHome', {}, res => {
                if (res.res >= 1) {
                    this.cubeHome = res.msg;
                }
            });
        },
        toShout() {
            this.$push("/ShoutPrice");
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.userInfo = this.$getUserInfo();
        this.$nextTick(() => {
            this.update();
        });
    },
    activated() {
        upSize();
    },
    created() {

    },
    destroyed() { },

    // 创建完调用
    // beforeRouteLeave(to, from, next) {
    //     let position = window.scrollY;
    //     this.$store.commit('SAVE_POSITION', position) //离开路由时把位置存起来
    //     next();
    // },
    updated() {
        // this.$nextTick(function () {
        //     let position = this.$store.state.position //返回页面取出来
        //     window.scroll(0, position)
        // })
    },
    watch: {
        tapActive(val) {
            localStorage['tapActive'] = val;
        }
    },
    components: {
        [Stepper.name]: Stepper,
        [Card.name]: Card
    }
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