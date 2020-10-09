<template>
  <div class="search-label">
    <div class="group">
      <div class="group-title">热门搜索</div>
      <div class="group-list clearfix">
        <div class="key-label" v-for="(item,i) in list" :key="item.hot_label_id" @click="change(item,i,list)">{{item.hot_label_value}}</div>
      </div>
    </div>
    <div class="line"></div>

    <template v-if="localList.length>0">

      <div class="group history">
        <div class="group-title">历史搜索</div>
        <div class="group-list clearfix">
          <div class="key-label" v-for="(item,i) in localList" :key="item.hot_label_id" @click="change(item,i,list)">{{item.hot_label_value}}</div>
        </div>
      </div>

      <div class="clear">
        <div class="clear-title" @click="clear()" v-if="localList.length>0">清空历史记录</div>
      </div>

    </template>
  </div>
</template>
<script>
  export default {
    name: "search-label",
    props: {
      value: {
        type: String,
        defalut: ""
      }
    },
    data() {
      return {
        list: [],
        localList: []
      };
    },
    methods: {
      //获得热搜
      update() {
        var list = [
          { label_id: 1, label: "特卖" },
          { label_id: 2, label: "夏季" }
        ];
        this.$get("hotLabel/getList", {}, res => {
          if (res.res >= 0) {
            this.list = res.msg;
          }
        });
      },
      initLocal() {
        if (localStorage.localQueryKey == undefined) {
          localStorage.localQueryKey = JSON.stringify([]);
        }
      },
      updateLocal() {
        this.initLocal();
        var list = localStorage.localQueryKey;
        list = JSON.parse(list);
        this.localList = list;
      },
      change(item, i, list) {
        this.$emit("update:value", item.hot_label_value);
        this.$emit("change", item.hot_label_value, item);
      },
     // 向历史记录中添加一个
      push(val) {
        this.initLocal();
        var list = JSON.parse(localStorage.localQueryKey);
        //如果已存在就不添加
        if (list.filter(item => val == item.hot_label_value).length > 0) {
          this.updateLocal();
          return;
        }
        list.unshift({
          hot_label_id: Math.random(),
          hot_label_value: val
        });
        //记录不超过15个
        list = list.filter((item, i) => i <= 15);

        localStorage.localQueryKey = JSON.stringify(list);
        this.updateLocal();
      },
      clear() {
        if (confirm("确定清空历史记录吗？")) {
          localStorage.removeItem("localQueryKey");
          this.updateLocal();
        }
      }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
      this.updateLocal();
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
  @import "search-label.scss";
</style>
