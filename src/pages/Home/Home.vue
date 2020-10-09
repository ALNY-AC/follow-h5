<template>
  <div id="Home">
    <!-- v-nav="'.van-tabs__wrap'" -->
    <van-nav-bar fixed :z-index="101">
      <div class="left-icon" slot="left">
        <van-icon @click="$push('/msgType')" name="pending-evaluate" />
      </div>

      <div slot="title">
        <van-search placeholder="搜索商品" background="#eee"></van-search>
        <div class="search-mask" @click="goSearch()"></div>
      </div>

      <template slot="right">
        <div class="location-icon">
          <select-location @select="update"></select-location>
        </div>
      </template>

    </van-nav-bar>
    <div class="view-test">
      <!-- 拖动导航 isSwipeable-->
      <van-tabs :line-width="58" v-model="tapActive" :swipeable="false" sticky>

        <van-tab>
          <div slot="title">首页</div>

          <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
            <template slot="pulling">
              <div class="head">
                <o-pull-head>
                  <span>释放刷新</span>
                </o-pull-head>
              </div>
            </template>
            <template slot="loosing">
              <div class="head">
                <o-pull-head>
                  <span>释放刷新</span>
                </o-pull-head>
              </div>
            </template>
            <template slot="loading">
              <div class="head">
                <o-pull-head>
                  <van-loading color="black" />
                </o-pull-head>
              </div>
            </template>

            <banner pages="首页" ref="banner"></banner>

            <!-- // 通知 -->
            <!-- <notice :list="msgs" @click="$push({path: '/msgList',query: {type:1}})" :active.sync="msgActive"></notice> -->

            <!-- // 小专题 -->
            <special-small-box ref="icons"></special-small-box>
            <!--  -->
            <div v-if="$isPlus()" class="shout-price-in" @click="$isLogin()?toShout():$noLogin()">
              <img src="static/index_entrance_shout.png" alt="">
            </div>
              <!-- 营销模块 -->
              <market-one></market-one>

              <!-- // 主会场 -->
              <!-- <main-venue ref="main"></main-venue> -->

              <cube ref="mainCube" :cube-id="cubeHome"></cube>

              <!-- // 限时购 -->
              <time-limit ref="time"></time-limit>

          </van-pull-refresh>

        </van-tab>

        <van-tab v-for="(item,i) in navListPlus" :key="item.nav_id">

          <div slot="title">
            {{item.nav_title}}
          </div>

          <nav-goods-list :nav-id="item.nav_id" :lock="i!=tapActive-1"></nav-goods-list>

        </van-tab>
      </van-tabs>
    </div>
    <fixed-tool :list='toolList' position="right"></fixed-tool>

  </div>
</template>
<script src="./Home.js"></script>
<style lang="scss" scoped>
@import "Home.scss";
</style>


