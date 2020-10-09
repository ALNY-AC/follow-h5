<template>
  <div class="shop-paper-list">
    <div class="shop-list-head" @click="$push('/paperList')">
      <div class="shop-list-title">
        随享季课堂

        <span class="float-right text-info left">
          <span class="title">
            查看全部课堂
          </span>
          <i class="icon fa fa-angle-right"></i>
        </span>

      </div>
    </div>
    <div class="shop-list-body">
      <slot>
        <shop-paper-card v-for="item in list" :key="item.paper_id" :head="item.paper_head" :paperId="item.paper_id"></shop-paper-card>
      </slot>
    </div>

  </div>
</template>
<script>
export default {
  name: "shop-paper-list",
  props: {},
  data() {
    return {
      list: [],
      isLoading: false
    };
  },
  methods: {
    update() {
      this.$get(
        "paper/getList",
        {
          limit: 3
        },
        res => {
          if (res.res >= 1) {
            this.list = res.msg;
            return;
          }
          if (res.res < 0) {
            this.$toast("文章列表获取失败！请重试~");
            return;
          }
        },
        error => {
          this.$toast("文章列表获取失败！请重试~");
          this.$clearLoading();
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.update();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "shop-paper-list.scss";
</style>