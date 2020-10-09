<template>
  <div id="OrderList">
    <van-nav-bar title="我的订单" left-arrow @click-left="$back()"></van-nav-bar>

    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,i) in navList" :title="item.title" :key="item.title">
        <div class="order-list-body">
          <user-order-list v-if="orders.length>i" :list="orders[i]"></user-order-list>
          <div class="text-info text-center" v-if="orders.length>i && orders[i].length<=0">
            暂无相关订单~
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
export default {
  name: "TheOrderList",
  props: {},
  data() {
    return {
      active: "",
      navList: [
        { title: "全部" },
        { title: "待付款" },
        { title: "待发货" },
        { title: "待收货" },
        { title: "交易成功" },
        { title: "退款/退货" },
        { title: "交易关闭" },
        { title: "已退款" },
        { title: "退款失败" }
      ],
      orders: [],
      test: []
    };
  },
  methods: {
    update() {
      this.$loading(200, "加载中");
      this.$get(
        "order/getList",
        {},
        res => {
          this.$clearLoading();

          if (res.res >= 1) {
            this.orders = this.buliderList(res.msg);
            return;
          }
          if (res.res < 0) {
            this.$toast("订单数据加载失败!请重试！");
          }
        },
        () => {
          this.$clearLoading();
          this.$toast("订单数据加载失败!请重试！");
        }
      );
    },
    buliderList(orders) {
      //预处理
      let list = [];
      // orders.forEach(item => {
      //   let card = this.getCard();
      //   card.pay_id = item.pay_id;
      //   card.header.time = item.add_time;
      //   card.header.type = "买";
      //   card.state = item.state;
      //   card.orderList.push(item);
      //   card.pay = item.pay;
      //   card.logistics = item.logistics;
      //   card.address = item.address;
      //   card.total = item.pay.price;
      //   card.freight = -1;
      //   list[0].push(card);
      // });
      for (let i = 0; i < this.navList.length; i++) {
        list.push([]);
      }

      orders.forEach(item => {
        // 未支付的合并
        if (item.state == "1") {
          // 如果订单是未支付的
          // 找未支付订单中支付单和此订单一样的

          let empty = true;
          list[1].forEach(orderItem => {
            if (orderItem.pay_id == item.pay_id) {
              // 找到相同的，插入到这个里面去
              orderItem.orderList.push(item);
              empty = false;
            }
          });
          if (empty) {
            // 没找到相同的，创建一个
            let card = this.getCard();
            card.pay_id = item.pay_id;
            card.header.time = item.add_time;
            card.header.type = "买";
            card.state = item.state;
            card.orderList.push(item);
            card.pay = item.pay;
            card.logistics = item.logistics;
            card.address = item.address;
            card.afterSale = item.afterSale;
            card.total = item.pay.price;
            card.freight = -1;
            list[1].push(card);
            list[0].push(card);
          }
        } else {
          // 已支付的单独显示
          let card = this.getCard();
          card.pay_id = item.pay_id;
          card.header.time = item.add_time;
          card.header.type = "买";
          card.state = item.state;
          card.orderList.push(item);
          card.pay = item.pay;
          card.logistics = item.logistics;
          card.address = item.address;
          card.afterSale = item.afterSale;
          card.total = item.price;
          card.freight = item.logistics.price;
          list[item.state].push(card);
          list[0].push(card);
        }
      });

      return list;
    },
    getCard() {
      return {
        header: {
          time: "--",
          type: "买"
        },
        state: "1",
        pay_id: "",
        orderList: [],
        pay: {}, //支付单数据
        logistics: {}, //物流数据
        address: {}, //收货地址数据,
        total: 0,
        freight: -1
      };
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    // this.active = localStorage["orderListActive"];
    this.$nextTick(() => {});
    this.update();
  },
  //Vue 实例销毁后调用
  destroyed() {},
  created() {
    this.update();
  },
  deactivated() {
    localStorage["order_list_activeIndex"] = this.active;
  },
  activated() {
    if (this.$route.query["noncestr"] !== localStorage["order_list_noncestr"]) {
      localStorage["order_list_noncestr"] = this.$route.query["noncestr"];
      this.active = this.$route.query.active;
      this.update();
    } else {
      this.active = parseInt(localStorage["order_list_activeIndex"]);
    }
  },
  watch: {
    active(val) {}
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "OrderList.scss";
</style>
<style>
.van-tabs__nav-bar {
  background-color: #16242d;
}
.van-tab--active {
  color: #16242d;
}
</style>
