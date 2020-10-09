<template>
  <div class="dynamic-list">
    <dynamic-card v-for="item in list" :dynamic="item" :key="item.dynamic_id"></dynamic-card>
  </div>
</template>
<script>
export default {
  name: "dynamic-list",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    buliderList(list) {}
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {},
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
    list(list) {
      this.buliderList(list);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "dynamic-list.scss";
</style>