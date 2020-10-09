<template>
    <div id="ShoutPrice">

        <van-nav-bar title="喊价" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <img class="ShoutPriceTopImg" src="@/assets/shout_banner.png">

        <van-list :immediate-check="false" v-model="isLoading" :finished="finished" @load="onLoad" :offset="300">
            <div class="goods-card" v-for="(item,i) in list" :key="i">
                <div class="goods-head">
                    <img :src="item.src" alt="">
                    <div class="is_blank" v-if="item.stock==0">已售罄</div>
                </div>
                <div class="goods-info">
                    <div class="goods-title">{{item.goods_title}}</div>
                    <div class="goods-sku-info">{{item.sku_info}}</div>
                    <div class="goods-price-info">
                        <div class="goods-origin-price">原价：￥{{item.price}}</div>
                        <div class="goods-min-price">
                            <div class="price-text">最低价</div>
                            <div class="price">￥{{item.min_price}}</div>
                        </div>
                    </div>
                    <div class="goods-btn" @click="shareMini(item.goods_id)"  v-if="item.stock>0">喊</div>
                    <div class="blank-btn" v-if="item.stock==0">售罄</div>
                </div>
            </div>
        </van-list>

        <div class="empty" v-if="finished">
            没有更多了~
        </div>

    </div>
</template>
<script src="./ShoutPrice.js"></script>
<style lang="scss" scoped>
@import "ShoutPrice.scss";
</style>