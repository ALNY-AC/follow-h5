// @ts-nocheck
import Vue from 'vue';
import Router from 'vue-router';




const Home = () => import('@/pages/Home/Home.vue');
const Bag = () => import('@/pages/Bag/Bag.vue');
const UserCenter = () => import('@/pages/UserCenter/UserCenter.vue');

const Money = () => import('@/pages/UserCenter/Money/Money.vue');
const Coupon = () => import('@/pages/UserCenter/Coupon/Coupon.vue');
const Conf = () => import('@/pages/UserCenter/Conf/Conf.vue');
const DrawMoney = () => import('@/pages/UserCenter/DrawMoney/DrawMoney.vue');
const DrawMoneyInfo = () => import('@/pages/UserCenter/DrawMoney/DrawMoneyInfo/DrawMoneyInfo.vue');


const Shop = () => import('@/pages/Shop/Shop.vue');
const ShopData = () => import('@/pages/Shop/ShopData/ShopData.vue');


const Dynamic = () => import('@/pages/Dynamic/Dynamic.vue');
const DynamicAdd = () => import('@/pages/DynamicAdd/DynamicAdd.vue');



const AddressList = () => import('@/pages/Addresss/List/List.vue');

const AddressAdd = () => import('@/pages/Addresss/Add/Add.vue');
const AddressEdit = () => import('@/pages/Addresss/Edit/Edit.vue');


const GoodsInfo = () => import('@/pages/GoodsInfo/GoodsInfo.vue');

const Login = () => import('@/pages/Login/Login.vue');
const PhoneLogin = () => import('@/pages/PhoneLogin/PhoneLogin.vue');

const CollectionList = () => import('@/pages/CollectionList/CollectionList.vue');

const DynamicUser = () => import('@/pages/Dynamic/User/User.vue');

const DynamicUpList = () => import('@/pages/Dynamic/UpList/UpList.vue');

const VipSub = () => import('@/pages/Vip/Sub/Sub.vue');
const Vip = () => import('@/pages/Vip/Vip.vue');

const OrderAdd = () => import('@/pages/Order/OrderAdd/OrderAdd.vue');


const State = () => import('@/pages/State/State.vue');

const MsgList = () => import('@/pages/Msg/MsgList/MsgList.vue');
const MsgType = () => import('@/pages/Msg/MsgType/MsgType.vue');
const MsgInfo = () => import('@/pages/Msg/MsgInfo/MsgInfo.vue');


const Special = () => import('@/pages/Special/Special.vue');


const OrderList = () => import('@/pages/Order/OrderList/OrderList.vue');


const OrderInfo = () => import('@/pages/Order/OrderInfo/OrderInfo.vue');


const PaperList = () => import('@/pages/Paper/PaperList/PaperList.vue');
const PaperInfo = () => import('@/pages/Paper/PaperInfo/PaperInfo.vue');
const PaperClassLsit = () => import('@/pages/Paper/PaperClassLsit/PaperClassLsit.vue');

const HelpType = () => import('@/pages/Help/HelpType/HelpType.vue');
const HelpList = () => import('@/pages/Help/HelpList/HelpList.vue');
const HelpInfo = () => import('@/pages/Help/HelpInfo/HelpInfo.vue');


const Search = () => import('@/pages/Search/Search.vue');

const AfterSale = () => import('@/pages/AfterSale/AfterSale.vue');
const afterSaleLogisticsNumber = () => import('@/pages/afterSaleLogisticsNumber/afterSaleLogisticsNumber.vue');
const pay_code = () => import('@/pages/pay_code/pay_code.vue');

const Chat = () => import('@/pages/Chat/Chat.vue');


// 专题页

const SpecialPaper = () => import('@/pages/Special/SpecialPaper/SpecialPaper.vue');
const SpecialGoods = () => import('@/pages/Special/SpecialGoods/SpecialGoods.vue');
const SpecialGoodsFlow = () => import('@/pages/Special/SpecialGoodsFlow/SpecialGoodsFlow.vue');
const SpecialPaperInfo = () => import('@/pages/Special/SpecialPaperInfo/SpecialPaperInfo.vue');

const TempPages = () => import('@/pages/TempPages/TempPages.vue');
const WebView = () => import('@/pages/WebView/WebView.vue');
const ExpressInfo = () => import('@/pages/ExpressInfo/ExpressInfo.vue');

const About = () => import('@/pages/About/About.vue');


const Invite = () => import('@/pages/Invite/Invite.vue');

const WeiXinLogin = () => import('@/pages/Login/WeiXinLogin/WeiXinLogin.vue');

const Tomorrow = () => import('@/pages/Tomorrow/Tomorrow.vue');


const HomePage = () => import('@/pages/HomePage/HomePage.vue');//首页

const Test = () => import('@/pages/Test/Test.vue');//测试页面

const BecomeVip = () => import('@/pages/BecomeVip/BecomeVip.vue');//BecomeVip


const Settings = () => import('@/pages/Settings/Settings.vue');//Settings



const SecondKill = () => import('@/pages/SecondKill/SecondKill.vue');//SecondKill

const Class = () => import('@/pages/Class/Class.vue');//Class



const MemberExclusive = () => import('@/pages/MemberExclusive/MemberExclusive.vue');//MemberExclusive


const ClassGoods = () => import('@/pages/ClassGoods/ClassGoods.vue');//ClassGoods


const Pay = () => import('@/pages/Pay/Pay.vue');//支付详情页



const OriginOrderList = () => import('@/pages/Order/OriginOrderList/OriginOrderList.vue');//新的订单列表页面

const PaySuccess = () => import('@/pages/pay_success/pay_success.vue');

const Kill = () => import('@/pages/Kill/Kill.vue')

const GoodsGroup = () => import('@/pages/GoodsGroup/GoodsGroup.vue')

const ShoutPrice = () => import('@/pages/ShoutPrice/ShoutPrice.vue')

// SecondKill
// SecondKillInlet



Vue.use(Router);

export default new Router({
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      let time = 0;
      if (savedPosition) {
        setTimeout(() => {
          resolve(savedPosition);
        }, time);
      } else {
        if (from.meta.keepAlive) {
          from.meta.savedPosition = document.body.scrollTop;
        }
        setTimeout(() => {
          resolve({ x: 0, y: to.meta.savedPosition || 0 })
        }, time);
      }

    })

  },

  routes: [

    {
      path: '/HomePage',
      component: HomePage,
      meta: {
        // index: 1024,
        keepAlive: true
      },
      children: [
        {
          path: '/',
          component: Home,
          meta: {
            // index: 1024,
            keepAlive: true
          }
        },
        {
          path: 'bag',
          component: Bag,
          meta: {
            // index: 1024,
            keepAlive: true
          }
        },
        {
          path: 'userCenter',
          component: UserCenter,
          meta: {
            // index: 1024,
            keepAlive: true
          }
        },
        {
          path: 'shop',
          component: Shop,
          meta: {
            // index: 1024,
            keepAlive: true
          }
        },
        {
          path: 'dynamic',
          component: Dynamic,
          meta: {
            // index: 1024,
            keepAlive: true
          }
        },
      ]
    },

    {
      path: '/userCenter/money',
      component: Money,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/userCenter/DrawMoney',
      component: DrawMoney,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/userCenter/DrawMoney/DrawMoneyInfo',
      component: DrawMoneyInfo,
      meta: {
        // index: 1025
      }
    },


    {
      path: '/userCenter/coupon',
      component: Coupon,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/userCenter/conf',
      component: Conf,
      meta: {
        // index: 1025,
        // keepAlive: true,
      }
    },
    {
      path: '/ShopData',
      component: ShopData,
      meta: {
        // index: 1025
      }
    },

    {
      path: '/dynamic/user',
      component: DynamicUser,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/dynamic/upList',
      component: DynamicUpList,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },

    {
      path: '/dynamicAdd',
      component: DynamicAdd,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/goodsInfo',
      component: GoodsInfo,
      meta: {
        // index: 5000,
        keepAlive: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        // index: 50000
      }
    },
    {
      path: '/phoneLogin',
      component: PhoneLogin,
      meta: {
        // index: 50001
      }
    },
    {
      path: '/address/list',
      component: AddressList,
      meta: {
        // index: 1026
      }
    },
    {
      path: '/address/add',
      component: AddressAdd,
      meta: {
        // index: 1026,
        keepAlive: true
      }
    },
    {
      path: '/address/edit',
      component: AddressEdit,
      meta: {
        // index: 1026
      }
    },
    {
      path: '/collection/list',
      component: CollectionList,
      meta: {
        // index: 1025,
        // keepAlive: true
      }
    },
    {
      path: '/vip',
      component: Vip,
      meta: {
        // index: 1026
      }
    },
    {
      path: '/vip/sub',
      component: VipSub,
      meta: {
        // index: 1025
      }
    },

    {
      path: '/order/add',
      component: OrderAdd,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/state',
      component: State,
      meta: {
        // index: 2048
      }
    },
    {
      path: '/msgList',
      component: MsgList,
      meta: {
        // index: 2049
      }
    },
    {
      path: '/msgType',
      component: MsgType,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/msgInfo',
      component: MsgInfo,
      meta: {
        // index: 2050
      }
    },

    {
      path: '/special',
      component: Special,
      meta: {
        // index: 2048
      }
    },
    {
      path: '/orderList',
      component: OrderList,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/OrderInfo',
      component: OrderInfo,
      meta: {
        // index: 2048
      }
    },
    {
      path: '/paperList',
      component: PaperList,
      meta: {
        // index: 2048
      }
    },

    {
      path: '/paperInfo',
      component: PaperInfo,
      meta: {
        // index: 2050
      }
    },

    {
      path: '/PaperClassLsit',
      component: PaperClassLsit,
      meta: {
        // index: 2049
      }
    },
    {
      path: '/helpType',
      component: HelpType,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/helpList',
      component: HelpList,
      meta: {
        // index: 2048
      }
    },
    {
      path: '/helpInfo',
      component: HelpInfo,
      meta: {
        // index: 2048
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/afterSale',
      component: AfterSale,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/afterSaleLogisticsNumber',
      component: afterSaleLogisticsNumber,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/pay_code',
      component: pay_code,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/Chat',
      component: Chat,
      meta: {
        // index: 1025
      }
    },
    // 专题
    {
      path: '/SpecialPaper',
      component: SpecialPaper,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/SpecialGoods',
      component: SpecialGoods,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/SpecialGoodsFlow',
      component: SpecialGoodsFlow,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/TempPages',
      component: TempPages,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/SpecialPaperInfo',
      component: SpecialPaperInfo,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/WebView',
      component: WebView,
      meta: {
        // index: 1025
      }
    },

    {
      path: '/ExpressInfo',
      component: ExpressInfo,
      meta: {
        // index: 3078
      }
    },

    {
      path: '/About',
      component: About,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },

    {
      path: '/Invite',
      component: Invite,
      meta: {
        // index: 1025
      }
    },

    {
      path: '/WeiXinLogin',
      component: WeiXinLogin,
      meta: {
        // index: 1025
      }
    },
    {
      path: '/Tomorrow',
      component: Tomorrow,
      meta: {
        // index: 1025,
        keepAlive: true
      }
    },
    {
      path: '/Test',
      component: Test,
      meta: {
        // index: 9999999,
        keepAlive: true
      }
    },
    {
      path: '/BecomeVip',
      component: BecomeVip,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/Settings',
      component: Settings,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/SecondKill',
      component: SecondKill,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/Class',
      component: Class,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/MemberExclusive',
      component: MemberExclusive,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/ClassGoods',
      component: ClassGoods,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/Pay',
      component: Pay,
      meta: {
        // index: 2048,
      }
    },
    {
      path: '/OriginOrderList',
      component: OriginOrderList,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },
    {
      path: '/PaySuccess',
      component: PaySuccess,
      meta: {
        // index: 1025
        // keepAlive: true
      }
    },
    {
      path: '/Kill',
      component: Kill,
      meta: {
        // index: 2048,
        //keepAlive: true
      }
    },
    {
      path: '/GoodsGroup',
      component: GoodsGroup,
      meta: {
        // index: 2048,
        //keepAlive: true
      }
    },
    {
      path: '/ShoutPrice',
      component: ShoutPrice,
      meta: {
        // index: 2048,
        keepAlive: true
      }
    },

  ]
})
