<template>
    <div id="BecomeVip">
        <van-nav-bar title="会员专享" fixed left-arrow @click-left="$back()">
            <template slot="right">
                <i @click="share()" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>
        <div class="panel">
            <img src="@/assets/BecomeVip/BecomeVip.jpg" alt="">
            <div class="kt-btn-box" @click="share">
                <div class="kt-btn">一键开通</div>
            </div>
        </div>
    </div>
</template>
<script src="./BecomeVip.js"></script>
<style lang="scss" scoped>
@import "BecomeVip.scss";
</style>