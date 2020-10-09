<template>
  <div :class="['coupon-card',{'coupon-guoqi':coupon.state==0}]" v-if="coupon">
    <div class="coupon-card-body">

      <div class="info-box">
        <div>
          {{price}}{{type}}优惠券
        </div>

        <div class="info">
          {{info}}
        </div>
      </div>

      <div class="money-box">
        <div>
          <span class="money-icon">&yen;</span>
          <span class="money">{{price}}</span>
        </div>
      </div>

    </div>
    <div class="footer">
      <div class="footer-body">
        <div>{{coupon.name}}</div>

        <span v-if="coupon.state=='0'" class="float-right">已过期</span>

        <div class="time">有效期：{{coupon.start_at | time }}~{{coupon.end_at | time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
// 使用状态
// 0：已过期
// 1：未使用
// 2：已使用
// denominations: "1.50";
// edit_time: "2018-04-09 02:25:26";
// end_at: "2147483647";
// name: "超级优惠7";
// reason: null;
// start_at: "2147483647";
// state: "1";
// user_id: "13914896237";
// value: "1.50";
export default {
  name: "coupon-card",
  props: {
    coupon: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      price: "--",
      info: "",
      type: "",
      footerInfo: ""
    };
  },
  methods: {
    update() {
      //计算优惠券属性
      if (this.coupon.denominations > 0) {
        // 面值，这里是满减
        this.price = this.coupon.denominations;
        this.type = "元";
        // 判断门槛
        if (this.coupon.origin_condition > 0) {
          // 有门槛
          this.info = `满${this.coupon.origin_condition}元使用`;
          this.footerInfo = `满${this.coupon.origin_condition}元使用`;
        }
      } else {
        // 折扣券
        this.price = this.coupon.discount;
        this.type = "折";
        this.info = `折扣券`;
        this.footerInfo = `折扣券`;
      }
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
  components: {}
};
</script>
<style lang="scss" scoped>
@import "coupon-card.scss";
</style>