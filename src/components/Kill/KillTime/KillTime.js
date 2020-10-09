// @ts-nocheck
export default {
    name: 'KillTime',
    props: {
        time: {
            type: [String,Number],
            defalut : "",
        },
    },
    data() {
        return {
            
        }
    },
    methods: {
        onEnd(){
            this.$emit('on-end');
        }
       
    },
    computed: {
    },
    //过滤器
    filters: {},
    mounted() {
        console.log(this.time)
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
    }
};