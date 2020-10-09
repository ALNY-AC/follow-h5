<template>
  <div class="dynamic-tool" v-if="dynamic" @click.stop>

    <div @click.stop="download()" class="dynamic-tool-item">
      <i class="icon fa fa-download"></i>
      <span>下载图文</span>
    </div>
    <div @click.stop="share()" class="dynamic-tool-item">
      <i class="icon fa fa-share-square-o"></i>
      <span>分享</span>
    </div>

  </div>
</template>
<script src="./dynamic-tool.js"></script>
<style lang="scss" scoped>
@import "dynamic-tool.scss";
</style>