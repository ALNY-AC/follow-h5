<template>
  <div id="UpList">
    <van-nav-bar title="推荐列表" left-arrow @click-left="$back()" fixed></van-nav-bar>

    <div class="user-list">
      <div class="user-item" @click="show(item)" v-for="(item,i) in list" :key="i">
        <img :src="$getUrl(item.user_head)">
        <span class="title">{{item.user_name}}</span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "UpList",
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    update() {
      this.$get("Dynamic/getUpList", {}, res => {
        if (res.res >= 1) {
          this.list = res.msg;
        }
      });
    },
    show(item) {
      this.$push({
        path: "/dynamic/user",
        query: {
          user_id: item.user_id
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
@import "UpList.scss";
</style>