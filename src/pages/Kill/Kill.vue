<template>
  <div id="Kill">
    <div class="tesr">
      <van-nav-bar title="限时秒杀" left-arrow @click-left="$back()"></van-nav-bar>

      <!-- <img class="kill_banner" src="@/assets/kill/second_list_banner.png" alt=""> -->
      <!-- <banner pages="秒杀页"></banner> -->

      <booth-group :booth-group-id="boothGroupId"></booth-group>

      <van-tabs v-model="activeIndex" sticky>
        <van-tab>
          <div slot="title">
            正在疯抢
          </div>
          <kill-active-goods-list></kill-active-goods-list>
        </van-tab>

        <van-tab>
          <div slot="title">
            下场预告
          </div>
          <kill-goods-list></kill-goods-list>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script src="./Kill.js"></script>

<style lang="scss" scoped>
@import "Kill.scss";
</style>