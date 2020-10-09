<template>
  <div id="MsgList">
    <van-nav-bar :title="types[type]" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <div class="msg-list">
      <div class="msg-body">
        <msg-card v-for="item in msgs" :key="item.msg_id" :msg-id="item.msg_id" :title="item.msg_title" :msg="item.msg" :head="item.msg_head" :time="item.add_time" :info="item.msg_info"></msg-card>
      </div>
    </div>
    <div v-if="isEmpty" class="empty">暂无内容~</div>

  </div>
</template>
<script>
export default {
  name: "MsgList",
  props: {},
  data() {
    return {
      msgs: [],
      types: ["", "随享季公告", "活动消息", "随享季助手", "交易物流"],
      type: "",
      isEmpty: false
    };
  },
  methods: {
    update() {
      this.$get(
        "msg/getList",
        {
          where: {
            type: this.type
          }
        },
        res => {
          if (res.msg.length <= 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }

          if (res.res >= 1) {
            this.msgs = res.msg;
            return;
          }
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.type = this.$route.query.type;
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
@import "MsgList.scss";
</style>
