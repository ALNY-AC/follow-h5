<template>
  <div id="HelpList">
    <van-nav-bar :title="types[help_type]" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
      <van-panel :title="types[help_type]" style="margin-top:20px">
        <van-cell :title="item.help_title" v-for="item in helpList" @click="showInfo(item)" :key="item.help_id" is-link />
      </van-panel>
    </van-list>

  </div>
</template>
<script>
export default {
  name: "HelpList",
  props: {},
  data() {
    return {
      types: ["新手指引", "活动", "物流配送", "售后问题", "订单问题"],
      help_type: "",
      helpList: [],
      page: 1,
      loading: false,
      finished: false,
      total: 0
    };
  },
  methods: {
    onLoad() {
      this.update();
    },
    update() {
      if (this.finished) {
        return;
      }
      this.loading = true;
      this.$get(
        "help/getList",
        {
          page: this.page,
          where: {
            help_type: this.help_type
          }
        },
        res => {
          this.loading = false;
          this.total = res.count;
          if (res.res >= 1) {
            res.msg.forEach(item => {
              this.helpList.push(item);
            });
            this.page++;
            if (this.helpList.length >= this.total) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            return;
          }
        }
      );
    },
    showInfo(item) {
      this.$push({
        path: "helpInfo",
        query: {
          help_id: item.help_id
        }
      });
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.help_type = this.$route.query.help_type;
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
@import "HelpList.scss";
</style>