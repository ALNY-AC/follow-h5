<template>
  <div id="Login">
    <div class="back-btn" @click="$back()">
      <van-icon name="arrow-left" />
    </div>

    <div class="bg-img">
      <img class="bg-img" src="@/assets/login/login.png" alt="">
    </div>

    <div class="login-logo">
      <img src="@/assets/login/login_logo.png" alt="">
    </div>

    <div class="login-panel">

      <div class="login-btn-panel">

        <div class="login-btn" @click="goLogin()">
          <i class="fa fa-mobile-phone"></i>
          <span class="login-btn-title">手机登录</span>
        </div>

        <div class="login-btn" @click="weixin()">
          <i class="fa fa-weixin"></i>
          <span class="login-btn-title">微信登录</span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      addName: "Follow Enjoy",
      test: "",
      goIndex: "",
      isShowWeiXin: true,
      isWeiXin: false
    };
  },
  methods: {
    goLogin() {
      this.$push({
        path: "/phoneLogin",
        query: {
          goIndex: -2
        }
      });
    },
    weixin() {
      if (!this.$isPlus()) {
        this.webWeixin();
        return;
      }
      this.$loading(0, "正在登录...");
      if (this.$isPlus()) {
        wxsdk.login(
          () => {
            wxsdk.getUserInfo(e => {
              // this.test = e;
              // 换取token
              let userInfo = e.target.userInfo;
              let unionid = userInfo.unionid;
              let nickname = userInfo.nickname;
              let headimgurl = userInfo.headimgurl;

              this.$post(
                "WeiXinLogin/setUserInfo",
                {
                  unionid: unionid,
                  userInfo: {
                    unionid: unionid,
                    nickname: nickname,
                    headimgurl: headimgurl
                  }
                },
                res => {
                  this.$clearLoading();
                  this.$push({
                    path: "/WeiXinLogin",
                    query: {
                      unionid: unionid,
                      goIndex: -2
                    }
                  });
                },
                error => {
                  this.$clearLoading();
                  setTimeout(() => {
                    this.$toast("微信登录失败~");
                  }, 300);
                }
              );
            });
          },
          error => {
            this.$clearLoading();
            setTimeout(() => {
              this.$toast("微信登录失败~");
            }, 300);
          }
        );
      }
    },
    webWeixin() {
      let url = "";
      if (this.$route.query["shop_id"]) {
        url =
          this.$serverDefault +
          "WeiXinLogin/login?shop_id=" +
          this.$route.query["shop_id"] +
          "&goIndex=-4";
      } else {
        url = this.$serverDefault + "index/login?" + "goIndex=-4";
      }

      window.location.href = url;
      // window.open(url);
    }
  },
  mounted() {
    if (this.$isLogin()) {
      this.$replace("/HomePage");
      return;
    }
    // unionid
    // token
    upSize();

    if (this.$isPlus()) {
      wxsdk.loginInit(() => {
        this.isWeiXin = wxsdk.isWeiXin;
      });
    }

    this.goIndex = this.$route.query.goIndex;

    this.$clearLoading();
    this.$nextTick(() => {});
  },
  activated() {
    if (this.$isPlus()) {
      wxsdk.loginInit(() => {
        this.isWeiXin = wxsdk.isWeiXin;
      });
    }
    upSize();
  }
};

function upSize() {
  function up() {
    document.getElementsByTagName("html")[0].style.fontSize =
      window.innerWidth / 7.5 + "px";
  }
  up();
  window.addEventListener("resize", () => {
    up();
  });
}
</script>
<style lang="scss" scoped>
@import "Login.scss";
</style>


