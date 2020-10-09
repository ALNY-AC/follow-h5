<template>
  <div class="shop-card-list">
    <shop-card></shop-card>
  </div>
</template>
<script>
export default {
  name: "shop-card-list",
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
@import "shop-card-list.scss";
</style>