<template>
    <div :class="['chat-msg']" v-if="chat">

        <template v-if="chat.role=='2'">
            <div class="left-model">

                <div class="left">
                    <div class="user-head">
                        <img :src="$getUrl(chat.user.img)">
                    </div>
                </div>

                <div class="right">
                    <div class="user-name">
                        {{chat.user.name}}
                    </div>
                    <div class="msg-box">
                        <div class="fk"></div>
                        <span class="info" v-html="msg"></span>
                    </div>
                </div>

            </div>
        </template>

        <template v-if="chat.role=='1'">
            <div class="right-model">

                <div class="left">
                    <div class="user-name">
                        {{chat.user.name}}
                    </div>
                    <div class="msg-box">
                        <div class="fk"></div>
                        <span class="info" v-html="msg"></span>
                    </div>
                </div>

                <div class="right">
                    <div class="user-head">
                        <img :src="$getUrl(chat.user.img)">
                    </div>
                </div>
            </div>
        </template>

        <!-- <span @click="remove">删除</span> -->
    </div>
</template>
<script src="./ChatMsg.js"></script>
<style lang="scss" scoped>
@import "ChatMsg.scss";
</style>