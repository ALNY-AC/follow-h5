<template>
  <div v-if="dynamic" class="dynamic-card" @click.stop="showInfo()">
    <div class="dynamic-card-head">

      <div class="dynamic-card-user-info">
        <div class="user-head" @click.stop="showUser()">
          <img v-if="dynamic['user_info'] && dynamic.user_info['user_head']" :src="$getUrl(dynamic.user_info.user_head)">
          <img v-else src="@/assets/logo.png">
        </div>
        <div class="user-info" @click.stop="showUser()">
          <div class="user-title">
            {{dynamic.user_info.user_name}}
          </div>

        </div>

      </div>

      <div class="dynamic-card-label-list">
        <template v-for="item in dynamic.dynamic_label" v-if="dynamic.dynamic_label">
          <o-label :key="item.title" :title="item.title" :type="labels[item.type].type" :outlined="labels[item.type].outlined"></o-label>
        </template>
      </div>

      <div class="dynamic-card-head-tool">
        <div class="add-time">
          {{dynamic.release_time}}
        </div>
      </div>

    </div>

    <div class="dynamic-card-body">
      <div class="dynamic-title">
        {{dynamic.dynamic_title}}
      </div>

      <div class="dynamic-content" v-html="content"></div>

      <div class="dynamic-img-list clearfix">
        <template v-for="(item,i) in imgList" v-if="i<9">
          <span class="img-list-item" v-lazy:background-image="item" :key="i" @click.stop="show(i)"></span>
        </template>
      </div>
      <template v-if="dynamic.goods_info">
        <dynamic-goods :goods-title="dynamic.goods_info.goods_title" :goods-head="dynamic.goods_info.goods_head"></dynamic-goods>
      </template>

    </div>

    <div class="dynamic-card-footer" v-if="$isPlus()">
      <dynamic-tool :dynamic="dynamic"></dynamic-tool>
    </div>

  </div>
</template>
<script src="./dynamic-card.js"></script>

<style lang="scss" scoped>
@import "dynamic-card.scss";
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: "加载失败";
  color: red;
}
</style>
