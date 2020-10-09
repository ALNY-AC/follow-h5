<template>
    <div id="ExpressInfo">
        <van-nav-bar title="物流信息" fixed left-arrow @click-left="$back()" :z-index="8"></van-nav-bar>

        <van-steps v-if="isShow" direction="vertical" :active="0" active-color="#f60">
            <van-step v-for="item in info" :key="item.context">
                <p>{{item.context}}</p>
                <p>{{item.ftime}}</p>
            </van-step>
        </van-steps>
        <!-- <div class="empty" v-if="!isShow">
            <div class="blank">
                <img class="blank_img" src="@/assets/blank/logistics_msg.svg" alt="">
                <div>
                    <span class="blank_title">暂无物流信息</span>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script src="./ExpressInfo.js"></script>
<style lang="scss" scoped>
@import "ExpressInfo.scss";
</style>
