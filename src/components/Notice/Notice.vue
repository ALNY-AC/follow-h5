<template>
  <div class="notice" @click.stop="click">
    <div class="notice-body">

      <div class="notice-logo">NOTICE</div>
      <div class="label-box">
        <o-label outlined>随享季</o-label>
      </div>
      <div class="notice-list" :style="{top:top+'px'}">
        <div class="notice-item" v-for="item in list" :key="getKey(item)">{{item.label}}</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "Notice",
  props: {
    list: {
      type: Array,
      default: []
    },
    time: {
      type: Number,
      default: 2000
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 0,
      setInterval: null,
      top: 0
    };
  },
  methods: {
    start() {
      clearInterval(this.setInterval);
      this.setInterval = setInterval(() => {
        this.top -= 20;
        this.count++;
        if (this.count >= this.list.length) {
          this.count = 0;
          this.top = 0;
        }
        this.$emit("update:active", this.count);
      }, this.time);
    },
    click() {
      this.$emit("click", this.count);
    },
    cancel() {
      clearInterval(this.setInterval);
    },
    getKey(item) {
      return item.label + parseInt(Math.random() * 1000);
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.start();
    this.$nextTick(() => {});
  },
  //Vue 实例销毁后调用
  destroyed() {
    this.cancel();
  },
  watch: {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "Notice.scss";
</style>