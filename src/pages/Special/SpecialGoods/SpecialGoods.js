import { ESRCH } from "constants";

export default {
    name: 'SpecialGoods',
    props: {},
    data() {
        return {
            list: [],
            special_id: '',
            special: null,
        };
    },
    methods: {

        share() {
            let img = this.special.special_head;
            ;
            this.$share.push({
                vm: this,
                wx: {
                    title: this.special.special_title,
                    content: this.special.special_info ? this.special.special_info : "",
                    href: `${this.$shareUrl}/${window.location.hash}`,
                    thumbs: [this.$getUrl(img)],
                    extra: { scene: "WXSceneSession" }
                }
            });
        },
        goInfo(item) {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: item.goods_id
                }
            });
        },
        update() {
            this.$get('Special/get', {
                special_id: this.special_id,
            }, res => {
                this.list = res.msg.goodsList;
                this.special = res.msg;
            });
        }
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() {
        this.$nextTick(() => { });
    },
    activated() {
        if (this.$route.query.special_id != this.special_id) {
            this.special = null;
            this.update();
        }
    },
    created() {
        this.special_id = this.$route.query.special_id;
        this.update();
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};