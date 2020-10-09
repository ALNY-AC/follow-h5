<template>
  <div class="goods-group">

    <div class="banner" :style="{backgroundImage:`url(${$getUrl(banner)})`}"></div>
    <div class="info-box clearfix">
      <div class="icon">
        <img src="@/assets/logo.png">
      </div>
      <div class="info">
        {{info}}
      </div>
    </div>
    <template v-for="item in list">
      <goods-card :card="card" :goods="item" :key="item.goods_id"></goods-card>
    </template>

  </div>
</template>
<script>
export default {
  name: "goods-group",
  props: {
    banner: {
      type: String,
      default: ""
    },
    info: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: null
    },
    card: {
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
@import "goods-group.scss";
</style>