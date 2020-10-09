import { Uploader, ImagePreview } from "vant";
export default {

    name: 'AfterSale',
    props: {},
    data() {
        return {
            order_id: '',
            order: null,
            show: {
                reason: false,
            },
            reasonRadio: -1,
            reasonList: [
                { label: '不想买了', value: 1 },
                { label: '质量问题', value: 2 },
                { label: '发错', value: 3 },
                { label: '拍错', value: 4 },
                { label: '其他', value: 5 },
            ],
            //退款的钱
            refund: 0,
            info: '',
            imgList: []
        };
    },
    methods: {
        update() {
            this.$get('order/get', {
                order_id: this.order_id
            }, res => {
                if (res.res >= 1) {
                    this.order = res.msg;
                    this.refund = parseFloat(this.order.order.price);
                }
            });
        },
        showImg(index) {
            var list = [];
            for (let i = 0; i < this.imgList.length; i++) {
                list.push(this.$getUrl(this.imgList[i]));
            }
            ImagePreview(list, index);
        },
        onRead(file) {
            const loading = this.$toast.loading({
                mask: true,
                message: "上传中"
            });
            this.$post("use/saveFile", { file: file.content }, res => {
                setTimeout(() => {
                    if (res.res >= 1) {
                        loading.clear();
                        this.$toast("上传成功~");
                        this.imgList.push(res.msg);
                        console.log(res.msg);

                        return;
                    }
                }, 500);
            });
        },
        delImg(item, i, list) {
            list.splice(i, 1);
        },
        submit() {
            if (this.reasonRadio <= 0) {
                this.$toast(`请选择退款原因`);
                return;
            }
            if (this.refund > this.order.order.price) {
                this.$toast(`退款金额不能大于${this.order.order.price}`);
                return;
            }

            if (this.info.length >= 255) {
                this.$toast('原因不能超过255个字符');
                return;
            }

            let add = {
                imgList: this.imgList,
                price: this.refund,
                reason: this.reason,
                info: this.info,
                order_id: this.order_id
            }

            this.$post('AfterSale/creat', {
                add: add
            }, res => {
                console.log(res);

                if (res.res >= 1) {
                    this.$toast('提交成功！');
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 100);
                    return;
                }
                this.$toast('提交失败！请重试');
            },
                error => {
                    this.$toast('提交失败！请重试');
                }
            );

        }
    },
    computed: {
        reason() {
            if (this.reasonRadio < 0) {
                return '请选择';
            } else {
                return this.reasonList[this.reasonRadio - 1].label;
            }
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {
        [Uploader.name]: Uploader
    },
    watch: {
        reasonRadio(val) {
            this.show.reason = false;
        }
    }
};