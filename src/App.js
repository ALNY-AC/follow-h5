// @ts-nocheck
import { Tabbar, TabbarItem } from "vant";
import { format } from "url";

export default {
  name: "App",
  data() {
    return {
      active: 0,
      navList: [
        {
          isShow: true,
          isLogin: false,
          path: "/HomePage",
          title: "首页",
          icon: {
            normal: '/static/nav/home_icon_tab_def.png',
            active: '/static/nav/home_icon_tab_sel.png'
          },
          info: ""
        },
        {
          isShow: true,
          isLogin: false,
          path: "/HomePage/dynamic",
          title: "发现",
          icon: {
            normal: '/static/nav/find_icon_tab_def.png',
            active: '/static/nav/find_icon_tab_sel.png'
          },
          info: ""
        },
        {
          isShow: true,
          isLogin: true,
          path: "/HomePage/bag",
          title: "购物袋",
          icon: {
            normal: '/static/nav/shoppingbag_icon_tab_def.png',
            active: '/static/nav/shoppingbag_icon_tab_sel.png'
          },
          info: ''
        },
        {
          isShow: true,
          isLogin: true,
          path: "/HomePage/shop",
          title: "店铺",
          icon: {
            normal: '/static/nav/shop_icon_tab_def.png',
            active: '/static/nav/shop_icon_tab_sel.png'
          },
          info: ""
        },
        {
          isShow: true,
          isLogin: false,
          path: "/HomePage/userCenter",
          title: "个人中心",
          icon: {
            normal: '/static/nav/personal_icon_tab_def.png',
            active: '/static/nav/personal_icon_tab_sel.png'
          },
          info: ""
        }
      ],
      isShowNav: true,//是否显示导航栏1
      badgeBagNum: 0,
      userInfo: null,
    };
  },
  methods: {
    show(index) {
      this.userInfo = this.$getUserInfo();
      if (this.navList[index].isLogin) {
        if (this.isLogin) {
          this.$replace({ path: this.navList[index].path });
        } else {
          this.$noLogin();
        }
      } else {
        this.$replace({ path: this.navList[index].path });
      }
      localStorage.Appactive = index;
      this.update();
    },
    update() {
      this.userInfo = this.$getUserInfo();
      if (this.userInfo.user_id !== -1 && parseInt(this.userInfo.user_vip_level) > 0) {
        // 这是会员状态
        this.navList.forEach(item => {
          if (item.title == '店铺') {
            item.isShow = true;
          } else {
            item.isShow = true;
          }
        });
      } else {
        // 这是非会员状态
        this.navList.forEach(item => {
          if (item.title == '店铺') {
            item.isShow = false;
          } else {
            item.isShow = true;
          }
        });
      }
    },
    paddingTop() {
      return 0;
    },
    transitionName() {
      return '';
      return this.$store.state.windowAnimation;
    },
    isShowShop() {
      if (this.$userInfo.user_id !== -1 && parseInt(this.$userInfo.user_vip_level) > 0) {
        return true;
      } else {
        return false;
      }
    },

    ShopBadge() {
      if (this.$userInfo.user_id != -1) {
        this.$get('BagPlus/getBagNum', {}, res => {
          if (res.res >= 1) {
            this.badgeBagNum = res.msg;
          }
        });
      }
    }

  },
  computed: {
    isLogin() {
      return this.$userInfo.user_id >= 0;
    },
    // 
  },
  //过滤器
  filters: {},
  mounted() {
    // this.active = parseInt(localStorage.Appactive);

    this.$nextTick(() => {
      this.update();
    });

  },
  //Vue 实例销毁后调用
  destroyed() { },
  activated() {
    this.update();
  },
  watch: {
    active() {
      this.ShopBadge()
    },
    $route(to, from) {

      if (to.path == '/') {
        this.$replace("/HomePage");
        return;
      }
      this.$store.state.hideShare();


      this.$clearLoading();
      this.update();

      const toDepth = to.meta.index;
      const fromDepth = from.meta.index;

      this.navList.forEach((item, i) => {
        if (item.path == to.path) {
          this.active = i;
          localStorage.Appactive = i;
        }
      });


      if (to.path.indexOf('HomePage') > 0 || to.path.indexOf('homePage') > 0) {
        this.isShowNav = true;
      } else {
        this.isShowNav = false;
      }

      //购物车红点
      this.ShopBadge()
    },
  },
  components: {
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar
  }
};