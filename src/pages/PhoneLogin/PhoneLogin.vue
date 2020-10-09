<template>
  <div id="PhoneLogin">
    <!--顶部导航栏开始-->
    <!-- <van-nav-bar title="登录随享季" fixed left-arrow @click-left="$back()"></van-nav-bar> -->

    <get-code @on-success="success" title="登录随享季" @back="$router.go(-1)" message="请输入手机号以继续" input-info="请输入手机号"></get-code>
    <!-- showAgreement -->

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      shop_id: "",
      goIndex: ""
    };
  },
  mounted() {
    this.shop_id = this.$route.query.shop_id;
    this.goIndex = this.$route.query.goIndex;
  },
  watch: {},
  methods: {
    //获取验证码
    success(phone, secret) {
      this.getToken(phone, secret);
    },
    getToken(phone, secret) {
      // 通过 secret 取得登录信息
      this.$loading(0, "正在拉取信息");
      this.$get(
        "login/token",
        {
          user_id: phone,
          secret: secret,
          shop_id: this.shop_id
        },
        res => {
          if (res.res >= 1) {
            // token 获取成功
            localStorage.user_id = res.user_id;
            localStorage.token = res.token;
            this.getUserInfo();
          }
          if (res.res < 0) {
            this.$toast("secret不正确");
          }
        }
      );
    },
    getUserInfo() {
      this.$getUserInfo(res => {
        //   如果原链接是loginu或者用户中心，就不跳
        //   检查是否是某些页面
        if (parseInt(this.goIndex) < 0) {
          // return_url
          this.$router.go(parseInt(this.goIndex + ""));
        } else {
          this.$replace("/HomePage");
        }
      });
    }
  },
  computed: {},
  filters: {}
};
</script>
<style lang="scss" scoped>
@import "PhoneLogin.scss";
</style>