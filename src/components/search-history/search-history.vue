<template>
    <div class="search-history" v-if="localList.length>0">
      <div class="group history">
        <div class="group-title">历史搜索</div>
        <div class="group-list clearfix">
          <div class="key-label" v-for="(item,i) in localList" :key="item.hot_label_id" @click="change(item,i,list)">{{item.hot_label_value}}</div>
        </div>
      </div>

      <div class="clear">
        <div class="clear-title" @click="clear()" v-if="localList.length>0">清空历史记录</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "search-history",
      props: {
        value: {
          type: String,
          defalut: ""
        }
      },
      data() {
        return {
          localList: []
        };
      },
      methods: {
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
        //向历史记录中添加一个
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
        this.$nextTick(() => {});
      },
      //Vue 实例销毁后调用
      destroyed() {},
      watch: {},
      components: {}
    }
</script>

<style lang="scss" scoped>
  @import "./search-history";
</style>
