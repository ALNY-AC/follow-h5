// @ts-nocheck
import $ from "jquery";
export default function (conf) {

    this.conf = conf;
    this.interval = null;

    let pay_id = this.pay_id = conf.pay_id;
    let vm = this.vm = conf.vm;

    this.pay = function () {

        if (conf.pay_type == '1') {
            // 支付宝支付
            this.alipay();
        }
        if (conf.pay_type == '2') {
            // 微信支付
            // vm.$toast('微信支付');
            this.weixin();
        }
        if (conf.pay_type == '3') {
            // 余额支付
            vm.$refs['pay-code'].validate((is) => {
                if (is) {
                    vm.$loading(0, "正在获取支付数据");
                    vm.$get(
                        "order/pay",
                        { pay_id: pay_id },
                        res => {
                            vm.$clearLoading();
                            vm.loading = false;
                            if (res.res >= 1) {
                                vm.$toast("支付成功！~");
                                vm.$router.replace({
                                    path: "/state",
                                    query: {
                                        state: "success",
                                        title: "支付成功！",
                                        model: 'order',

                                    }
                                });
                                return;
                            }
                            vm.$toast("获取支付数据失败！请重试~");
                        },
                        error => {
                            vm.loading = false;
                            vm.$clearLoading();
                            vm.$toast("获取支付数据失败！请重试~");
                        }
                    );
                } else {
                    alert("支付失败！");
                    vm.$router.replace({
                        path: "/state",
                        query: {
                            state: "error",
                            title: "支付失败！",
                        }
                    });
                }
            });

        }
    }

    this.alipay = function () {

        let url = vm.$serverDefault + `Alipay/pay/pay_id/${pay_id}`;

        // 判断是不是微信浏览器
        if (!window['WeixinJSBridge']) {
            // 不是微信浏览器
            let webview;
            vm.$showView(url);
            return;
            if (!window['plus']) {
                window.location.href = url;
                return;
            } else {
                // 支付宝支付           
                webview = mui.openWindow({
                    url: url,
                    show: {
                        autoShow: false
                    },
                    waiting: {
                        autoShow: false //自动显示等待框，默认为true
                    }
                });
            }

            // 监听支付状态

            this.interval = setInterval(() => {

                vm.$get('Alipay/validate', {
                    pay_id: pay_id
                }, res => {
                    if (res.res == 1) {
                        // 支付成功
                        webview.close();
                        this.clear();
                        vm.$router.replace({
                            path: "/state",
                            query: {
                                state: "success",
                                title: "支付成功！",
                                model: 'order',
                            }
                        });
                    }
                    if (res.res < 0) {
                        // 支付失败
                        webview.close();
                        this.clear();
                        vm.$router.replace({
                            path: "/state",
                            query: {
                                state: "error",
                                title: "支付失败~"
                            }
                        });
                    }

                });
            }, 1000);
        } else {
            // url
            prompt('请复制下面链接在其他浏览器打开支付', url);
        }


    }

    this.weixin = function () {


        if (window['plus']) {
            // 存在，原生支付
            vm.$get('WeiXinPay/getApp', {
                pay_id: pay_id,
            }, res => {
                wxsdk.pay(res, success => {

                    vm.$router.replace({
                        path: "/state",
                        query: {
                            state: "success",
                            title: "支付成功~",
                            model: 'order',
                        }
                    });

                }, error => {
                    //  取消
                    vm.$toast('支付取消');
                    vm.$router.replacpe({
                        path: "/state",
                        query: {
                            state: "error",
                            title: "用户取消~"
                        }
                    });

                });
            });

        } else {
            // 不存在，公众号支付
            let url = vm.$serverDefault + `WeiXinPay/pay/pay_id/${pay_id}`;
            location.replace(url);
        }


    }
    this.clear = function () {
        clearInterval(this.interval);
    }

    // mui.toast("支付窗口");
    // let webview = mui.openWindow({
    //     url: "http://cosmetics.com/index.php/Home/index/pay",
    //     show: {
    //         autoShow: false
    //     },
    //     waiting: {
    //         autoShow: false //自动显示等待框，默认为true
    //     }
    // });
    // setTimeout(() => {
    //     mui.toast("关闭支付窗口");
    //     webview.close();
    // }, 5);

    // this.$post(
    //     "order/pay",
    //     { pay_id: item.pay_id },
    //     res => {
    //         this.$clearLoading();
    //         this.loading = false;
    //         if (res.res >= 1) {
    //             this.$toast("支付成功！~");
    //             this.$router.replace({
    //                 path: "/state",
    //                 query: {
    //                     state: "success",
    //                     title: "支付成功！"
    //                 }
    //             });
    //             return;
    //         }
    //         this.$toast("获取支付数据失败！请重试~");
    //     },
    //     error => {
    //         this.loading = false;
    //         this.$clearLoading();
    //         this.$toast("获取支付数据失败！请重试~");
    //     }
    // );

}
