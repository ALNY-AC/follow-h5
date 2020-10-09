<template>
    <div class="second-kill-goods-card">

        <div class="goods-header">
            <img :src="testImage" alt="">
        </div>
        <div class="goods-info-box">
            <div class="goods-title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </div>
            <div class="goods-dev-box">
                <div class="goods-dev">
                    <div class="goods-dev-title">{{dev}}%</div>
                    <div class="goods-dev-cube" :style="[{width:dev+'%'}]"></div>
                </div>
                <div class="goods-dev-label">已抢{{dev}}件</div>
            </div>
            <div class="goods-footer">
                <van-row>
                    <van-col span="12">
                        <div class="goods-price-box">
                            <div class="goods-price">
                                <small>￥</small>
                                <span>13.99</span>
                            </div>
                            <div class="goods-price-origin">
                                <s>￥99.99</s>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="goods-btn">
                            <span>马上抢</span>
                            <van-icon name="arrow" />
                        </div>
                    </van-col>
                </van-row>

            </div>
        </div>

    </div>
</template>
<script src="./SecondKillGoodsCard.js"></script>
<style lang="scss" scoped>
@import "SecondKillGoodsCard.scss";
</style>