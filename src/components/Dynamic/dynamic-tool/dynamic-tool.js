export default {
    name: "dynamic-tool",
    props: {
        dynamic: {
            type: Object,
            default: null
        }
    },
    data() {
        return {};
    },
    methods: {
        download() {

            let index = 0;
            let aysnList = [];
            this.dynamic.img_list.forEach(item => {
                aysnList.push(() => {
                    this.down(this.$getUrl(item.src), item.dynamic_img_id, () => {
                        index++;
                        if (index < aysnList.length) {
                            aysnList[index]();
                        } else {
                            this.$toast('下载完成');
                        }
                    });
                });
            });

            aysnList[0]();

        },
        down(downUrl, name = 'img', fun) {
            let fileName = "_downloads/" + name + ".png";
            this.$downFile(downUrl, fileName, e => {
                if (fun) {
                    fun();
                }
            });
        },
        share() {
            let images = [];

            this.dynamic.img_list.forEach(item => {
                images.push(this.$getUrl(item.src));
            });

            let pictures = [];
            let url = `goodsInfo?&goods_id=${this.dynamic.goods_info.goods_id}`;

            this.$store.state.showShare(
                {
                    title: this.dynamic.dynamic_title,
                    content: this.dynamic.dynamic_content
                        ? this.dynamic.dynamic_content
                        : "",
                    href: url,

                    pictures: pictures,
                    // goods_id: this.goods.goods_id,
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: "分享图文",
                        subTitle: "",
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
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {}
};