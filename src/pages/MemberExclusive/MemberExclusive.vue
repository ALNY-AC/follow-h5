<template>
    <div id="MemberExclusive">

        <van-nav-bar title="会员专享" fixed left-arrow @click-left="$back()">
            <template slot="right" v-if="!$isWeb()">
                <i @click="share" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>
        <img src="static/vip.jpg" alt="">
    </div>
</template>
<script src="./MemberExclusive.js"></script>
<style lang="scss" scoped>
@import "MemberExclusive.scss";
</style>    