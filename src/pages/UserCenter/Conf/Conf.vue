<template>
  <div id="Conf">
    <van-nav-bar title="个人信息" fixed left-arrow @click-left="$back()"></van-nav-bar>

    <mu-list>

      <template v-if="isLogin()">
        <mu-divider class="no-left"></mu-divider>

        <mu-list-item button>
          <mu-list-item-title>用户头像</mu-list-item-title>
          <mu-list-item-action>
            <van-uploader accept="image/*" :max-size="3145728" :after-read="onRead" @oversize="$toast('文件大小超出限制！')">
              <img class="user-head" :src="$getUrl(conf_user_head)" v-if="$userInfo && $userInfo.user_head">
              <img class="user-head" src="@/assets/logo.png" v-else>
            </van-uploader>
          </mu-list-item-action>
        </mu-list-item>

        <mu-divider></mu-divider>

        <mu-list-item button @click="isLogin()?showSaveName=true:$noLogin();">
          <mu-list-item-title>用户昵称</mu-list-item-title>
          <mu-list-item-action>
            {{$userInfo?conf_user_name:''}}
          </mu-list-item-action>
        </mu-list-item>

        <mu-divider></mu-divider>

        <mu-list-item button @click="isLogin()?$push('/address/list'):$noLogin();">
          <mu-list-item-title>我的地址</mu-list-item-title>
          <mu-list-item-action>
            <van-icon name="arrow" />
          </mu-list-item-action>
        </mu-list-item>

        <mu-divider></mu-divider>

        <mu-list-item button @click="isLogin()?toPay():$noLogin();">
          <mu-list-item-title>支付密码</mu-list-item-title>
          <mu-list-item-action>
            <van-icon name="arrow" />
          </mu-list-item-action>
        </mu-list-item>

        <mu-divider></mu-divider>

        <mu-list-item button>
          <mu-list-item-title>手机号</mu-list-item-title>
          <mu-list-item-action>
            <span>
              {{$userInfo.user_id}}
            </span>
          </mu-list-item-action>
        </mu-list-item>

        <mu-divider></mu-divider>

      </template>

      <mu-list-item button @click="isLogin()?toTest():$noLogin();">
        <mu-list-item-title>当前版本</mu-list-item-title>
        <mu-list-item-action>
          <span class="version">
            <span>{{version}}</span>
            <van-icon name="arrow" />
          </span>
        </mu-list-item-action>
      </mu-list-item>

      <mu-divider class="no-left"></mu-divider>

    </mu-list>

    <div class="sin-out">
      <mu-button v-if="isLogin()" full-width large color="error" @click="$sinOut()">退出登录</mu-button>
      <mu-button v-else full-width large color="error" @click="$noLogin()">登录</mu-button>
    </div>

    <van-dialog show-cancel-button v-model="showSaveName" @confirm="saveUserName">
      <van-field v-model="user_name" label="昵称" placeholder="修改昵称" />
    </van-dialog>

  </div>
</template>

<script>
import { Dialog, Uploader, ImagePreview } from "vant";

import { Pay } from "@/plugin/Pay.js";

export default {
  name: "Conf",
  props: {},
  data() {
    return {
      conf_user_head: "",
      conf_user_name: "",
      user_name: "",
      showSaveName: false,
      version: window["version"],
      clickCount: 1,
      timeout: null,
      testCount: 6
    };
  },
  methods: {
    toTest() {
      clearTimeout(this.timeout);
      // return;
      // if (this.$isPlus()) {
      //   if (!this.$isIos()) {
      //     this.$get(
      //       "Version/inspect",
      //       {
      //         app_version: this.version
      //       },
      //       res => {
      //         if (res.res == 1) {
      //           // 需要版本升级
      //           this.$dialog
      //             .confirm({
      //               title: "发现新版本",
      //               message: "是否立即更新？"
      //             })
      //             .then(() => {
      //               this.$downFile(res.url);
      //             })
      //             .catch(() => {});
      //         } else {
      //           this.$toast("已经是最新版本了！");
      //         }
      //       }
      //     );
      //   }
      // }
      // return;

      if (this.clickCount >= this.testCount) {
        this.$push("/Test");
        this.clickCount = 1;
        this.$toast("已进入开发者模式");
      } else {
        // if (this.clickCount > this.testCount / 2) {
        // this.$toast(
        //   `再点击${this.testCount - this.clickCount}次，进入开发者模式`
        // );
        // }
        this.clickCount++;
      }

      this.timeout = setTimeout(() => {
        this.clickCount = 1;
      }, 1000);
    },
    toPay() {
      if (confirm("点击确定发送验证码。")) {
        this.$push("/pay_code");
      }
    },
    onRead(file) {
      const loading = this.$toast.loading({
        mask: true,
        message: "保存中"
      });
      this.$post("use/saveFile", { file: file.content }, res => {
        if (res.res >= 1) {
          this.$post(
            "user/save",
            {
              save: {
                user_head: res.msg
              }
            },
            res => {
              if (res.res >= 1) {
                this.$toast("保存成功~");
                this.$getUserInfo(res => {
                  this.conf_user_head = res.user_head;
                });
                loading.clear();

                return;
              }
            }
          );
          return;
        }
      });
    },
    saveUserName() {
      let user_name = this.user_name + "";
      this.user_name = "";

      //用户名正则，4到16位（字母，数字，下划线，减号）
      var uPattern = /[a-zA-Z0-9_\u4E00-\u9FA5-]$/;
      //输出 true

      if (!uPattern.test(user_name)) {
        this.$toast({
          message: "用户昵称1到16位，且只能字母，数字，下划线，减号~",
          position: "bottom"
        });
        return false;
      }

      if (user_name.length < 1 || user_name.length > 16) {
        this.$toast({
          message: "用户昵称1到16位",
          position: "bottom"
        });
        return false;
      }

      this.$loading(0, "保存中~");
      if (user_name.length <= 0) {
        return;
      }
      this.$post(
        "user/save",
        {
          save: {
            user_name: user_name
          }
        },
        res => {
          this.$clearLoading();
          if (res.res >= 1) {
            // $userInfo.user_name = user_name
            this.$getUserInfo(res => {
              this.conf_user_name = res.user_name;
            });

            return;
          }
        }
      );
    },
    share() {
      // this.$share.push({
      //   vm: this,
      //   wx: {
      //     title: this.goods.goods_title,
      //     content: this.goods.sub_title ? this.goods.sub_title : "",
      //     href: `${this.$shareUrl}${window.location.hash}&share_id=${
      //       this.userInfo.user_id
      //     }`,
      //     thumbs: [this.$getUrl(this.goods.goods_head)],
      //     extra: { scene: "WXSceneSession" }
      //   }
      // });
    },
    isLogin() {
      return !(this.$userInfo.user_id == -1);
    }
  },
  computed: {
    isVip() {
      return this.isLogin() && this.$userInfo.user_vip_level > 0;
    }
  },
  //过滤器
  filters: {},
  mounted() {
    // server.followenjoy.cn/index.php/Home/index/index2
    // window.location.href = "server.followenjoy.cn/index.php/Home/index/index2";
    // this.$get("index/index2", {}, res => {
    // });
    this.isLogin();
    this.$nextTick(() => {});
    this.conf_user_name = this.$userInfo.user_name;
    this.conf_user_head = this.$userInfo.user_head;
  },
  activated() {},
  created() {
    this.$getUserInfo();
  },
  //Vue 实例销毁后调用
  destroyed() {},
  watch: {},
  components: {
    [Uploader.name]: Uploader
  }
};
</script>
<style lang="scss" scoped>
@import "Conf.scss";
</style>
