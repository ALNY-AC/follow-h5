// @ts-nocheck
export default {
    name: 'KillActiveGoodsCard',
    props: {
        goods: {
            type: [Object, Number, String],
            default() {
                return {
                    goodInfo: {},
                }
            },
        },
    },
    data() {
        return {
            goodInfo: {},
            killPercentage: 0,
            sell: "",
            stock_num: "",
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                this.goodInfo = this.goods;
                this.killPercentage = (this.goodInfo.stock_num_total - this.goodInfo.stock_num) / this.goodInfo.stock_num_total * 100;
                this.stock_num = this.goodInfo.stock_num;
                this.sell = parseInt(this.goodInfo.stock_num_total) - parseInt(this.goodInfo.stock_num)
            }, 200)
        },
        showInfo() {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: this.goodInfo.goods_id,
                    activity_type: "kill",
                }
            });
        },
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() {
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        // "goodInfo":{
        //     handler(newName, oldName) {
        //         console.log(newName);
        //         console.log(oldName);
        //         // if (oldName.length > 0) {
        //         //     this.isShowNoSave = true;
        //         // }
        //     },
        //     deep: true
        // }
    }
}