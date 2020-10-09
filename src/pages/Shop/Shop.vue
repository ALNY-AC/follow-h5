<template>
  <div id="Shop">

    <van-nav-bar title="店铺" fixed></van-nav-bar>
    <user-head-info :user-head="userInfo.user_head" :user-name="userInfo.user_name" :bc="false"></user-head-info>

    <div class="shop-hader">

      <div class="user-header">
        <!-- <img :src="$()" alt=""> -->
      </div>

    </div>

    <shop-card></shop-card>

    <!-- <show-order hide-head></show-order> -->


    <van-row class="tab-nav">
      <van-col span="6" @click.native="$push('/Invite')">
        <div>
          <img class="shop_icon" src="@/assets/shop/shop_icon_register.svg" alt="">
        </div>
        <div>邀请注册</div>
      </van-col>

      <van-col span="6" @click.native="$push('/BecomeVip')">
        <div>
          <img class="shop_icon" src="@/assets/shop/shop_icon_gift.svg" alt="">
        </div>
        <div>分享大礼包</div>
      </van-col>

      <van-col span="6" @click.native="$push('/vip/sub');">
        <div>
          <img class="shop_icon" src="@/assets/shop/shop_icon_vip.svg" alt="">
        </div>
        <div>VIP管理</div>
      </van-col>

      <van-col span="6" @click.native="$push('/ShopData');">
        <div>
          <img class="shop_icon" src="@/assets/shop/shop_icon_achievement.svg" alt="">
        </div>
        <div>业绩管理</div>
      </van-col>
    </van-row>


    <shop-paper-list></shop-paper-list>
    

  </div>
</template>
<script>
export default {
  name: "Shop",
  props: {},
  data() {
    return {
      userInfo: {
        user_head: "",
        user_name: ""
      }
    };
  },
  methods: {
    share() {
      // BecomeVip
      // }
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.userInfo = this.$getUserInfo();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  // 激活调用
  activated() {},
  // 创建完调用
  created() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "Shop.scss";
</style>