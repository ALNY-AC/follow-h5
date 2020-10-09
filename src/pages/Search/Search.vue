<template>
  <div id="Search">

    <van-search background="#fff" autofocus="autofocus" v-model="key" @focus="focus=true" show-action @search="search(true)" v-focus="focus" @cancel="$back()"></van-search>

    <search-label ref="searchLabel" @change="labelChange" v-show="key.length<0 || focus"></search-label>

    <!--<search-history ref="searchHistory" v-show="key.length<0 || focus"></search-history>-->
    <div class="goods-list">
      <div v-if="empty">
        <p>抱歉，未找到“{{key}}”相关的商品<br>为您推荐以下商品</p>
      </div>
      <van-list :immediate-check="false" v-if="goodsList.length>=1 || !empty" v-model="loading" :finished="finished" @load="onLoad" :offset="10">
        <goods-card v-for="item in goodsList" :card="false" :key="item.goods_id" :goods="item"></goods-card>
      </van-list>
    </div>

  </div>
</template>

<script src="./Search.js"></script>
<style lang="scss" scoped>
@import "Search.scss";
</style>
