<template>
  <div id="Money">
    <van-nav-bar title="提现" left-arrow @click-left="$back()" fixed>

      <template slot="right">
        <span @click="$push('/userCenter/DrawMoney')">提现记录</span>
      </template>

    </van-nav-bar>

    <div style="background-color:#fff;" class="input">
      <div class="title">提现金额 (余额：{{userInfo.user_money}}) </div>
      <div class="input-money-box">
        <i class="icon fa fa-yen"></i>
        <input type="number" placeholder="输入提现金额" v-model.number.trim="money" autofocus class="input-money">
      </div>
      <div class="info text-danger" v-if="money>userInfo.user_money">提现金额超出余额</div>
    </div>

    <van-row class="type text-center">
      <van-col span="12" class="type-item">
        <van-radio name="1" v-model="type">提现到储蓄卡</van-radio>
      </van-col>
      <div class="line"></div>
      <van-col span="12" class="type-item">
        <van-radio name="2" v-model="type">提现到支付宝</van-radio>
      </van-col>
    </van-row>

    <div v-if="type==1" class="py-paney">
      <div class="title">姓名：</div>
      <van-field v-model="name" placeholder="请输入姓名" />
      <div class="title">卡号：</div>
      <van-field v-model="card_id" placeholder="请输入卡号" />
    </div>

    <div v-if="type==2" class="py-paney">
      <div class="title">姓名：</div>
      <van-field v-model="name" placeholder="请输入支付宝账户姓名" />
      <div class="title">支付宝账户：</div>
      <van-field v-model="zfb_id" placeholder="请输入支付宝账户" />
    </div>
    <div style="padding:0 10px;">
      <mu-button :disabled="money<=0||money>userInfo.user_money" full-width large color="#4e4e4d" @click="submit">确认提现</mu-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Money",
  props: {},
  data() {
    return {
      money: "",
      type: "1",
      name: "",
      card_id: "",
      zfb_id: "",
      userInfo: {
        user_money: 0
      }
    };
  },
  methods: {
    sum() {
      this.$toast("暂无支付接口~");
    },
    submit() {
      if (this.name.length <= 0) {
        this.$toast({ message: "请输入持有人姓名！", position: "bottom" });
        return;
      }

      if (this.type == "1") {
        if (this.card_id.length != 16 && this.card_id.length != 18) {
          this.$toast({ message: "卡号有误！", position: "bottom" });
          return;
        }
      } else {
        if (this.zfb_id.length <= 0) {
          this.$toast({ message: "请输入支付宝账户！", position: "bottom" });
          return;
        }
      }

      let add = {
        name: this.name, //持有人姓名
        money: this.money, //提现金额
        card_id: this.type == "1" ? this.card_id : this.zfb_id, //卡号
        type: this.type //类型
      };
      
      this.$post(
        "DrawMoney/creat",
        {
          add: add
        },
        res => {
          if (res.res >= 1) {
            this.$toast("提交成功~");
            setTimeout(() => {
              this.$back(-1);
            }, 300);
            return;
          }
          this.$toast("提交失败！请重试~");
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.userInfo = this.$getUserInfo();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {
    type() {
      this.name = "";
      this.card_id = "";
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "Money.scss";
</style>