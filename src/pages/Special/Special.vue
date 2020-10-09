<template>
  <div id="Special">
    <van-nav-bar :title="special.special_title" fixed left-arrow @click-left="$back()"></van-nav-bar>
    <goods-group :card="true" v-if="special" :list="special.goodsList" :banner="banner" :info="special.special_info"></goods-group>
  </div>
</template>
<script>
  export default {
    name: "Special",
    props: {},
    data() {
      return {
        special_id: "",
        special: {
          goodsList: [],
          banner: "",
          info: ""
        },
        banner: ""
      };
    },
    methods: {
      update() {
        this.$loading(200, "加载中");
        this.$get(
          "Special/getPacket",
          {
            special_id: this.special_id
          },
          res => {
            this.special = res.msg;
            if (this.special.special_logo != null) {
              if (this.special.special_logo.length > 0) {
                this.banner = this.special.special_logo;
              } else {
                this.banner = this.special.special_head;
              }
            } else {
              this.banner = this.special_head;
            }

            this.$clearLoading();
          }
        );
      }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
      this.special_id = this.$route.query.special_id;
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
  @import "Special.scss";
</style>
