// @ts-nocheck
export default {
    name: 'Guide',
    props: {},
    data() {
        return {
            swiperOptionMask: {
                init: false,
                parallax: true,
                on: {
                    transitionEnd: () => { }
                }
            },
            swiperOption2: {
                init: false,
                // speed: 600,
                // parallax: true,
                on: {
                    transitionEnd: () => { }
                }
            },
            isShow: false,
        };
    },
    methods: {
        ok() {
            this.isShow = false;
        },
        setStatusBar() {
            if (this.$isPlus()) {
                if (this.isShow) {
                    plus.navigator.setStatusBarBackground("#232321");
                    plus.navigator.setStatusBarStyle("light");
                } else {
                    plus.navigator.setStatusBarBackground("#FFFFFF");
                    plus.navigator.setStatusBarStyle("dark");
                }
            }
        }
    },
    computed: {
        swiper2() {
            return this.$refs.swiper2.swiper;
        },
        swiperMask() {
            return this.$refs['swiperMask'].swiper;
        }
    },
    //过滤器
    filters: {},
    mounted() {

        if (!localStorage['isShowGuide_v1.5.2']) {
            this.isShow = true;
            localStorage['isShowGuide_v1.5.2'] = 1;
        } else {
            this.isShow = false;
        }
        this.setStatusBar();

        this.$nextTick(() => {
            if (this.isShow) {

                this.swiper2.init();
                this.swiperMask.init();
                this.swiperMask.controller.control = this.swiper2;
            }

        })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        isShow(val) {
            this.setStatusBar();
        }
    }
};