// @ts-nocheck
import $ from "jquery";

export default {
    name: 'SharePanel',
    props: {},
    data() {
        return {
            isShow: false,
            callback: null,
            isShowImage: false,
            conf: {
                title: "",
                content: "",
                href: "",
                image: "",
                // 下面是对应各个平台的扩展参数。
                weixin: {
                    extra: { scene: "WXSceneSession" }
                },
                // 下面是组件特有的参数
                comp: {
                    title: '',
                    subTitle: '',
                    noVipTitle: '',
                    qrcode: '',
                }
            },
            image: '',
        };
    },
    methods: {
        show(conf, callback) {
            this.callback = callback;
            this.conf = conf;

            // 自动加上店铺号和分享人id
            if (this.$userInfo.user_vip_level > 0) {
                if (typeof this.conf.comp.isParam == 'undefined' || this.conf.comp.isParam == true) {

                    if (this.$userInfo.shop_id && this.$userInfo.shop_id.length > 0) {
                        this.conf.href += `&shop_id=${this.$userInfo.shop_id}`;
                        this.conf.href += `&share_id=${this.$userInfo.user_id}`;
                    } else {
                        // 提示没有店铺号，是否生成
                        if (confirm('您未生成店铺号，暂不能使用分享功能，是否现在去生成？')) {
                            this.$push('/vip');
                        } else {
                            this.hide();
                        }
                        return;
                    }
                }

            }

            // 如果有http头，就不加，否则就加
            if (this.conf.href.indexOf('http') == -1) {
                // 没有头，要加上
                this.conf.href = this.$shareUrl + this.conf.href;
            } else {
                // 有头，不加
            }

            // // 转换短连接
            this.$get('ShortLink/shortLink', {
                long_url: this.conf.href,
            }, res => {
                this.conf.href = res.msg;
                this.isShow = true;
            });
        },
        hide() {
            this.isShow = false;
        },
        close() {
            this.isShow = false;
            this.isShowImage = false;
        },
        share(type) {

            let images = [];

            if (typeof this.conf.image == 'object') {
                images = this.conf.image;
            } else {
                images = [this.$getUrl(this.conf.image)];
            }

            if (type == "weixin") {

                let wx = {
                    title: this.conf.title,
                    content: this.conf.content,
                    thumbs: images,
                    extra: { scene: "WXSceneSession" }
                }

                if (this.conf.href.length > 0) {
                    wx.href = this.conf.href;
                }

                if (!!this.conf.href.pictures) {
                    wx.pictures = this.conf.pictures;
                }

                this.$share.push({
                    vm: this,
                    wx: wx
                });

            }

            if (type == "weixin_p") {


                let wx = {
                    title: this.conf.title,
                    content: this.conf.content,
                    thumbs: images,
                    extra: { scene: "WXSceneTimeline" }
                }

                if (this.conf.href.length > 0) {
                    wx.href = this.conf.href;
                }

                if (!!this.conf.href.pictures) {
                    wx.pictures = this.conf.pictures;
                }

                this.$share.push({
                    vm: this,
                    wx: wx
                });
            }

            if (type == "link") {

                let copy = (str) => {
                    var oInput = document.createElement('input');
                    oInput.value = str;
                    document.body.appendChild(oInput);
                    oInput.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    document.body.removeChild(oInput);
                    this.$toast("复制成功！");
                }

                copy(this.conf.href);

            }

            if (type == "qrcode") {
                let href = this.conf.href;

                // qrcode

                if (this.conf.comp.qrcode) {

                    let url = this.conf.comp.qrcode + '';
                    let downUrl = this.conf.comp.qrcode + '&down=true';

                    this.image = url + '&rand=' + Math.random();
                    this.downUrl = downUrl + '&rand=' + Math.random();

                } else {

                    href = encodeURIComponent(href);

                    let url = this.$serverDefault + 'Share/getGoodsImage?' + `user_id=${this.$userInfo['user_id']}&goods_id=${this.conf.goods_id}&href=${href}`;
                    let downUrl = this.$serverDefault + 'Share/getGoodsImage?' + `down=true&user_id=${this.$userInfo['user_id']}&goods_id=${this.conf.goods_id}&href=${href}`;

                    this.image = url + '&rand=' + Math.random();
                    this.downUrl = downUrl + '&rand=' + Math.random();

                }

                this.$nextTick(() => {
                    this.isShowImage = true;
                    this.hide();
                })

                // if (this.isWeb()) {
                //     // 弹框图片
                // } else {
                //     // 原生接口
                //     // 下载图片
                // }

            }

            if (type == 'qq') {
                //分享到QQ空间
            }

            if (type == 'weibo') {
                let xl = {
                    content: this.conf.content + '' + this.conf.href,
                    thumbs: images,
                };
                // if (this.conf.href.length > 0) {
                //     xl.href = this.conf.href;
                // }
                let xlsdk = {};

                xlsdk.share = function (conf) {
                    plus.share.getServices(
                        (s) => {
                            for (let i in s) {
                                if ("sinaweibo" == s[i].id) {
                                    xlsdk.share = s[i];
                                }
                            }

                            if (xlsdk.share.authenticated) {
                                // alert("---已授权---");
                                xlsdk.shareSystem(xlsdk.share, conf);
                            } else {
                                // alert("---未授权---");
                                xlsdk.share.authorize(function () {
                                    xlsdk.shareSystem(xlsdk.share, conf);
                                }, function (e) {
                                    // alert("认证授权失败：" + e.code + " - " + e.message);
                                });
                            }

                        },
                        (e) => {
                            // alert("获取分享服务列表失败：" + e.message);
                        }
                    );
                }

                xlsdk.shareSystem = function (share, conf) {
                    share.send(
                        conf,
                        function () {
                            alert("分享成功！");
                        },
                        function (e) {
                            // alert(JSON.stringify(e), '分享失败-错误日志：');
                        }
                    );
                }

                xlsdk.share(xl);

            }

        },
        weibo() {

            let fileName = '_downloads/' + this.conf.goods_id + '.png';
            this.$downFile(this.downUrl, fileName, (e) => {
                this.isShowImage = false;
                xlsdk.share({
                    pictures: [fileName],
                    content: '随心分享',
                });
            });


        },
        getContainer() {
            return document.getElementsByTagName('body')[0];
        },
        down() {

            let fileName = '_downloads/' + this.conf.goods_id + '.png';

            this.$downFile(this.downUrl, fileName, () => {
                this.isShowImage = false;
                this.$toast('下载成功~');
            });

        },
        weixin() {

            let fileName = '_downloads/' + this.conf.goods_id + '.png';

            this.$downFile(this.downUrl, fileName, (e) => {
                this.isShowImage = false;
                this.$share.push({
                    vm: this,
                    wx: {
                        pictures: [fileName],
                        extra: { scene: "WXSceneSession" }
                    }
                });
            });

        },
        weixin_p() {
            let fileName = '_downloads/' + this.conf.goods_id + '.png';
            this.$downFile(this.downUrl, fileName, (e) => {
                this.isShowImage = false;
                this.$share.push({
                    vm: this,
                    wx: {
                        pictures: [fileName],
                        extra: { scene: "WXSceneTimeline" }
                    }
                });
            });
        },
        isWeb() {
            return !window['plus'];
        },
        showBtn(btnName) {
            if (!this.conf.comp.btn) {
                return true;
            }
            let btn = this.conf.comp.btn;

            if (typeof btn[btnName] == 'undefined') {
                return true;
            } else {
                return btn[btnName];
            }
        }
    },
    computed: {
        // 是否是web端
    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('setShow', this.show);
            this.$store.commit('setHide', this.close);
        })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};