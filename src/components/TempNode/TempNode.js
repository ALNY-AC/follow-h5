export default {
    name: 'TempNode',
    props: {
        tree: {
            type: [Object, Array],
            default() {
                return []
            }
        },
    },
    data() {
        return {};
    },
    methods: {
        show(col, node) {

            if (this.$isCube()) {
                if (col.link_type == 'GoodsInfo') {
                    cube.openWindows('goodsInfo', col.link_id);
                    return;
                }
                if (col.link_type == 'TempPages') {
                    cube.openWindows('tempPages', col.link_id);
                    return;
                }
                if (col.link_type == 'SpecialPaperInfo') {
                    cube.openWindows('paper', col.link_id);
                    return;
                }
                return;
            }

            if (col.link_type == 'Url') {
                window.location.href = col.link_id;
                return;
            }

            if (col.link_type == 'GoodsInfo') {
                this.$push({
                    path: "/GoodsInfo",
                    query: {
                        goods_id: col.link_id
                    }
                });
                return;

            }
            if (col.link_type == 'GoodsGroup') {
                this.$push({
                    path: "/GoodsGroup",
                    query: {
                        goods_group_id: col.link_id
                    }
                });
                return;

            }
            if (col.link_type == 'SpecialPaperInfo') {
                this.$push({
                    path: "/SpecialPaperInfo",
                    query: {
                        special_paper_id: col.link_id
                    }
                });
                return;

            }

            if (col.link_type == 'SpecialGoodsFlow') {
                this.$push({
                    path: "/SpecialGoodsFlow",
                    query: {
                        special_id: col.link_id
                    }
                });
                return;

            }

            if (col.link_type == 'Kill') {

                this.$push({
                    path: "/Kill",
                    query: {
                    }
                });
                return;

            }
            if (col.link_type == 'Dynamic') {
                this.$push({
                    path: "/HomePage/dynamic",
                    query: {
                    }
                });
                return;

            }
            if (col.link_type == 'Class') {
                this.$push({
                    path: "/Class",
                    query: {
                    }
                });
                return;
            }
            if (col.link_type == 'MemberExclusive') {
                this.$push({
                    path: "/MemberExclusive",
                    query: {
                    }
                });
                return;
            }
            if (col.link_type == 'TempPages') {
                this.$push({
                    path: "/TempPages",
                    query: {
                        temp_pages_id: col.link_id
                    }
                });
                return;
            }


            if (col.goods_id.length > 0) {
                this.$push({
                    path: "/GoodsInfo",
                    query: {
                        goods_id: col.goods_id
                    }
                });
                return;
            }

        },
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() { this.$nextTick(() => { }) },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};