<template>
  <div id="PaperInfo">

    <van-nav-bar title="随享季" fixed left-arrow @click-left="$back()">
      <template slot="right">
        <i @click="share" class="iconfont icon-fenxiang1"></i>
      </template>
    </van-nav-bar>

    <template v-if="paper">
      <div class="paper-body">
        <div class="paper-title">
          {{paper.paper_title}}
        </div>

        <div class="paper-time">
          {{paper.add_time}}
        </div>
        <div class="paper-content" v-html="paper.paper_content"></div>
      </div>
    </template>

  </div>
</template>
<script>
export default {
  name: "PaperInfo",
  props: {},
  data() {
    return {
      paper: null,
      paper_id: ""
    };
  },
  methods: {
    share() {
      let url = `paperInfo?paper_id=${this.paper_id}`;

      this.$store.state.showShare(
        {
          title: this.paper.paper_title,
          href: url,
          content: "",
          // 下面是对应各个平台的扩展参数。
          weixin: {
            extra: { scene: "WXSceneSession" }
          },
          // 下面是组件特有的参数
          comp: {
            title: "分享",
            subClick: () => {},
            btn: {
              qrcode: false
            }
          }
        },
        res => {}
      );
    },
    update() {
      this.$loading(0, "加载中~");

      this.$get(
        "paper/get",
        {
          paper_id: this.paper_id
        },
        res => {
          console.log(res);
          setTimeout(() => {
            this.$clearLoading();
            if (res.res >= 1) {
              this.paper = res.msg;
              return;
            }
            if (res.res < 0) {
              this.$toast("文章获取失败！请重试~");
              return;
            }
          }, 200);
        },
        error => {
          this.$toast("文章获取失败！请重试~");
          this.$clearLoading();
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.paper_id = this.$route.query.paper_id;
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
@import "PaperInfo.scss";
</style>