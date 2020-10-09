// @ts-nocheck
export default function () {

    this.push = function (conf) {
        this.plus = window['plus'] ? window['plus'] : false;
        this.conf = conf;
        this.vm = conf.vm;

        // 判断是否登录

        if (this.vm.$userInfo.user_id == -1) {
            // 未登录
            this.vm.$noLogin();
            return;
        }

        if (this.plus) {

            this.plus.share.getServices(
                (s) => {
                    let sharewx;
                    for (let i in s) {
                        if ("weixin" == s[i].id) {
                            sharewx = s[i];
                        }
                    }
                    this.shareSystem(sharewx);
                },
                (e) => {
                    alert("获取分享服务列表失败：" + e.message);
                }
            );

        } else {
            // this.vm.$toast("请在App内分享");
            // sendMessage();
        }
    }

    this.shareSystem = function (sharewx) {
        this.conf.wx.type = "web";
        sharewx.send(
            this.conf.wx,
            function () {
                alert("分享成功！");
            },
            function (e) {
                this.vm.$toast("取消分享");
                alert(JSON.stringify(e), '分享失败-错误日志：');
            }
        );
    }



}