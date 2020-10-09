// @ts-nocheck
export default {
    name: 'KillGoodsCard',
    props: {
         goods: {
            type: Object,
            default(){
                return {
                     goodInfo:{},
                }
            },
        },
    },
    data() {
        return {
            goodInfo:{},
            remindMe:false,
            killPercentage:100,
        }
    },
    methods: {
        update(){
            setTimeout( ()=>{
                this.goodInfo=this.goods;
                this.goods.is_warn?this.remindMe=true:this.remindMe=false;
                // this.killPercentage=(this.goodInfo.stock_num_total - this.goodInfo.stock_num)/this.goodInfo.stock_num_total*100;



                console.log()
            }, 200)
        },
        showInfo() {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: this.goodInfo.goods_id,
                    activity_type:"kill",
                }
            });
        },
        remindMeFun(){
            if(this.remindMe){
                this.remindMe=false;
                //this.$toast('开抢前10分钟将会提醒你哦');
                this.status=1;
            }else{
                this.remindMe=true;
                //this.$toast('提醒已取消,您可能会抢不到哦');
                this.status=2;
            }
            this.$get('kill/setWarn', {
                goods_id: this.goodInfo.goods_id ,
                type:'kill',
                // msg_title:this.goodInfo.goods_title,
                status:this.status,
            })
        }
    },
    computed: {
    },
    //过滤器
    filters: {},
    mounted() {
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        // "goodInfo":{
        //     handler(newName, oldName) {
        //         console.log(newName);
        //         console.log(oldName);
        //         // if (oldName.length > 0) {
        //         //     this.isShowNoSave = true;
        //         // }
        //     },
        //     deep: true
        // }
    }
};