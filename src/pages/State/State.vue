<template>
  <div id="State">
    <van-nav-bar fixed left-arrow @click-left="$back()" :title="title"></van-nav-bar>

    <div :class="['icon-box','text-'+state]">
      <div class="icon">
        <img v-if="state=='success'" src="@/assets/state/pay_icon_success.svg">
        <img v-if="state=='error'" src="@/assets/state/pay_icon_fail.svg">
      </div>
      <div class="title">
        {{title}}
      </div>
      <div class="tool">
        <van-button type="default" size="small" @click="goOrder()">查看订单 </van-button>
        <van-button type="default" size="small" @click="goHome()">返回首页</van-button>
      </div>
    </div>
    <!-- :get-container="getContainer" -->
    <van-popup v-model="isShowRed">
      <div class="image-panel">
        <img src="@/assets/state/newhb.png" alt="" @click="imgClick">
      </div>
    </van-popup>
    
    <recommend scene="State"></recommend>
  </div>
</template>
<script>
export default {
  name: "State",
  data() {
    return {
      state: "",
      title: "",
      model: "",
      isShowRed: false,
      icons: {
        success: "passed",
        error: "close",
        warning: "info-o"
      }
    };
  },
  methods: {
    goHome() {
      this.$replace("/HomePage")
    },
    goOrder(){
      //进入我的订单页

      this.$replace("/OriginOrderList");
      
    },
    imgClick() {
      // this.$loading(0, "请稍后");

      this.$get("ShareRed/create", {}, res => {
        // this.$clearLoading();
        this.$store.state.showShare(
          {
            title: "【随享季】第7个领取的人红包最大！",
            content: "10元大包等你来撩，手快有，手慢无~",
            href: res.url,
            image:
              "https://mmbiz.qlogo.cn/mmbiz_png/EISicquI57gst6WUxm3ksJgTtNBSyzL1ja1UHDQNDVcTySfib4BfYRnbFXnE3Bpx1wKJ08QjnAR6scaNoicBJn5uw/0?wx_fmt=png",
            // 下面是对应各个平台的扩展参数。
            weixin: {
              extra: { scene: "WXSceneSession" }
            },
            // 下面是组件特有的参数
            comp: {
              title: "分享红包",
              btn: {
                qrcode: false
              },
              isParam: false
            }
          },
          res => {}
        );
        this.isShowRed = false;
      });
    },
    init() {
      if (this.model == "order") {
        // 订单模式
        if (this.state == "success") {
          // 下单成功，
          // 提示没有店铺号，是否生成
          this.isShowRed = true;
          // if (confirm("下单成功！是否去分享10元大红包？")) {
          // }
        }
      }
    },
    getContainer() {
      return document.getElementsByTagName("body")[0];
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.state = this.$route.query.state;
    this.title = this.$route.query.title;
    this.model = this.$route.query.model;
    this.init();
    this.$nextTick(() => {});
    console.log(this.state)
    console.log(this.title)
    console.log(this.model)
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "State.scss";
</style>