<template>
  <div class="paper-card">

    <div class="paper-body" @click="open()">
      <div class="paper-head" :style="{backgroundImage:`url(${$getUrl(head)})`}">
      </div>

      <div class="paper-title">
        <span>{{title}}</span>
      </div>

      <div class="paper-info">
        <!-- <span>{{info}}</span> -->
      </div>

      <div class="paper-footer" @click.stop="openClass()" v-if="isShowClass">

        <span>#{{classList[classId]}}#</span>
        <div class="paper-time-box">
          <span class="paper-time">{{time}}</span>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "paper-card",
  props: {
    head: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    info: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    paperId: {
      type: String,
      default: ""
    },
    classId: {
      type: String,
      default: ""
    },
    isShowClass: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      classList: ["分类错误", "新手课堂", "每日精选", "每日涨知识", "客服&物流"]
    };
  },
  methods: {
    open() {
      this.$push({
        path: "/paperInfo",
        query: {
          paper_id: this.paperId
        }
      });
    },
    openClass() {
      this.$push({
        path: "/paperClassLsit",
        query: {
          class_id: this.classId
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
@import "paper-card.scss";
</style>