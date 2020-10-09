<template>
    <div id="ShopData">
        <van-nav-bar title="业绩管理" left-arrow @click-left="$back()"></van-nav-bar>
        <div class="user-head" v-if="userInfo">
            <img :src="$getUrl(userInfo.user_head)" alt="">
            <div class="user-info-box">
                <span class="user-name">{{userInfo.user_name}}</span>
                <span class="vip">{{userInfo.vipInfo.levelName}}</span>
            </div>
        </div>

        <van-cell-group>
            <van-cell @click.native="$push('/Invite')" icon="point-gift" title="分享随享季好礼" is-link />
            <!-- <van-cell icon="records" title="分享记录" is-link /> -->
            <!-- <van-cell icon="gold-coin" title="客户总收入" value="￥99.98" /> -->
        </van-cell-group>

    </div>
</template>
<script src="./ShopData.js"></script>
<style lang="scss" scoped>
@import "ShopData.scss";
</style>