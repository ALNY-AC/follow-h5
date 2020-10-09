export default {
    name: 'Badge',
    props: {
        title: {
            type: [String,Number],
            default: ''
        }
    },
    data() {
        return {
            show:false,
        };
    },
    methods: {
        update(){
            this.title != 0 ?this.show=true:this.show=false;
        }
    },
    computed: {
        
    },
    //过滤器
    filters: {},
    beforeMount(){
        this.update();
    },
    activated(){
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        title: function () {
          this.update();
        },
    }
};