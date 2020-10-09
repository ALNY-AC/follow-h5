export default {
    name: 'PayCode',
    props: {},
    data() {
        return {
            show: false,
            pwd: '',
            fun: null,
        };
    },
    methods: {
        validate(fun) {
            this.show = true;
            this.fun = fun;
        },
        onDelete(key) {
            this.pwd = this.pwd.slice(0, this.pwd.length - 1);

        },
        onInput(key) {
            this.pwd = (this.pwd + key).slice(0, 6);
        },
        isCode() {
            let fun = this.fun;

            this.$loading(0, "校验密码中~");
            this.$post('user/validatePayCode', {
                pay_code: this.pwd
            }, res => {
                this.$clearLoading();
                if (res.res >= 1) {
                    if (fun) {
                        fun(true);
                    }
                    this.show = false;
                } else {
                    alert("密码错误！请重试~");
                }
                this.pwd = '';
            }, error => {
                this.$clearLoading();
                if (fun) {
                    fun(false);
                }
            });

        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        pwd(val) {
            if (val.length >= 6) {
                this.isCode();
            }
        }
    }
};