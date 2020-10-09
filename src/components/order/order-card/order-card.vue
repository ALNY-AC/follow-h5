<template>
  <div class="order-card" v-if="order && userInfo" @click="open()">
    <div class="order-card-head" v-if="false">
      <div class="order-card-title">
        <slot name="head">
          <span v-if="order.order_info_id">
            订单号： {{order.order_info_id}}
          </span>
        </slot>
        <span class="order-state" v-if="order.state">
          <slot name="label">
            <o-label outlined radius="3px" :type="states[order.state].type">{{states[order.state].label}}</o-label>
          </slot>
        </span>
      </div>
    </div>
    <div class="order-card-body">
      <slot name="goodsList">
        <order-card-goods v-if="goodsList" v-for="(item,i) in goodsList" :key="i" :img="item.img" :title="item.title" :info="item.info" :num="item.num">
          <template slot="price">
            <span>
              ￥ {{formatPrice(item.price) | money}}
            </span>
          </template>
        </order-card-goods>
      </slot>
    </div>
    <div class="order-card-footer">
      <van-cell-group>
        <slot name="cell-group">
          <slot name="type">
            <van-cell title="发货方式" v-if="firstPrice>=0" :value="`快递：${firstPrice}元`" />
            <van-cell title="该商品不支持发往当前选择的收货地址" v-else />
          </slot>
          <slot name="total">
            <van-cell title="订单总计" value=" ">
              <template slot="right-icon">
                <span>
                  ￥ {{formatPrice(order.total) | money}}
                </span>
              </template>
            </van-cell>
          </slot>
        </slot>
      </van-cell-group>
      <slot name="cell"></slot>
    </div>

  </div>
</template>
<script>
import orderCardGoods from "../order-card-goods/order-card-goods.vue";
export default {
  name: "order-card",
  props: {
    order: {
      type: Object,
      default: null
    },
    goodsList: {
      type: Array,
      default: null
    },
    index: {
      type: Number,
      default: -1
    },
    address: {
      type: Object,
      default: null
    },
    firstPrice: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      states: [
        {},
        { label: "待付款", type: "danger" },
        { label: "待发货", type: "warning" },
        { label: "待收货", type: "blue" },
        { label: "交易成功", type: "success" },
        { label: "退款/退货", type: "" }
      ],
      userInfo: null,
      freight: null
    };
  },
  methods: {
    //打开订单详情
    open() {
      //没有订单就不用跳转
      if (!this.order.order_info_id) return;
      this.$push({
        path: "/orderInfo",
        query: {
          order_info_id: this.order.order_info_id
        }
      });
    },
    formatPrice(price) {
      if (price == "--") {
        return price;
      }
      return parseFloat(price).toFixed(2);
    },
    //构建数据
    bulider() {
      let freight = this.order.freight;
      this.freight = this.buliderFreight(freight);
    },
    buliderFreight(freight) {
      freight.value_type = parseInt(freight.value_type);
      freight.freight_type = parseInt(freight.freight_type);
      freight.areas.forEach(area => {
        area.areasInfo = JSON.parse(area.area);
      });
      return freight;
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    // userInfo.vipInfo.discount
    this.userInfo = this.$getUserInfo();
    this.bulider();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
    address() {}
  },
  components: {
    orderCardGoods
  }
};
</script>
<style lang="scss" scoped>
@import "order-card.scss";
</style>