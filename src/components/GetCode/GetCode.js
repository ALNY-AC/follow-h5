export default {
    name: 'GetCode',
    props: {
        message: {
            type: String,
            default: '输入手机号获得验证码'
        },
        title: {
            type: String,
            default: '请输入手机号'
        },
        inputInfo: {
            type: String,
            default: '输入手机号'
        },
        agreement: {
            type: Boolean,
            default: true
        },
        hideCancel: {
            type: Boolean,

            default: false
        }
    },
    data() {
        return {
            phone: '',
            disabled: true,
            isCheck: true,
            isShowCodeInput: false,
        };
    },
    methods: {
        next() {
            // 验证手机号
            if (this.validate(this.phone)) {

                this.$refs['code-input'].validate(this.phone, (res) => {
                    if (res.res == 'success') {
                        this.$refs['code-input'].close();
                        this.$emit('on-success', this.phone, res.secret);
                    } else {
                        this.$toast('验证码错误！');
                    }
                });

            }
        },
        validate(phone) {
            let reg = /^[0-9]*$/;

            if (!reg.test(phone)) {
                this.$toast('只能输入数字！');
                return;
            }
            if (phone.length !== 11) {
                this.$toast('请输入11位长度的手机号！');
                return false;
            } else {
                return true;
            }
        },
        validateNext() {
            let v = this.phone.length == 11 && this.isCheck;
            this.disabled = !v;
        },
        setPhone(phone) {
            this.phone = phone;
        },
        back() {
            this.$emit('back');
        }
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
        this.validateNext();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        disabled() {

        },
        phone() {
            this.validateNext();
        },
        isCheck() {
            this.validateNext();
        },
    }
};
