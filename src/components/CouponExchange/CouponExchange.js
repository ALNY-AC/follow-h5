export default {
  name: 'CouponExchange',
  props: [],
  data() {
    return {
      coupon_code: ""
    }
  },
  methods: {
    exchange() {
      this.$get("CouponGroup/coinCertificate", { coupon_group_key: this.coupon_code }, res => {
        console.log(res)
        if (res.res == 1) {
          this.$toast("兑换成功")
          this.$emit('on-success');
        }
        if (res.res == -2) {
          this.$toast("您已经兑换过了，快去使用吧...")
        }
        if (res.res == -3) {
          this.$toast("库存已被抢光")
        }
        if (res.res == -4) {
          this.$toast("兑换码错误")
        }
        if (res.res == -1) {
          this.$toast("兑换失败")
        }
      })
    }
  },
  computed: {
    isInsert() {
      if (this.coupon_code.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
