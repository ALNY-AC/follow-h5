<template>
  <div id="PaperList">
    <van-nav-bar title="随享季课堂" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <div class="swipe-body">
      <banner pages="课堂页"></banner>
    </div>
    <div class="class-body">
      <van-row>
        <van-col span="6" class="class-item" v-for="item in navList" :key="item.title" @click.native="openClassList(item)">
          <div class="icon">
            <van-icon :name="item.aicon" />
          </div>
          <div class="title">{{item.title}}</div>
        </van-col>
      </van-row>
    </div>

    <template v-for="item in papers">
      <paper-card :key="item.paper_id" :paper-id="item.paper_id" :title="item.paper_title" :class-id="item.class_id" :time="item.add_time" :head="item.paper_head" :info="item.paper_info"></paper-card>
    </template>

  </div>
</template>
<script>
export default {
  name: "PaperList",
  props: {},
  data() {
    return {
      //       1： 新手课堂
      // 2： 每日精选
      // 3： 每日涨知识
      // 4： 客服&物流
      papers: [],
      carousels: [],
      navList: [
        {
          title: "新手课堂",
          aicon: "points-mall",
          icon: "",
          classId: 1
        },
        { title: "每日精选", aicon: "discount", icon: "", classId: 2 },
        { title: "每日涨知识", aicon: "gift", icon: "", classId: 3 },
        { title: "客服&物流", aicon: "logistics", icon: "", classId: 4 }
      ]
    };
  },
  methods: {
    sorry() {
      this.$toast("暂无此分类的文章~");
    },
    update() {
      this.$loading(200, "加载中~");

      this.$get(
        "paper/getPacket",
        {},
        res => {
          this.$clearLoading();
          console.log(res);
          if (res.res >= 0) {
            this.papers = res.papers;
            this.carousels = res.carousel;
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
    },
    openClassList(item) {
      this.$push({
        path: "/paperClassLsit",
        query: {
          class_id: item.classId
        }
      });
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
@import "PaperList.scss";
</style>
