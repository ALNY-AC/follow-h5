<template>
    <div class="banner">

        <swiper :options="swiperOption1" ref="swiper1" class="gallery-1">
            <swiper-slide v-if="list && list.length>1" v-for="item in list" :key="item.banner_id" @click.native.stop="open(item)">
                <img class="swipe-item-img" :src="$getUrl(item.src)" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img class="swipe-item-img" v-if="list && list.length==1" :src="$getUrl(list[0].src)" alt="" />
    </div>
</template>
<script src="./Banner.js"></script>
<style lang="scss" scoped>
@import "Banner.scss";
</style>