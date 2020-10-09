export default {
  name: 'NavGoodsList',
  props: {
    navId: {
      type: String,
      default: '',
    },
    lock: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isLoading: false,
      isRefresh: false,
      finished: false,
      goodsList: [],
      page: 1,
      page_size: 5,
      empty: false,
      isLock: false,
    };
  },
  methods: {
    update() {
      if (this.lock) {
        this.isLoading = false;
        this.isRefresh = false;
        return;
      }
      if (this.isLock) {
        return;
      } else {
        this.isLock = true;
      }
      this.$get('nav/getGoodsPlus', {
        page: this.page,
        page_size: this.page_size,
        nav_id: this.navId
      }, res => {
        this.isLoading = false;
        this.isRefresh = false;
        this.isLock = false;

        if (res.res >= 1) {
          this.page++;
          res.msg.forEach(item => {
            this.goodsList.push(item);
          });
        }

        if (res.res < 0) {
          //没了
          this.finished = true;
        }

      });
    },
    onLoad() {
      this.update();
    },
    onRefresh() {
      setTimeout(() => {
        this.init();
        this.update();
      }, 100);
    },
    init() {
      this.finished = false;
      this.isLoading = false;
      this.goodsList = [];
      this.page = 1;
      this.isLock = false;
      this.page_size = 5;
    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    // this.update();
    this.$nextTick(() => { })
  },
  //Vue 实例销毁后调用
  destroyed() { },
  components: {},
  watch: {}
};












