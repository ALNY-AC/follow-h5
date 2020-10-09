<template>
    <div id="Sub">
        <van-nav-bar title="VIP列表" fixed left-arrow @click-left="$back()">
            <template slot="right">
                <span @click="invite()">邀请VIP</span>
            </template>
        </van-nav-bar>

        <div class="user-list ">
            <div class="text-center text-info" v-if="isShowEmpty">
                暂无下级VIP，快去邀请吧~
            </div>
            <div class="user-list-body ">
                <div class="user-item clearfix" v-for="item in user_list" :key="item.user_id">
                    <div class="user-head">
                        <img :src="$getUrl(item.user_head)">
                    </div>
                    <div class="user-name">
                        <span>{{item.user_name}}</span>
                        <img class="vip_icon" v-if="item.user_vip_level=='0'" src="@/assets/sub/viplist_icon_v1.svg" alt="">
                        <img class="vip_icon" v-if="item.user_vip_level=='1'" src="@/assets/sub/viplist_icon_v2.svg" alt="">
                        <img class="vip_icon" v-if="item.user_vip_level=='2'" src="@/assets/sub/viplist_icon_v3.svg" alt="">
                        <img class="vip_icon" v-if="item.user_vip_level=='3'" src="@/assets/sub/viplist_icon_v4.svg" alt="">
                    </div>
                    <div class="add-time">
                        注册时间{{item.add_time}}
                    </div>
                </div>
                <div class="text-center text-info empty" v-if="!isShowEmpty">
                    没有更多内容了~
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "Sub",
  props: {},
  data() {
    return {
      user_list: [],
      isShowEmpty: false
    };
  },
  methods: {
    update() {
      this.$get("Vip/getSubList", {}, res => {
        console.log(res)
        if (res.res >= 1) {
          this.user_list = res.msg;
          return;
        }
        if (res.res == 0) {
          //   this.$toast("暂无下级！");
          this.isShowEmpty = true;
          return;
        }
        this.$toast("获取失败！请重试~");
      });
    },
    invite() {
      this.$push({
        path: "/BecomeVip"
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
@import "Sub.scss";
</style>