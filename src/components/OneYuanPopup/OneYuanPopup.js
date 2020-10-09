export default {
    name: 'OneYuanPopup',
    data() {
        return {
            popupShow:false,
            goodsId:'',
        };
    },
    methods: {
        oneYuanGoods(){
            if(this.goodsId.length>0){
                this.$push({
                    path: "/goodsInfo",
                    query: {
                        goods_id: this.goodsId
                    }
                });
            }
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {

        if(!sessionStorage['york_popup']){

            if(window.location.href.indexOf('/HomePage/') < 0){
                this.$get(
                    "Popup/getShowGoods",
                    {},
                    res => {
                        console.log(res)
                      if(res.res>=1){
                        this.popupShow=true ;
                        this.goodsId=res.msg;

                        sessionStorage['york_popup'] = '1';
                      }
                    },
                    error => {
                      
                    }
                );
            }
        }
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};