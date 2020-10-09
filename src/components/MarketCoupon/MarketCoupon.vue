<template>
    <div class="market-coupon">
        <van-popup v-model="show" class="market-box">
            <template v-if="item">
                <div class="market-body" @click.stop="click">
                    <img :src="$getUrl(item.img)" alt="">
                    <div class="close" @click.stop="close">
                        <van-icon name="close" />
                    </div>
                </div>
            </template>
        </van-popup>
    </div>
</template>
<script src="./MarketCoupon.js"></script>
<style lang="scss" scoped>
@import "MarketCoupon.scss";
</style>