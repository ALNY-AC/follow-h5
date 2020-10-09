export default {
    name: 'ChatMsg',
    props: {

        chat: {
            type: Object,
            defalut: null
        },
        list: {
            type: Array,
            defalut() {
                return [];
            }
        },
        index: {
            type: Number,
            defaut: -1
        }
    },
    data() {
        return {
            isRight: false,
        };
    },
    methods: {
        remove() {
            this.list.splice(this.index, 1);
            this.$emit('remove', this.chat.chat_id);
        }
    },
    computed: {
        msg() {
            let msg = this.chat.msg;
            msg = msg.replace(/\n/g, '<br/>');
            return msg;
        }
    },
    //过滤器
    filters: {},
    mounted() {

        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {

    },
    watch: {}
};