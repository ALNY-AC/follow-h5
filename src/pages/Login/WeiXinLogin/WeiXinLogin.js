export default {
    name: 'WeiXinLogin',
    props: {},
    data() {
        return {
            unionid: '',
            shop_id: '',
            goIndex: false,
            isShow: false,
        };
    },
    methods: {
        success(phone, secret) {
            this.getToken(phone, secret);
        },
        updateUserInfo(res) {
            // 更新用户的微信登录信息
            // 请求微信登录信息
            this.$get('WeiXinLogin/getUserInfo', {
                unionid: this.unionid
            }, res => {
                if (res.res >= 1) {
                    // 有微信信息，更新用户信息
                    this.$post('user/update', {
                        data: {
                            unionid: this.unionid,
                            user_name: res.userinfo.nickname,
                            // user_head: res.userinfo.headimgurl,
                        }
                    }, res => {
                        if (res.res >= 1) {
                            this.$toast('已同步微信数据');
                            // 登录
                            this.$getUserInfo(() => {
                                this.$replace("/HomePage");
                                return;
                                // WeiXinLogin?unionid=oaCju0o2cXHvURZwqD3mwAezSC_U&shop_id=48445698&goIndex=-4
                                if (this.goIndex === false) {
                                    setTimeout(() => {
                                        this.$replace("/HomePage");
                                    }, 300);
                                } else {
                                    if (window.history.length >= 3) {
                                        window.history.go(parseInt(this.goIndex + ''));
                                    } else {
                                        this.$replace("/HomePage");
                                    }
                                }
                            });

                        } else {
                            this.$toast('微信数据同步失败');
                        }
                    });

                }
                if (res.res < 0) {

                }
            });
        },
        getToken(phone, secret) {
            // 通过 secret 取得登录信息
            this.$get('login/token', {
                user_id: phone,
                secret: secret,
                shop_id: this.shop_id
            }, res => {
                if (res.res >= 1) {
                    // token 获取成功
                    localStorage['user_id'] = res.user_id;
                    localStorage['token'] = res.token;
                    this.updateUserInfo();
                }
                if (res.res < 0) {
                    this.$toast('secret不正确');
                }
            });
        },
        authorize() {
            this.$get('WeiXinLogin/authorize', {
                unionid: this.unionid
            }, res => {
                if (res.res >= 1) {
                    // 微信登录成功，通过secret取出token
                    this.getToken(res.user_id, res.secret);
                }
                if (res.res <= -1) {
                    // 没有当前用户，需要调用手机号登录
                    this.isShow = true;
                    this.$toast('请绑定手机号后登录~');
                }
            });
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        // 统一微信登录界面
        this.unionid = this.$route.query.unionid;
        this.shop_id = this.$route.query.shop_id;
        this.goIndex = this.$route.query.goIndex;

        // 调用统一微信登录验证接口
        this.authorize();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};