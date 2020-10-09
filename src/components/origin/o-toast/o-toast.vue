<template>
  <transition name="o-toast">
    <div :class="['o-toast','o-toast-'+type]" v-show="visible">
      <div class="o-toast-body">
        <span class="o-toast-title">
          <slot name="icon">
            <i :class="['icon',icon.length>0?icon:defaultIcon]"></i>
          </slot>{{title}}
        </span>
        <div class="o-toast-tool-list">
          <slot name="append">
            <o-toast-btn title="确定" @click.native="hide()"></o-toast-btn>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "o-toast",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeout: null,
      icons: {
        warning: "fa fa-warning",
        success: "fa fa-check-circle"
      },
      defaultIcon: ""
    };
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
      clearTimeout(this.timeout);
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.$nextTick(() => {
      //如果没有icon，就加载默认的
      if (this.icon.length <= 0) {
        var icon = this.icons[this.type];
        this.defaultIcon = icon;
      }
    });
    this.timeout = setTimeout(() => {
      this.hide();
    }, 2000);
  },
  //Vue 实例销毁后调用
  destroyed() {
    clearTimeout(this.timeout);
  },
  components: {},
  watch: {
    visible(val) {
      clearTimeout(this.timeout);
      console.log(val);
      if (val) {
        this.timeout = setTimeout(() => {
          this.hide();
        }, 2000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "o-toast.scss";
</style>