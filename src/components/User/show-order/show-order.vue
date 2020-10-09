<template>
  <div class="show-order">
    <div class="show-order-head" v-if="!hideHead">
      <div class="show-order-title">
        我的订单
      </div>
      <span class="float-right text-info tool">
        <span>所有订单</span>
        <i class="fa fa-angle-right"></i>
      </span>
    </div>
    <div class="order-nav-list">
      <div class="order-nav-list-item tp1" @click="$push('/address/list');">
        <div class="nav-list-icon ">
          <van-icon name="location" />
        </div>
        <span class="nav-list-title">地址管理</span>
      </div>
      <div class="order-nav-list-item tp2" @click="$push('/vip');">
        <div class="nav-list-icon ">
          <van-icon name="contact" />
        </div>
        <span class="nav-list-title">VIP管理</span>
      </div>
      <div class="order-nav-list-item tp3" @click="$push('/ShopData');">
        <div class="nav-list-icon ">
          <van-icon name="records" />
        </div>
        <span class="nav-list-title">业绩管理</span>
      </div>
      <div class="order-nav-list-item tp4" @click="$push('/helpType');">
        <div class="nav-list-icon ">
          <van-icon name="chat" />
        </div>
        <span class="nav-list-title">联系客服</span>
      </div>
    </div>

  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "show-order",
  props: {
    hideHead: {
      type: Boolean,
      default: false
    },
    headBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  // 激活调用
  activated() {
    $("html").css("font-size", "62.5%");
    $(window).resize(function() {
      $("html").css("font-size", "62.5%");
    });
  },
  // 创建完调用
  created() {},
  watch: {},
  components: {}
};
//设置html 的px
</script>

<style lang="scss" scoped>
@import "show-order.scss";
</style>

