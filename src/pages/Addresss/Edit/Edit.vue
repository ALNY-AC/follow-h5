<template>
  <div class="address-add">
    <van-nav-bar title="修改地址" left-arrow @click-left="$back()"></van-nav-bar>

    <!-- <van-address-edit :area-list="areaList" v-if="addressInfo" show-postal show-delete show-set-default @save="onSave" :address-info="addressInfo" @delete="onDelete"> -->
    <!-- <van-field v-model.trim="id_card" label="身份证号" placeholder="请输入身份证号（选填）" /> -->
    <!-- </van-address-edit> -->

    <o-address-edit v-model="addressInfo" @on-save="onSave" @on-delete="onDelete"></o-address-edit>

  </div>
</template>
<script>
import { AddressEdit } from "vant";

export default {
  name: "address-add",
  props: {},
  data() {
    return {
      searchResult: [],
      address_id: "",
      addressInfo: {
        add_time: "",
        address_detail: "",
        address_id: "",
        area_code: "",
        city: "",
        county: "",
        edit_time: "",
        id_card: "",
        is_default: "",
        name: "",
        postal_code: "",
        province: "",
        tel: "",
        user_id: ""
      }
    };
  },
  methods: {
    onSave(content) {
      if (content.id_card > 0 && content.id_card.length < 18) {
        this.$toast("您的身份证号不正确");
      }
      this.$post(
        "address/save",
        { address_id: this.address_id, save: content },
        res => {
          if (res.res >= 1) {
            this.$toast.success("保存成功");
            setTimeout(() => {
              this.$router.back(-1);
            }, 500);
          }
          if (res.res < 0) {
            this.$toast.fail("保存失败！请重试~");
          }
        }
      );
    },
    onDelete() {
      this.$post(
        "address/del",
        {
          address_id: this.address_id
        },
        res => {
          if (res.res >= 1) {
            this.$toast("删除成功");
            setTimeout(() => {
              this.$router.back(-1);
            }, 500);
          }
          if (res.res < 1) {
            this.$toast("删除失败！请重试~");
          }
        }
      );
    },
    update() {
      this.$get(
        "address/get",
        {
          address_id: this.address_id
        },
        res => {
          res.msg.is_default = res.msg.is_default == 1;
          console.warn(res.msg);
          this.addressInfo = res.msg;
          this.id_card = this.addressInfo.id_card;
        }
      );
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.address_id = this.$route.query.address_id;
    this.update();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {
    [AddressEdit.name]: AddressEdit
  }
};
</script>
<style lang="scss" scoped>
@import "Edit.scss";
</style>