<template>
  <div id="HelpType">
    <van-nav-bar title="帮助与客服" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <van-cell-group>
      <van-cell title="常见问题" class="common-problems"/>
    </van-cell-group>

    <div class="help-body">

      <van-row class="help-class-row">
        <van-col span="12" class="help-class-item" @click.native="openList(0)">
          <div class="icon text-blue">
            <van-icon name="gift" />
          </div>
          <div class="title">新手指引</div>
        </van-col>

        <van-col span="12" class="help-class-item" @click.native="openList(4)">
          <div class="icon">
            <van-icon name="records" />
          </div>
          <div class="title">订单问题</div>
        </van-col>

        <!-- <van-col span="12" class="help-class-item" @click.native="openList(1)">
          <div class="icon text-warning">
            <van-icon name="pending-evaluate" />
          </div>
          <div class="title">活动</div>
        </van-col> -->

      </van-row>

      <van-row class="help-class-row">

        <van-col span="12" class="help-class-item" @click.native="openList(2)">
          <div class="icon text-success">
            <van-icon name="logistics" />
          </div>
          <div class="title">物流配送</div>
        </van-col>
        <van-col span="12" class="help-class-item" @click.native="openList(3)">
          <div class="icon text-danger">
            <van-icon name="question" />
          </div>
          <div class="title">售后问题</div>
        </van-col>

      </van-row>

      <van-row class="help-class-row">

      </van-row>

    </div>

    <van-panel title="热门问题" style="margin-top:20px;">
      <van-cell style="color: #666" :title="item.help_title" v-for="item in helpList" @click="showInfo(item)" :key="item.help_id" is-link />
    </van-panel>

    <div class="zxff" @click.stop="showKf()">
      <div class="icon">
        <van-icon name="phone" />
      </div>
      <div class="title">在线服务</div>
    </div>

  </div>
</template>
<script>
export default {
  name: "HelpType",
  props: {},
  data() {
    return {
      type: ["新手指引", "活动", "物流配送", "售后问题", "订单问题"],
      helpList: []
    };
  },
  methods: {
    update() {
      this.$get(
        "help/getList",
        {
          where: {
            is_up: 1
          }
        },
        res => {
          if (res.res >= 1) {
            this.helpList = res.msg;
            return;
          }
        }
      );
    },
    openList(help_type) {
      this.$push({
        path: "/helpList",
        query: {
          help_type: help_type
        }
      });
    },
    showInfo(item) {
      this.$push({
        path: "/helpInfo",
        query: {
          help_id: item.help_id
        }
      });
    },
    showKf() {
      // ysf.url

      if (this.$userInfo.user_id == -1) {
        this.$noLogin();
        return;
      }

      let goods = localStorage["goods_info_kf"]
        ? JSON.parse(localStorage["goods_info_kf"])
        : false;

      if (goods) {
        ysf.product({
          show: 1, // 1为打开， 其他参数为隐藏（包括非零元素）
          title: goods.goods_title,
          desc: goods.sub_title,
          picture: this.$getUrl(goods.goods_head),
          note: "",
          url:
            "http://admin.followenjoy.com/#/goods/edit?goods_id=" +
            goods.goods_id
        });
      }
      let url = ysf.url();
      this.$showView(url);
    },
    init() {
      let userInfo = this.$getUserInfo();
      ysf.on({
        onload: function() {
          ysf.config({
            uid: userInfo.user_id, // 用户Id
            name: userInfo.user_name, // 用户名称
            // email: "test@163.com", // 用户邮箱
            mobile: userInfo.user_id, // 用户电话
            success: function() {},
            error: function() {}
          });
        }
      });
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.update();
    this.init();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {
    localStorage.removeItem("goods_info_kf");
  },
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "HelpType.scss";
</style>
