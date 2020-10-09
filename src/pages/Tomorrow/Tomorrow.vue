<template>
    <div id="Tomorrow">
        <van-nav-bar :title="title" v-nav fixed left-arrow @click-left="$back()" :z-index="1000"></van-nav-bar>

        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="1000">
            <time-panel ref="timePanel" v-for="(item,i) in list" :key="i" :time-info="item"></time-panel>
        </van-list>

        <div class="footer" v-if="finished">
            <span>没有更多了</span>
        </div>

        <!-- <van-button @click="update()" size="small">加载更多</van-button> -->

    </div>
</template>
<script src="./Tomorrow.js"></script>
<style lang="scss" scoped>
@import "Tomorrow.scss";
</style>