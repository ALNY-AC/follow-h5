export default {
    name: 'Class',
    props: {},
    data() {
        return {
            rootList: [],
            list: [],
            localList: {},
            isLoading: false,
        };
    },
    methods: {
        update() {
            this.$get('class/getAllRoot', {}, res => {
                this.rootList = this.bulider(res.msg);
                this.$nextTick(() => {
                    this.show(this.rootList[0]);
                });

            });
        },
        bulider(list) {
            list.forEach((item, i) => {
                item.active = false;
            });
            return list;
        },
        hideList() {
            this.rootList.forEach(item => {
                item.active = false;
            });
        },
        show(item) {
            this.hideList();
            item.active = true;
            if (!this.localList[item.class_id]) {
                // 没有，查找
                this.isLoading = true;
                this.$loading();
                this.$get('class/getAll', {
                    super_id: item.class_id
                }, res => {
                    this.isLoading = false;
                    this.$clearLoading();
                    this.localList[item.class_id] = res.msg;
                    this.list = res.msg;
                });

            } else {
                this.list = this.localList[item.class_id];
            }
        },
        open(item) {

            this.$push({
                path: "/ClassGoods",
                query: {
                    class_id: item.class_id,
                    title: item.class_title
                }
            });


        }
    },
    computed: {},
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { });
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {},
    watch: {}
};