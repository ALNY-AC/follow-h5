// @ts-nocheck
import Vue from 'vue';



// vue/dist/vue.runtime.common.js
// import Vue from "vue/dist/vue.runtime.common.js";
import App from './App.vue';
import router from './router';
import components from './plugin/components.js';
import Origin from './plugin/Origin.js';
import url from './plugin/url.js';
import ajax from './plugin/ajax.js';
import Vuex from 'vuex';

import $ from 'jquery';


import MuseUI from 'muse-ui';
import Helpers from 'muse-ui/lib/Helpers';
Vue.use(Helpers);
Vue.use(MuseUI);

import 'muse-ui/dist/muse-ui.css';

$.extend({
    getUrlVars: function () {
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

import 'vant/lib/vant-css/icon-local.css';
import '@/style/style.scss';
import '@/style/theme/Vant.scss';
import 'font-awesome-webpack'

import {
    Tab,
    Tabs,
    NavBar,
    Icon,
    Search,
    Swipe,
    SwipeItem,
    PullRefresh,
    List,
    Toast,
    Button,
    Popup,
    Checkbox,
    CheckboxGroup,
    Row,
    Col,
    Cell,
    CellGroup,
    Badge,
    Field,
    Loading,
    Lazyload,
    Radio,
    Tag,
    Dialog,
    ContactCard,
    ContactList,
    ContactEdit,
    RadioGroup,
    Panel,
    Area,
    PasswordInput,
    NumberKeyboard,
    Step,
    Steps,
    Stepper,
    NoticeBar,
    Progress,
    Switch,
} from "vant";

Vue.use(Tab)
    .use(Tabs)
    .use(NavBar)
    .use(Icon)
    .use(Search)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(Toast)
    .use(Button)
    .use(Popup)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Row)
    .use(Col)
    .use(Cell)
    .use(CellGroup)
    .use(Badge)
    .use(Field)
    .use(Loading)
    .use(Lazyload)
    .use(Radio)
    .use(Tag)
    .use(Dialog)
    .use(ContactCard)
    .use(ContactList)
    .use(ContactEdit)
    .use(RadioGroup)
    .use(Panel)
    .use(Area)
    .use(PasswordInput)
    .use(NumberKeyboard)
    .use(Step)
    .use(Steps)
    .use(Stepper)
    .use(NoticeBar)
    .use(Progress)
    .use(Switch)


//=======================================================================
//官方插件
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        showShare: null,
        hideShare: null,
        statusbarHeight: 0,
        windowAnimation: '',
    },
    mutations: {
        setShow(state, fun) {
            state.showShare = fun;
        },
        setHide(state, fun) {
            state.hideShare = fun;
        },
        setStatusbarHeight(state, v) {
            state.statusbarHeight = v;
        },
        setWindowAnimation(state, v) {
            state.windowAnimation = v;
        },
    }
})

//=======================================================================
//自定义插件
import Directive from './plugin/directive.js';
Vue.use(Directive);
Vue.use(url);//url处理
Vue.use(components);//自己的组件列表
Vue.use(ajax);

Vue.use(Origin);



//=======================================================================
//第三方插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);

import PullTo from 'vue-pull-to';
Vue.component('pull-to', PullTo);
//=======================================================================


Vue.config.productionTip = true;


//消除手机端点击延迟
// const FastClick = require('fastclick');
// FastClick.attach(document.body);

/* eslint-disable no-new */

// router.beforeEach((to, from, next) => {
//    
//     // router.addRoutes({
//     //     query: {
//     //         shop_id: 111,
//     //     }
//     // })
//     next();
//     // setTimeout(() => {}, 300);
//     /**
//     http://192.168.1.251:8080/#/TempPages?temp_pages_id=0294915281b6ab207cce1823dbf95d99&shop_id=96134477

//      *
//      *
//      */

// })

new Vue({
    el: '#App',
    router,
    store,
    render: h => h(App),
    mounted() {

        router.afterEach((to, from) => {

            this.$nextTick(() => {

                if (this.$isWeb()) {
                    this.$store.commit('setWindowAnimation', '');
                } else {
                    this.$store.commit('setWindowAnimation', 'slide-right');
                }

            });

        })

        if (window.location.hash == "#/") {
            router.replace({
                path: '/HomePage'
            });
        }

        let user_id = $.getUrlVar('user_id');
        let shop_id = $.getUrlVar('shop_id');
        let token = $.getUrlVar('token');
        let backUrl = $.getUrlVar('backUrl');


        if (!backUrl) {
        } else {
            localStorage.backUrl = backUrl;
        }

        let unionid = $.getUrlVar('unionid');

        // 不存在
        // 可以直接登录

        if (!user_id) {
            // 不存在

            return;
        } else {
            // 存在
            localStorage.user_id = user_id;
        }

        if (!token) {
            // 不存在

            return;
        } else {
            // 存在
            localStorage.token = token;
        }
        // this.$get("login/isLogin");

    }
})


// mui.init({
//   keyEventBind: {
//     backbutton: false //关闭back按键监听
//   }
// });
