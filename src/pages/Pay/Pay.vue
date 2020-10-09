<template>
    <div id="Pay">
        <van-nav-bar title="订单支付" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <van-panel title="订单编号" desc="" :status="pay_id" class="pay-info">
            <div>
                <van-row>
                    <van-col span="12" class="text-info">应付金额</van-col>
                    <van-col span="12" class="text-right text-hot" style="font-size:15px">
                        <span>
                            ￥{{total}}
                        </span>
                    </van-col>
                </van-row>
            </div>
        </van-panel>

        <van-panel style="margin:8px 0" title="请选择支付方式">
            <van-radio-group v-model="pay_type">
                <van-cell>
                    <van-radio name="1">
                        <i class="zf-icon zfb iconfont icon-zhifubaozhifu"></i>
                        <span>支付宝支付</span>
                    </van-radio>
                </van-cell>
                <van-cell>
                    <van-radio name="2">
                        <i class="zf-icon wx iconfont icon-weixinzhifu1"></i>
                        <span>微信支付</span>
                    </van-radio>
                </van-cell>
            </van-radio-group>
        </van-panel>

        <div class="fixed-btn" @click="pay()">
            <mu-ripple :opacity="0.2">
                立即支付
            </mu-ripple>
        </div>
    </div>
</template>
<script src="./Pay.js"></script>
<style lang="scss" scoped>
@import "Pay.scss";
</style>