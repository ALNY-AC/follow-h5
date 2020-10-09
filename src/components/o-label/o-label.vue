<template>
  <div :class="['o-label',`o-label-${type}`,{'o-label-outlined':outlined}]" :style="{  borderRadius: radius}">
    <slot>
      {{title}}
    </slot>
  </div>
</template>
<script>
export default {
  name: "o-label",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "danger"
    },
    outlined: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: "0"
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
@import "o-label.scss";
</style>