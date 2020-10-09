<template>
    <div class="origin-order-card">
        <div class="origin-order-card-body">

            <div class="card-header">
                <div class="pay-type-label">{{order.buyType}}</div>
                <div class="time">{{order.add_time}}</div>
                <!-- <div class="state">{{order.stateText}}</div> -->
                <span v-if="order.state=='1'" class="state text-error">待付款</span>
                <span v-if="order.state=='2'" class="state text-warning">待发货</span>
                <span v-if="order.state=='3'" class="state text-warning">待收货</span>
                <span v-if="order.state=='4'" class="state text-success">已完成</span>
                <span v-if="order.state=='5'" class="state text-error">售后</span>
                <span v-if="order.state=='6'" class="state text-error">交易关闭</span>
                <span v-if="order.state=='7'" class="state text-error">已退款</span>
                <span v-if="order.state=='8'" class="state text-error">退款失败</span>

            </div>

            <div class="card-body">

                <div class="card-goods-card" v-for="i in 1" :key="i" @click="open()">

                    <van-row>
                        <van-col span="5">
                            <img class="goods-img" :src="$getUrl(order.goodsInfo.img)">
                        </van-col>
                        <van-col span="15">
                            <div class="goods-info-box">
                                <div class="goods-title">{{order.goodsInfo.goods_title}}</div>
                                <div class="goods-sku-info">
                                    {{order.goodsInfo.skuInfo}}
                                </div>
                            </div>
                        </van-col>
                        <van-col span="4">
                            <div class="info-box">
                                <div class="price">￥{{order.goodsInfo.price}}</div>
                                <div class="num">x{{order.goodsInfo.count}}</div>
                                <div class="maid" v-if="$userInfo.user_vip_level>0">
                                    <span class="maid-label">省</span>
                                    <span>
                                        <b>{{order.goodsInfo.earn_price}}</b>
                                    </span>
                                </div>
                            </div>
                        </van-col>
                    </van-row>

                </div>

            </div>

            <div class="card-footer">

                <div class="card-footer-tool">
                    <p>
                        <span>应付款:</span>
                        <span class="price">
                            <b>
                                <span>
                                    <small>￥</small>
                                    <span>{{order.price}}</span>
                                </span>
                            </b>
                        </span>
                        <span class="other">
                            <small>（含运费：￥{{order.logistics.price}}）</small>
                        </span>
                    </p>
                    <p class="text-info">
                        <small>订单号：{{order.order_id}}</small>
                    </p>
                    <!-- <van-button size="small" @click.stop="cancel(item,i,list)">取消订单</van-button> -->

                    <template v-if="order.state==2">
                        <van-button size="small" @click.stop="afterSale()">退款/退货</van-button>
                    </template>

                    <template v-if="order.state==3">
                        <van-button size="small" @click.stop="lookExpressInfo()">查看物流</van-button>
                        <van-button size="small" @click.stop="okOrder()">确认收货</van-button>
                        <van-button size="small" @click.stop="afterSale()">申请售后</van-button>
                    </template>

                    <template v-if="order.state==4">
                        <van-button size="small" @click.stop="lookExpressInfo()">查看物流</van-button>
                        <van-button size="small" @click.stop="afterSale()">申请售后</van-button>
                    </template>

                    <template v-if="order.state==7 && !order.afterSale.logistics_number">
                        <van-button size="small" @click.stop="afterSaleLogisticsNumber()">提交物流信息</van-button>
                    </template>
                    <template v-if="order.state==7 &&  order.afterSale.logistics_number">
                        <span>退货单号：{{order.afterSale.logistics_number}}</span>
                    </template>

                </div>

            </div>

        </div>

    </div>
</template>
<script src="./OriginOrderCard.js"></script>
<style lang="scss" scoped>
@import "OriginOrderCard.scss";
</style>