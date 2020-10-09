<template>
  <div id="Vip">
    <van-nav-bar title="客户管理" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <van-cell-group v-if="userInfo">
      <van-cell title="VIP邀请码" value=" ">
        <template slot="title">
          <span class="van-cell-text">VIP邀请码</span>
        </template>
        <template slot="right-icon">
          <span class="text-danger" v-if="shop_id" @click="show=true">{{shop_id}}</span>
          <van-button size="mini" v-else @click="buliderCode()">生成</van-button>
        </template>
      </van-cell>

      <van-cell title="VIP列表" @click="$push('/vip/sub');" is-link/>

    </van-cell-group>
    <van-dialog v-model="show" v-if="userInfo">
      <van-field v-model="shop_id" label="选择复制" />
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "Vip",
  props: {},
  data() {
    return {
      userInfo: null,
      show: false,
      shop_id:"",
    };
  },
  methods: {
    buliderCode() {
      this.loading = true;
      this.$get("Vip/buliderShopCode", {}, res => {
        this.loading = false;
        if (res.res >= 1) {
          this.$toast("生成成功~");
          this.userInfo = this.$getUserInfo(true);
          this.shop_id=res.msg;
          return;
        }
        if (res.res == -2) {
          this.$toast("已有店铺号！请勿重新生成~");
          return;
        }
        this.$toast("生成失败！请重试~");
      });
    },
    open() {}
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.$getUserInfo(userInfo => {
      this.userInfo = userInfo;
      this.shop_id = this.userInfo.shop_id;
    });
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "Vip.scss";
</style>