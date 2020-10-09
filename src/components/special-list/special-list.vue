<template>
  <div class="special-list" v-if="list.length>0">
    <template v-for="item in list">
      <special :key="item.special_id" :name="item.special_id" :title="item.special_title" :titleb="item.special_title_2" :img="item.special_head"></special>
    </template>
  </div>
</template>
<script>
export default {
  name: "special-list",
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
@import "special-list.scss";
</style>