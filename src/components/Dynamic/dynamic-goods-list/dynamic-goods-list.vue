<template>
  <div class="dynamic-goods-list">
    <div class="dynamic-goods-list-body">
      <slot>
        <template v-for="item in list">
          <dynamic-goods :key="item.goods_id" :goods="item"></dynamic-goods>
        </template>
      </slot>
    </div>

  </div>
</template>
<script>
export default {
  name: "dynamic-goods-list",
  props: {
    list: {
      tyle: Array,
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
@import "dynamic-goods-list.scss";
</style>