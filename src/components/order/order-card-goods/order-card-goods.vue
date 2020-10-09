<template>
  <div class="order-card-goods">
    <div class="order-card-goods clearfix">
      <div class="goods-head">
        <slot name="img"><img :src="$getUrl(img)"></slot>
      </div>
      <div class="goods-title">
        <slot name="title">{{title}}</slot>
      </div>
      <div class="goods-info">
        <slot name="info">{{info}}</slot>
      </div>
      <div class="goods-money">
        <slot name="price">￥{{price}}</slot>
      </div>
      <div class="goods-num">
        <slot name="num">
          x{{num}}
          <!-- <van-stepper v-model="count" /> -->
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "order-card-goods",
  props: {
    img: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    info: {
      type: String,
      default: ""
    },
    price: {
      type: [Number, String],
      default: ""
    },
    num: {
      type: Number,
      default: ""
    },
    snapshotId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {},
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.count = this.num;
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
    num() {
      this.count = this.num;
    },
    count() {
      this.$emit("update:num", this.count);
      this.$emit("on-update", this.count);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "order-card-goods.scss";
</style>