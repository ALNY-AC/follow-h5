<template>
    <div id="WebView">
        <van-nav-bar title="" fixed left-arrow @click-left="$back()"></van-nav-bar>
        <div class="web-view">
            <div class="load">
                <van-loading v-if="isLoad" type="spinner" color="black" />
            </div>
            <iframe id="iframe" v-show="!isLoad" :src="src" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script src="./WebView.js"></script>
<style lang="scss" scoped>
@import "WebView.scss";
</style>