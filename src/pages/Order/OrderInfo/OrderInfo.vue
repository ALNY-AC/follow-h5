<template>
  <div id="OrderInfo">
    <van-nav-bar title="订单详情" fixed left-arrow @click-left="$back()"></van-nav-bar>
    <template v-if="data">

      <div class="head-box">

        <div class="info-box">
          <span class="title" v-if="state=='1'">
            <div class="info-logo">
              <van-icon name="gold-coin" />
            </div>
            <span class="info-text">
              待付款
            </span>
          </span>
          <span class="title" v-if="state=='2'">
            <div class="info-logo">
              <van-icon name="pending-deliver" />
            </div>
            <span class="info-text">
              待发货
            </span>
          </span>
          <span class="title" v-if="state=='3'">
            <div class="info-logo">
              <van-icon name="logistics" />
              <!--  -->
            </div>
            <span class="info-text">
              待收货
            </span>
          </span>
          <span class="title" v-if="state=='4'">
            <div class="info-logo">
              <van-icon name="completed" />
            </div>
            <span class="info-text">
              已完成
            </span>
          </span>
          <span class="title" v-if="state=='5'">
            <div class="info-logo">
              <van-icon name="after-sale" />

            </div>
            <span class="info-text">
              售后
            </span>
          </span>
          <span class="title" v-if="state=='6'">
            <div class="info-logo">
              <van-icon name="close" />
            </div>
            <span class="info-text">
              交易关闭
            </span>
          </span>
          <span class="title" v-if="state=='7'">
            <div class="info-logo">
              <van-icon name="after-sale" />
            </div>
            <span class="info-text">
              已退款
            </span>
          </span>
          <span class="title" v-if="state=='8'">
            <div class="info-logo">
              <van-icon name="after-sale" />
            </div>
            <span class="info-text">
              退款失败
            </span>
          </span>
          <div class="order-id">
            <small>订单号：{{order_id}}</small>
          </div>
        </div>

        <div class="img-box">

        </div>

      </div>
      <div class="address-info">
        <div class="icon">
          <van-icon name="location" />
        </div>
        <div class="info-box">
          <div class="info-row">
            <span>
              {{data.address.name}}
            </span>
            <span>
              {{data.address.tel}}
            </span>
          </div>
          <div class="info-row text-info address">
            {{data.address.province}}{{data.address.city}}{{data.address.county}}{{data.address.address_detail}}
          </div>
        </div>
      </div>

      <div class="goods-list">
        <div class="goods-box" v-for="(item,i) in data.snapshot" :key="i">
          <div class="goods-head">
            <img :src="$getUrl(item.img)" alt="">
          </div>
          <div class="goods-info">
            <div class="goods-title">
              {{item.goods_title}}
            </div>
          </div>
          <div class="footer">
            <div class="price">￥{{item.price}}
              <span class="count">x{{item.count}}</span>
            </div>
          </div>
        </div>

      </div>

      <van-cell-group style="margin:8px 0">
        <van-cell title="运费" :value="'￥'+logisticsPrice" />
        <!-- icon="balance-pay" -->
        <van-cell class="coupon" :value="'-￥'+data.coupon.price" v-if="data.coupon">
          <template slot="title">
            <span class="van-cell-text">随享币</span>
          </template>
        </van-cell>
        <van-cell title="订单总额" :value="'￥'+total" />
      </van-cell-group>

      <van-cell-group>
        <van-cell title="付款类型" :value="payType" />
      </van-cell-group>

      <div class="error-panel" v-if="data['afterSale']">
        <div class="error-panel-title">失败原因</div>
        <div class="error-panel-body">
          {{data.afterSale.error_reason}}
        </div>
      </div>

    </template>

  </div>
</template>

<script src="./OrderInfo.js"></script>
<style lang="scss" scoped>
@import "OrderInfo.scss";
</style>