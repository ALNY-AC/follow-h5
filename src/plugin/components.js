// @ts-nocheck

//自定义组件====================================================================
import GoodsCard from '@/components/goods/goods-card/goods-card.vue';

import OToast from '@/components/origin/o-toast/o-toast.vue';
import OToastBtn from '@/components/origin/o-toast-btn/o-toast-btn.vue';

import Special from '@/components/Special/Special.vue';
import SpecialList from '@/components/special-list/special-list.vue';
import SpecialSmall from '@/components/special-small/special-small.vue';//专题小
import SpecialSmallBox from '@/components/special-small-box/special-small-box.vue';//专题小


import UserOrderList from '@/components/UserOrderList/UserOrderList.vue';


import UserHeadInfo from '@/components/User/user-head-info/user-head-info.vue';
import UserOrder from '@/components/User/user-order/user-order.vue';
import ShopOrder from '@/components/User/show-order/show-order.vue';


import ShopCard from '@/components/shop-card/shop-card.vue';//我是店主中的红色卡片
import ShopCardList from '@/components/shop-card-list/shop-card-list.vue';//我是店主中的红色卡片的列表
import ShopPaperList from '@/components/shop-paper-list/shop-paper-list.vue';//课堂的列表
import ShopPaperCardList from '@/components/shop-paper-card/shop-paper-card.vue';//课堂列表中的卡片

import OFixedBtn from '@/components/o-fixed-btn/o-fixed-btn.vue';//底部浮动工具

import OButton from '@/components/o-button/o-button.vue';//按钮

import DynamicCard from '@/components/dynamic/dynamic-card/dynamic-card.vue';//单个动态的card
import DynamicList from '@/components/dynamic/dynamic-list/dynamic-list.vue';//动态列表显示
import DynamicTool from '@/components/dynamic/dynamic-tool/dynamic-tool.vue';//动态列表的工具
import DynamicGoods from '@/components/dynamic/dynamic-goods/dynamic-goods.vue';//动态列表的商品
import DynamicGoodsList from '@/components/dynamic/dynamic-goods-list/dynamic-goods-list.vue';//动态列表的商品的列表


import OLabel from '@/components/o-label/o-label.vue';//标签

import OPullHead from '@/components/o-pull-head/o-pull-head.vue';//

//优惠券

import CouponCard from '@/components/coupon/coupon-card/coupon-card.vue';//动态列表的商品的列表
import CouponList from '@/components/coupon/coupon-list/coupon-list.vue';//动态列表的商品的列表
import SelectGoods from '@/components/select-goods/select-goods.vue';//动态列表的商品的列表



import OrderCard from '@/components/order/order-card/order-card.vue';//订单卡
import OrderList from '@/components/order/order-list/order-list.vue';//订单卡的列表


import MsgCard from '@/components/msg/msg-card/msg-card.vue';//订单卡的列表

import GoodsGroup from '@/components/goods-group/goods-group.vue';//

import PaperCard from '@/components/paper-card/paper-card.vue';//
import Time from '@/components/Time/Time.vue';//

import Notice from '@/components/Notice/Notice.vue';//


import LineTitle from '@/components/line-title/line-title.vue';//

import MainVenue from '@/components/main-venue/main-venue.vue';//

import TimeRow from '@/components/time-row/time-row.vue';//

import SearchLabel from '@/components/search-label/search-label.vue';//

// import SearchHistory from '@/components/search-history/search-history.vue';//搜索历史


import SelectLocation from '@/components/select-location/select-location.vue';//选择地址


import MarketCoupon from '@/components/MarketCoupon/MarketCoupon.vue';//优惠券领取组件

import Banner from '@/components/Banner/Banner.vue';

import SelectAddress from '@/components/SelectAddress/SelectAddress.vue';

import PayCode from '@/components/PayCode/PayCode.vue';


import Share from "@/plugin/Share";


import GetCode from '@/components/GetCode/GetCode.vue';//通过手机号获取验证码组件

import CodeInput from '@/components/CodeInput/CodeInput.vue';//验证码输入组件

import Agreement from '@/components/Agreement/Agreement.vue';//用户协议

import TimePanel from '@/components/TimePanel/TimePanel.vue';//看明日的时间面板

import AddressCard from '@/components/AddressCard/AddressCard.vue';//地址卡片



import SharePanel from '@/components/SharePanel/SharePanel.vue';//地址卡片

import FixedTool from '@/components/FixedTool/FixedTool.vue';//地址卡片

import Guide from '@/components/Guide/Guide.vue';//地址卡片


import SecondKillInlet from '@/components/SecondKill/SecondKillInlet/SecondKillInlet.vue';//秒杀入口

import SecondKillGoodsCard from '@/components/SecondKill/SecondKillGoodsCard/SecondKillGoodsCard.vue';//秒杀商品卡

import TempNode from '@/components/TempNode/TempNode.vue';//模板页节点


import NavGoodsList from '@/components/NavGoodsList/NavGoodsList.vue';//首页的商品列表


import BoothCard from '@/components/Booth/BoothCard/BoothCard.vue';//展位
import BoothGroup from '@/components/Booth/BoothGroup/BoothGroup.vue';//展位


import OriginOrderCard from '@/components/OriginOrder/OriginOrderCard/OriginOrderCard.vue';//订单卡片
import OriginPayCard from '@/components/OriginOrder/OriginPayCard/OriginPayCard.vue';//支付单卡片
import OriginOrderListPanel from '@/components/OriginOrder/OriginOrderListPanel/OriginOrderListPanel.vue';//订单列表组件

import OneYuanPopup from '@/components/OneYuanPopup/OneYuanPopup.vue';
//
//
//秒杀
import KillActiveGoodsCard from '@/components/Kill/KillActiveGoodsCard/KillActiveGoodsCard.vue';
import KillGoodsCard from '@/components/Kill/KillGoodsCard/KillGoodsCard.vue';
import KillIn from '@/components/Kill/KillIn/KillIn.vue';
import KillActiveGoodsList from '@/components/Kill/KillActiveGoodsList/KillActiveGoodsList.vue';
import KillGoodsList from '@/components/Kill/KillGoodsList/KillGoodsList.vue';
import KillTime from '@/components/Kill/KillTime/KillTime.vue';

//营销组件
import MarketOne from '@/components/MarketOne/MarketOne.vue';

//倒计时
import CountDown from '@/components/CountDown/CountDown.vue';

//爆款推荐
import HotRecomme from '@/components/HotRecomme/HotRecomme.vue';

import Badge from '@/components/Badge/Badge.vue';

import Recommend from '@/components/Recommend/Recommend.vue';//为你推荐
import Cube from '@/components/Cube/Cube.vue';
import CouponExchange from '@/components/CouponExchange/CouponExchange.vue'
import OAddressEdit from '@/components/OAddressEdit/OAddressEdit.vue'

//end====自定义组件====================================================================

export default function (Vue, options) {
  Vue.component(OAddressEdit.name,OAddressEdit)
  
  Vue.component(CouponExchange.name,CouponExchange)
    Vue.component(Recommend.name, Recommend);//为你推荐
    Vue.component(OriginOrderCard.name, OriginOrderCard);//订单卡片
    Vue.component(OriginPayCard.name, OriginPayCard);//支付单卡片
    Vue.component(OriginOrderListPanel.name, OriginOrderListPanel);//订单列表组件


    Vue.component(BoothCard.name, BoothCard);//模板页节点
    Vue.component(BoothGroup.name, BoothGroup);//模板页节点


    Vue.component(NavGoodsList.name, NavGoodsList);//模板页节点


    Vue.component(TempNode.name, TempNode);//模板页节点


    Vue.component(SecondKillGoodsCard.name, SecondKillGoodsCard);//秒杀商品卡
    Vue.component(SecondKillInlet.name, SecondKillInlet);//秒杀入口

    Vue.component(Guide.name, Guide);//地址卡片

    Vue.component(SharePanel.name, SharePanel);//地址卡片

    Vue.component(FixedTool.name, FixedTool);//地址卡片

    Vue.component(AddressCard.name, AddressCard);//地址卡片

    Vue.component(TimePanel.name, TimePanel);

    Vue.component(Agreement.name, Agreement);

    Vue.component(CodeInput.name, CodeInput);

    Vue.component(GetCode.name, GetCode);

    Vue.component(GoodsCard.name, GoodsCard);

    Vue.component(PayCode.name, PayCode);


    Vue.component(Banner.name, Banner);

    Vue.component(SelectAddress.name, SelectAddress);

    Vue.component(OToast.name, OToast);
    Vue.component(OToastBtn.name, OToastBtn);

    Vue.component(Special.name, Special);
    Vue.component(SpecialList.name, SpecialList);
    Vue.component(SpecialSmall.name, SpecialSmall);
    Vue.component(SpecialSmallBox.name, SpecialSmallBox);


    Vue.component(UserHeadInfo.name, UserHeadInfo);
    Vue.component(UserOrder.name, UserOrder);
    Vue.component(ShopOrder.name, ShopOrder);

    Vue.component(ShopPaperList.name, ShopPaperList);
    Vue.component(ShopPaperCardList.name, ShopPaperCardList);
    Vue.component(ShopCard.name, ShopCard);
    Vue.component(ShopCardList.name, ShopCardList);

    Vue.component(OFixedBtn.name, OFixedBtn);//底部浮动工具
    Vue.component(OButton.name, OButton);//按钮

    Vue.component(DynamicCard.name, DynamicCard);//动态
    Vue.component(DynamicList.name, DynamicList);//动态列表显示
    Vue.component(DynamicTool.name, DynamicTool);//动态列表的工具
    Vue.component(DynamicGoods.name, DynamicGoods);//动态列表的商品
    Vue.component(DynamicGoodsList.name, DynamicGoodsList);//动态列表的商品的列表

    Vue.component(OLabel.name, OLabel);//

    Vue.component(OPullHead.name, OPullHead);//

    Vue.component(CouponCard.name, CouponCard);//
    Vue.component(CouponList.name, CouponList);//

    Vue.component(SelectGoods.name, SelectGoods);//

    Vue.component(OrderCard.name, OrderCard);//
    Vue.component(OrderList.name, OrderList);//

    Vue.component(MsgCard.name, MsgCard);//

    Vue.component(GoodsGroup.name, GoodsGroup);//

    Vue.component(PaperCard.name, PaperCard);//

    Vue.component(Time.name, Time);//

    Vue.component(Notice.name, Notice);//

    Vue.component(LineTitle.name, LineTitle);//

    Vue.component(MainVenue.name, MainVenue);//

    Vue.component(TimeRow.name, TimeRow);//

    Vue.component(SearchLabel.name, SearchLabel);//


    Vue.component(SelectLocation.name, SelectLocation);//选择地址


    Vue.component(UserOrderList.name, UserOrderList)

    Vue.component(MarketCoupon.name, MarketCoupon)

    Vue.component(OneYuanPopup.name, OneYuanPopup)

    //秒杀
    Vue.component(KillActiveGoodsCard.name, KillActiveGoodsCard)
    Vue.component(KillGoodsCard.name, KillGoodsCard)
    Vue.component(KillIn.name, KillIn)
    Vue.component(KillActiveGoodsList.name, KillActiveGoodsList)
    Vue.component(KillGoodsList.name, KillGoodsList)
    Vue.component(KillTime.name, KillTime)

    //营销模板
    Vue.component(MarketOne.name, MarketOne)

    //倒计时
    Vue.component(CountDown.name, CountDown)

    //爆款推荐
    Vue.component(HotRecomme.name, HotRecomme)

    Vue.component(Badge.name, Badge)
    Vue.component(Cube.name, Cube)

    Vue.filter('money', function (val) {
        let is =
            val && val
                .toString()
                .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                    return $1 + ",";
                });
        return is;
    });

    Vue.filter('price', function (val) {
        return (val * 1.00).toFixed(2);
    });


    Vue.filter('time', function (val) {
        var date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return Y + M + D;
    });


    var toast = false;
    var st;

    function clear() {
        clearTimeout(st);
        if (toast) toast.clear();
    }

    Vue.prototype.$loading = function (time = 0, title = "请稍后") {
        clear();
        st = setTimeout(() => {
            toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                mask: true,
                message: title
            });
        }, time);
        return toast;
    }

    Vue.prototype.$downFile = function (downUrl, filename = '_downloads/', fun) {

        this.$loading(0, '下载中');
        let dtask = window['plus'].downloader.createDownload(downUrl, {
            filename: filename
        }, (d, status) => {
            // 下载完成
            if (status == 200) {

                window['plus'].gallery.save(d.filename, (e) => {
                    this.$clearLoading();
                    setTimeout(() => {
                        if (fun) fun(e);
                    }, 10);
                });

            } else {
                this.$toast('下载失败！请重试~');
            }
        });
        dtask.start();

    }


    Vue.prototype.$clearLoading = function (time = 0) {
        setTimeout(() => {
            clear();
        }, time);
    }


    Vue.prototype.$showView = function (url) {
        localStorage['webViewUrl'] = url;
        this.$push({
            path: '/WebView',
        });
    }

    Vue.prototype.$share = new Share();
    Vue.prototype.$isPlus = !!window['plus'];


    Vue.prototype.$getDate = function (AddDayCount = 0) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        return Date.parse(`${y}/${m}/${d}`) / 1000;
    }



}
