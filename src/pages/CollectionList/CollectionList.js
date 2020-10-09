import { Dialog } from "vant";
import { SubmitBar, Card, SwipeCell } from "vant";

export default {
    name: "CollectionList",
    props: {},
    data() {
        return {
            goodsList: [],
            loading: false,
            finished: false,
            page: 1,
            page_size: 5,
            empty: false,
        };
    },
    methods: {
        update() {
            this.$get("collection/getList", {
                page: this.page,
                page_size: this.page_size,
            }, res => {
                this.loading = false;
                if (res.res >= 1) {
                    this.finished = false;
                    this.page++;
                    res.msg.forEach(item => {
                        this.goodsList.push(item);
                    });
                } else {
                    //加载完成
                    this.finished = true;
                }
            });
        },
        onLoad() {
            this.update();
        },
        del(item, index, list) {
            Dialog.confirm({
                message: "确定删除吗？"
            }).then(() => {
                this.$post(
                    "collection/change",
                    {
                        goods_id: item.goods_id
                    },
                    res => {
                        if (res.res >= 1) {
                            list.splice(index, 1);
                            this.$toast("删除成功");
                        }
                        if (res.res < 1) {
                            this.$toast("删除失败！请重试~");
                        }
                    }
                );
            });
        },
        showInfo(item) {
            this.$push({
                path: "/goodsInfo",
                query: {
                    goods_id: item.goods_id
                }
            });
        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        upSize();
        this.update();
        this.$nextTick(() => { });
    },
    created() {
    },
    activated() {
    },
    //Vue 实例销毁后调用
    destroyed() { },
    watch: {},
    components: {
        [SubmitBar.name]: SubmitBar,
        [Card.name]: Card,
        [SwipeCell.name]: SwipeCell
    }
};

function upSize() {
    function up() {
        document.getElementsByTagName("html")[0].style.fontSize =
            window.innerWidth / 10 + "px";
    }
    up();
    window.addEventListener("resize", () => {
        up();
    });
}