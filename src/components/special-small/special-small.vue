<template>
  <div class="special-small" @click.stop="showInfo()">
    <img :src="$getUrl(icon)" class="icon" alt="">
    <div class="special-small-title" :style="{color:color}">
      <slot name="title">{{title}}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "special-small",
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    click: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    showInfo() {
      if (this.click) {
        this.$emit("click");
        return;
      }
      // 展示内容
      // 0：商品
      // 1：文章
      let sp = this.item;
      let special_id = this.item.special_id;
      let content_type = this.item.content_type;
      let goods_type = this.item.goods_type;
      let title = this.item.special_title;
      let link_id = this.item.link_id;

      if (content_type == "2") {
        // 模板页
        this.$push({
          path: "/TempPages",
          query: {
            temp_pages_id: link_id
          }
        });
        return;
      }

      if (content_type == "0") {
        // 商品
        if (goods_type == "card") {
          // 卡片式
          this.$push({
            path: "/SpecialGoods",
            query: {
              special_id: special_id,
              title: title
            }
          });
        }
        if (goods_type == "flow") {
          // 瀑布流
          this.$push({
            path: "/SpecialGoodsFlow",
            query: {
              special_id: special_id,
              title: title
            }
          });
        }
      }
      if (content_type == "1") {
        // 文章
        this.$push({
          path: "/SpecialPaper",
          query: {
            special_id: this.name,
            title: title
          }
        });
      }
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
  components: {}
};
</script>
<style lang="scss" scoped>
@import "special-small.scss";
</style>
