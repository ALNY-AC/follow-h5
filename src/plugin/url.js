// @ts-nocheck
export default function (Vue, options) {

    var devServer = 'http://dev.server.followenjoy.cn:8100/index.php/';
    // var server = devServer;
    var server = 'http://server.followenjoy.cn/index.php/';
    // var server = 'http://192.168.0.79/work/api/'
    // var server = 'http://cosmetics.cn/index.php/';

    var serverAdmin = server + 'Admin/';
    var serverHome = server + 'Home/';
    var serverDefault = serverHome;

    Vue.prototype.$isTest = false;

    //获得处理过的地址，主要用于获得图片的地址 
    Vue.prototype.$getUrl = function (url) {

        if (!url) {
            return '';
        }

        //判断是不是相对路径 ./，如果是就不需要添加
        if (url.indexOf('./') >= 0) {
            //是相对路径 ./，所以直接返回
            // goods_id=620&share_id=13914896237 
            return url;
        }

        //开始判断是不是http开头，如果是就不再添加头了
        var _url;
        if (url.indexOf('http') == -1) {
            var server = 'http://server.followenjoy.cn/index.php/';
            // var server = 'http://dev.server.followenjoy.cn:8100/index.php/';
            let head = server;
            // 取出index.php
            head = head.replace('index.php/', '');
            _url = head + url;
        } else {
            _url = url;
        }
        return _url;
    }

    Vue.prototype.$getThumb = function (src, width = 32, height = 32) {
        // getThumb
        let href = encodeURIComponent(src);
        let url = serverDefault + `image/get?width=${width}&height=${height}src=` + href;
        return url;
    }


    //服务器地址
    Vue.prototype.$server = server;
    Vue.prototype.$serverAdmin = serverAdmin;
    Vue.prototype.$serverHome = serverHome;
    Vue.prototype.$serverDefault = serverDefault;
    //上传文件地址
    Vue.prototype.$serverUpFile = serverHome + "Use/upFile";
    // 分享的url
    Vue.prototype.$shareUrl = 'http://q.followenjoy.cn/#/';
    // Vue.prototype.$shareUrl = 'http://test.q.followenjoy.cn/#/';
    // Vue.prototype.$shareUrl = 'http://192.168.1.251:8080/#/';

}
