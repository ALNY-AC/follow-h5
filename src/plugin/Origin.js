// @ts-nocheck
import $ from "jquery";


export default function (Vue, options) {


  Vue.prototype.$isPlus = function () {
    return typeof window['plus'] == 'object';
  }

  Vue.prototype.$isIos = function () {
    return mui.os.ios;
  }

  Vue.prototype.$isCube = function () {
    return typeof window['cube'] == 'object';
  }

  // 是否是web环境
  Vue.prototype.$isWeb = function () {
    return typeof window['plus'] == 'undefined' && typeof window['cube'] == 'undefined';
  }
  //是否登录
  Vue.prototype.$isLogin = function (argument) {
    return this.$userInfo.user_id >= 0;
  }
  // 输入框
  Vue.prototype.$prompt = function (title, fun) {


  }
  Vue.prototype.$getStatusbarHeight = function () {
    if (this.$isPlus()) {
      return plus.navigator.getStatusbarHeight();
    } else {
      return 0
    }
  }


  // 输入框
  Vue.prototype.$setTitle = function (title) {
    $('title').text(title);
  }


  /**
   * 回退，如果没有就回到首页
   */
  Vue.prototype.$back = function (index = -1) {
    // if (this.$isWeb()) {
    //     this.$store.commit('setWindowAnimation', '');
    // } else {
    //     this.$store.commit('setWindowAnimation', 'slide-right');
    // }
    // return;
    if (history.length <= 1) {
      this.$replace({
        path: '/HomePage'
      });
    } else {
      this.$router.go(index);
    }

  }


  /**
   * 再次封装路由的跳转
   */
  Vue.prototype.$replace = function (conf) {
    if (this.$isWeb()) {
      this.$store.commit('setWindowAnimation', '');
    } else {
      this.$store.commit('setWindowAnimation', 'slide-left');
    }
    if (typeof conf == 'string') {
      conf = {
        path: conf,
        query: {}
      }
    }

    if (typeof conf['query'] == 'undefined') {
      conf['query'] = {};
    }

    let shop_id = this.$route.query.shop_id;
    if (typeof shop_id == 'undefined') {
      shop_id = -1;
    }

    let share_id = this.$route.query.share_id;
    if (typeof share_id == 'undefined') {
      share_id = -1;
    }

    if (typeof share_id == 'object') {
      share_id = share_id[0];
    }


    if (typeof shop_id == 'object') {
      shop_id = shop_id[0];
    }


    conf['query'].shop_id = shop_id;
    conf['query'].share_id = share_id;
    this.$router.replace(conf);

  }

  /**
   * 再次封装路由的跳转
   */
  Vue.prototype.$push = function (conf) {

    if (this.$isWeb()) {
      this.$store.commit('setWindowAnimation', '');
    } else {
      this.$store.commit('setWindowAnimation', 'slide-left');
    }


    if (typeof conf == 'string') {
      conf = {
        path: conf,
        query: {}
      }
    }

    if (typeof conf['query'] == 'undefined') {
      conf['query'] = {};
    }


    // share_id


    let shop_id = this.$route.query.shop_id;
    if (typeof shop_id == 'undefined') {
      shop_id = -1;
    }


    let share_id = this.$route.query.share_id;
    if (typeof share_id == 'undefined') {
      share_id = -1;
    }

    if (typeof share_id == 'object') {
      share_id = share_id[0];
    }


    if (typeof shop_id == 'object') {
      shop_id = shop_id[0];
    }

    conf['query'].shop_id = shop_id;
    conf['query'].share_id = share_id;


    this.$router.push(conf);

  }

}
