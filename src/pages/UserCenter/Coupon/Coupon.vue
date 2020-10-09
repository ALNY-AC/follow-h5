<template>
  <div id="Coupon">
    <van-nav-bar title="我的随享币" left-arrow @click-left="$back()"></van-nav-bar>
    <van-tabs sticky>
      <van-tab :title="`未使用(${coupons.length})`">

        <coupon-exchange @on-success="update()"></coupon-exchange>
        <div v-if="empty" class="text-center text-info">
          <div class="blank" v-if="empty">
            <img class="blank_img" src="@/assets/blank/coupon_msg.svg" alt="">
            <div>
              <span class="blank_title">您还没有随想币</span>
            </div>
          </div>
        </div>
        <coupon-list :list="coupons" v-if="!empty"></coupon-list>
      </van-tab>

      <van-tab :title="`已过期(${couponsNo.length})`">
        <div v-if="empty" class="text-center text-info">
          暂无相关优惠券~
        </div>
        <coupon-list :list="couponsNo" v-if="!empty"></coupon-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import CouponExchange from "../../../components/CouponExchange/CouponExchange";
export default {
  name: "Coupon",
  props: {},
  data() {
    return {
      coupons: [],
      couponsNo: [],
      empty: false
    };
  },
  methods: {
    update() {
      this.coupons = [];
      this.couponsNo = [];
      this.$loading(300, "加载中");
      this.$get(
        "coupon/getList",
        {},
        res => {
          this.$clearLoading();
          if (res.res >= 1) {
            this.bulider(res.msg);
            this.empty = false;
            return;
          }
          if (res.res == 0) {
            this.empty = true;
            return;
          }
          if (res.res < 0) {
            this.$toast("加载失败!请重试~");
            this.empty = true;
            return;
          }
        },
        error => {
          this.$toast("加载失败!请重试~");
          this.$clearLoading();
        }
      );
    },
    bulider(list) {
      this.coupons = list.filter(item => item.state != 0);
      this.couponsNo = list.filter(item => item.state == 0);
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.update();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: { CouponExchange }
};
</script>
<style lang="scss" scoped>
@import "Coupon.scss";
</style>
