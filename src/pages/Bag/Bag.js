import { Dialog } from "vant";
import { SubmitBar, Card, SwipeCell } from "vant";

export default {
    name: "Bag",
    props: {},
    data() {
        return {
            checked: false,
            bagList: [],
            isLoading: false,
            checkedGoods: [],
            isEdit: false,
            userInfo: null,
            notTimeGoods: [],
            failedGoods: [],//已失效
            isblank: false,
        };
    },
    methods: {
        goHome() {
            this.$push({
                path: "/HomePage"
            });
        },
        onRefresh() {
            this.update(res => {
                this.isLoading = false;
            });
        },
        onSubmit() {
            // '/order/add'
            var list = this.bagList.filter(
                item => this.checkedGoods.indexOf(item.id) >= 0
            );
            var ids = [];
            list.forEach(item => {
                ids.push(item.snapshot_id);
            });
            this.$push({
                path: "/order/add",
                query: {
                    ids: ids
                }
            });
        },
        buliderBag(list) {
            // not_time

            let arr = [];

            list.forEach(item => {
                item.id = item.bag_id;
                let is = true;
                // item.goods_money = item["sku"] ? item.sku.price : "--";
                if (item.snapshot['no_sku'] || !item.snapshot.goods_info) {
                    this.failedGoods.push(item);
                    is = false;
                }

                if (is && item.snapshot.not_time) {
                    this.notTimeGoods.push(item);
                    is = false;
                }

                if (is) {
                    arr.push(item);
                }

            });

            return arr;
        },
        update(fun) {
            this.isLoading = true;
            this.$get("bag/getList", {}, res => {


                res.res == 0 ? this.isblank = true : this.isblank = false;





                this.notTimeGoods = [];
                this.failedGoods = [];
                this.bagList = [];
                this.isLoading = false;
                if (fun) fun(res);
                if (res.res >= 1) {
                    let list = this.buliderBag(res.msg);
                    this.bagList = list;
                    return;
                }
                if (res.res < 0) {
                    this.$toast("购物车数据加载失败！请重试~");
                }
            });
        },
        formatPrice(price) {
            if (price == "--") {
                return price;
            }
            return parseFloat(price).toFixed(2);
        },
        selectAll() {
            this.checkedGoods = [];
            this.bagList.forEach(item => {
                if (this.isEdit || item.snapshot.goods_info) {
                    if (this.isEdit || !item.snapshot["no_sku"]) {
                        this.checkedGoods.push(item.id);
                    }
                }
            });
        },
        openGoodsInfo(item) {
            if (!item.snapshot.goods_info) {
                return;
            }
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: item.snapshot.goods_id
                }
            });
        },
        del(item, i, list) {

            // if (confirm('确定要删除吗')) {
            this.$get("bag/del", { bag_id: [item.bag_id] }, res => {
                if (res.res >= 1) {
                    list.splice(i, 1);
                    this.$toast("删除成功~");
                    return;
                }
                this.$toast("操作失败请重试！");
            });
            // }

        },
        delAll() {

            // if (confirm('确定要全部删除吗')) {
            var ids = this.checkedGoods;
            this.$get("bag/del", { bag_id: ids }, res => {
                if (res.res >= 1) {
                    this.bagList = this.bagList.filter(item => ids.indexOf(item.id) < 0);
                    this.checkedGoods = [];
                    this.$toast({
                        message: '删除成功~',
                        position: 'bottom',
                    });
                    return;
                }
                this.$toast("操作失败请重试！");
            });
            // }


        },
        emptyFailed() {

            let ids = [];
            this.failedGoods.forEach(item => {
                ids.push(item.bag_id);
            });


            this.$get("bag/del", { bag_id: ids }, res => {
                if (res.res >= 1) {
                    this.bagList = this.bagList.filter(item => ids.indexOf(item.id) < 0);
                    this.failedGoods = [];
                    this.$toast({
                        message: '删除成功~',
                        position: 'bottom',
                    });
                    return;
                }
                this.$toast("操作失败请重试！");
            });


        },
        updateNum(item) {
            this.$get(
                "bag/updateNum",
                {
                    snapshot_id: item.snapshot_id,
                    count: item.snapshot.count
                },
                res => {
                    if (res.res >= 1) {
                        return;
                    }
                    this.$toast("操作失败请重试！");
                }
            );
        },
        setChecked(v) {
            this.checked = v;
            if (v) {
                this.selectAll();
            } else {
                this.checkedGoods = [];
            }
        }
    },
    computed: {
        totalPrice() {
            let price =
                this.bagList.reduce((sum, item) => {
                    var p = 0;
                    if (this.checkedGoods.indexOf(item.id) >= 0) {
                        if (item.snapshot.goods_info) {
                            p = parseFloat(
                                (
                                    parseFloat(item.snapshot.price) *
                                    parseInt(item.snapshot.count)
                                ).toFixed(2)
                            );
                        } else {
                            p = 0;
                        }
                    }
                    return sum + p;
                }, 0) * 100;

            price = parseFloat(price.toFixed(2));
            return price;
        },
        submitBarText() {
            const count = this.checkedGoods.length;
            return "结算" + (count ? `(${count})` : "");
        },
        delText() {
            const count = this.checkedGoods.length;
            return "删除" + (count ? `(${count})` : "");
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.userInfo = this.$getUserInfo();
        this.update();
        this.$nextTick(() => { });
    },
    activated() {
        this.userInfo = this.$getUserInfo();
        this.update();
    },

    //Vue 实例销毁后调用
    destroyed() { },
    watch: {
        checked(val) {
            this.setChecked(val);

        },
        checkedGoods(val) {
        }
    },
    components: {
        [SubmitBar.name]: SubmitBar,
        [Card.name]: Card,
        [SwipeCell.name]: SwipeCell
    }
};
