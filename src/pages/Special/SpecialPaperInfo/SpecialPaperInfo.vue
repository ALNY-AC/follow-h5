<template>
    <div id="SpecialPaperInfo">

        <van-nav-bar title="随享季" fixed left-arrow @click-left="$back()">
            <template slot="right">
                <i @click="share" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>

        <template v-if="paper">
            <div class="paper-body">
                <div class="paper-title">
                    {{paper.paper_title}}
                </div>

                <div class="paper-time">
                    {{paper.add_time}}
                </div>
                <div class="paper-content" v-html="paper.paper_content"></div>
            </div>

            <div class="goods-box" v-if="paper.goods" @click="goGoods">

                <div class="goods-panel">

                    <div class="goods-head">
                        <img :src="$getUrl(paper.goods.goods_head)" alt="">
                    </div>
                    <div class="goods-info-box">
                        <div class="goods-title">{{paper.goods.goods_title}}</div>
                        <div class="goods-price">￥{{paper.goods.sku && paper.goods.sku.length >0 ?paper.goods.sku[0].price :''}}</div>
                    </div>

                </div>

            </div>

        </template>

    </div>
</template>
<script src="./SpecialPaperInfo.js"></script>
<style lang="scss" scoped>
@import "SpecialPaperInfo.scss";
</style>