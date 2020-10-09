<template>
  <div id="DynamicAdd">

    <van-nav-bar title="发布素材" fixed>
      <van-icon name="arrow-left" slot="left" @click.native="$back()" />
    </van-nav-bar>

    <p class="text-info" style="padding:0 15px;">
      素材标题
    </p>
    <van-cell-group>
      <van-field v-model="title" placeholder="输入标题" />
    </van-cell-group>

    <p class="text-info" style="padding:0 15px;">
      素材内容 (
      <span :class="{'text-danger':content.length>255}">
        {{content.length}}/255
      </span>
      )
    </p>

    <van-cell-group>
      <van-field v-model="content" placeholder="素材内容" type="textarea" :error-message="errorInfo" />
    </van-cell-group>

    <div class="img-list">
      <div class="img-card" @click="show(i)" v-for="(item,i) in imgList" :style="{backgroundImage:`url(${$getUrl(item)})`}" :key="i">

        <div class="del" @click.stop="del(item,i,imgList)">
          <van-icon name="clear" />
        </div>

      </div>
      <van-uploader :after-read="onRead">
        <div class="add-img">
          <i class="fa fa-plus"></i>
        </div>
      </van-uploader>
    </div>

    <div style="padding:10px;">
      <p>
        <dynamic-goods v-if="selectGoods" :goods-title="selectGoods.goods_title" :goods-head="selectGoods.img"></dynamic-goods>
      </p>
      <van-button size="large" @click="showPopup=true">选择商品</van-button>
    </div>

    <div style="padding:10px;">
      <van-button size="large" type="primary" @click="submit">发布素材</van-button>
    </div>

    <van-popup v-model="showPopup" position="right" :overlay="false">
      <div class="select-goods">
        <div class="select-goods-head">
          <div class="close" @click="showPopup=false">
            <van-icon name="clear" />
          </div>
        </div>
        <div class="select-goods-body">
          <select-goods :list="goodsList" v-model="selectGoods"></select-goods>
        </div>
      </div>
    </van-popup>

  </div>
</template>
<script>
import { Uploader, ImagePreview } from "vant";

import $ from "jquery";

export default {
  name: "DynamicAdd",
  props: {},
  data() {
    return {
      upath: "",
      errorInfo: "",
      title: "",
      content: "",
      imgList: [],
      bag: null,
      showPopup: false,
      goodsList: [],
      selectGoods: null
    };
  },
  methods: {
    del(item, i, list) {
      list.splice(i, 1);
    },
    show(index) {
      var list = [];
      for (let i = 0; i < this.imgList.length; i++) {
        list.push(this.$getUrl(this.imgList[i]));
      }

      ImagePreview(list, index);
    },
    submit() {
      var add = {
        goods_id: this.selectGoods ? this.selectGoods.goods_id : "",
        dynamic_title: this.title,
        dynamic_content: this.content,
        img_list: this.imgList
      };
      this.$post("dynamic/add", { add: add }, res => {
        console.log(res);
        if (res.res >= 1) {
          this.$toast("发布成功~");
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
          return;
        }
      });
    },
    onRead(file) {
      const loading = this.$toast.loading({
        mask: true,
        message: "上传中"
      });
      this.$post("use/saveFile", { file: file.content }, res => {
        setTimeout(() => {
          if (res.res >= 1) {
            loading.clear();
            this.$toast("上传成功~");
            this.imgList.push(res.msg);
            return;
          }
        }, 500);
      });
    },
    update() {
      this.$get("bag/getList", {}, res => {
        if (res.res >= 1) {
          let list = res.msg;
          var arr = [];
          console.log(list);
          list.forEach(item => {
            let snapshot = item.snapshot;
            snapshot.active = false;
            arr.push(snapshot);
          });
          this.goodsList = arr;
        }
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
  watch: {
    content(val) {
      if (val.length > 255) {
        this.errorInfo = "字数不能超过255个字";
      }
    },
    selectGoods(val) {
      this.showPopup = false;
    }
  },
  components: {
    [Uploader.name]: Uploader
  }
};
</script>
<style lang="scss" scoped>
@import "DynamicAdd.scss";
</style>