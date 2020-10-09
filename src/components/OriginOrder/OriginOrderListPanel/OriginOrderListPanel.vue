<template>
    <div class="origin-order-list-panel">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh()">
            <template slot="pulling">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loosing">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loading">
                <div class="head">
                    <o-pull-head>
                        <van-loading color="black" />
                    </o-pull-head>
                </div>
            </template>

            <slot></slot>

            <template v-if="state!='1'">
                <van-list :immediate-check="true" v-model="isLoading" :finished="finished" @load="onLoad" :offset="300">
                    <origin-order-card :list="orderList" :index="i" :order="order" v-for="(order,i) in orderList" :key="order.order_id"></origin-order-card>
                </van-list>
            </template>

            <template v-if="state=='1'">
                <van-list :immediate-check="true" v-model="isLoading" :finished="finished" @load="onLoad" :offset="300">
                    <origin-pay-card :list="payList" :index="i" :pay="pay" v-for="(pay,i) in payList" :key="pay.pay_id"></origin-pay-card>
                </van-list>
            </template>

            <div class="blank" v-if="isblank">
                <img class="blank_img" src="@/assets/blank/order_msg.svg" alt="">
                <div class="blank_title">您还没有相关的订单</div>
            </div>

            <recommend scene="OriginOrderListPanel"></recommend>

        </van-pull-refresh>

    </div>
</template>
<script src="./OriginOrderListPanel.js"></script>
<style lang="scss" scoped>
@import "OriginOrderListPanel.scss";
</style>