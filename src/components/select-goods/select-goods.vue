<template>
  <div class="select-goods">

    <div class="goods-item" v-for="(item,i) in list" :key="i" @click="select(item,i,list)">
      <div class="goods-item-head">
        <img :src="$getUrl(item.img)" v-if="item.img.length>0">
      </div>
      <div class="goods-item-title">
        {{item.goods_title}}
      </div>
      <div class="select-icon" v-if="item.active">
        <van-icon name="success" />
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "select-goods",
  props: {
    list: {
      type: Array,
      default: []
    },
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    select(item, i, list) {
      list.forEach(el => {
        el.active = false;
      });
      item.active = true;
      this.$emit("input", item);
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
    list(list) {
      console.log(list);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "select-goods.scss";
</style>