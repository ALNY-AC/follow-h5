<template>
  <div class="Time" id="TimeBox">

    <line-title>今日头牌</line-title>
    <div class="time-goods-list">
      <div class="time-test"></div>
      <transition name="slide-fade">
        <div class="time-goods-list-mask" v-show="isLoading" @click.stop>
          <div class="first-loading">
            <span>加载中</span>
            <van-loading class="loading" size="15px" color="black" />
          </div>
        </div>
      </transition>

      <template v-if="times">
        <div class="time-header">

          <div class="time-swiper">
            <swiper :options="swiperOption" ref="swiperTop" class="gallery-top">

              <swiper-slide>
                <span class="zr">昨日</span>
                <div style="font-size:12px">
                  别错过
                </div>
              </swiper-slide>

              <swiper-slide v-for="(item,i) in times" :key="i">
                {{item.time_label}}
                <div style="font-size:12px">
                  {{item.state}}
                </div>
              </swiper-slide>

              <div class="tomorrow" v-if="times && times.length>0" @click.stop="goTomorrow">
                <div class="tomorrow-block">看明日
                </div>
                <div class="horn"></div>
              </div>

            </swiper>
            <div class="line"></div>
          </div>

        </div>

        <template v-for="goods in goodsList">
          <goods-card :goods="goods" :key="goods.goods_id"></goods-card>
        </template>

        <!-- <van-list
          :immediate-check="true"
          :finished="finished"
          @load="onLoad"
          :offset="300"
        >

          <goods-card  v-for="(goods) in goodsList" :card="false" :goods="goods" :key="goods.goods_id"></goods-card>
          

          <van-cell v-for="item in list" :key="item" :title="item + ''" />
        </van-list> -->

      </template>

    </div>
  </div>
</template>

<script src="./Time.js"></script>

<style lang="scss" scoped>
@import "Time.scss";
</style>