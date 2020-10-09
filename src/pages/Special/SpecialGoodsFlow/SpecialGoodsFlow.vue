<template>
  <div id="SpecialGoodsFlow">
    <van-nav-bar class="bar" fixed :title="$route.query.title" left-arrow @click-left="$back()">
      <template slot="right">
        <i @click="share" class="iconfont icon-fenxiang1"></i>
      </template>
    </van-nav-bar>
    <booth-group v-if="isShowBooth" :booth-group-id="booth_group_id"></booth-group>
    <van-list v-model="loading" :finished="finished" @load="update" :offset="300">
      <div class="masonry">
        <van-row>
          <van-col span="12" v-for="(item,i) in list" :key="i">
            <div class="item" @click="goInfo(item)">
              <div class="item-content">
                <div class="goods-head">
                  <img :src="$getUrl(item.goods_head)">
                </div>
                <div class="goods-info-box">
                  <div class="goods-title">
                    <div class="title">
                      {{item.goods_title}}
                    </div>
                  </div>
                  <div class="goods-sub-title">
                    <div class="title">{{item.sub_title}}</div>
                  </div>
                  <div class="goods-price">
                                        <span class="price">
                                            ￥{{item.sku[0].price}}
                                        </span>
                  </div>
                  <div class="goods-label" v-for="(label,i) in item.goodsLabel" :key="i">
                    {{label.label}}
                  </div>
                </div>
              </div>
            </div>
          </van-col>

        </van-row>

      </div>
      <div class="empty" v-if="finished">
        没有更多了~
      </div>
    </van-list>
  </div>
</template>
<script src="./SpecialGoodsFlow.js"></script>
<style lang="scss" scoped>
  @import "SpecialGoodsFlow.scss";
</style>
