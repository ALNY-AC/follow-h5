<template>
    <div class="booth-group">
        <swiper :options="swiperOption1" ref="swiper1" class="gallery-1">
            <swiper-slide v-for="item in list" :key="item.booth_id" @click.native.stop="open(item)">
                <img class="swipe-item-img" :src="$getUrl(item.src)" alt="">
            </swiper-slide>
        </swiper>
    </div>
</template>
<script src="./BoothGroup.js"></script>
<style lang="scss" scoped>
@import "BoothGroup.scss";
</style>