<template>
  <div id="OrderAdd">
    <van-nav-bar title="提交订单" :loading="loading" left-arrow @click-left="$back()" fixed></van-nav-bar>

    <!-- <van-notice-bar text="随享季售后只在App内进行，请不要点击陌生连接或向任何人透露银行卡、验证码信息，谨防诈骗！" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" /> -->

    <van-notice-bar :text="noticeMsg" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />

    <select-address v-model="chosenContactId" :list.sync="addressList" ref="address" @on-select="onSelect"></select-address>

    <pay-code ref="pay-code"></pay-code>

    <!-- 优惠券单元格 -->

    <!-- 商品面板 -->
    <order-card v-for="(item,i) in orders" :first-price="item.first_price" :order="item" :address="currentContact" :key="item.order_id">

      <template slot="head">订单{{i+1}}</template>

      <template slot="goodsList">
        <order-card-goods v-for="(item,j) in item.goodsList" :snapshot-id="item.snapshot_id" :key="j" :img="item.img" :title="item.title" :info="item.info" :num.sync="item.num">
          <template slot="price">
            <span>￥ {{item.price | price | money}}</span>
          </template>
        </order-card-goods>
      </template>

      <template slot="cell">
      </template>

    </order-card>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <div class="select">
        <van-coupon-list :show-exchange-bar="false" :coupons="couponList" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onChange" />
      </div>
    </van-popup>

    <van-cell-group :border="false">
      <van-coupon-cell :coupons="couponList" :chosen-coupon="chosenCoupon" @click="showList = true" />
    </van-cell-group>

    <van-cell-group style="margin-top:8px">
      <van-field v-model="message" label="买家留言：" type="textarea" placeholder="选填.填写内容已和卖家协商确认" rows="3" autosize />
    </van-cell-group>

    <van-cell-group style="margin-top:8px">
    </van-cell-group>

    <van-panel style="margin:8px 0" :title="'余额抵扣'+`（￥${$userInfo.user_money}）`">
      <van-field v-model.number="balance.balance_value" label="抵扣金额" type="number" placeholder="请输入抵扣金额" />
      <van-field v-model="balance.balance_pwd" label="支付密码" type="password" placeholder="请输入支付密码" v-if="isSetUserPwd" />
      <van-cell title="暂未设置支付密码" @click="goSetPwd()" is-link value="去设置" v-if="!isSetUserPwd" />
    </van-panel>

    <div class="text-right" style="padding:0px 10px;color:#777" @click="goSetPwd()">
      <small>
        忘记密码？
      </small>
    </div>

    <van-submit-bar :price="totalPrice2" :button-text="`去支付`" :loading="loading" @submit="onSubmit">
      <span class="vip-price" v-if="$userInfo.user_vip_level<=0">
        会员价：{{vipPrice |price |money}}
      </span>
    </van-submit-bar>

    <van-popup v-if="$isWeb()" class="york-popup" v-model="popupShow" :close-on-click-overlay="false">
      <div class="popup-div">
        <div class="popup-img-box">
          <img class="popup-img" src="@/assets/popup/popup01.png" @click="toAppShop" alt="">
          <img class="popup-close" @click="popupShow=false" src="@/assets/popup/close.png" alt="">
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script src="./OrderAdd.js"></script>

<style lang="scss" scoped>
@import "OrderAdd.scss";
</style>