<template>
    <div id="HomePage">

        <template v-if="$route.meta.keepAlive">
            <keep-alive>
                <router-view class="router-view"></router-view>
            </keep-alive>
        </template>
        <template v-if="!$route.meta.keepAlive">
            <router-view class="router-view"></router-view>
        </template>
        <one-yuan-popup></one-yuan-popup>

    </div>
</template>
<script src="./HomePage.js"></script>
<style lang="scss" scoped>
@import "HomePage.scss";
</style>