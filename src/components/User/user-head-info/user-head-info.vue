<template>
  <div :class="['user-head-info',{'no-back':!bc}]">

    <div class="user-info-pabel">
      <div class="user-info-head">
        <img :src="$getUrl(userHead)" v-if="userHead">
        <img src="@/assets/logo.png" v-else>
      </div>
      <div class="user-info-name">
        <span class="user-name">
          {{userName}}
        </span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "user-head-info",
  props: {
    userHead: {
      type: String,
      default: ""
    },
    userName: {
      type: String,
      default: "--"
    },
    backgroundImage: {
      type: String,
      default: ""
    },
    bc: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      bgUrl: "https://alny-ac.github.io/TestVue/user.png"
    };
  },
  methods: {},
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    console.log(this.bgUrl);
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "user-head-info.scss";
</style>