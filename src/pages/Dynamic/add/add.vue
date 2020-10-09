<template>
  <div id="DynamicAdd">

    <van-nav-bar title="发布动态" fixed>
      <van-icon name="arrow-left" slot="left" @click.native="$back()" />
    </van-nav-bar>

  </div>
</template>
<script>
export default {
  name: "DynamicAdd",
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
@import "add.scss";
</style>