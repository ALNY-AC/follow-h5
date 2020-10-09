<template>
  <div id="DynamicUser">
    <van-nav-bar title="动态列表" fixed left-arrow @click-left="$back()"></van-nav-bar>
    <p class="text-center text-info" v-if="empty">此用户暂未发布素材！</p>
    <dynamic-list :list="dynamics"></dynamic-list>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "DynamicUser",
  props: {},
  data() {
    return {
      user_id: "",
      userInfo: null,
      dynamics: [],
      empty: false
    };
  },
  methods: {
    update() {
      //加载层
      this.$loading(300, "加载中");

      this.$get(
        "dynamic/getList",
        {
          where: {
            user_id: this.user_id
          }
        },
        res => {
          this.$clearLoading();
          if (res.res >= 1) {
            this.dynamics = res.msg;
            return;
          }
          if (res.res == 0) {
            this.empty = true;
          }
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    $("html").css("font-size", window.innerWidth / 10);
    $(window).resize(function() {
      $("html").css("font-size", window.innerWidth / 10);
    });
    this.user_id = this.$route.query.user_id;
    this.userInfo = this.$getUserInfo();
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
@import "User.scss";
</style>