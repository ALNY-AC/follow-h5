<template>
  <div class="coupon-list">


    <div class="coupon-body">
        <coupon-card v-for="item in list" :key="item.coupon_id" :coupon="item"></coupon-card>
    </div>



  </div>
</template>
<script>
export default {
  name: "coupon-list",
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
@import "coupon-list.scss";
</style>
