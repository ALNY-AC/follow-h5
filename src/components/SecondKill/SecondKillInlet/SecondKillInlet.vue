<template>
    <div class="second-kill-inlet">

        <div class="header">
            <div class="title">限时秒杀</div>
            <div class="time">
                <div class="time-label">00</div>
                <div class="time-colon">:</div>
                <div class="time-label">00</div>
                <div class="time-colon">:</div>
                <div class="time-label">00</div>
            </div>
        </div>

        <div class="goods-list">

            <div class="goods-card">
                <div class="goods-header">
                    <img :src="testImg" alt="">
                </div>
                <div class="goods-price-box">
                    <span class="goods-price">￥49.9</span>
                    <span class="goods-origin">
                        <s>￥99</s>
                    </span>
                </div>
            </div>

            <div class="goods-card">
                <div class="goods-header">
                    <img :src="testImg" alt="">
                </div>
                <div class="goods-price-box">
                    <span class="goods-price">￥49.9</span>
                    <span class="goods-origin">
                        <s>￥99</s>
                    </span>
                </div>
            </div>

        </div>

    </div>
</template>
<script src="./SecondKillInlet.js"></script>
<style lang="scss" scoped>
@import "SecondKillInlet.scss";
</style>