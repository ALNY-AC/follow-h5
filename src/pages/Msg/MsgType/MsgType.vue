<template>
  <div id="MsgType">
    <van-nav-bar title="消息通知" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <div class="type-list">
      <div class="type-body">
        <div class="type-item" v-for="item in list" :key="item.title" @click="open(item)">

          <div class="icon">
            <van-icon :name="item.vicon" v-if="item.vicon" />
            <i :class="item.icon" v-if="item.icon"></i>
          </div>

          <div class="title">{{item.title}}</div>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "MsgType",
  props: {},
  data() {
    return {
      list: [
        {
          isLogin: false,
          type: "1",
          title: "随享季公告",
          vicon: "pending-evaluate"
        },
        {
          isLogin: false,
          type: "2",
          title: "活动消息",
          icon: "fa fa-bell-o"
        },
        {
          isLogin: true,
          type: "3",
          title: "随享季助手",
          vicon: "pending-orders"
        },
        {
          isLogin: true,
          type: "4",
          title: "交易物流",
          vicon: "logistics"
        }
      ]
    };
  },
  methods: {
    open(item) {
      this.userInfo = this.$getUserInfo();
      if (item.isLogin) {
        if (this.isLogin) {
          this.$push({
            path: "/msgList",
            query: {
              type: item.type
            }
          });
        } else {
          this.$noLogin();
        }
      } else {
        this.$push({
          path: "/msgList",
          query: {
            type: item.type
          }
        });
      }
    }
  },
  computed: {
    isLogin() {
      return this.userInfo.user_id >= 0;
    }
  },
  //过滤器
  filters: {},
  mounted() {
    //这里应该获取数量
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "MsgType.scss";
</style>