<template>
  <transition name="o-fixed-btn">
    <div class="o-fixed-btn clearfix" v-show="show">
      <div class="o-fixed-btn-body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "o-fixed-btn",
  props: {
    show: {
      type: Boolean,
      default: true
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
@import "o-fixed-btn.scss";
</style>