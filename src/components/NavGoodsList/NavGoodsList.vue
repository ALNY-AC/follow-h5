0<template>
    <div class="nav-goods-list">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh()">
            <template slot="pulling">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loosing">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loading">
                <div class="head">
                    <o-pull-head>
                        <van-loading color="black" />
                    </o-pull-head>
                </div>
            </template>



            <van-list :immediate-check="true" v-model="isLoading" :finished="finished" @load="onLoad" :offset="300">
                <goods-card v-for="(goods) in goodsList" :card="false" :goods="goods" :key="goods.goods_id"></goods-card>
            </van-list>



            <div v-if="finished" class="empty">
                <span>没有更多了~</span>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script src="./NavGoodsList.js"></script>
<style lang="scss" scoped>
@import "NavGoodsList.scss";
</style>
