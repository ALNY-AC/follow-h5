<template>
  <div id="App">

    <transition>

      <template v-if="$route.meta.keepAlive">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </template>

      <template v-if="!$route.meta.keepAlive">
        <router-view class="router-view"></router-view>
      </template>

    </transition>

    <!-- <market-coupon></market-coupon> -->

    <transition name="slide-bottom">
      <van-tabbar v-model="active" v-show="isShowNav">
        <!-- <van-tabbar-item v-for="(item,index) in navList" @click="show(index)" v-show="item.isShow" :key="item.path" :info="item.info">
           <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? navList[index].icon.active : navList[index].icon.normal"
          >
          {{item.title}}
        </van-tabbar-item> -->

        <van-tabbar-item @click="show(0)" info="">
          <img slot="icon" slot-scope="props" :src="props.active ? 'static/nav/home_icon_tab_sel.png' : 'static/nav/home_icon_tab_def.png'"> 首页
        </van-tabbar-item>

        <van-tabbar-item @click="show(1)" info="">
          <img slot="icon" slot-scope="props" :src="props.active ? 'static/nav/find_icon_tab_sel.png' : 'static/nav/find_icon_tab_def.png'"> 发现
        </van-tabbar-item>

        <van-tabbar-item @click="$isLogin()?show(2):$noLogin()" info="">
          <img slot="icon" slot-scope="props" :src="props.active ? 'static/nav/shoppingbag_icon_tab_sel.png' : 'static/nav/shoppingbag_icon_tab_def.png'"> 购物袋
          <badge class="shop-badge" :title="badgeBagNum"></badge>
        </van-tabbar-item>

        <van-tabbar-item @click="show(3)" info="" v-show="isShowShop()">
          <img slot="icon" slot-scope="props" :src="props.active ? 'static/nav/shop_icon_tab_sel.png' : 'static/nav/shop_icon_tab_def.png'"> 店铺
        </van-tabbar-item>

        <van-tabbar-item @click="show(4)" info="">
          <img slot="icon" slot-scope="props" :src="props.active ? 'static/nav/personal_icon_tab_sel.png' : 'static/nav/personal_icon_tab_def.png'"> 个人中心
        </van-tabbar-item>

      </van-tabbar>
    </transition>

    <share-panel ref="share"></share-panel>

    <guide></guide>

  </div>
</template>
<script src="./App.js">
</script>
<style lang="scss" scoped>
@import "App.scss";
</style>
