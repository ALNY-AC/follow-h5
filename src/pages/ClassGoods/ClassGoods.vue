<template>
    <div id="ClassGoods">
        <van-nav-bar :title="title" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <van-list :immediate-check="false" v-if="goodsList.length>=1 || !empty" v-model="loading" :finished="finished" @load="onLoad" :offset="300">
            <goods-card v-for="item in goodsList" :card="false" :key="item.goods_id" :goods="item"></goods-card>
        </van-list>

        <div v-if="empty" class="app-empty">
            <span>没有更多了~</span>
        </div>

    </div>
</template>
<script src="./ClassGoods.js"></script>
<style lang="scss" scoped>
@import "ClassGoods.scss";
</style>