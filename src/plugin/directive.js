// @ts-nocheck
import $ from "jquery";

//自定义指令

export default function (Vue, options) {

    function focus(el, binding) {

        if (binding.value) {
            //获得焦点
            $(el).focus();
            // $(el).find('input').focus();
        } else {
            //失去焦点
            $(el).blur();
            // $(el).find('input').blur();
        }
    }

    function img(el, binding) {
        if (binding.value) {
            var img = Vue.prototype.$getUrl(binding.value);
            $(el).attr('src', img);
        }
    }

    //自动获取焦点
    Vue.directive('focus', {
        inserted: focus,
        update: focus,
        componentUpdated: focus,
    })
    //图片处理指令
    Vue.directive('img', {
        inserted: img,
        update: img,
        componentUpdated: img,
    })

    // 导航栏一逐渐隐藏
    Vue.directive('nav', {
        inserted(el, binding) {
            return;

            let $el = $(el);
            let $el2;

            if (binding.value) {
                $el2 = $(binding.value);
            }
            // opacity
            let scroll = 0;
            let opacity = 1;

            let height = $el.height();
            let height2 = 0;
            if ($el2) {
                let height2 = $el2.height();
            }
            let top = 46;
            let coke = false;
            $(window).scroll(function () {

                var scrollTopTo = $(this).scrollTop();


                if (scrollTopTo > scroll) {
                    opacity = 0;
                    top = -height;
                }

                if (scrollTopTo < scroll) {
                    opacity = 1;
                    top = 0;
                }

                if (top < -height) {
                    top = -height;
                }

                if (top >= 0) {
                    top = 0;
                }

                if (scrollTopTo <= 10) {
                    opacity = 1;
                    top = 0;
                }

                scroll = scrollTopTo;

                if (!coke) {
                    coke = true;
                    $el.animate(
                        {
                            marginTop: top,
                            // opacity: opacity
                        }, 300, () => {
                            coke = false;
                        });
                    if ($el2) {
                        $el2.animate({
                            marginTop: top,
                            // opacity: opacity
                        }, 300, () => {
                            coke = false;
                        });
                    }
                }


            });

        },
    })

    Vue.filter('isNull', function (value) {

    })


}
