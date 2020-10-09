<template>
  <div class="o-toast-btn">
    <span class="o-toast-btn-title">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: "o-toast-btn",
  props: {
    title: {
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
  components: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "o-toast-btn.scss";
</style>