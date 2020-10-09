<template>
    <div class="select-location" @click="show=true">
        <span class="title">
            <span>{{getLabel()}}</span>
        </span>
        <van-popup :close-on-click-overlay="true" :get-container="container" v-model="show" position="bottom" class="popup">
            <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" :value="active" />
        </van-popup>
    </div>
</template>
<script src="./select-location.js"></script>
<style lang="scss" scoped>
@import "select-location.scss";
</style>