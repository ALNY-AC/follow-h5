<template>
  <div class="address-list">

    <van-nav-bar title="收货地址管理" left-arrow @click-left="$back()" fixed></van-nav-bar>
    <!-- <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" /> -->
    <!-- <address-card v-for="(item,i) in list" :key="i" :address="item"></address-card> -->
    <div class="blank" v-if="list.length==0">
      <img class="blank_img" src="@/assets/blank/address_msg.svg" alt="">
      <div>
        <span class="blank_title">暂无收货地址</span>
      </div>
    </div>




    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">




    <div class="address-card" v-for="item in list" :key="item.address_id">
      <div class="address-left-box">
        <div class="address-left-box-body">
          <div class="address-name">{{item.name}}</div>
          <div class="address-label" v-if="item.is_default=='1'">默认</div>
        </div>
      </div>
      <div class="address-center-box">
        <div class="address-center-box-body">
          <div class="address-tel">{{item.tel}}</div>
          <div class="address-location">

            <span>{{item.province}}</span>
            <span>{{item.city}}</span>
            <span>{{item.county}}</span>
            <span>{{item.address_detail}}</span>

          </div>
          <!-- <div class="address-id-card">身份证：320303********0011</div> -->
        </div>
      </div>
      <div class="address-right-box" @click.stop="edit(item)">
        <div class="address-right-box-body">
          <van-icon name="edit" />
        </div>
      </div>

    </div>
    </van-pull-refresh>


    <div class="add-btn" @click="onAdd">
      <i class="icon">+</i>
      新建地址
    </div>
  </div>
</template>
<script>
  import { AddressList, Toast } from "vant";
  export default {
    name: "address-list",
    props: {},
    data() {
      return {
        chosenAddressId: "1",
        list: [
          // {
          //   id: "1",
          //   name: "张三",
          //   tel: "13000000000",
          //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
          // },
        ],
        isLoading:false
      };
    },
    methods: {
      onAdd() {
        this.$push("/address/add");
      },
      edit(item, index) {
        var address_id = item.id;
        this.$push({
          path: "/address/edit",
          query: {
            address_id: address_id
          }
        });
      },
      update() {
        this.$get("address/getList", {}, res => {
          this.bulierList(res.msg);
        });
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.update();
        }, 500);
      },
      bulierList(list) {
        this.list = [];

        list.forEach(item => {
          item.id = item.address_id;
          item.address = this.getAddress(item);
          if (item.is_default == "1") {
            this.chosenAddressId = item.address_id;
          }
        });

        this.list = list;
      },
      getAddress(item) {
        return item.province + item.city + item.county + item.address_detail;
      }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
      this.update();
      upSize();
      this.$nextTick(() => {});
    },
    activated() {
      upSize();
    },
    //Vue 实例销毁后调用
    destroyed() {},
    watch: {},
    components: {
      [AddressList.name]: AddressList
    }
  };
  function upSize() {
    function up() {
      document.getElementsByTagName("html")[0].style.fontSize =
        window.innerWidth / 10 + "px";
    }
    up();
    window.addEventListener("resize", () => {
      up();
    });
  }
</script>
<style lang="scss" scoped>
  @import "List.scss";
</style>
