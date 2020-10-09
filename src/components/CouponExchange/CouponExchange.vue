<template>
  <div id="CouponExchange">
    <input type="text" placeholder="请输入兑换码" v-model="coupon_code">
    <button :class="{ 'exchange-btn': true, 'active': isInsert}" @click="exchange">兑换</button>
  </div>
</template>

<script src="./CouponExchange.js"></script>
<style lang="scss" scoped>
@import "./CouponExchange.scss";
</style>
