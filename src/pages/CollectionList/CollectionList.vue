<template>
  <div id="CollectionList">
    <van-nav-bar title="我的收藏" v-nav left-arrow @click-left="$back()" fixed></van-nav-bar>

    <div class="blank" v-if="goodsList.length==0">
      <img class="blank_img" src="@/assets/blank/collection_msg.svg" alt="">
      <div>
        <span class="blank_title">您还没有收藏任何商品</span>
      </div>
    </div>

    <van-list :immediate-check="false" v-if="goodsList.length>=1 || !empty" v-model="loading" :finished="finished" @load="onLoad" :offset="300">

      <van-swipe-cell :right-width="65" v-for="(item,index) in goodsList" :key="item.goods_id">
        <goods-card :card="false" :key="item.goods_id" :goods="item"></goods-card>
        <span slot="right" @click="del(item,index,goodsList)">
          <div class="van-swipe-cell-btn bg-danger">
            <van-icon name="delete" />
          </div>
        </span>
      </van-swipe-cell>

    </van-list>

    <recommend scene="CollectionList"></recommend>
  </div>
</template>
<script src="./CollectionList.js"></script>
<style lang="scss" scoped>
@import "CollectionList.scss";
</style>
