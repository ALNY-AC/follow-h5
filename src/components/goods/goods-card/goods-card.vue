<template>
  <div class="goods-card" :style="{padding:card?'15px 10px':'0'}" v-if="goods" @click.stop="showInfo()">
    <!-- 列表模式 -->

    <div class="goods-card-model" v-if="card">

      <div class="goods-card-body">

        <van-row>
          <van-col span="24">
            <div class="goods-head" @click.stop="showInfo()">
              <!--  -->
              <div class="mask"></div>
              <img @click.stop v-lazy="$getUrl(goods.goods_banner)">
            </div>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="24">
            <div class="goods-title">{{goods.goods_title}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <div class="goods-info">
              <div style="font-size:12px">{{goods.sub_title}}</div>
            </div>
          </van-col>
        </van-row>

        <van-row class="goods-label">
          <van-col span="12" class="text-left">
            <span v-for="item in goods.goodsLabel" :key="item.label" :class="['label',labels[item.type-1]]">{{item.label}}</span>
          </van-col>
          <van-col span="12" class="text-right">
            <div style="font-size:12px;color:#bbb">
              <span>库存</span>
              <span v-if="goods && goods.sku && goods.sku.length>0">{{goods.sku[0].stock_num}}</span>
              <span v-else>--</span>
            </div>
          </van-col>
        </van-row>

        <van-row class="goods-footer">
          <van-col span="22" class="text-left">
            <div class="goods-money-box" v-if="userInfo">

              <!-- // 销售价  -->
              <span class="goods-money">
                <span v-if="goods && goods.sku && goods.sku.length>0">￥{{goods.sku[0].price | price | money}}</span>
                <span v-else>--</span>
              </span>

              <span class="line" v-if="userInfo.user_vip_level>0"></span>

              <span class="vip-money-box" v-if="userInfo.user_vip_level>0">

                <span class="vip-money-title">赚</span>
                <span class="vip-money">
                  <template v-if="goods && goods.sku && goods.sku.length>0">
                    {{goods.sku[0].earn_price |price | money}}
                  </template>
                  <template v-else>
                    --
                  </template>
                </span>

              </span>

            </div>

          </van-col>

          <van-col span="2" class="text-right">
            <div class="tool">
              <div class="tool-item" @click.stop="share">
                <i class="iconfont icon-fenxiang1"></i>
              </div>
            </div>
          </van-col>

        </van-row>

      </div>
    </div>
    <div class="goods-list-model" v-if="!card">
      <!-- <div class="goods-head" :style="{backgroundImage:`url(${$getUrl(goods.goods_head)})`}"></div> -->
      <div class="goods-head" v-lazy:background-image="$getUrl(goods.goods_head)" />

      <div class="goosd-info-box">
        <div class="goods-title">{{goods.goods_title}}</div>
        <div class="goods-info">{{goods.sub_title}}</div>
        <div class="goods-label">
          <span v-for="item in goods.goodsLabel" :key="item.label" :class="['label',labels[item.type-1]]">{{item.label}}</span>
        </div>
        <div class="goods-money-box" v-if="userInfo">

          <!-- // 销售价  -->
          <span class="goods-money">
            <span v-if="goods && goods.sku && goods.sku.length>0">￥{{goods.sku[0].price | price | money}}</span>
            <span v-else>--</span>
          </span>

          <span class="line" v-if="userInfo.user_vip_level>0"></span>

          <span class="vip-money-box" v-if="userInfo.user_vip_level>0">

            <span class="vip-money-title">赚</span>
            <span class="vip-money">
              <template v-if="goods && goods.sku && goods.sku.length>0">
                {{goods.sku[0].earn_price | price | money}}
              </template>
              <template v-else>
                --
              </template>
            </span>

          </span>

        </div>
        <div class="goods-footer">
          <div class="goods-stock">
            <span>库存</span>
            <span v-if="goods && goods.sku && goods.sku.length>0">{{goods.sku[0].stock_num}}</span>
          </div>
          <div class="goods-card-tool">
            <div class="goods-card-tool-item" @click.stop="share">
              <i class="iconfont icon-fenxiang1"></i>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script src="./goods-card.js"></script>

<style lang="scss" scoped>
@import "goods-card.scss";
</style>

