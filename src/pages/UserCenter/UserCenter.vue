<template>
  <div id="UserCenter">
    <van-nav-bar title="个人中心" fixed>
      <template slot="left">
        <van-icon name="pending-evaluate" @click="$push('/msgType')" />
      </template>
      <i class="fa fa-cog" slot="right" @click="$push('/userCenter/conf');"></i>
    </van-nav-bar>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
      <template slot="pulling">
        <div class="head">
          <o-pull-head>
            <span>释放刷新</span>
          </o-pull-head>
        </div>
      </template>
      <template slot="loosing">
        <div class="head">
          <o-pull-head>
            <span>释放刷新</span>
          </o-pull-head>
        </div>
      </template>
      <template slot="loading">
        <div class="head">
          <o-pull-head>
            <van-loading color="black" />
          </o-pull-head>
        </div>
      </template>

      <user-head-info :user-head="user_head" :user-name="user_name" @click.native="isLogin()?openCenter():$noLogin()"></user-head-info>

      <user-order :is-login="isLogin()"></user-order>

      <div class="dq-money" v-if="isLogin() && isVip">
        <div class="dq-money-head">
          <div class="title">当前余额(元)</div>
          <div class="money">{{$userInfo.user_money | money}}</div>
        </div>
        <div class="tool">
          <van-button size="small" @click="$push('/userCenter/money');">提现</van-button>
        </div>
      </div>

      <van-cell-group style="margin-bottom:8px;">

        <!-- <van-cell title="现金" @click="$push('/userCenter/money');" is-link/> -->
        <!-- <van-cell title="随享币" @click="isLogin()?$push('/userCenter/Coupon'):$noLogin()" is-link/> -->
        <van-cell @click="isLogin()?$push('/userCenter/Coupon'):$noLogin()" is-link>
          <template slot="title">
            <span class="van-cell-text">随享币</span>
            <van-tag type="danger">券</van-tag>
            <!-- <img src="@/assets/ShopInfo/111.jpg" alt=""> -->
          </template>
        </van-cell>
        <van-cell title="我的收藏" @click="isLogin()?$push('/collection/list'):$noLogin()" is-link/>
        <van-cell title="我的地址" @click="isLogin()?$push('/address/list'):$noLogin()" is-link/>

      </van-cell-group>

      <van-cell-group>

        <!-- <van-cell title="意见与反馈" is-link/> -->
        <van-cell title="帮助与客服" @click="$push('/helpType');" is-link/>
        <!-- <van-cell title="给我评分" is-link/> -->
        <van-cell title="关于我们" @click="$push('/about');" is-link/>
        <!-- <van-cell title="关于我们" @click="$showView('https://www.baidu.com/')" is-link/> -->
        <!-- <van-cell title="test" @click="test" is-link/> -->

      </van-cell-group>

      <!-- <van-button v-if="showDown" style="margin-top:8px" @click="download" size="large">下载App</van-button> -->
    </van-pull-refresh>

  </div>
</template>
<script>
export default {
  name: "UserCenter",
  props: {},
  data() {
    return {
      showDown: false,
      isLoading: false,
      user_head: "",
      user_name: ""
    };
  },
  methods: {
    test() {},
    download() {},
    openCenter() {
      this.$push("/userCenter/conf");
    },
    onRefresh() {
      this.$getUserInfo(res => {
        this.update();
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
    },
    isLogin() {
      return this.$userInfo.user_id >= 0;
    },
    isVip() {
      return this.isLogin() && this.$userInfo.user_vip_level > 0;
    },
    update() {
      this.$getUserInfo(res => {
        this.user_head = res.user_head;
        this.user_name = res.user_name;
      });
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.update();
  },
  created() {
    this.update();
  },
  // 激活调用
  activated() {
    this.update();
    if (this.$isPlus()) {
      // plus.navigator.setStatusBarBackground("#232321");
      // plus.navigator.setStatusBarStyle("light");
    }
  },
  updateed() {},
  deactivated() {
    this.update();
    if (this.$isPlus()) {
      // plus.navigator.setStatusBarBackground("#FFFFFF");
      // plus.navigator.setStatusBarStyle("dark");
    }
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "UserCenter.scss";
</style>