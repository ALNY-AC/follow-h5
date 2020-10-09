<template>
    <div class="recommend" v-if="list.length>=1">
        <div class="recommend_title">爆款推荐</div>
        <van-list :immediate-check="false" v-if="list.length>=1" v-model="loading" :finished="finished" @load="onLoad" :offset="300">
            <goods-card :card="false" v-for="item in list" :key="item.goods_id" :goods="item"></goods-card>
        </van-list>
    </div>
</template>
<script src="./Recommend.js"></script>
<style lang="scss" scoped>
@import "Recommend.scss";
</style>