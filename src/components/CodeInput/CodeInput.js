import $ from "jquery";
export default {
    name: 'CodeInput',
    props: {
        title: {
            type: String,
            default: '短信验证'
        },
        hideCancel: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: false,
            callback: null,
            phone: '',
            interval: null,
            timeCount: 0,
            code: '',
            activeIndex: 0,
            info: '',
            isEvent: false,
            back: '取消',
        };
    },
    methods: {
        validate(phone, callback) {
            this.show = true;
            this.callback = callback;
            this.phone = phone;
            this.init();
            this.timeClear();
            this.timeStart();
            this.pushCode();
        },
        close() {
            this.timeClear();
            this.show = false;
        },
        init() {
            this.code = '';
        },
        pushCode() {
            this.info = "";
            this.$get('code/get', {
                phone: this.phone,
            }, res => {
                if (res.res == 1 || res.res == 10) {
                    setTimeout(() => {
                        this.info = "";
                    }, 3000);
                }
            });
        },
        validateCode(code) {

            this.$loading(0, "正在验证");

            this.$get('code/authorize', {
                phone: this.phone,
                user_code: code
            }, res => {
                this.$clearLoading();
                let state = '';
                if (res.res >= 1) {
                    state = 'success';
                } else {
                    state = 'error';
                }
                if (this.callback) {
                    res.res = state;
                    this.callback(res);
                }
            });


        },
        timeStart() {
            this.timeClear();
            this.timeCount = 60;
            this.interval = setInterval(() => {
                this.timeCount--;
                if (this.timeCount <= 0) {
                    this.timeClear();
                }
            }, 1000);
        },
        timeClear() {
            clearInterval(this.interval);
        }
    },
    computed: {
        message() {

            let msg = `我们已给${this.phone}的手机号发送短信验证码，请输入以继续`;
            return msg;

        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.timeClear();

    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        code(code) {
            if (code.length == 4) {
                // 验证
                this.validateCode(code);
            }
        },
    }
};