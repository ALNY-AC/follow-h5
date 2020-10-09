<template>
  <div id="PaperClassLsit">
    <van-nav-bar :title="classList[class_id]" fixed left-arrow @click-left="$back()"></van-nav-bar>
    <div class="text-center text-info" v-if="empty">暂无此分类文章~</div>

    <template v-for="item in papers">
      <paper-card :is-show-class="false" :key="item.paper_id" :paper-id="item.paper_id" :title="item.paper_title" :class-id="item.class_id" :time="item.add_time" :head="item.paper_head" :info="item.paper_info"></paper-card>
    </template>

  </div>
</template>
<script>
export default {
  name: "PaperClassLsit",
  props: {},
  data() {
    return {
      class_id: "",
      empty: false,
      classList: [
        "分类错误",
        "新手课堂",
        "每日精选",
        "每日涨知识",
        "客服&物流"
      ],
      papers: []
    };
  },
  methods: {
    update() {
      this.$loading(200, "加载中~");

      this.$get(
        "paper/getList",
        {
          where: {
            class_id: this.class_id
          }
        },
        res => {
          this.$clearLoading();

          if (res.res >= 1) {
            this.papers = res.msg;
            return;
          }
          if (res.res == 0) {
            this.empty = true;
            return;
          }

          this.$toast("列表加载失败！请重试");
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.class_id = this.$route.query.class_id;
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
@import "PaperClassLsit.scss";
</style>