export default {
  name: 'SpecialGoodsFlow',
  props: {},
  data() {
    return {
      list: [],
      special_id: '',
      special: null,
      page: 1,
      total: 0,
      loading: false,
      finished: false,
      isShowBooth: false,
      booth_group_id: '',
    };
  },
  methods: {
    goInfo(item) {
      this.$push({
        path: "/goodsInfo",
        query: {
          goods_id: item.goods_id
        }
      });
    },
    getHeight() {

      let height = 0;
      var random = Math.floor(Math.random() * 10);
      if (random > 5) {
        return (120 + random) + 'px';
      } else {
        return (100 + random) + 'px';
      }

    },
    getBoothInfo() {
      this.booth_group_id = this.special['booth_group_id'];
      this.isShowBooth = true;


    },
    getSpecialInfo() {

      this.$get('special/getInfo', {
        special_id: this.special_id
      }, res => {
        this.special = res.msg;
        if (this.special['booth_group_id']) {
          this.getBoothInfo();
        }

      });

    },
    init() {
      this.page = 1;
      this.special = null;
      this.list = [];
      this.finished = false;
      this.special_id = this.$route.query.special_id;

      // 取得专题信息
      this.getSpecialInfo();

    },
    update() {
      if (this.finished) {
        return;
      }
      this.loading = true;
      this.$get('Special/getGoodsList', {
        special_id: this.special_id,
        page: this.page,
        page_size: 5
      }, res => {
        this.loading = false;
        this.total = res.total;
        if (res.res >= 1) {
          res.msg.forEach(item => {
            item.height = this.getHeight();
            this.list.push(item);
          });
          this.page++;
          if (this.list.length >= this.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          return;
        }

        if (res.msg.length <= 0) {
          this.finished = true;
        }

      });

    },
    share() {

      let img = this.special.special_head;
      let url = `SpecialGoodsFlow?special_id=${this.special_id}`;
      img = this.$getThumb(img);
      let content = this.special.special_info ? this.special.special_info : "";
      let title = this.special.special_title;

      this.$store.state.showShare(
        {
          title: title,
          content: content,
          href: url,
          image: this.$getUrl(img),
          // 下面是对应各个平台的扩展参数。
          weixin: {
            extra: { scene: "WXSceneSession" }
          },
          // 下面是组件特有的参数
          comp: {
            title: '分享',
            subClick: () => {
           
            },
            btn: {
              qrcode: false
            }
          }
        },
        res => { }
      );

    }
  },
  computed: {},
  //过滤器
  filters: {},
  mounted() {
    this.$nextTick(() => { });
  },
  activated() {
    upSize();
    if (this.$route.query.special_id != this.special_id) {
      this.init();
      this.update();
    }
  },
  created() {
    this.special_id = this.$route.query.special_id;
    this.init();
    this.update();
  },
  //Vue 实例销毁后调用
  destroyed() { },
  components: {},
  watch: {}
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
