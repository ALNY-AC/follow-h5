<template>
  <div :class="['o-button',type?'o-btn-'+type:type,{'o-btn-bg':bg},size?'o-btn-'+size:'']" :style="{borderRadius:radius}">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>{{title}}</slot>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  name: "o-button",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    radius: {
      type: String,
      default: "0px"
    },
    type: {
      type: String,
      default: ""
    },
    bg: {
      type: Boolean,
      default: false
    },
    size: {
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
@import "o-button.scss";
</style>