export default function (vm) {
    this.vm = vm;
    // 添加一个聊天id到本地记录
    this.addId = function (id) {
        this.pushLocal(id);
    }

    // 从本地移除一个id
    this.removeId = function (id) {

        let list = this.getLocal();
        let index = list.indexOf(id);
        list.splice(index, 1);
        this.saveLocal(list);

    }
    // 取本地记录

    this.getLocal = function () {

        if (localStorage.chatMsgIds == undefined) {
            localStorage.chatMsgIds = '[]';
        }
        let list = localStorage.chatMsgIds;
        list = JSON.parse(list);
        return list;
    }

    this.saveLocal = function (data) {
        localStorage.chatMsgIds = JSON.stringify(data);
    }

    // 将一条数据插入到本地记录中
    this.pushLocal = function (data) {
        let list = this.getLocal();
        list.push(data);
        this.saveLocal(list);
    }
    // 取得本地的总数
    this.getLocalTotal = function () {
        if (localStorage.chatMsgTotal == undefined) {
            localStorage.chatMsgTotal = 0;
        }
        return parseInt(localStorage.chatMsgTotal);
    }
    // 设置本地总数
    this.setLocalTotal = function (total) {
        localStorage.chatMsgTotal = total + '';

    }
    //清空本地消息记录
    this.clearLocalId = function () {
        this.saveLocal([]);
    }

}