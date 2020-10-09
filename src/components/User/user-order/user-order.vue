<template>
  <div class="user-order">
    <div class="user-order-head" v-if="!hideHead" @click.stop="isLogin?show(0):$noLogin();">
      <div class="user-order-title">
        我的订单
      </div>
      <span class="float-right text-info tool">
        <span>所有订单</span>
        <i class="fa fa-angle-right"></i>
      </span>
    </div>
    <div class="order-nav-list">
      <div class="order-nav-list-item tp1" @click.stop="isLogin?show(1):$noLogin();">
        <div class="nav-list-icon">
          <i class="iconfont icon-yinhangqia-xianxing"></i>
        </div>
        <span class="nav-list-title">待付款</span>
        <badge class="order_badge" :title="badgeNum"></badge> 
      </div>
      <div class="order-nav-list-item tp2" @click.stop="isLogin?show(2):$noLogin();">
        <div class="nav-list-icon">
          <i class="iconfont icon-chaibaoguoqujian-xianxing"></i>
        </div>
        <span class="nav-list-title">待发货</span>
      </div>
      <div class="order-nav-list-item tp3" @click.stop="isLogin?show(3):$noLogin();">
        <div class="nav-list-icon">
          <i class="iconfont icon-yunshuzhongwuliu-xianxing"></i>
        </div>
        <span class="nav-list-title">待收货</span>
        <!-- <badge class="order_badge" :title="goodbadgeNum"></badge>  -->
      </div>
      <div class="order-nav-list-item tp5" @click.stop="isLogin?show(5):$noLogin();">
        <div class="nav-list-icon">
          <i class="iconfont icon-shouhou"></i>
        </div>
        <span class="nav-list-title">售后</span>
      </div>
    </div>

  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "user-order",
  props: {
    hideHead: {
      type: Boolean,
      default: false
    },
    headBorder: {
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      badgeNum:"",
    };
  },
  methods: {
    show(index) {
      let noncestr =
        Date.parse(new Date()) / 1000 + "" + parseInt(Math.random() * 100);

      this.$push({
        path: "/OriginOrderList",
        query: {
          active: index,
          noncestr: noncestr
        }
      });
    },
    update(){
      if(this.$userInfo.user_id != -1){

        this.badgeNum = 0;
        this.goodbadgeNum = 0;
        this.$get('OrderPlus/getUnpaidCount', {}, res => {
            this.badgeNum = res.total;
        })
      }
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.update()
    this.$nextTick(() => {});
  },
  // 激活调用
  activated() {
    this.update()
    // $("html").css("font-size", "62.5%");
    // $(window).resize(function() {
    //   $("html").css("font-size", "62.5%");
    // });
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
//设置html 的px
</script>

<style lang="scss" scoped>
@import "user-order.scss";
</style>

