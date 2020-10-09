<template>
    <div id="SpecialGoods">
        <van-nav-bar class="bar" :title="$route.query.title" left-arrow @click-left="$back()">
            <template slot="right">
                <i @click="share" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>

        <div class="goods-list">

            <div class="goods-card" v-for="(item,i) in list" :key="i" @click.stop="goInfo(item)">
                <div class="goods-title">{{item.goods_title}}</div>
                <div class="goods-info">{{item.sub_title}}</div>
                <div class="goods-img" :style="{backgroundImage:`url(${$getUrl(item.goods_banner)})`}"></div>
                <div class="goods-sub-title">{{item.sub_title}}</div>
                <div class="goods-price">
                    <div class="price">品质价:{{item.sku[0].price}}元</div>
                    <div class="vip-price">会员价￥{{item.sku[0].price-item.sku[0].earn_price}}</div>
                </div>
                <div class="go" @click.stop="goInfo(item)">
                    <span>立即购买</span>
                </div>
            </div>

        </div>

    </div>
</template>
<script src="./SpecialGoods.js"></script>

<style lang="scss" scoped>
@import "SpecialGoods.scss";
</style>