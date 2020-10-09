export default {
    name: 'ShoutPrice',
    props: {},
    data() {
        return {
            isLoading: false,
            isRefresh: false,
            finished: false,
            pages: 1,
            pages_size: 5,
            empty: false,
            isLock: false,

            list: [],
            shareService: null,
        };
    },
    methods: {
        update() {
            if (this.isLock) {
                return;
            } else {
                this.isLock = true;
            }

            this.$get('ShoutPrice/getList', {
                pages: this.pages,
                // pages_size: this.pages_size,
            }, res => {
                this.isLoading = false;
                this.isRefresh = false;
                this.isLock = false;
                var data = res.data;
                this.pages++;
                if (res.res > 0) {
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            let item = data[i]
                            this.list.push(item);
                        }
                    } else {
                        this.finished = true;
                        this.isLock = true;
                    }

                }
                if (res.res <= 0) {
                    //没了
                    this.finished = true;
                    this.isLock = true
                    this.isLoading = true;
                }
            });
        },
        onLoad() {
            this.update();
        },
        shareMini(goods_id) {
            this.$loading();
            this.$get("ShoutPrice/roomId", {
                goods_id: goods_id,
            }, res => {
                if (res.res >= 1) {
                    var obj = res.data;
                    let plus = window['plus'];
                    plus.share.getServices(shareService => {
                        // 成功
                        for (let x in shareService) {
                            if (shareService[x].id == 'weixin') {
                                this.send(obj, shareService[x]);
                                return;
                            }
                        }

                    }, error => {
                        plus.nativeUI.alert(JSON.stringify(error));
                        this.$toast('分享接口调用失败~');
                    });
                }


            });

        },
        send(obj, shareService) {

            // 原始ID
            // gh_7fd7a11c1f8b
            // AppID(小程序ID) wx4e4150845cec7bc3
            // AppSecret(小程序密钥)
            // 4e78e24e2384b99ebb837cc4d0241872
            this.$clearLoading();
            shareService.authorize(
                success => {
                    shareService.send({
                        type: "miniProgram",
                        title: obj.share_shout_price,
                        thumbs: [obj.share_img],
                        content: obj.share_shout_price,
                        miniProgram: {
                            AppID: "wx4e4150845cec7bc3",
                            AppSecret: "4e78e24e2384b99ebb837cc4d0241872",
                            id: "gh_7fd7a11c1f8b",
                            path: '/pages/ShoutPriceInfo/ShoutPriceInfo?room_id=' + obj.room_id,//路径+id
                            type: 0,
                            webUrl: "http://server.followenjoy.cn"
                        },
                        extra: {
                            scene: "WXSceneSession"
                        }
                    }, success => {
                        this.$toast('分享成功~');
                    }, error => {
                        plus.nativeUI.alert(JSON.stringify(error));
                        this.$toast('用户取消分享~');
                    });

                }, error => {
                    plus.nativeUI.alert(JSON.stringify(error));
                    this.$toast('用户授权失败~');
                },
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
    activated() {
        this.update();
        upSize();
    },
    created() { },
    components: {},
    watch: {}
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