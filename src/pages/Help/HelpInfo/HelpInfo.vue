<template>
  <div id="HelpInfo">
    <van-nav-bar title="详情" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <template v-if="help">
      <div class="help-body">
        <div class="help-title">
          {{help.help_title}}
        </div>
        <div class="help-time">
          {{help.add_time}}
        </div>
        <div class="help-content" v-html="help.help_content"></div>
      </div>
    </template>

  </div>
</template>
<script>
export default {
  name: "HelpInfo",
  props: {},
  data() {
    return {
      help_id: "",
      help: null
    };
  },
  methods: {
    update() {
      this.$loading(0, "加载中~");
      this.$get(
        "help/get",
        {
          where: {
            help_id: this.help_id
          }
        },
        res => {
          console.log(res);
          setTimeout(() => {
            this.$clearLoading();
            if (res.res >= 1) {
              this.help = res.msg;
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
    this.help_id = this.$route.query.help_id;
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
@import "HelpInfo.scss";
</style>