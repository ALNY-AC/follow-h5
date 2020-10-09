// @ts-nocheck
import Chat from "./v/Chat.js";
import ChatMsg from "@/components/Chat/ChatMsg/ChatMsg.vue";
let chat;

export default {
    name: 'Chat',
    props: {},
    data() {
        return {
            msgList: [],
            data: {
                msg: '',
                msg_type: 1
            },
            time: null,
            admin_id: 'root'
        };
    },
    methods: {
        pull() {
            if (this.data.msg.length <= 0) {
                // 不能为空
                return;
            }
            let data = {
                msg: this.data.msg + '',
                admin_id: this.admin_id,
                msg_type: this.data.msg_type
            };
            this.data.msg = '';
            this.$post('Chat/creat', {
                data: data
            }, res => {
                if (res.res >= 1) {
                    this.msgList.push(res.msg);
                    chat.addId(res.msg.chat_id);
                    //更新本地记录
                    let total = chat.getLocalTotal()
                    chat.setLocalTotal(++total);
                }
            });
        },
        getData() {
            this.$get('Chat/getData', {
                chat_id: chat.getLocal()
            }, res => {
                if (res.res >= 0) {
                    this.msgList = res.msg;
                }
            });
        },
        stop() {
            clearInterval(this.time);
        },
        start() {
            this.time = setInterval(() => {
                // concat
                this.$get('Chat/update', {
                    localTotal: chat.getLocalTotal(),
                    admin_id: this.admin_id,
                }, res => {

                    if (res.res >= 1) {
                        // 有数据更新
                        // 将数量写入到本地
                        chat.setLocalTotal(res.total);
                        // 将最新消息插入到msg列表中
                        this.msgList = this.msgList.concat(res.msg);
                        // 将这些消息的id插入到本地
                        res.msg.forEach(item => {
                            chat.addId(item.chat_id);
                        });
                        //消息更新完成
                    }
                    if (res.res == 0) {
                        // 没有数据更新
                    }
                    if (res.res < 0) {
                        // 错误
                    }
                });
            }, 2000)
        },
        remove(id) {
            chat.removeId(id);

        },
        clear() {
            chat.clearLocalId();
            chat.setLocalTotal(0);
            this.msgList = [];
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.stop();
        chat = new Chat(this);
        this.getData();
        this.start();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() {
        this.stop();

    },

    components: {
        [ChatMsg.name]: ChatMsg
    },
    watch: {}
};