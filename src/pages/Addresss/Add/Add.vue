<template>
  <div class="address-add">
    <van-nav-bar title="新增地址" left-arrow @click-left="$back()" fixed></van-nav-bar>
    <!-- <van-address-edit :area-list="areaList" show-postal show-set-default @save="onSave" @delete="onDelete">
      <van-field v-model.trim="id_card" label="身份证号" placeholder="请输入身份证号（选填）" />
    </van-address-edit> -->

    <o-address-edit @on-save="onSave"></o-address-edit>

  </div>
</template>
<script>
import { AddressEdit } from "vant";
import area from "@/plugin/area.js";

export default {
  name: "address-add",
  props: {},
  data() {
    return {
      areaList: area,
      id_card: ""
    };
  },
  methods: {
    onSave(content) {
      // var add = {
      //   address_detail: "黄浦",
      //   city: "县",
      //   area_code: "110229",
      //   county: "延庆县",
      //   is_default: true,
      //   name: "123",
      //   postal_code: "",
      //   province: "北京市",
      //   tel: "11012012138"
      // };

      content.name = content.name.replace(/\s+/g, " ");

      if (content.id_card.length < 18) {
        this.$toast("您的身份证号不正确");
      }

      this.$post("address/add", { add: content }, res => {
        console.log(res);
        if (res.res >= 1) {
          this.$toast.success("添加成功");
          setTimeout(() => {
            this.$back(-1);
          }, 500);
        }
        if (res.res < 0) {
          this.$fail("添加失败！请重试~");
        }
      });
    },
    onDelete() {
      this.$toast("delete");
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
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
@import "Add.scss";
</style>
