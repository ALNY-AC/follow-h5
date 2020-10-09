export default {
    name: 'pay_code',
    props: {},
    data() {
        return {
            code: "",
            pay_code: "",
            isShowPwd: true,
            isShowCode: false,
            phone: '',
            interval: null,
            timeCount: -1,
            value: '',
            app_secret: ''
        };
    },
    methods: {
        success(user_id, app_secret) {
            this.isShowPwd = false;
            this.isShowCode = true;
        },
        submitCode() {
            this.$post('user/setCode', {
                pay_code: this.value,
                app_secret: this.app_secretapp_secret
            },
                res => {
                    if (res.res >= 1) {
                        this.$toast('设置成功！');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 200);
                    }
                    if (res.res == -2) {
                        // 手机号和账户的手机号不符合
                        alert('手机号不是当前账户绑定的手机号！');
                    }
                }
            );
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        init() {
            this.$refs['getCode'].setPhone(localStorage['user_id']);
            this.$refs['getCode'].next();
        }

    },

    computed: {
        codeBtn() {
            if (this.timeCount > 0) {
                return this.timeCount + 's';
            } else {
                return '发送验证码';
            }
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.init();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        value(val) {
            if (val.length >= 6) {
                console.log(val);
                this.submitCode();
            }
        }
    }
};