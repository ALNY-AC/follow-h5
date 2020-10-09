// @ts-nocheck
import $ from "jquery";

export default {
    name: 'MarketOne',
    props: {},
    data() {
        return {
            cubeKill: "",
            time: null,
        }
    },
    methods: {
        update() {
            this.updateHomeCube()
        },
        updateHomeCube() {

            if (typeof localStorage['MarketOneCube'] != 'undefined') {
                this.cubeKill = JSON.parse(localStorage['MarketOneCube']);
            }

            this.$get('Cube/getKill', {}, res => {
                if (res.res >= 1) {
                    this.cubeKill = res.msg;
                    localStorage['MarketOneCube'] = JSON.stringify(res.msg);

                    this.$nextTick(() => {
                        setTimeout(() => {
                            // upHeight()
                        }, 1000)
                    });
                }
            });
        }
    },
    onload() {
        update();
    },
    computed: {

    },
    //过滤器
    filters: {},
    mounted() {
        this.update()
    },
    created() {
        clearInterval(this.time);
        upHeight()
        this.time = setInterval(() => {
            upHeight()
        }, 2000);
    },
    activated() {
        clearInterval(this.time);
        upHeight()
        this.time = setInterval(() => {
            upHeight()
        }, 2000);
    },
    deactivated() {
        clearInterval(this.time);
    },
    beforeDestroy() {
        clearInterval(this.time);
    },
    destroyed() {
        clearInterval(this.time);
    },
    components: {},
    watch: {
    }
};


function upHeight() {
    function up() {
        let height;
        height = $('#MarketBox2').height();
        $('#MarketBox1').height(height + "px");
        $('#MarketOne').height(height + "px");
    }
    up();
    window.addEventListener("resize", () => {
        up();
    });
}