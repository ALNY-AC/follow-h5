<template>
    <div id="OriginOrderList">
        <van-nav-bar title="我的订单" left-arrow @click-left="$back()"></van-nav-bar>
        <van-tabs v-model="active" sticky swipeable @click="init">

            <van-tab title="全部">

                <origin-order-list-panel state="0" :lock="'0'!=active">
                    <div class="no-pay" v-if="payCount>0" @click="active = 1">
                        <div>您有
                            <span class="text-danger">
                                <b>{{payCount}}</b>
                            </span>
                            <span>笔订单等待支付
                                <small>
                                    <van-icon name="arrow" />
                                </small>
                            </span>

                        </div>
                        <!-- <div class="go-pay">
                            <span>去支付</span>
                            <small>
                                <van-icon name="arrow" />
                            </small>
                        </div> -->
                    </div>
                </origin-order-list-panel>

            </van-tab>

            <van-tab v-for="(item) in stateList" :title="item.title" :key="item.title">
                <origin-order-list-panel :state="item.state" :lock="item.state!=active"></origin-order-list-panel>
            </van-tab>
        </van-tabs>

    </div>
</template>
<script src="./OriginOrderList.js"></script>
<style lang="scss" scoped>
@import "OriginOrderList.scss";
</style>