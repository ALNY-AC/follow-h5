<template>
  <div class="msg-card">

    <div class="msg-time-box">
      <span class="msg-time">{{time}}</span>
    </div>

    <div class="msg-body" @click="open()">
      <div class="msg-head" v-if="head" :style="{backgroundImage:`url(${$getUrl(head)})`}">
      </div>
      <div class="msg-title">
        <span>{{title}}</span>
      </div>

      <div class="msg-info">
        <span>{{info}}</span>
      </div>

    </div>

  </div>

</template>
<script>
export default {
  name: "msg-card",
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
    msgId: {
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
        path: "/msgInfo",
        query: {
          msg_id: this.msgId
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
@import "msg-card.scss";
</style>