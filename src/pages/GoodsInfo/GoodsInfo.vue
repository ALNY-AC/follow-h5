<template>
  <div id="GoodsInfo" :style="[{'paddingTop':paddingTop}]">

    <van-nav-bar fixed left-arrow v-nav @click-left="$back()" :z-index="1024">
      <template slot="title">
        <span @click="showPanel('商品')" :class="{'text-info':isShowA}">
          <i class="fa fa-map-marker" v-if="!isShowA"></i>
          商品
        </span>
        <span @click="showPanel('素材')" v-if="isShowSc" :class="{'text-info':!isShowA}" style="margin-left:20px">
          <i class="fa fa-map-marker" v-if="isShowA"></i>
          动态
        </span>
      </template>
      <template slot="right" v-if="goods">
        <i @click="fnxiang" class="iconfont icon-fenxiang1"></i>
      </template>
    </van-nav-bar>

    <div :class="['loading-box',{'hide':!isLoading}]">
      <img src="@/assets/loading.gif" class="loading-img">
    </div>

    <template v-if="!isShowA">

      <swiper :options="swiperOption1" ref="swiper1" class="gallery-1" v-if="goods && goods.img_list && goods.img_list.length>0">
        <swiper-slide v-for="item in goods.img_list" :key="item.key">
          <div class="swipe-img" :style="[{'backgroundImage':`url(${$getUrl(item.src)})`}]"></div>
        </swiper-slide>
      </swiper>

      <div v-else class="swipe-test">
        <img src="@/assets/e1.png" alt="">
      </div>
      <div class="indicators-row">
        <div class="indicators">
          <template v-if="goods">{{swipeIndex}}/{{goods.img_list.length}}</template>
          <template v-else>0/0</template>
        </div>
      </div>

      <time-row :goods-id="goods.goods_id" v-if="goods" :not-time.sync="notTime"></time-row>
      <!-- <kill-time v-show="kill" :time="time" :type="type"  @on-end="update()" ></kill-time> -->

      <div class="goods-info-panel">

        <div class="goods-price-panel">
          <div class="goods-price">
            <span class="icon">￥</span>
            <span class="price">{{goodsPrice}}</span>
            <template v-if="userInfo && userInfo.user_vip_level>0">
              <span class="line"></span>
              <span class="maid-icon">赚</span>
              <span class="maid-price">{{maidGoodsPrice}}</span>
            </template>
          </div>
          <!--  -->

          <div class="original-price">
            <s>{{originalPrice}}</s>
          </div>
        </div>

        <div class="goods-info-panel-head">
          <div class="goods-title-box">
            <span class="goods-title">{{ goods?goods.goods_title:'--' }}</span>

            <span class="collection ok" v-if="goods && goods.is_collection">
              <!-- 已收藏 -->
              <van-icon @click="collection()" name="like" />
              <span class="collection-title">已收藏</span>
            </span>

            <span class="collection" v-if="goods && !goods.is_collection">
              <!-- 未收藏 -->
              <van-icon @click="collection()" name="like-o" />
              <span class="collection-title">收藏</span>
            </span>

          </div>
          <div class="sub-goods-title">
            <span>{{ goods?goods.sub_title:'--' }}</span>
          </div>
        </div>

        <div class="goods-info-label">
          <div class="label-item">
            <div class="label-icon"></div>
            <div class="label-title">
              {{goodsStock}}
            </div>
          </div>
          <div class="label-item">
            <div class="label-icon"></div>
            <div class="label-title">
              {{salesVolume}}
            </div>
          </div>
        </div>

      </div>

      <van-cell-group class="goods-cell-group">
        <van-cell title="选择规格" v-if="goods" is-link @click="showBase = true" />
        <van-cell title="联系客服" is-link @click="showHelp()" />
        <van-cell title="品牌承诺" is-link v-if="domain" @click="domain_show = true" />
      </van-cell-group>

      <van-sku v-if="goods" v-model="showBase" :sku="sku" :goods="goods" ref="sku" :custom-stepper-config="customStepperConfig" :goods-id="goods.goods_id" :quota-used="30" :close-on-click-overlay="true" :disable-stepper-input="false" @buy-clicked="onBuyClicked">
        <!-- 自定义 sku actions -->
        <template slot="sku-header">

          <!-- sku-header -->
        </template>

        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button bottom-action @click="addBag" v-if="!kill">加入购物车</van-button>
            <van-button bottom-action @click="purchase" type="primary" v-if="!notTime">立即购买</van-button>

            <van-button bottom-action type="primary" class="disabledbtn" v-if="notTime&&kill">活动尚未开始</van-button>
          </div>
        </template>
      </van-sku>

      <div class="goods-info">
        <div class="goods-info-body" v-if="goods" v-html="goods.goods_content"></div>
      </div>

      <!-- 会员 -->
      <van-goods-action class="goods-action" v-if="userInfo&&userInfo.user_vip_level!=0">

        <van-goods-action-mini-btn v-if="isShowHome" icon="shop" @click="$push('/HomePage')">
          更多特卖
        </van-goods-action-mini-btn>

        <van-goods-action-mini-btn icon="chat" @click="showHelp()">联系客服</van-goods-action-mini-btn>

        <van-goods-action-big-btn class="btn-bs" @click="showBase=true">
          买
        </van-goods-action-big-btn>
        <van-goods-action-big-btn class="btn-primary" primary @click="fnxiang">
          卖
        </van-goods-action-big-btn>
      </van-goods-action>

      <!-- 普通用户 -->
      <van-goods-action v-if="userInfo&&userInfo.user_vip_level=='0'">

        <van-goods-action-mini-btn v-if="isShowHome" icon="shop" @click="$push('/HomePage')">
          更多特卖
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="chat" @click="showHelp()">
          联系客服
        </van-goods-action-mini-btn>

        <!-- <van-goods-action-big-btn v-if="!kill" @click="addBag"> -->
        <van-goods-action-big-btn v-if="!kill" @click="showBase=true">
          加入购物袋
        </van-goods-action-big-btn>
        <!-- <van-goods-action-big-btn @click="purchase" primary v-if="!notTime"> -->
        <van-goods-action-big-btn @click="showBase=true" primary v-if="!notTime">
          立即购买
        </van-goods-action-big-btn>

        <van-goods-action-big-btn v-if="notTime&&kill" class="disabledbtn">
          活动尚未开始
        </van-goods-action-big-btn>
      </van-goods-action>

    </template>

    <template v-if="isShowA">
      <div class="text-center">{{info}}</div>
      <dynamic-list :list="dynamics"></dynamic-list>
    </template>

    <!-- 跨境文字说明 -->
    <template>
      <van-popup v-model="domain_show" class="domain-popup" position="bottom" :overlay="true">
        <div class="van-popup-header">
          <div class="text-center title">随享季品牌承诺</div>
          <van-icon class="van-popup-header-icon" name="close" @click="domain_show = false" />
        </div>
        <div class="van-popup-main">
          <div class="item">
            <div class="title">亲爱的顾客您好，随享季平台跨境商品发货温馨提示：</div>
            <div class="main">

              <div>
                1国内保税区发货：海关清关通常需要2-15个工作日（周末不清关），清关后发货，您一般将在3-5个工作日收到货品（偏远地区可能延长1-2天）
              </div>
              <div>
                2香港直邮/海外直邮：海关清关通常需要5-15个工作日（周末不清关），清关后发货，您一般将在5-10个工作日收到货品（偏远地区可能延长1-2天）
              </div>
            </div>
          </div>

          <div class="item">
            <div class="title">PS：</div>
            <div class="main">
              <div>
                1跨境商品，下单需要提供真实姓名和身份证信息，且此类商品不支持开具发票
              </div>
              <div>
                2跨境商品如无质量问题，发货后不予以无理由退换；如符合特殊原因退换条件，则需承担商品税费及来回邮费。
              </div>
              <div>3同时由于跨境商品所处的保税仓及海外各仓发货渠道不同，合并下单后多个包裹收货属于正常象！</div>
            </div>
          </div>
        </div>
      </van-popup>
    </template>

  </div>
</template>

<script src="./GoodsInfo.js"></script>
<style lang="scss" scoped>
@import "GoodsInfo.scss";
</style>
