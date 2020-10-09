<template>
  <div class="shop-paper-card" :style="{backgroundImage:`url(${$getUrl(head)})`}" @click="open()"></div>
</template>
<script>
export default {
  name: "shop-paper-card",
  props: {
    head: {
      type: String,
      default: ""
    },
    paperId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    open() {
      this.$push({
        path: "/paperInfo",
        query: {
          paper_id: this.paperId
        }
      });
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
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "shop-paper-card.scss";
</style>

