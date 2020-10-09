<template>
  <div class="order-list">
    <div class="order-list-body">
      <order-card v-for="(item,i) in list" :goods-list="item.goodsList" :order="item" :key="item.order_id" :index="i"></order-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "order-list",
  props: {
    list: {
      type: Array,
      default: []
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
@import "order-list.scss";
</style>