// @ts-nocheck
import { SubmitBar, CouponCell, CouponList, AddressEdit } from "vant";
import orderCardGoods from "@/components/order/order-card-goods/order-card-goods.vue";

import Pay from "@/plugin/Pay.js";

export default {
    name: "OrderAdd",
    props: {},
    data() {
        return {
            //加载状态
            loading: false,
            //当前选中的优惠券下标
            chosenCoupon: -1,
            //优惠券
            //不可用优惠券
            disabledCoupons: [],
            //是否显示优惠券列表
            showList: false,
            //订单列表
            orders: [],
            //当前选中的收货地址id
            chosenContactId: null,
            //地址的编辑数据
            editingContact: {},
            //是否显示收货地址列表
            showAddressList: false,
            //是否是编辑状态
            isEdit: false,
            //支付方式
            pay_type: 1,
            //地址列表
            addressList: [],
            //当前的购物车id列表
            ids: [],
            //用户信息数据
            userInfo: null,
            selectCoupon: [],
            snapshots: [],
            //优惠券
            couponList: [],
            payObj: null,
            message: '',
            balance: {
                balance_value: '',
                balance_pwd: ''
            },
            isSetUserPwd: false,
            popupShow: false,
            addBagData: {},
            noticeMsg: "",
        };
    },
    methods: {
        goSetPwd() {
            if (confirm("点击确定发送验证码。")) {
                this.$push("/pay_code");
            }
        },
        isCard() {
            let is = false;
            this.orders.forEach(item => {
                if (item.is_cross_border == '1') {
                    is = true;
                    return false;
                }
            });
            if (is) {
                // 有跨境商品

                let isCard = false;

                this.addressList.forEach(item => {
                    if (item.address_id == this.chosenContactId) {
                        if (!item['id_card'] || item['id_card'].lenght <= 0) {
                            isCard = false;
                        } else {
                            isCard = true;
                        }
                    }
                });

                if (isCard) {
                    // 有身份证
                    return false;
                } else {
                    // 没有身份证
                    return true;
                }

                return true;
            } else {
                // 没有跨境商品
                return false;
            }

        },
        onSubmit() {

            if (this.balance.balance_value > this.totalPrice / 100) {
                this.$toast("抵扣金额不能大于支付总额！");
                return
            }


            if (this.balance.balance_value > 0) {
                if (this.balance.balance_pwd.length <= 0) {
                    this.$toast("请输入支付密码！");
                    return
                }
            }


            if (!this.chosenContactId) {
                this.$toast("请选择一个收货地址");
                return;
            }

            if (this.isCard()) {
                this.$toast("购买跨境商品需要在收货地址处输入身份证号");
                return;
            }

            //判断是不是有不支持配送的区域

            let testList = this.orders.filter(item => item.first_price < 0);
            if (testList.length > 0) {
                this.$toast("有的商品不支持配送！");
                return;
            }


            let coupon_id =
                this.chosenCoupon >= 0
                    ? this.couponList[this.chosenCoupon].coupon_id
                    : "";

            this.$loading(0, "正在创建订单");
            let add = {
                snapshot_id: this.ids, //商品快照id
                pay_type: this.pay_type, //支付方式
                address_id: this.chosenContactId, //收货地址
                coupon_id: coupon_id,// 优惠券
                message: this.message, // 买家留言,
                balance_value: this.balance.balance_value,
                balance_pwd: this.balance.balance_pwd,
            };

            this.loading = true;
            this.$get(
                "order/create",
                add,
                res => {
                    this.$clearLoading();
                    setTimeout(() => {
                        this.loading = false;
                        if (res.res == -2) {
                            this.$toast(res.msg);
                            return;
                        }
                        if (res.res == -50) {
                            this.$toast("抵扣失败！");
                            return;
                        }
                        if (res.res == -51) {
                            this.$toast("支付密码错误！");
                            return;
                        }

                        if (res.res >= 1) {
                            //调用支付函数
                            this.pay(res.msg);
                        }
                    }, 100)

                },
                error => {
                    this.loading = false;
                    this.$clearLoading();
                    this.$toast("提交数据失败！请重试~");
                }
            );
        },
        pay(pay_id) {

            this.$replace({
                path: '/Pay',
                query: {
                    pay_id: pay_id
                }
            });

            return;
            let conf = {
                vm: this,
                pay_id: pay_id,
                pay_type: this.pay_type
            };
            this.payObj = new Pay(conf);
            this.payObj.pay();
        },
        //选择优惠券
        onChange(i) {
            this.showList = false;
            this.chosenCoupon = i;
        },
        // 选中联系人
        onSelect() {
            this.orders = [];
            this.orders = this.buliderOrderData(this.snapshots);
        },
        update() {
            //获得添加订单页数据包
            this.$get("order/getAddPacket", { snapshot_id: this.ids }, res => {
                console.log(res);

                this.addBagData = res.addBagData;
                this.noticeMsg = res.noticeMsg;

                res.isToAppShop == "1" ? this.popupShow = true : this.popupShow = false;

                this.$clearLoading();
                this.$nextTick(() => {
                    this.snapshots = res.snapshots;
                    this.orders = this.buliderOrderData(this.snapshots);
                    this.buliderCoupons(res.couponList);

                });
            });
        },
        //构建优惠券数据，在这里判断可用不可用
        buliderCoupons(list) {

            if (!list) {
                return [];
            }
            let couponList = [];
            let disabledCoupons = [];
            this.couponList = [];
            this.disabledCoupons = [];
            //先计算总价
            let total = this.orders.reduce((sum, item) => {
                var p = 0;
                p = item.total;
                return sum + p;
            }, 0);

            list.forEach(item => {
                //判断能不能用
                //先做基础的数据转换
                item.startAt = item.start_at;
                item.endAt = item.end_at;
                item.originCondition = item.origin_condition;

                item.id = item.coupon_id;
                item.denominations = item.denominations * 100;
                item.originCondition = item.origin_condition * 100;

                let is = true;
                if (!item['reason']) {
                    item['reason'] = '';
                }

                if (item.reason.length > 0) {
                    // 服务器判断了
                    disabledCoupons.push(item);
                    return;
                }

                // 判断是否过期或者已经使用
                if (item.state == "2") {
                    item.reason = "已使用";
                    disabledCoupons.push(item);
                    return;
                }
                if (item.state == "0") {
                    item.reason = "已过期";
                    disabledCoupons.push(item);
                    return;
                }
                let isClass = false;

                this.orders.forEach(order => {
                    // 先判断能不能用于类型
                    let goods_class = order.goods_class;

                    // 先判断二级分类能不能用
                    if (item.class_id != goods_class) {
                        // 不能用
                        // 再判断这个商品有没有上级分类s
                        if (!!order.class.super) {
                            // 有上级分类，
                            // 判断class 等不等于上级的class
                            if (item.class_id != order.class.super.class_id) {
                                // 不能使用优惠券9225.92 9180.92
                            } else {
                                isClass = true;
                            }
                        } else {
                        }
                    } else {
                        isClass = true;
                    }

                    if (!item.class_id || isClass) {
                        // 分区能用
                        is = true;
                        //分类条件满足
                        //开始判断满减的条件
                        if (item.denominations > 0) {
                            //如果是满减券
                            if (item.origin_condition > 0) {
                                //如果有门槛
                                //判断当前订单金额是否达到要求。
                                if (total < item.origin_condition / 100) {
                                    //不满足满减条件
                                    item.reason = "未达到满减要求";
                                    is = false;
                                } else {
                                    //满足满减条件
                                    is = true;
                                }
                            }
                        }
                    } else {
                        // 分区不能用
                        item.reason = "没有优惠券可用分类商品";
                        is = false;
                    }
                });
                if (is) {
                    let value = 0;
                    //条件满足
                    if (item.denominations > 0) {
                        //如果是满减券
                        value = item.denominations;
                    } else {
                        //如果是折扣券
                        value = total - total * (item.discount / 100);
                        value = parseFloat(value.toFixed(2)) * 100;
                    }
                    item.value = value;

                    couponList.push(item);
                } else {
                    //条件不满足
                    disabledCoupons.push(item);
                }
            });

            this.couponList = couponList;
            this.disabledCoupons = disabledCoupons;
        },
        buliderFreight(freight) {
            freight.value_type = parseInt(freight.value_type);
            freight.freight_type = parseInt(freight.freight_type);
            freight.areas.forEach(area => {
                area.areasInfo = JSON.parse(area.area);
            });
            return freight;
        },
        //组建订单数据
        buliderOrderData(snapshots) {
            var list = [];
            if (!snapshots) {
                return [];
            }
            snapshots.forEach(item => {
                let count = parseInt(item.count);
                let price = parseFloat(item.price).toFixed(2);
                let freight = this.buliderFreight(item.goods_info.freight);

                let first_price = this.getFreightPrice(freight);

                // is_cross_border
                let is_cross_border = item.is_cross_border;

                let sku = "";

                for (let i = 1; i <= 3; i++) {
                    if (item["s" + i]) {
                        sku += item["s" + i];
                        if (item["s" + (i + 1)]) {
                            sku += " - ";
                        }
                    }
                }
                let goods = {
                    freight: freight,
                    first_price: first_price,
                    goods_class: item.goods_info.goods_class,
                    class: item.goods_info.class,
                    is_cross_border: is_cross_border,
                    goodsList: [
                        {
                            goods: item,
                            img: item.img,
                            title: item.goods_title,
                            info: sku,
                            price: price,
                            num: count
                        }
                    ],
                    logistics_type: "",
                    total: count * price + (first_price > 0 ? first_price : 0),
                    sku_id: item.sku_id,
                    snapshot_id: item.snapshot_id
                };
                list.push(goods);
            });

            return list;
        },
        //获得运费
        getFreightPrice(freight) {
            let currentContact = this.$refs['address'].getValue();
            let address = currentContact;
            let area_code = currentContact.area_code;

            if (!area_code || !address) {
                return;
            }

            let a1 = area_code.substring(0, 2);
            let a2 = area_code.substring(2, 4);
            let a3 = area_code.substring(4, 6);

            let price = -1;

            let isStop = false;
            freight.areas.forEach(area => {
                if (isStop) {
                    return false;
                }

                area.areasInfo.forEach(areasInfo => {
                    let value = areasInfo.value;
                    //先找区县
                    if (value.indexOf(a1 + a2 + a3) == 0) {
                        //找到区县
                        price = area.first_price;
                        isStop = true;
                    } else {
                        //没有区县，找市
                        if (value.indexOf(a1 + a2 + "00") == 0) {
                            //找到市
                            price = area.first_price;
                            isStop = true;
                        } else {
                            //没有市，找省
                            if (value.indexOf(a1 + "0000") == 0) {
                                price = area.first_price;
                            } else {
                                //不支持配送
                            }
                        }
                    }
                });
            });
            return parseFloat(price);
        },

        container() {
            return document.getElementsByTagName("body")[0];
        },

        toAppShop() {
            if (this.$isWeb()) {
                var data = this.addBagData;

                data.share_id = this.$route.query.share_id;

                this.$get("bag/add", data, res => {
                    if (res.res >= 1) {

                        window.location.href = 'http://app.followenjoy.com';

                        return;
                    }
                    this.$toast("操作失败！请重试~");
                });



            }
        }
    },
    computed: {
        totalPrice() {
            let price =
                this.orders.reduce((sum, item) => {
                    var p = 0;
                    p = item.total;
                    return sum + p;
                }, 0) *
                100 -
                (this.chosenCoupon >= 0 ? this.couponList[this.chosenCoupon].value : 0);

            price = parseFloat(price.toFixed(2));

            return price < 0 ? 0 : price;
        },

        totalPrice2() {
            let price =
                this.orders.reduce((sum, item) => {
                    var p = 0;
                    p = item.total;
                    return sum + p;
                }, 0) *
                100 -
                (this.chosenCoupon >= 0 ? this.couponList[this.chosenCoupon].value : 0);

            price = parseFloat(price.toFixed(2));
            price -= this.balance.balance_value * 100;

            return price < 0 ? 0 : price;
        },


        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        },
        currentContact() {
            const id = this.chosenContactId;
            return id !== null
                ? this.addressList.filter(item => item.id === id)[0]
                : {};
        },
        vipPrice() {
            return this.orders.reduce((sum, item) => {
                let goods = item.goodsList[0].goods;
                let s = (goods.price - goods.earn_price) * goods.count;

                return s + sum;
            }, 0);
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.$loading(300, "正在生成订单数据");
        let ids = this.$route.query.ids;
        if (typeof ids == 'string') {
            ids = [ids];
        }
        this.ids = ids;
        this.userInfo = this.$getUserInfo(true);
        this.isSetUserPwd = true;

        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() {
        if (this.payObj) {
            this.payObj.clear();
        } else {
        }
    },
    watch: {},
    components: {
        [SubmitBar.name]: SubmitBar,
        [CouponCell.name]: CouponCell,
        [CouponList.name]: CouponList,
        [AddressEdit.name]: AddressEdit,
        [orderCardGoods.name]: orderCardGoods
    }
};