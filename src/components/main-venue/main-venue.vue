<template>
  <div :class="['main-venue']" @click.stop="open">
    <div :class="[{'main-venue-close':(!data || data.is_show == '0')}]" v-if="data">
      <div class="mask"></div>
      <img v-if="data.hall_bg" :src="$getUrl(data.hall_bg)">
      <img v-else src="@/assets/e3.png">
    </div>
  </div>
</template>
<script>
export default {
  name: "main-venue",
  props: {},
  data() {
    return {
      height: "6.5rem",
      data: null
    };
  },
  methods: {
    update() {
      if (
        !localStorage["hall_data"] ||
        localStorage["hall_data"] == undefined ||
        localStorage["hall_data"] == "undefined"
      ) {
        let data = {
          banner_pages_id: Math.random(),
          hall_bg: "",
          id: 1,
          is_show: "0"
        };
        localStorage["hall_data"] = JSON.stringify(data);
      }

      this.data = JSON.parse(localStorage["hall_data"]);

      this.$get("hall/get", {}, res => {
        this.data = res.msg;
      });
    },
    open() {
      if (this.data.banner_pages_id) {
        this.$push({
          path: "/TempPages",
          query: {
            temp_pages_id: this.data.banner_pages_id
          }
        });
      }
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
@import "main-venue.scss";
</style>