export default {
    name: 'BoothGroup',
    props: {
        boothGroupId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            swiperOption1: {
                init: true,
                autoHeight: true,
                on: {
                    transitionEnd: () => {

                    }
                }
            },
            list: [],
        };
    },
    methods: {
        update() {

            if (this.boothGroupId.length <= 0) {
                return;
            }
            this.$get('BoothGroup/get', {
                booth_group_id: this.boothGroupId
            }, res => {
                if (res.res >= 1) {
                    this.list = res.msg;

                    setTimeout(() => {

                        this.swiper1.update();

                    }, 200);

                }
            });

        },
        open(item) {
            let path = '';
            let query = {};

            if (item.link_type == "goods") {
                // 商品
                path = '/goodsInfo';
                query = {
                    goods_id: item.link_id,
                }
            }

            if (item.link_type == "temp_page") {
                // 模板页
                path = '/TempPages';
                query = {
                    temp_pages_id: item.link_id,
                }
            }


            if (path.length > 0) {
                this.$push({
                    path: path,
                    query: query
                });
            }

        },
    },
    computed: {
        swiper1() {
            return this.$refs.swiper1.swiper;
        },
    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        boothGroupId: {
            handler() {
                if (this.boothGroupId.length > 0) {
                    this.update();
                }
            },
            immediate: true
        }
    }

};