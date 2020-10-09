<template>
  <div class="o-pull-head">

    <div class="o-pull-body">

      <div class="left-box">
        <span class="title">
          正品保证
          <i class="icon iconfont icon-huizhanghuiyuan"></i>
        </span>
      </div>
      <div class="right-box">
        <span class="title">
          <i class="icon iconfont icon-72"></i>
          7天放心退
        </span>
      </div>
      <div class="left-box">
        <span class="title">
          一贵就赔
          <i class="icon iconfont icon-servicejiayipeisan"></i>
        </span>
      </div>

    </div>
    <div class="o-pull-footer">
      <span class="title">
        <slot>{{title}}</slot>
      </span>
    </div>
    <div class="line"></div>

  </div>
</template>
<script>
export default {
  name: "o-pull-head",
  props: {
    title: {
      type: String,
      default: ""
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
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "o-pull-head.scss";
</style>