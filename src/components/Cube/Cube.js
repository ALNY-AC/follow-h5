export default {
    name: 'Cube',
    props: {
        CubeId: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            tree: {},
        };
    },
    methods: {
        update() {

            if (this.CubeId.length <= 0) {
                return
            }

            if (typeof localStorage['TreeCubeId' + this.CubeId] != 'undefined') {
                this.tree = JSON.parse(localStorage['TreeCubeId' + this.CubeId]);
            }

            this.$get('TempPages/get', {
                //temp_pages_id: this.temp_pages_id
                temp_pages_id: this.CubeId,
            }, res => {
                if (res.res > 0) {
                    let CubeData = res.msg;
                    localStorage['TreeCubeId' + this.CubeId] = CubeData.tree;
                    CubeData.tree = JSON.parse(CubeData.tree);

                    this.tree = CubeData.tree;
                } else {
                    this.tree = {};
                }

            });

        },

    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.update();

        this.$nextTick(() => { });
    },
    activated() {
    },
    created() {
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {
        CubeId() {
            this.update()
        }
    }
};