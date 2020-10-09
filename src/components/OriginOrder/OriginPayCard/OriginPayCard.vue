<template>
    <div class="origin-pay-card">
        <div class="origin-order-card-body">

            <div class="card-header">
                <!-- <div class="pay-type-label">{{order.buyType}}</div> -->
                <div class="time">{{pay.add_time_text}}</div>
                <span class="state text-error" v-if="!invalid">待付款</span>
                <span class="state text-info" v-if="invalid">已过期</span>
            </div>

            <div class="card-body">

                <div class="card-goods-card" v-for="(order,i) in pay.orderList" :key="i">

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
                                    <span>{{pay.price}}</span>
                                </span>
                            </b>
                        </span>
                        <!-- <span class="other">
                            <small>（含运费：￥{{order.logistics.price}}）</small>
                        </span> -->
                    </p>
                    <p class="text-info">
                        <small>支付号：{{pay.pay_id}}</small>
                    </p>
                    <van-button size="small" class="pay-btn" v-if="!invalid" @click.stop="toPay()">去支付
                        <b>{{timeTitle}}</b>
                    </van-button>

                    <!--  -->
                    <van-button size="small" @click.stop="cancel()">取消订单</van-button>

                </div>

            </div>

        </div>

    </div>
</template>
<script src="./OriginPayCard.js"></script>
<style lang="scss" scoped>
@import "OriginPayCard.scss";
</style>