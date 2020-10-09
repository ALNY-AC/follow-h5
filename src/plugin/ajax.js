// @ts-nocheck

import $ from "jquery";

export default function (Vue, options) {
    //取得用户数据

    Vue.prototype.$noLogin = function () {

        // 
        /**

http://192.168.1.251:8080/#/HomePage/userCenter?shop_id=96134477

// share_id
         * 
         */


        Vue.prototype.$userInfo = {
            'user_id': -1,
            'user_name': '',
            'user_pwd': '',
            'user_head': '',
            'user_type': '',
            'unionid': '',
            'user_email': '',
            'user_info': '',
            'user_vip_level': 0,
            'user_money': 0,
            'course_hours': '',
            'invite_code': '',
            'shop_id': '',
            'is_up': 0,
            'login_count': -1,
            'add_time': '',
            'edit_time': '',
        };


        localStorage.clear();
        localStorage['isShowGuide_v1.5.2'] = 1;
        localStorage.user_info = JSON.stringify(Vue.prototype.$userInfo);


        this.$push({
            path: "/login",
            query: {}
        });


    }


    Vue.prototype.$userInfo = {
        'user_id': -1,
        'user_name': '未登录~',
        'user_pwd': '',
        'pay_code': '',
        'user_head': '',
        'user_type': '',
        'unionid': '',
        'user_email': '',
        'user_info': '',
        'user_vip_level': 0,
        'user_money': 0,
        'course_hours': '',
        'invite_code': '',
        'shop_id': '',
        'is_up': 0,
        'login_count': -1,
        'add_time': '',
        'edit_time': '',
    };


    if (localStorage.user_info) {
        Vue.prototype.$userInfo = JSON.parse(localStorage.user_info);
    }

    Vue.prototype.$getUserInfo = function (fun) {

        if (typeof fun == 'function' || fun === true || Vue.prototype.$userInfo == null) {
            //没有用户信息

            $.ajax({
                url: this.$serverDefault + "user/getUserInfo",
                type: 'get',
                data: {
                    token: localStorage.token,
                    user_id: localStorage.user_id,
                    field: [
                        "user_name",
                        "user_head",
                        "user_type",
                        "unionid",
                        "user_info",
                        "user_vip_level",
                        "user_money",
                        "user_email",
                        "user_id",
                        "shop_id",
                        "invite_code",
                    ]
                },
                // async: (fun===true),
                success: (res) => {
                    res = JSON.parse(res);
                    if (res.res < -900) {
                        // this.$noLogin();
                        // this.$toast({
                        //     message: '未登录~',
                        //     position: 'bottom'
                        // });
                        Vue.prototype.$userInfo = {
                            'user_id': -1,
                            'user_name': '未登录~',
                            'user_pwd': '',
                            'user_head': '',
                            'user_type': '',
                            'unionid': '',
                            'user_email': '',
                            'user_info': '',
                            'user_vip_level': 0,
                            'user_money': 0,
                            'course_hours': '',
                            'invite_code': '',
                            'shop_id': '',
                            'is_up': 0,
                            'login_count': -1,
                            'add_time': '',
                            'edit_time': '',
                        };

                        localStorage.user_info = JSON.stringify(Vue.prototype.$userInfo);

                    } else {
                        Vue.prototype.$userInfo = res.msg;
                        localStorage.user_info = JSON.stringify(Vue.prototype.$userInfo);
                    }

                    if (typeof fun == 'function') {
                        fun(Vue.prototype.$userInfo);
                    }
                },
            });
        } else {
            if (typeof fun != 'function') {
                return Vue.prototype.$userInfo;
            }
        }



    }

    Vue.prototype.$config = null;
    Vue.prototype.$getConfig = function (fun) {
        if (fun || Vue.prototype.$config == null) {
            $.ajax({
                url: this.$serverDefault + "config/get",
                type: 'get',
                data: {
                    token: localStorage.token,
                    user_id: localStorage.user_id,
                },
                async: false,
                success: (res) => {
                    res = JSON.parse(res);
                    if (res.res < -900) {
                        this.$noLogin();

                    } else {
                        Vue.prototype.$config = res.msg
                    }

                },
            });
        }
        if (typeof fun == 'function') {
            fun(Vue.prototype.$config);
        } else {
            return Vue.prototype.$config;
        }
    }


    Vue.prototype.$get = function (url, data, success, error) {
        if (!data) data = {};

        if (data.token == null) {
            data.token = localStorage.token ? localStorage.token : '';
        }
        if (data.user_id == null) {
            data.user_id = localStorage.user_id ? localStorage.user_id : '';
        }

        if (data._area == null) {
            data._area = localStorage._area ? JSON.parse(localStorage._area) : {};
        }

        //没有http
        if (url.indexOf("http") == -1) {
            url = this.$serverDefault + url;
        }

        $.ajax({
            url: url,
            type: 'get',
            data: data,
            success: (res) => {

                try {
                    res = JSON.parse(res);
                } catch (error) {
                    if (success) {
                        success(res);
                    }
                    return false;
                }

                if (res.res < -900) {

                    this.$noLogin();

                } else {
                    if (success) {
                        success(res);
                    }
                }
            },
            error(res) {
                if (error) {
                    error(res);
                }
            }
        });

    }

    Vue.prototype.$post = function (url, data, success, error) {
        if (!data) data = {};

        if (data.token == null) {
            data.token = localStorage.token ? localStorage.token : '';
        }
        if (data.user_id == null) {
            data.user_id = localStorage.user_id ? localStorage.user_id : '';
        }

        if (data._area == null) {
            data._area = localStorage._area ? JSON.parse(localStorage._area) : {};
        }

        if (url.indexOf("http") == -1) {
            //没有http
            url = this.$serverDefault + url;
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: (res) => {
                try {
                    res = JSON.parse(res);
                } catch (error) {


                    if (success) {
                        success(res);
                    }

                    return false;
                }

                if (res.res < -900) {
                    this.$noLogin();

                } else {
                    if (success) {
                        success(res);
                    }
                }
            },
            error(res) {
                if (error) {
                    error(res);
                }
            }

        });

    }

    Vue.prototype.$sinOut = function (url, data, success, error) {
        localStorage.clear();
        localStorage['isShowGuide_v1.5.2'] = 1;
        Vue.prototype.$userInfo = {
            'user_id': -1,
            'user_name': '未登录~',
            'user_pwd': '',
            'user_head': '',
            'user_type': '',
            'unionid': '',
            'user_email': '',
            'user_info': '',
            'user_vip_level': 0,
            'user_money': 0,
            'course_hours': '',
            'invite_code': '',
            'shop_id': '',
            'is_up': 0,
            'login_count': -1,
            'add_time': '',
            'edit_time': '',
        };

        localStorage.user_info = JSON.stringify(Vue.prototype.$userInfo);

        let logout = () => {
            this.$get('login/sinOut');
            this.$replace("/HomePage");
        }

        if (this.$isPlus()) {

            wxsdk.logout(() => {
                logout();
            }, () => {
                logout();
            });

        } else {
            setTimeout(() => {
                logout();
            }, 100);
        }

    }

}