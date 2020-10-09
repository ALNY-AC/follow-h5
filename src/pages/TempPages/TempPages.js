export default {
    name: 'TempPages',
    props: {},
    data() {
        return {
            temp_pages_id: '',
            title: '',
            data: '',
            loading: false,
            tree: {},
            node: [],
            toolList: [
                {
                    icon: 'van-icon van-icon-wap-home',
                    isShow: true,
                    click: () => {
                        this.$push({
                            path: '/HomePage',
                        })
                    }
                },
            ],
            toolList2: [
                {
                    icon: 'fa fa-angle-up',
                    click: () => {
                        $('html,body').animate({ scrollTop: '0px' }, 300);
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
                }
            ]
        };
    },
    methods: {
        update() {
            this.loading = true;
            this.$get('TempPages/get', {
                temp_pages_id: this.temp_pages_id
            }, res => {
                this.loading = false;
                let data = res.msg;
                data.tree = JSON.parse(data.tree);
                this.tree = data.tree;
                this.title = data.temp_pages_title;

                this.$setTitle(this.title);

                this.data = data;
                this.temp_pages_info = data.temp_pages_info;

            });
        },
        fnxiang() {

            let img = this.tree.node[0].node[0].images;
            img = this.$getThumb(img);

            let url = `TempPages?temp_pages_id=${this.temp_pages_id}`;

            // http://q.followenjoy.cn/#/TempPages?temp_pages_id=78871be950cb3a43444446c24012babf

            let content = this.temp_pages_info ? this.temp_pages_info : "";
            let title = this.title;


            let src = this.$getThumb(img);

            this.$store.state.showShare(
                {
                    title: title,
                    content: content,
                    href: url,
                    image: src,
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: '分享',
                        subClick: () => {
                            // 点击成为会员
                        },
                        btn: {
                            qrcode: false
                        }
                    }
                },
                res => { }
            );

        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    activated() {

        if (this.$route.query.temp_pages_id != this.temp_pages_id) {
            this.temp_pages_id = this.$route.query.temp_pages_id;

            this.title = '';
            this.tree = '';
            this.node = '';

            if (!!this['update']) {
                this.update();
                return;
            }
        }

    },

    created() {
        if (!this['update']) {
            return;
        }
        this.temp_pages_id = this.$route.query.temp_pages_id;
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};