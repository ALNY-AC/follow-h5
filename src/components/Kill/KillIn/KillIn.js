// @ts-nocheck
export default {
    name: 'KillIn',
    props: {},
    data() {
        return {
            killGoods:[],
            time:'',
        }
    },
    methods: {
        update(){
            this.$get('kill/getInInfo', {
             }, res => {
                console.log(res)
                if(res.res>=1){
                    this.killGoods=res.msg;
                    this.time=res.msg[0].end_time-res.msg[0].time;
                }
            });
        },
        goKill(){
            this.$push({
                path: "/Kill",
                query: {}
            });
        },
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
    }
};