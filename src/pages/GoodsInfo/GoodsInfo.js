// @ts-nocheck
import $ from "jquery";
import test from "./test.js";
// @ts-ignore

import {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku,
    Toast
} from "vant";
export default {
    name: "GoodsInfo",
    data() {
        return {
            info: "",
            userInfo: null,
            skuData: null,
            goods_id: "",
            goods_count: 1,
            goods: null,
            sku: {
                tree: [],
                list: [],
                price: "--", // 默认价格（单位元）,
                stock_num: 0
            },
            //是否显示素材列表
            isShowA: false,
            dynamics: [],
            showBase: false,
            isUpdateDynamic: false,
            isShowSc: false, //是否显示素材页
            isTime: false,
            isShowHome: false,
            notTime: false,
            swipeIndex: 1,
            swiperOption1: {
                on: {
                    transitionStart: () => {
                        let swiper1 = this.$refs.swiper1.swiper;
                        this.swipeIndex = swiper1.activeIndex + 1
                    },
                }
            },
            paddingTop: '46px',
            customStepperConfig: {
                // 自定义步进器超过限制时的回调
                handleOverLimit: (data) => {
                    const { action, limitType, quota, quotaUsed } = data;
                    if (action === 'minus') {
                        this.$toast('至少选择一件商品');
                    } else if (action === 'plus') {
                        // this.$toast('库存不够了~~');
                    }
                }
            },
            isLoading: false,
            activity_type: "",
            time: "",
            kill: false,
            type: "",
            //是否跨域
            domain: false,
            domain_show: false,

        };
    },
    methods: {
        showHelp() {
            localStorage["goods_info_kf"] = JSON.stringify(this.goods);
            this.$push("/helpType");
        },
        formatPrice(val, length = 2) {

            let price = parseFloat((val / 100));

            if (((price + '').split('.')[1]) + '' == '0') {
                // 返回整数
                if (((price + '').split('.')[2]) + '' == '0') {
                    return parseInt(price + '');
                } else {
                    return price;
                }
            } else {
                return price;
            }


        },
        showPanel(name) {
            if (name == "素材") {
                this.isShowA = true;
            } else {
                this.isShowA = false;
            }
        },
        onBuyClicked(skuData) {
            // 购买
            this.$toast("购买");
        },
        isSku(skuData) {

            if (!skuData.selectedSkuComb) {
                if (this.showBase) {
                    this.$toast("请选择完成的规格~");
                }
                this.showBase = true;
                return false;
            }

            if (skuData.selectedNum <= 0) {
                if (this.showBase) {
                    this.$toast("请选择完成的规格~");
                }
                this.showBase = true;
                return false;
            }
            return true;

        },
        addBag() {
            //点击添加购物袋回调
            var skuData = (this.skuData = this.$refs["sku"].getSkuData());

            if (!this.isSku(skuData)) {
                return;
            }

            let share_id;

            if (this.$route.query['share_id']) {
                share_id = this.$route.query['share_id'];
            } else {
                share_id = '';
            }
            var data = {
                goods_id: this.goods_id,
                count: skuData.selectedNum,
                sku_id: skuData.selectedSkuComb.sku_id,
                // 分享人信息
                share_id: share_id
            };

            this.$get("bag/add", data, res => {
                if (res.res >= 1) {
                    this.$toast("加入成功~");
                    this.showBase = false;
                    return;
                }
                this.$toast("操作失败！请重试~");
            });



        },
        // 立即购买
        purchase() {
            var skuData = (this.skuData = this.$refs["sku"].getSkuData());

            if (!this.isSku(skuData)) {
                return;
            }
            //直接创建快照
            let share_id;
            if (this.$route.query['share_id']) {
                share_id = this.$route.query['share_id'];
            } else {
                share_id = '';
            }

            var data = {
                goods_id: this.goods_id,
                count: skuData.selectedNum,
                sku_id: skuData.selectedSkuComb.sku_id,
                // 分享人信息
                share_id: share_id
            };

            this.$get("snapshot/creat", data, res => {
                if (res.res >= 1) {
                    //创建成功跳转到订单页面
                    this.$push({
                        path: "/order/add",
                        query: {
                            ids: [res.msg]
                        }
                    });
                    this.showBase = false;
                    return;
                }
                this.$toast("操作失败！请重试~");
            });
        },
        update() {
            this.swipeIndex = 1;
            this.isLoading = true;
            // this.$loading(0, "加载中~");
            this.$get(
                "goods/get",
                {
                    goods_id: this.goods_id,
                    activity_type: this.activity_type,
                },
                res => {
                    test(res)
                    if (res.res >= 1) {
                        if (res.msg.hasOwnProperty("activity_type")) {
                            res.msg.activity_type.activity_type = "kill" ? this.kill = true : this.kill = false;
                            if (res.msg.activity_type.time_end_time == null || res.msg.activity_type.time_end_time == "" || res.msg.activity_type.time_end_time == undefined) {
                                this.time = parseInt(res.msg.activity_time) - parseInt(res.msg.activity_type.nowTime)
                            } else {
                                this.time = parseInt(res.msg.activity_type.time_end_time) - parseInt(res.msg.activity_type.nowTime);
                            }
                        }

                        // 先清空数据
                        this.goods = null;
                        this.img_list = [];
                        this.sku.tree = [];
                        this.sku.list = [];
                        this.skuData = null;
                        this.goods_count = 1;
                        this.notTime = false;
                        this.domain = false;
                        setTimeout(() => {
                            this.img_list = res.msg.img_list;
                            this.goods = res.msg;
                            this.buliderGoods(this.goods);
                            //this.domain = res.domain;
                            if (res.msg.is_cross_border == "1") {
                                this.domain = true;
                            }
                        }, 200);
                    }
                    if (res.res < 0) {
                    }
                    // this.$clearLoading();
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 300);
                    });



                },
                error => { }
            );
        },
        updateDynamic(refresh) {
            if (refresh) {
                this.dynamics = [];
            }

            if (this.dynamics.length <= 0) {
                //加载层
                this.$loading(0, "加载中~");
                this.$get(
                    "dynamic/getList",
                    {
                        where: {
                            goods_id: this.goods_id
                        }
                    },
                    res => {
                        this.$clearLoading();
                        if (res.res >= 1) {
                            this.dynamics = res.msg;
                            this.isUpdateDynamic = false;
                            this.isShowSc = true;
                            return;
                        }
                        if (res.res == 0) {
                            this.isShowSc = false;
                        }
                    }
                );
            }
        },
        buliderGoods(goods) {
            goods.title = goods.goods_title;
            goods.picture = this.$getUrl(goods.img_list[0].src);
            this.sku.tree = goods.tree;
            this.sku.list = goods.sku;
            // this.sku.price = goods && goods.sku && goods.sku.length > 0 ? goods.sku[0].price : '0';
            // this.sku.stock_num = goods && goods.sku && goods.sku.length > 0 ? parseInt(goods.sku[0].stock_num) : 0;
            for (let i = 0; i < goods.sku.length; i++) {
                let sku = goods.sku[i];
                // 如果是活动，则显示活动价
                sku.price *= 100;
            }


        },
        collection() {
            //收藏
            this.$post(
                "collection/change",
                {
                    goods_id: this.goods_id
                },
                res => {
                    if (res.res >= 1) {
                        if (res.msg == 1) {
                            this.goods.is_collection = !this.goods.is_collection;
                            if (this.goods.is_collection) {
                                this.$toast({
                                    message: "收藏成功",
                                    position: 'bottom'
                                });
                            } else {
                                this.$toast({
                                    message: "已取消收藏",
                                    position: 'bottom'
                                });
                            }
                        }
                    }
                }
            );
        },
        fnxiang() {

            let title = "";
            let subTitle = "";
            let earn_price = this.goods["sku"][0].earn_price;
            let goods_id = this.goods.goods_id;


            if (this.$userInfo.user_vip_level > 0) {
                title = "赚" + this.goods["sku"][0].earn_price;
            } else {
                title = `成为会员分享商品，可赚${earn_price}`;
            }

            if (this.$userInfo.user_vip_level > 0) {
                subTitle = `只要你的好友通过你的连接购买此商品，你就能赚到至少<span style="color:#D7385E">${earn_price}</span>元的利润哦`;
            } else {
                subTitle = `成为会员 >`;
            }

            let url = `goodsInfo?&goods_id=${goods_id}`;

            if (this.activity_type == 'kill') {
                url += "&activity_type=kill"
            } else {
                url += "&activity_type="
            }

            let img = this.$getThumb(this.goods.goods_head);

            this.$store.state.showShare(
                {
                    title: this.goods.goods_title,
                    content: this.goods.sub_title ? this.goods.sub_title : "",
                    href: url,
                    image: img,
                    goods_id: this.goods.goods_id,
                    // 下面是对应各个平台的扩展参数。
                    weixin: {
                        extra: { scene: "WXSceneSession" }
                    },
                    // 下面是组件特有的参数
                    comp: {
                        title: title,
                        subTitle: subTitle,
                        subClick: () => {
                            // 点击成为会员
                            this.$push({
                                path: '/MemberExclusive',
                            })
                        },
                        btn: {
                            // qrcode: true
                        }
                    }
                },
                res => { }
            );



        },
        initData() {

            this.swipeIndex = 1;

            this.goods = null;
            $("html").css("font-size", window.innerWidth / 10);
            $(window).resize(function () {
                $("html").css("font-size", window.innerWidth / 10);
            });
            this.goods_id = this.$route.query.goods_id;
            this.activity_type = this.$route.query.activity_type;

            this.userInfo = this.$getUserInfo();

            this.isShowA = false;
            this.swipeIndex = 1;

            this.update();
            this.updateDynamic(true);

            if (!window['plus']) {
                this.isShowHome = true;
            } else {
                this.isShowHome = false;
            }




        }

    },
    computed: {
        swiper1() {
            if (this.$refs.swiper1) {
                return this.$refs.swiper1.swiper;
            } else {
                return false;
            }
        },

        goodsPrice() {

            if (!this.goods) {
                return '--';
            }
            let price = '';
            let sku = '';

            // 如果有选择的sku，就返回选择的sku数据

            if (this.skuData && this.skuData.selectedSkuComb) {

                let sku = this.skuData.selectedSkuComb;
                let p1 = this.formatPrice(sku.price, 1);
                price = `${p1}`;

            } else {
                // 如果长度大于1，就显示区间
                let sku = this.goods.sku;
                if (sku.length > 1) {
                    let p1 = this.formatPrice(sku[0].price, 1);
                    let p2 = this.formatPrice(sku[sku.length - 1].price, 1);
                    if (p1 == p2) {
                        price = p1;
                    } else {
                        price = `${p1}~${p2}`;
                    }
                }
                if (sku.length == 1) {
                    let p1 = this.formatPrice(sku[0].price, 1);
                    price = `${p1}`;
                }
            }


            return price;
        },
        maidGoodsPrice() {
            if (!this.goods) {
                return '--';
            }

            let price = '';

            if (this.skuData && this.skuData.selectedSkuComb) {

                let sku = this.skuData.selectedSkuComb;
                let p1 = this.formatPrice(sku.earn_price * 100);
                price = `${p1}`;

            } else {
                let sku = this.goods.sku;

                if (sku.length > 1) {
                    let p1 = this.formatPrice(sku[0].earn_price * 100);
                    let p2 = this.formatPrice(sku[sku.length - 1].earn_price * 100);
                    if (p1 == p2) {
                        price = p1;
                    } else {
                        price = `${p1}~${p2}`;
                    }
                }
                if (sku.length == 1) {
                    let p1 = this.formatPrice(sku[0].earn_price * 100);
                    price = `${p1}`;
                }

            }


            return price;
        },
        goodsStock() {
            if (!this.goods) {
                return '--';
            }

            let stock = 0;
            let sku = this.goods.sku;

            stock = sku.reduce((sum, item) => {
                return sum + parseInt(item.stock_num);
            }, 0);

            return `库存${stock}`;
        },
        originalPrice() {


            if (!this.goods) {
                return '';
            }

            let price = '';

            if (!this.goods.sku[0]['original_price']) {
                return price;
            }

            if (this.skuData && this.skuData.selectedSkuComb) {

                let sku = this.skuData.selectedSkuComb;
                let p1 = this.formatPrice(sku.original_price * 100, 1);
                price = `${p1}`;

            } else {
                let sku = this.goods.sku;

                if (sku.length > 1) {
                    let p1 = this.formatPrice(sku[0].original_price * 100, 1);
                    let p2 = this.formatPrice(sku[sku.length - 1].original_price * 100, 1);
                    if (p1 == p2) {
                        price = p1;
                    } else {
                        price = `${p1}~${p2}`;
                    }
                }
                if (sku.length == 1) {
                    let p1 = this.formatPrice(sku[0].original_price * 100, 1);
                    price = `${p1}`;
                }
            }

            return '￥' + price;
        },
        salesVolume() {


            if (!this.goods) {
                return '--';
            }
            let salesVolume = '';

            let sku = this.goods.sku;

            salesVolume = sku.reduce((sum, item) => {
                return sum + parseInt(item.sales_volume);
            }, 0);

            return `销量${salesVolume}`;

        },
    },
    //过滤器
    filters: {},
    mounted() {

    },
    activated() {

        if (this.$route.query.goods_id != this.goods_id) {
            if (!!this['initData']) {
                this.initData();
                return;
            }
        } else {

        }

    },
    created() {
        if (!this['initData']) {
            return;
        }
        this.initData();
    },
    watch: {
        goods(goods) { },
        showBase() {
            this.skuData = this.$refs["sku"].getSkuData();
        },
        isShowA(val) {
            if (val) {
                this.updateDynamic();
            }
        }
    },
    components: {
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
        [Sku.name]: Sku
    }
};

