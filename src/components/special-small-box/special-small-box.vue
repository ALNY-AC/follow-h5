<template>
  <div class="special-small-box">

    <div :class="['special-small-body']" v-for="(item,i) in list" :key="item.title+item.icon" v-if="i<4">
      <special-small :item="item" :title="item.title" :color="item.color" :icon="item.icon" :name="item.special_id"></special-small>
    </div>
    <template v-if="list.length>0">
      <!-- <div :class="['special-small-body']">
        <special-small :item="list[3]" @click="goVpi()" click title="会员专享" :color="list[3].color" :icon="list[3].icon" name="会员专享"></special-small>
      </div> -->
      <div :class="['special-small-body']">
        <special-small :item="list[4]" @click="goClass()" click title="分类" :color="list[4].color" :icon="list[4].icon" name="分类"></special-small>
      </div>
    </template>

  </div>
</template>
<script>
export default {
  name: "special-small-box",
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    //获得小主题数据
    update() {
      if (
        !localStorage["specialList"] ||
        localStorage["specialList"] == undefined ||
        localStorage["specialList"] == "undefined"
      ) {
        localStorage["specialList"] = "[]";
      }

      this.list = JSON.parse(localStorage["specialList"]);

      this.$get("special/getList", {}, res => {
        if (res.res >= 1) {
          this.list = this.initList(res.msg);
          localStorage["specialList"] = JSON.stringify(res.msg);
          return;
        }
      });
    },
    initList(list) {
      list.forEach(item => {
        item.icon = item.special_logo;
        item.title = item.special_title;
      });
      return list;
    },
    goVpi() {
      this.$push({
        path: "/MemberExclusive",
        query: {}
      });
    },
    goClass() {
      this.$push({
        path: "/Class",
        query: {}
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
@import "special-small-box.scss";
</style>
