import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Banner',
    props: {
        pages: {
            type: String,
            default: '首页',
        }
    },
    data() {
        return {
            list: [],
            swiperOption1: {
                init: true,
                loop: true,
                slidesPerview: 'auto',
                loopedSlides: 8,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents: true,//修改swiper的父元素时，自动初始化swiper 
                autoplay: {
                    disableOnInteraction: false,
                    delay: 3000,
                },
                on: {
                    transitionEnd: () => {

                    }
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            },
        };
    },
    methods: {
        update() {
            let localName = this.pages + 'homeBanner';
            let where = {
                pages: this.pages
            }
            if (!localStorage[localName] || localStorage[localName] == undefined || localStorage[localName] == 'undefined') {
                localStorage[localName] = '[]';
            }
            this.list = JSON.parse(localStorage[localName]);

            this.$get('Banner/getAll', {
                where: where
            }, res => {
                if (this.pages == "首页") {
                    localStorage[localName] = JSON.stringify(res.msg);
                }
                this.list = res.msg;
                this.$nextTick(() => {
                    this.swiper1.init();
                })

            });
        },
        open(item) {
            if (item.goods_id) {
                this.$push({
                    path: "/goodsInfo",
                    query: {
                        goods_id: item.goods_id,
                    }
                });
                return;
            }
            if (item.banner_pages_id) {
                this.$push({
                    path: "/TempPages",
                    query: {
                        temp_pages_id: item.banner_pages_id,
                    }
                });

                return;
            }

        }
    },
    computed: {
        swiper1() {
            return this.$refs.swiper1.swiper;
        },
    },
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {
        swiper,
        swiperSlide
    },
    watch: {
        page() {
            this.update();
        }
    }
};