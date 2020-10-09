<template>
  <div class="dynamic-goods">
    <div class="goods-head">
      <img :src="$getUrl(goodsHead)">
    </div>
    <div class="goods-title">
      <span>{{goodsTitle}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "dynamic-goods",
  props: {
    goodsTitle: {
      type: String,
      default: ""
    },
    goodsHead: {
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
@import "dynamic-goods.scss";
</style>