<template>
    <div id="Chat">
        <van-nav-bar title="客服" left-arrow @click-left="$back()"></van-nav-bar>

        <div class="msg-box">
            <chat-msg @remove="remove" :index="i" :list="msgList" :chat="item" v-for="(item,i) in msgList" :key="item.chat_id">
            </chat-msg>
        </div>

        <textarea v-model="data.msg" name="" id="" cols="30" rows="10">
        </textarea>
        <button @click="pull">发送</button>
        <button @click="clear">清空消息</button>

    </div>
</template>
<script src="./Chat.js"></script>
<style lang="scss" scoped>
@import "Chat.scss";
</style>