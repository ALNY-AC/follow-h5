<template>
    <div class="user-order-list">
        <pay-code ref="pay-code"></pay-code>
        <div class="list">
            <div class="item" v-for="(item,i) in list" :key="i" @click="open(item)">

                <div class="header">
                    <div class="type">
                        买
                    </div>
                    <span class="time">
                        {{item.header.time}}
                    </span>
                    <span class="state">

                        <span v-if="item.state=='1'" class="text-error">待付款</span>
                        <span v-if="item.state=='2'" class="text-warning">待发货</span>
                        <span v-if="item.state=='3'" class="text-warning">待收货</span>
                        <span v-if="item.state=='4'" class="text-success">已完成</span>
                        <span v-if="item.state=='5'" class="text-error">售后</span>
                        <span v-if="item.state=='6'" class="text-error">交易关闭</span>
                        <span v-if="item.state=='7'" class="text-error">已退款</span>
                        <span v-if="item.state=='8'" class="text-error">退款失败</span>

                    </span>

                </div>

                <div class="body">
                    <div class="goods-list">
                        <div class="goods-item" v-for="(order,j) in item.orderList" :key="j" v-if="order.snapshot">

                            <div class="goods-head">
                                <img :src="$getUrl(order.snapshot.img)" alt="">
                            </div>
                            <div class="goods-info-box">
                                <div class="goods-info-title">
                                    {{order.snapshot.goods_title}}
                                </div>
                                <div class="goods-info-sku">
                                    {{order.snapshot.s1}} - {{order.snapshot.s2}} - {{order.snapshot.s3}}
                                </div>
                            </div>

                            <div class="goods-info-money">
                                <div class="money">
                                    ￥ {{order.snapshot.price}}
                                </div>
                                <div class="count">
                                    x{{order.snapshot.count}}
                                </div>
                                <div class="user-money">
                                    <!-- ￥ {{order.logistics.price}} 运费 -->
                                    <span class="layuan layuan-1">省</span>
                                    <b>0.00</b>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="info">
                        <span class="text-info">
                            实付款：
                        </span>
                        <span class="total">￥{{item.total}}</span>
                        <span class="yf" v-if="item.freight>=0">(含运费：{{item.freight}})</span>
                    </div>
                    <div class="btn-box">
                        <template v-if="item.state==1">
                            <van-button size="small" class="pay-btn" @click.stop="pay(item,i,list)">去支付
                            </van-button>
                            <van-button size="small" @click.stop="cancel(item,i,list)">取消订单</van-button>
                        </template>

                        <template v-if="item.state==2">
                            <van-button size="small" @click.stop="afterSale(item)">退款/退货</van-button>
                        </template>

                        <template v-if="item.state==3">
                            <van-button size="small" @click.stop="lookExpressInfo(item)">查看物流</van-button>
                            <van-button size="small" @click.stop="okOrder(item)">确认收货</van-button>
                            <van-button size="small" @click.stop="afterSale(item)">申请售后</van-button>
                        </template>

                        <template v-if="item.state==4">
                            <van-button size="small" @click.stop="afterSale(item)">申请售后</van-button>
                        </template>

                        <template v-if="item.state==7 && !item.afterSale.logistics_number">
                            <van-button size="small" @click.stop="afterSaleLogisticsNumber(item)">提交物流信息</van-button>
                        </template>

                        <template v-if="item.state==7 &&  item.afterSale.logistics_number">
                            <span>退货单号：{{item.afterSale.logistics_number}}</span>
                        </template>

                        <!-- <pre class="text-left" v-html="item.afterSale"></pre> -->

                        <!-- logistics_number -->
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script src="./UserOrderList.js"></script>
<style lang="scss" scoped>
@import "UserOrderList.scss";
</style>
