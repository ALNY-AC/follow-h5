<template>
  <div class="line-title">
    <div class="title">
      <slot></slot>
      <span class="right">
        <slot name="right"></slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "line-title",
  props: {},
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
@import "line-title.scss";
</style>