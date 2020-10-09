import { ImagePreview } from "vant";
export default {
    name: "dynamic-card",
    props: {
        dynamic: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            labels: [
                { type: "red", outlined: false },
                { type: "red", outlined: true }
            ],
            imgList: [],
            isLoading: false
        };
    },
    methods: {
        showUser() {
            this.$push({
                path: "/dynamic/user",
                query: {
                    user_id: this.dynamic.user_id
                }
            });
        },
        show(index) {
            ImagePreview(this.imgList, index);
        },
        showInfo() {
            if (!this.dynamic.goods_info) {
                return;
            }
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: this.dynamic.goods_info.goods_id
                }
            });
        },
        follow() {
            this.isLoading = true;
            this.$get(
                "follow/follow",
                {
                    follow_id: this.dynamic.user_id
                },
                res => {
                    this.isLoading = false;

                    if (res.res >= 1) {
                        this.$toast("关注成功~");
                        this.dynamic.is_follow = true;
                        return;
                    }
                    this.$toast("操作失败！请重试~");
                }
            );
        },
        cancelFollow() {
            this.isLoading = true;
            this.$get(
                "follow/cancelFollow",
                {
                    follow_id: this.dynamic.user_id
                },
                res => {
                    this.isLoading = false;

                    if (res.res >= 1) {
                        this.$toast("已取消关注~");
                        this.dynamic.is_follow = false;
                        return;
                    }
                    this.$toast("操作失败！请重试~");
                }
            );
        }
    },
    computed: {
        content() {
            let content = this.dynamic.dynamic_content;
            content = content.replace(/\r\n/g, "<br/>");
            content = content.replace(/\n/g, "<br>");
            return content;
        }
    },
    //过滤器
    filters: {},
    mounted() {
        var list = this.dynamic.img_list;
        for (let i = 0; i < list.length; i++) {
            this.imgList.push(this.$getUrl(list[i].src));
        }
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {},
    directives: {}
};