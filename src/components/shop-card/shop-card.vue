<template>
  <div class="shop-card">
    <mu-ripple>
      <div class="shop-card-bg"></div>
      <div class="shop-card-body">
        <slot>
          <div class="card-title">累计收益（元）</div>
          <div class="card-value">{{money?money:'— —'}}</div>
          <div class="card-footer">
            <div class="card-tool">
              <div class="card-tool-item">
                <div class="tool-title">今日访问量</div>
                <span>{{recordCount}}</span>
              </div>
              <div class="line"></div>
              <div class="card-tool-item">
                <div class="tool-title">今日订单数</div>
                <span>{{toDayOrder}}</span>
              </div>
              <div class="line"></div>
              <div class="card-tool-item" @click="$push('/vip/sub');">
                <div class="tool-title">VIP人数</div>
                <span>{{vpiCount}}</span>
              </div>

            </div>
          </div>
        </slot>
      </div>
    </mu-ripple>

  </div>
</template>
<script>
export default {
  name: "shop-card",
  props: {},
  data() {
    return {
      money: "",
      vpiCount: "",
      toDayOrder: "",
      recordCount: ""
    };
  },
  methods: {
    update() {
      this.$get("Shop/getMoney", {}, res => {
        this.money = res.msg;
      });
      this.$get("Shop/getVipCount", {}, res => {
        this.vpiCount = res.msg;
      });
      this.$get("Shop/getToDayOrder", {}, res => {
        this.toDayOrder = res.msg;
      });
      this.$get("Shop/getRecord", {}, res => {
        this.recordCount = res.msg;
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
  activated() {
    this.update();
  },
  created() {},
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "shop-card.scss";
</style>