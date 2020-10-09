export default {
    name: 'CountDown',
    props: {
        time: {
            type: [String,Number],
            defalut : "",
        },
    },
    data() {
        return {
            h:"--",
            m:"--",
            s:"--",
            RemainTime:"",
        };
    },
    methods: {
        update(){
                
        },
        dev(){

            this.h=parseInt(this.RemainTime/60/60);
            this.m=parseInt((this.RemainTime-this.h*60*60)/60);
            this.s=parseInt(this.RemainTime-this.h*60*60-this.m*60);

            this.RemainTime-- ;
            if(this.RemainTime<=0){
                this.stop();
                this.$emit('on-end');
            }  
        },
        stop(){
            clearInterval(this.timefun);
        },
        start(){
            if((this.time+'').length>0){

                this.stop();
                this.timefun = setInterval(() => {
                    this.dev();
                }, 1000);

            }

        }
            
    },
    computed: {
        o_h(){
          return  (this.h+'').length<=1?'0'+this.h:this.h;
        },
        o_s(){
          return  (this.s+'').length<=1?'0'+this.s:this.s;
        },
        o_m(){
          return  (this.m+'').length<=1?'0'+this.m:this.m;
        }
    },
    //过滤器
    filters: {},
    mounted() {
        this.RemainTime=this.time;
        this.start();  
    },
    activated(){
        this.start();
    },
    deactivated(){
        this.stop();
    },
    //Vue 实例销毁后调用
    destroyed() {
     },
    components: {

    },
    watch: {
        time(){
            this.RemainTime=this.time;
            this.start();  
        }
    }
};