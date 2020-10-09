<template>
    <div id="TempPages" :style="{paddingTop:!$isCube()?'46px':'0'}">

        <van-nav-bar :title="title" fixed v-if="!$isCube()" left-arrow @click-left="$back()">
            <template slot="right">
                <i @click="fnxiang()" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>

        <temp-node :tree="tree"></temp-node>

        <!-- <fixed-tool :list='toolList' v-if="$isWeb()"></fixed-tool> -->
    </div>
</template>
<script src="./TempPages.js"></script>
<style lang="scss" scoped>
@import "TempPages.scss";
</style>