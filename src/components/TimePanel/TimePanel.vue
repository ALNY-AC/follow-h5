<template>
    <div class="time-panel">

        <div class="time-header-title">
            <div class="line"></div>
            <span>{{day}}</span>
        </div>

        <div class="time-body">
            <goods-card :card="false" :key="item.goods_id" :goods="item" v-for="(item) in list"></goods-card>
        </div>

    </div>
</template>
<script src="./TimePanel.js"></script>
<style lang="scss" scoped>
@import "TimePanel.scss";
</style>