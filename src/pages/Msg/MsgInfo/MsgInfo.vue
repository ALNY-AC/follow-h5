<template>
    <div id="MsgInfo">
        <van-nav-bar title="消息详情" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <template v-if="msg">
            <div class="msg-body">
                <div class="msg-title">
                    {{msg.msg_title}}
                </div>
                <div class="msg-time">
                    {{msg.add_time}}
                </div>
                <div class="msg-content" v-html="msg.msg_content"></div>
            </div>
        </template>

    </div>
</template>
<script src="./MsgInfo.js"></script>
<style lang="scss" scoped>
@import "MsgInfo.scss";
</style>